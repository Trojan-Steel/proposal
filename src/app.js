import "./weights.js";
import { supabase, supabaseConfig } from "./supabaseClient.js";
import { computeEffectiveUnitPrice, computeLineTotals, toCurrency, toPct } from "./utils/optimizationPricing.mjs";
import { computeDeckRollups } from "./utils/deckRollups.mjs";
import { computeBoostTotalFromCsc, normalizeBoostFactorInput } from "./utils/boostPricing.mjs";
import {
  buildOptimizationBoostPlan,
  hasTrojanDeckOption,
  isCscOnlyOption,
} from "./utils/optimizationBoost.mjs";
// Deck weight lookup is generated from "Deck Weights.xlsx".
// If weights.js is missing, place "Deck Weights.xlsx" in ~/simple-calculator and run:
//   python3 tools/build_weights.py
// Then refresh the app.
// For Google address autocomplete, set `window.GOOGLE_MAPS_API_KEY` before loading app.js.
const pricing = {
  CSC: {
    buckets: [
      { min: 0, max: 9, rate: 6000 },
      { min: 10, max: 24, rate: 4500 },
      { min: 25, max: 49, rate: 4000 },
      { min: 50, max: 99, rate: 3500 },
      { min: 100, max: 299, rate: 3000 },
      { min: 300, max: 1000000, rate: 2500 },
    ],
  },
  CANO: {
    poundsPerTon: 2000,
    ratePerPound: 1.89,
  },
};

const ADMIN_PRICING_STORAGE_KEY = "trojan_admin_pricing_v1";
const ADMIN_CHANGELOG_STORAGE_KEY = "trojan_admin_changelog_v1";
const ADMIN_TROJAN_MIN_PROJECT_MARGIN_STORAGE_KEY = "admin_trojan_min_project_margin_v1";
const ADMIN_DETAILING_BUCKETS_STORAGE_KEY = "admin_detailing_buckets_v1";
const SUPPLIERS_STORAGE_KEY = "suppliersTable_v1";
const PROPOSAL_DATA_STORAGE_KEY = "proposalData_v1";
const CALCULATOR_DRAFT_STORAGE_KEY = "trojan_calculator_draft_v1";
const PROPOSAL_QUOTE_COUNTER_STORAGE_KEY = "trojan_proposal_quote_counter_v1";
const PROPOSAL_QUOTE_LOG_STORAGE_KEY = "trojan_proposal_quote_log_v1";
const PROPOSAL_QUOTE_PREFIX = "TROJ26";
const PROPOSAL_QUOTE_START = 274;
const GOOGLE_MAPS_API_GLOBAL_KEY = "GOOGLE_MAPS_API_KEY";
const SUPABASE_APP_SETTINGS_TABLE = "app_settings";
const SUPABASE_APP_SETTINGS_ID = "default";
const SHARED_SETTINGS_KEYS = {
  trojanPricing: "trojan_pricing_v1",
  cscPricing: "csc_pricing_v1",
  canoPricing: "cano_pricing_v1",
  trojanLeadTimes: "trojan_lead_times_v1",
  cscLeadTimes: "csc_lead_times_v1",
  canoLeadTimes: "cano_lead_times_v1",
};
const ADMIN_LOCAL_EXPORT_KEYS = [
  ADMIN_PRICING_STORAGE_KEY,
  ADMIN_CHANGELOG_STORAGE_KEY,
  ADMIN_TROJAN_MIN_PROJECT_MARGIN_STORAGE_KEY,
  ADMIN_DETAILING_BUCKETS_STORAGE_KEY,
  ...Object.values(SHARED_SETTINGS_KEYS),
];

const ADMIN_SECTION_CONFIG = {
  trojan: {
    label: "TROJAN",
    fields: [
      { key: "coilCostPerLb", label: "COIL COST ($/LB)", type: "currency" },
      { key: "inboundFreightPerLb", label: "INBOUND FREIGHT ($/LB)", type: "currency" },
      { key: "laborPerLb", label: "LABOR ($/LB)", type: "currency" },
      { key: "outboundFreightPerMi", label: "OUTBOUND FREIGHT ($/MI)", type: "currency" },
      { key: "minimumOutboundFreightPerTruck", label: "MIN OUTBOUND FREIGHT ($/TRUCK)", type: "currency" },
      { key: "facilityAddress", label: "FACILITY ADDRESS", type: "text" },
      { key: "accessoriesCostPerScrew", label: "COST PER SCREW ($)", type: "currency" },
      { key: "accessoriesCostPerTon", label: "ACCESSORIES COST PER TON ($/TON)", type: "currency" },
      { key: "minimumProjectMargin", label: "Minimum Project Margin", type: "currency" },
      { key: "boostPercentOfCSC", label: "Boost % of CSC", type: "text" },
      { key: "boostTargetPctDefault", label: "BOOST TARGET PCT (DECIMAL)", type: "text" },
      { key: "boostUndercutBuffer", label: "BOOST UNDERCUT BUFFER ($)", type: "currency" },
    ],
  },
  csc: {
    label: "CSC",
    fields: [],
  },
  cano: {
    label: "CANO",
    fields: [{ key: "perLb", label: "$/LB", type: "currency" }],
  },
  detailing: {
    label: "DETAILING",
    fields: [],
  },
};

const TROJAN_SUBSECTION_FIELDS = {
  inbound: ["coilCostPerLb", "inboundFreightPerLb"],
  mfg: ["laborPerLb"],
  outbound: ["outboundFreightPerMi", "minimumOutboundFreightPerTruck", "facilityAddress"],
  accessories: ["accessoriesCostPerScrew", "accessoriesCostPerTon"],
  leadTimes: [],
  margins: ["minimumProjectMargin", "boostPercentOfCSC", "boostTargetPctDefault", "boostUndercutBuffer"],
  conditions: [],
};

const TROJAN_DOCUMENT_CONDITION_SLOTS = [
  { value: "PAGE_1", label: "PAGE 1" },
  { value: "STANDARD_EXCLUSIONS", label: "STANDARD EXCLUSIONS" },
  { value: "STANDARD_QUALIFICATIONS", label: "STANDARD QUALIFICATIONS" },
  { value: "GENERAL_SALE_TERMS", label: "GENERAL SALE TERMS" },
  { value: "GENERAL_SALE_TERMS_CONTINUED", label: "GENERAL SALE TERMS (CONTINUED)" },
  { value: "ACKNOWLEDGMENT", label: "ACKNOWLEDGMENT" },
];

const TROJAN_DOCUMENT_CONDITION_SLOT_VALUES = TROJAN_DOCUMENT_CONDITION_SLOTS.map((slot) => slot.value);

const CSC_BUCKET_DEFAULT_ROWS = [
  { start: 0, end: 9 },
  { start: 10, end: 24 },
  { start: 25, end: 49 },
  { start: 50, end: 99 },
  { start: 100, end: 1000 },
];

const DEFAULT_CSC_JOISTS_BUCKET_ROWS = CSC_BUCKET_DEFAULT_ROWS.map((row, index) => ({
  ...row,
  cost: [6000, 4500, 4000, 3500, 3000][index],
}));

const DEFAULT_CSC_DECK_BUCKET_ROWS = CSC_BUCKET_DEFAULT_ROWS.map((row, index) => ({
  ...row,
  cost: [6000, 4000, 3500, 2500, 2100][index],
}));

const DETAILING_BUCKET_DEFAULT_ROWS = [
  { start: 0, end: 9 },
  { start: 10, end: 24 },
  { start: 25, end: 49 },
  { start: 50, end: 99 },
  { start: 100, end: 299 },
  { start: 300, end: 1000 },
];
const DETAILING_SCOPE_TYPES = ["DECK+JOISTS", "DECK_ONLY", "JOIST_ONLY"];
const DETAILING_TIERS = [1, 2, 3];
const LEAD_TIME_SUPPLIER_KEYS = ["TROJAN", "CSC", "CANO"];

function parseLeadTimeInteger(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const raw = String(value).trim();
  if (raw === "") {
    return "";
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return "";
  }
  return parsed;
}

function createDefaultLeadTimesValues() {
  return {
    trojan: {
      submittalsDeckOnly: { min: "", max: "" },
      submittalsJoistsUnder50: { min: "", max: "" },
      submittalsDeckAndJoistsOver50: { min: "", max: "" },
      fabrication: { min: "", max: "" },
    },
    csc: {
      fabrication: { min: "", max: "" },
    },
    cano: {
      fabrication: { min: "", max: "" },
    },
  };
}

function normalizeLeadTimesValues(source) {
  const defaults = createDefaultLeadTimesValues();
  const trojanSubmittalsLegacy = source?.trojan?.submittals || {};
  return {
    trojan: {
      submittalsDeckOnly: {
        min: parseLeadTimeInteger(
          source?.trojan?.submittalsDeckOnly?.min ?? trojanSubmittalsLegacy?.min ?? defaults.trojan.submittalsDeckOnly.min,
        ),
        max: parseLeadTimeInteger(
          source?.trojan?.submittalsDeckOnly?.max ?? trojanSubmittalsLegacy?.max ?? defaults.trojan.submittalsDeckOnly.max,
        ),
      },
      submittalsJoistsUnder50: {
        min: parseLeadTimeInteger(
          source?.trojan?.submittalsJoistsUnder50?.min ??
            trojanSubmittalsLegacy?.min ??
            defaults.trojan.submittalsJoistsUnder50.min,
        ),
        max: parseLeadTimeInteger(
          source?.trojan?.submittalsJoistsUnder50?.max ??
            trojanSubmittalsLegacy?.max ??
            defaults.trojan.submittalsJoistsUnder50.max,
        ),
      },
      submittalsDeckAndJoistsOver50: {
        min: parseLeadTimeInteger(
          source?.trojan?.submittalsDeckAndJoistsOver50?.min ??
            trojanSubmittalsLegacy?.min ??
            defaults.trojan.submittalsDeckAndJoistsOver50.min,
        ),
        max: parseLeadTimeInteger(
          source?.trojan?.submittalsDeckAndJoistsOver50?.max ??
            trojanSubmittalsLegacy?.max ??
            defaults.trojan.submittalsDeckAndJoistsOver50.max,
        ),
      },
      fabrication: {
        min: parseLeadTimeInteger(source?.trojan?.fabrication?.min ?? defaults.trojan.fabrication.min),
        max: parseLeadTimeInteger(source?.trojan?.fabrication?.max ?? defaults.trojan.fabrication.max),
      },
    },
    csc: {
      fabrication: {
        min: parseLeadTimeInteger(source?.csc?.fabrication?.min ?? defaults.csc.fabrication.min),
        max: parseLeadTimeInteger(source?.csc?.fabrication?.max ?? defaults.csc.fabrication.max),
      },
    },
    cano: {
      fabrication: {
        min: parseLeadTimeInteger(source?.cano?.fabrication?.min ?? defaults.cano.fabrication.min),
        max: parseLeadTimeInteger(source?.cano?.fabrication?.max ?? defaults.cano.fabrication.max),
      },
    },
  };
}

const DEFAULT_SUPPLIER_RULE_ROWS = [
  {
    SUPPLIER: "TROJAN",
    DECK: "TRUE",
    DEPTH: "1.5, 2.0",
    JOISTS: "FALSE",
    "AMERICAN STEEL REQUIRED": "TRUE",
    "AMERICAN MANUFACTURING": "TRUE",
    "SDI MANUFACTURING": "FALSE",
    PRIORITY: "1",
    "JOIST LOCATION": "FALSE",
    "DECK LOCATION": "TX",
  },
  {
    SUPPLIER: "CANO",
    DECK: "TRUE",
    DEPTH: "0.6, 1.0, 1.5, 2.0, 3.0",
    JOISTS: "TRUE",
    "AMERICAN STEEL REQUIRED": "FALSE",
    "AMERICAN MANUFACTURING": "FALSE",
    "SDI MANUFACTURING": "TRUE",
    PRIORITY: "2",
    "JOIST LOCATION": "MEXICO",
    "DECK LOCATION": "MEXICO",
  },
  {
    SUPPLIER: "CSC",
    DECK: "TRUE",
    DEPTH: "0.6, 1.0, 1.3, 1.5, 2.0, 3.0, 3.5, 4.0",
    JOISTS: "TRUE",
    "AMERICAN STEEL REQUIRED": "TRUE",
    "AMERICAN MANUFACTURING": "TRUE",
    "SDI MANUFACTURING": "TRUE",
    PRIORITY: "3",
    "JOIST LOCATION": "MO",
    "DECK LOCATION": "FL",
  },
  {
    SUPPLIER: "CUTTING EDGE",
    DECK: "TRUE",
    DEPTH: "1.5, 2.0, 3.0",
    JOISTS: "FALSE",
    "AMERICAN STEEL REQUIRED": "TRUE",
    "AMERICAN MANUFACTURING": "TRUE",
    "SDI MANUFACTURING": "TRUE",
    PRIORITY: "4",
    "JOIST LOCATION": "FALSE",
    "DECK LOCATION": "TX",
  },
  {
    SUPPLIER: "CORDECK",
    DECK: "TRUE",
    DEPTH: "0.6, 1.5, 2.0, 3.0",
    JOISTS: "FALSE",
    "AMERICAN STEEL REQUIRED": "TRUE",
    "AMERICAN MANUFACTURING": "TRUE",
    "SDI MANUFACTURING": "TRUE",
    PRIORITY: "5",
    "JOIST LOCATION": "FALSE",
    "DECK LOCATION": "TX",
  },
  {
    SUPPLIER: "CSM",
    DECK: "TRUE",
    DEPTH: "0.6, 1.0, 1.5, 2.0, 3.0",
    JOISTS: "FALSE",
    "AMERICAN STEEL REQUIRED": "TRUE",
    "AMERICAN MANUFACTURING": "TRUE",
    "SDI MANUFACTURING": "TRUE",
    PRIORITY: "6",
    "JOIST LOCATION": "FALSE",
    "DECK LOCATION": "TX",
  },
  {
    SUPPLIER: "HOUSTONBDECK",
    DECK: "TRUE",
    DEPTH: "1.5, 2.0, 3.0",
    JOISTS: "FALSE",
    "AMERICAN STEEL REQUIRED": "TRUE",
    "AMERICAN MANUFACTURING": "TRUE",
    "SDI MANUFACTURING": "TRUE",
    PRIORITY: "7",
    "JOIST LOCATION": "FALSE",
    "DECK LOCATION": "TX",
  },
];

function cloneBucketRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function normalizeBucketRows(sourceRows, defaultRows) {
  if (Array.isArray(sourceRows)) {
    return defaultRows.map((defaultRow, index) => {
      const sourceRow = sourceRows[index] || {};
      return {
        start: parseCurrency(sourceRow.start ?? defaultRow.start),
        end: parseCurrency(sourceRow.end ?? defaultRow.end),
        cost: parseCurrency(sourceRow.cost ?? sourceRow.rate ?? defaultRow.cost),
      };
    });
  }

  if (sourceRows && typeof sourceRows === "object") {
    return defaultRows.map((defaultRow) => {
      const legacyKey = `${defaultRow.start}-${defaultRow.end}`;
      return {
        start: defaultRow.start,
        end: defaultRow.end,
        cost: parseCurrency(sourceRows[legacyKey] ?? defaultRow.cost),
      };
    });
  }

  return cloneBucketRows(defaultRows);
}

function createDefaultCscValues() {
  const leadTimes = createDefaultLeadTimesValues();
  return {
    joists: {
      buckets: cloneBucketRows(DEFAULT_CSC_JOISTS_BUCKET_ROWS),
      extraShippingFee_0_9: 3500,
    },
    deck: {
      buckets: cloneBucketRows(DEFAULT_CSC_DECK_BUCKET_ROWS),
    },
    leadTimes: leadTimes.csc,
  };
}

function normalizeCscValues(source) {
  const defaults = createDefaultCscValues();
  const output = createDefaultCscValues();
  const joistsSource = source?.joists;
  const deckSource = source?.deck;

  output.joists.buckets = normalizeBucketRows(
    joistsSource?.buckets ?? joistsSource?.bucketPrices,
    defaults.joists.buckets,
  );
  output.deck.buckets = normalizeBucketRows(deckSource?.buckets ?? deckSource?.bucketPrices, defaults.deck.buckets);

  output.joists.extraShippingFee_0_9 = parseCurrency(
    joistsSource?.extraShippingFee_0_9 ?? defaults.joists.extraShippingFee_0_9,
  );
  output.leadTimes = normalizeLeadTimesValues({ csc: source?.leadTimes }).csc;

  return output;
}

function createDefaultCanoValues() {
  const leadTimes = createDefaultLeadTimesValues();
  return {
    perLb: "",
    leadTimes: leadTimes.cano,
  };
}

function normalizeCanoValues(source) {
  const defaults = createDefaultCanoValues();
  return {
    perLb: parseCurrency(source?.perLb ?? defaults.perLb),
    leadTimes: normalizeLeadTimesValues({ cano: source?.leadTimes }).cano,
  };
}

function getDefaultDetailingPercent(scopeType, tier, bucketIndex) {
  const deckJoistsByBucket = [3.5, 3.75, 4.0, 4.25, 4.5, 4.75];
  const scopeOffset =
    scopeType === "DECK_ONLY"
      ? -0.5
      : scopeType === "JOIST_ONLY"
        ? -0.25
        : 0;
  const tierOffset = tier === 1 ? 0 : tier === 2 ? 0.25 : 0.5;
  const percent = deckJoistsByBucket[bucketIndex] + scopeOffset + tierOffset;
  return Math.max(3, Math.min(5, Math.round(percent * 100) / 100));
}

function createDefaultDetailingValues() {
  const buckets = [];
  DETAILING_SCOPE_TYPES.forEach((scopeType) => {
    DETAILING_TIERS.forEach((tier) => {
      DETAILING_BUCKET_DEFAULT_ROWS.forEach((row, bucketIndex) => {
        buckets.push({
          start: row.start,
          end: row.end,
          scopeType,
          tier,
          detailingPercent: getDefaultDetailingPercent(scopeType, tier, bucketIndex),
        });
      });
    });
  });
  return {
    minimumFee: 500,
    buckets,
  };
}

function normalizeDetailingValues(source) {
  const defaults = createDefaultDetailingValues();
  const sourceRows = Array.isArray(source?.buckets) ? source.buckets : Array.isArray(source) ? source : [];
  const normalizedRows = sourceRows
    .map((row) => ({
      start: parseCurrency(row?.start),
      end: parseCurrency(row?.end),
      scopeType: String(row?.scopeType || row?.scope || "").trim().toUpperCase(),
      tier: Number.parseInt(String(row?.tier ?? ""), 10),
      detailingPercent: parseCurrency(row?.detailingPercent ?? row?.percent),
    }))
    .filter(
      (row) =>
        Number.isFinite(row.start) &&
        Number.isFinite(row.end) &&
        DETAILING_SCOPE_TYPES.includes(row.scopeType) &&
        DETAILING_TIERS.includes(row.tier),
    );

  return {
    minimumFee: parseCurrency(source?.minimumFee ?? defaults.minimumFee),
    buckets: normalizedRows.length > 0 ? normalizedRows : defaults.buckets,
  };
}

function normalizeTrojanDocumentConditions(sourceRows) {
  if (!Array.isArray(sourceRows)) {
    return [];
  }
  return sourceRows
    .map((row, index) => {
      const parsedId = Number.parseInt(String(row?.id ?? ""), 10);
      const slotRaw = String(row?.slot || "").trim().toUpperCase();
      const slot = TROJAN_DOCUMENT_CONDITION_SLOT_VALUES.includes(slotRaw) ? slotRaw : "GENERAL_SALE_TERMS_CONTINUED";
      const text = String(row?.text || "").trim();
      const afterNumber = Number.parseInt(String(row?.afterNumber ?? ""), 10);
      return {
        id: Number.isFinite(parsedId) && parsedId > 0 ? parsedId : index + 1,
        slot,
        text,
        afterNumber: Number.isFinite(afterNumber) && afterNumber >= 0 ? afterNumber : 0,
      };
    })
    .filter((row) => row.text !== "");
}

function createDefaultAdminState() {
  const leadTimes = createDefaultLeadTimesValues();
  return {
    sections: {
      trojan: {
        values: {
          coilCostPerLb: "",
          inboundFreightPerLb: "",
          laborPerLb: "",
          outboundFreightPerMi: "",
          minimumOutboundFreightPerTruck: "",
          facilityAddress: "",
          accessoriesCostPerScrew: "",
          accessoriesCostPerTon: "",
          minimumProjectMargin: 4000,
          boostPercentOfCSC: "0.90",
          boostTargetPctDefault: "0.855",
          boostUndercutBuffer: 1000,
          documentConditions: [],
          leadTimes: leadTimes.trojan,
        },
        isCollapsed: true,
        isEditing: false,
        subsections: {
          inbound: { isCollapsed: true, isEditing: false },
          mfg: { isCollapsed: true, isEditing: false },
          outbound: { isCollapsed: true, isEditing: false },
          accessories: { isCollapsed: true, isEditing: false },
          leadTimes: { isCollapsed: true, isEditing: false, error: "" },
          margins: { isCollapsed: true, isEditing: false },
          conditions: { isCollapsed: true, isEditing: false },
        },
      },
      csc: {
        values: createDefaultCscValues(),
        isCollapsed: true,
        isEditing: false,
        subsections: {
          joists: { isCollapsed: true, isEditing: false },
          deck: { isCollapsed: true, isEditing: false },
          leadTimes: { isCollapsed: true, isEditing: false, error: "" },
        },
      },
      cano: {
        values: createDefaultCanoValues(),
        isCollapsed: true,
        isEditing: false,
        subsections: {
          leadTimes: { isCollapsed: true, isEditing: false, error: "" },
        },
      },
      detailing: {
        values: createDefaultDetailingValues(),
        isCollapsed: true,
        isEditing: false,
      },
    },
    changelog: [],
    outboundAddressLastSavedAt: null,
  };
}

const state = {
  projectName: "",
  projectLocation: "",
  projectComplexityTier: "2",
  submittalsLeadTime: "",
  fabricationLeadTime: "",
  takeoffByTrojan: "YES",
  cutListProvided: "NO",
  specsReviewed: "NO",
  milesFromTrojanFacility: "",
  scope: "joist-deck",
  currentPage: "project",
  adminReturnPage: "project",
  deckSpecsCollapsed: false,
  deckReviewMode: false,
  joistReviewMode: false,
  deckFlags: {
    americanSteelRequired: false,
    americanManufacturing: false,
    sdiManufacturer: false,
    specifiedManufacturer: false,
    specifiedManufacturerName: "",
  },
  deckFlagSelectionOrder: [],
  deckProfiles: [],
  accessories: [],
  admin: createDefaultAdminState(),
  joists: {
    supplier: "CSC",
    tons: "",
  },
  joistItems: [],
  takeoff: {
    bidNo: "",
    jobNumber: "",
    jobName: "",
    projectLocation: "",
    areas: [],
    nextAreaNumber: 1,
  },
  totals: {
    joistsTotal: 0,
    totalDeckSqs: 0,
    deckTotal: 0,
    totalDeckTons: 0,
    trojanDeckTons: 0,
    brokeredDeckTons: 0,
    trojanShipping: 0,
    trojanShippingTrucks: 0,
    trojanShippingMiles: 0,
    trojanShippingRate: 0,
    grandTotal: 0,
  },
  pricingSections: {
    trojanDeck: true,
    brokeredDeck: true,
    accessories: false,
    joists: true,
    detailing: true,
  },
  pricingDetailing: {
    detailingPercentAuto: 0,
    detailingPercentOverride: null,
    detailingAmount: 0,
    subtotal: 0,
    finalTotal: 0,
  },
  pricingOptimizationVisible: false,
  pricingOptimizationLoading: false,
  pricingOptimizationScenarios: [],
  appliedOptimizationSelection: {
    deckMode: "auto",
    deckVendor: "",
    deckAssignments: [],
    joistVendor: "",
    label: "",
    scenarioId: "",
    trojanDeckMarginPercentOverride: null,
  },
  pricingOptimizationBoost: {
    isBoosted: false,
    boostFactor: 0.9,
    cscTotal: 0,
    boostTotal: 0,
    previousAppliedSelection: null,
    boostedOptionId: null,
    boostedOriginalTrojanMarginPercent: null,
    boostedTrojanMarginPercent: null,
    benchmarkSubtotal: 0,
    targetSubtotal: 0,
    notice: "",
  },
  pricingMargins: {
    trojanDeck: 15,
    brokeredDeck: 5,
    joists: 5,
  },
  pricingMarginOverrides: {
    trojanDeck: false,
    brokeredDeck: false,
    joists: false,
  },
  vendorPlan: null,
  suppliers: {
    columns: [],
    rows: [],
    draftRows: [],
    isLoaded: false,
    isEditing: false,
    isLoading: false,
    loadError: "",
    nameColumnKey: "",
  },
};

const pageProject = document.getElementById("page-project");
const pageTakeoff = document.getElementById("page-takeoff");
const pageDeck = document.getElementById("page-deck");
const pageJoist = document.getElementById("page-joist");
const pagePricing = document.getElementById("page-pricing");
const pageAdmin = document.getElementById("page-admin");
const pageSuppliers = document.getElementById("page-suppliers");
const mainTabsNav = document.getElementById("mainTabsNav");
const mainTabButtons = Array.from(document.querySelectorAll("[data-main-tab]"));
const deckSummaryBlock = pageDeck.querySelector(".totals-summary-block");

const projectNameDisplay = document.getElementById("projectNameDisplay");
const projectNameInput = document.getElementById("projectNameInput");
const takeoffBidNoInput = document.getElementById("takeoffBidNoInput");
const takeoffJobNumberInput = document.getElementById("takeoffJobNumberInput");
const takeoffJobNameInput = document.getElementById("takeoffJobNameInput");
const takeoffProjectLocationInput = document.getElementById("takeoffProjectLocationInput");
const takeoffAddAreaButton = document.getElementById("takeoffAddAreaButton");
const takeoffDoneButton = document.getElementById("takeoffDoneButton");
const takeoffAreasList = document.getElementById("takeoffAreasList");
const projectLocationInput = document.getElementById("projectLocationInput");
const projectComplexityInput = document.getElementById("projectComplexityInput");
const submittalsLeadTimeInput = document.getElementById("submittalsLeadTimeInput");
const fabricationLeadTimeInput = document.getElementById("fabricationLeadTimeInput");
const takeoffByTrojanInput = document.getElementById("takeoffByTrojanInput");
const cutListProvidedInput = document.getElementById("cutListProvidedInput");
const specsReviewedInput = document.getElementById("specsReviewedInput");
const milesFromTrojanInput = document.getElementById("milesFromTrojanInput");
const projectNextButton = document.getElementById("projectNextButton");
const adminOpenButton = document.getElementById("adminOpenButton");
const adminBackButton = document.getElementById("adminBackButton");
const adminCloseButton = document.getElementById("adminCloseButton");
const adminSuppliersButton = document.getElementById("adminSuppliersButton");
const adminChangelogButton = document.getElementById("adminChangelogButton");
const adminExportSettingsButton = document.getElementById("adminExportSettingsButton");
const adminImportSettingsButton = document.getElementById("adminImportSettingsButton");
const adminImportSettingsInput = document.getElementById("adminImportSettingsInput");
const adminStatusText = document.getElementById("adminStatusText");
const adminSectionsList = document.getElementById("adminSectionsList");
const adminChangelogDialog = document.getElementById("adminChangelogDialog");
const adminChangelogList = document.getElementById("adminChangelogList");
const adminChangelogCloseButton = document.getElementById("adminChangelogCloseButton");
const resetProjectSideBtn = document.getElementById("resetProjectSideBtn");

const scopeRadios = Array.from(document.querySelectorAll('input[name="scopeInput"]'));

const deckBackButton = document.getElementById("deckBackButton");
const deckNextButton = document.getElementById("deckNextButton");
const joistBackButton = document.getElementById("joistBackButton");
const joistNextButton = document.getElementById("joistNextButton");
const pricingBackButton = document.getElementById("pricingBackButton");
const resetProjectBtn = document.getElementById("resetProjectBtn");
const pricingStartButton = document.getElementById("pricingStartButton");
const pricingOptimizeButton = document.getElementById("pricingOptimizeButton");
const pricingBoostButton = document.getElementById("pricingBoostButton");
const pricingProposalButton = document.getElementById("pricingProposalButton");
const pricingOptimizeResults = document.getElementById("pricingOptimizeResults");

const supplierInput = document.getElementById("supplierInput");
const joistItemsList = document.getElementById("joistItemsList");
const addJoistButton = document.getElementById("addJoistButton");
const joistReviewButton = document.getElementById("joistReviewButton");
const joistReviewSummary = document.getElementById("joistReviewSummary");

const deckProfilesList = document.getElementById("deckProfilesList");
const duplicateProfileDialog = document.getElementById("duplicateProfileDialog");
const duplicateProfileSelect = document.getElementById("duplicateProfileSelect");
const duplicateConfirmButton = document.getElementById("duplicateConfirmButton");
const duplicateCancelButton = document.getElementById("duplicateCancelButton");
const totalDeckSqsOutput = document.getElementById("totalDeckSqsOutput");
const deckTotalOutput = document.getElementById("deckTotalOutput");
const totalDeckTonsOutput = document.getElementById("totalDeckTonsOutput");

const pricingJoistsTotalOutput = document.getElementById("pricingJoistsTotalOutput");
const pricingDeckSqsOutput = document.getElementById("pricingDeckSqsOutput");
const pricingDeckTotalOutput = document.getElementById("pricingDeckTotalOutput");
const pricingDeckTonsOutput = document.getElementById("pricingDeckTonsOutput");
const pricingTrojanShippingRow = document.getElementById("pricingTrojanShippingRow");
const pricingTrojanShippingCost = document.getElementById("pricingTrojanShippingCost");
const pricingTrojanShippingMeta = document.getElementById("pricingTrojanShippingMeta");
const grandTotalOutput = document.getElementById("grandTotalOutput");
const deckTrojanTonsOutput = document.getElementById("deckTrojanTonsOutput");
const deckBrokeredTonsOutput = document.getElementById("deckBrokeredTonsOutput");
const pricingTrojanDeckSchedule = document.getElementById("pricingTrojanDeckSchedule");
const pricingBrokeredDeckSchedule = document.getElementById("pricingBrokeredDeckSchedule");
const pricingJoistVendorSchedule = document.getElementById("pricingJoistVendorSchedule");
const pricingBrokeredDeckName = document.getElementById("pricingBrokeredDeckName");
const pricingJoistsName = document.getElementById("pricingJoistsName");
const pricingTrojanHeaderCogs = document.getElementById("pricingTrojanHeaderCogs");
const pricingAccessoriesHeaderCogs = document.getElementById("pricingAccessoriesHeaderCogs");
const pricingBrokeredHeaderCogs = document.getElementById("pricingBrokeredHeaderCogs");
const pricingJoistsHeaderCogs = document.getElementById("pricingJoistsHeaderCogs");
const pricingDetailingHeaderCogs = document.getElementById("pricingDetailingHeaderCogs");
const pricingTonnageTotalOutput = document.getElementById("pricingTonnageTotalOutput");
const pricingSubtotalOutput = document.getElementById("pricingSubtotalOutput");
const pricingProjectTotalCostOutput = document.getElementById("pricingProjectTotalCostOutput");
const pricingMarginSummaryOutput = document.getElementById("pricingMarginSummaryOutput");
const pricingTrojanDeckSection = document.getElementById("pricingTrojanDeckSection");
const pricingBrokeredDeckSection = document.getElementById("pricingBrokeredDeckSection");
const pricingAccessoriesSection = document.getElementById("pricingAccessoriesSection");
const pricingJoistsSection = document.getElementById("pricingJoistsSection");
const pricingDetailingSection = document.getElementById("pricingDetailingSection");
const pricingTrojanDeckContent = document.getElementById("pricingTrojanDeckContent");
const pricingBrokeredDeckContent = document.getElementById("pricingBrokeredDeckContent");
const pricingAccessoriesContent = document.getElementById("pricingAccessoriesContent");
const pricingJoistsContent = document.getElementById("pricingJoistsContent");
const pricingDetailingContent = document.getElementById("pricingDetailingContent");
const pricingTrojanDeckCogs = document.getElementById("pricingTrojanDeckCogs");
const pricingAccessoriesSchedule = document.getElementById("pricingAccessoriesSchedule");
const pricingDetailingSchedule = document.getElementById("pricingDetailingSchedule");
const suppliersEditButton = document.getElementById("suppliersEditButton");
const suppliersSaveButton = document.getElementById("suppliersSaveButton");
const suppliersCancelButton = document.getElementById("suppliersCancelButton");
const suppliersAddRowButton = document.getElementById("suppliersAddRowButton");
const suppliersBackButton = document.getElementById("suppliersBackButton");
const suppliersStatusText = document.getElementById("suppliersStatusText");
const suppliersTableContainer = document.getElementById("suppliersTableContainer");
const weightsLookup =
  typeof window !== "undefined" && window.DECK_LBS_PER_SQ && typeof window.DECK_LBS_PER_SQ === "object"
    ? window.DECK_LBS_PER_SQ
    : {};

const deckSpecOptions = {
  depth: ["0.6", "1.0", "1.3", "1.5", "2.0", "3.0", "3.5", "4.0"],
  manufacturer: ["Trojan", "CSC", "CANO", "Cutting Edge", "Cordeck", "CSM", "HoustonBDeck"],
  profile: [
    "B",
    "BA",
    "BI",
    "BIA",
    "BP",
    "BPA",
    "C",
    "CSV",
    "D",
    "D FormLok",
    "DA",
    "DA FormLok",
    "E",
    "N-24",
    "NA-24",
    "NI-24",
    "NI-32",
    "NIA-24",
    "NIA-32",
    "NL-32",
    "NLA-32",
    "NP-24",
    "NP-32",
    "NPA-24",
    "NPA-32",
    "TORIS",
    "VL",
    "VLI",
    "VLP",
    "VLPA",
    "VLR",
  ],
  gage: ["16", "18", "19", "20", "22", "24", "26", "28", "16/18", "18/16", "18/20", "20/18"],
  finish: ["G30", "G60", "G90", "UNC"],
  paintTop: ["G", "W", "N"],
  paintBottom: ["G", "W", "N"],
  grade: ["33", "40", "50", "80"],
};

const deckMethodOptions = [
  { value: "", label: "" },
  { value: "SQS", label: "SQS" },
  { value: "SqFt", label: "SqFt" },
  { value: "LF", label: "LF" },
  { value: "Cut List", label: "Cut List" },
];
const DECK_FLAG_LABELS = {
  americanSteelRequired: "AMERICAN STEEL REQUIRED",
  americanManufacturing: "AMERICAN MANUFACTURING",
  sdiManufacturer: "SDI MANUFACTURER",
  specifiedManufacturer: "SPECIFIED MANUFACTURER",
};
const ACCESSORY_TYPE_OPTIONS = ["#10TEKSCREWS", "#12TEKSCREWS", "CC1", "CC2", "CC3"];

let nextDeckProfileId = 1;
let nextAccessoryId = 1;
let nextJoistItemId = 1;
let nextTakeoffItemId = 1;
let nextTakeoffAreaId = 1;
let nextTrojanConditionId = 1;
const REQUIRED_DECK_FIELDS = ["depth", "profile", "gage", "finish", "grade"];
const WEIGHT_LOOKUP_FIELDS = ["depth", "profile", "gage", "finish"];
const JOIST_SERIES_OPTIONS = ["K-SERIES", "LH-SERIES", "DLH-SERIES", "SP-SERIES", "GIRDERS", "BRIDGING"];
let googlePlacesApiReady = false;
let googlePlacesApiPromise = null;
const googleAddressAutocompleteRefs = new WeakMap();
let milesCalcDebounceTimer = null;
let lastMilesRouteKey = "";
let lastMilesRequestToken = 0;
let pricingOptimizationTimer = null;
let adminStatusTimer = null;
const OPTIMIZATION_BOOST_MAX_MARGIN_PERCENT = 50;
const DEFAULT_BOOST_PERCENT_OF_CSC = 0.9;
const DEFAULT_BOOST_TARGET_PCT = 0.855;
const DEFAULT_BOOST_UNDERCUT_BUFFER = 1000;

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatWholeNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatTwoDecimals(value) {
  const safeValue = Number.isFinite(value) && value > 0 ? value : 0;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeValue);
}

function formatBucketRate(rate) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(rate) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(rate) ? 0 : 2,
  }).format(rate);
}

function parsePositiveNumberOrZero(value) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return 0;
  }
  return parsed;
}

function getPricingMarginPercent(sectionKey) {
  if (!sectionKey || !Object.prototype.hasOwnProperty.call(state.pricingMargins, sectionKey)) {
    return 0;
  }
  return parsePositiveNumberOrZero(state.pricingMargins[sectionKey]);
}

function getAppliedOptimizationTrojanMarginPercentOverride() {
  const value = state.appliedOptimizationSelection?.trojanDeckMarginPercentOverride;
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return parsePositiveNumberOrZero(value);
}

function applyPricingMargin(subtotal, sectionKey, overrideMarginPercent = null) {
  const marginPercent =
    overrideMarginPercent === null || overrideMarginPercent === undefined
      ? getPricingMarginPercent(sectionKey)
      : parsePositiveNumberOrZero(overrideMarginPercent);
  const marginAmount = subtotal * (marginPercent / 100);
  return {
    marginPercent,
    marginAmount,
    totalWithMargin: subtotal + marginAmount,
  };
}

function renderOptimizationSummaryLine({
  scopeLabel,
  vendorLabel = "",
  quantity,
  unitLabel = "TON",
  baseUnitPrice,
  marginPercent,
  lineTotal,
  suffixText = "",
}) {
  const safeQuantity = parsePositiveNumberOrZero(quantity);
  const safeBaseUnitPrice = parsePositiveNumberOrZero(baseUnitPrice);
  const safeLineTotal = parsePositiveNumberOrZero(lineTotal);
  const pricing = computeLineTotals(safeQuantity, safeBaseUnitPrice, marginPercent);
  const lineTotalToDisplay = safeLineTotal > 0 ? safeLineTotal : pricing.lineTotal;
  const descriptor = vendorLabel ? `${scopeLabel} (${escapeHtml(vendorLabel)})` : scopeLabel;
  const normalizedUnitLabel = String(unitLabel || "TON").trim().toUpperCase();
  const suffix = suffixText ? ` | ${suffixText}` : "";
  return `
    <p class="pricing-line-item-meta">
      ${descriptor}: ${formatTwoDecimals(safeQuantity)} ${normalizedUnitLabel} × ${toCurrency(safeBaseUnitPrice)}/${normalizedUnitLabel} (BASE)
      → ${toCurrency(computeEffectiveUnitPrice(safeBaseUnitPrice, marginPercent))}/${normalizedUnitLabel} (WITH ${toPct(
        marginPercent,
      )} MARGIN)
      | Margin ${toCurrency(pricing.marginDollars)}${suffix}
      | Line Total ${toCurrency(lineTotalToDisplay)}
    </p>
  `;
}

const MIN_MARGIN_ALLOCATION_PRIORITY = [
  "TROJAN",
  "CSC",
  "CANO",
  "CUTTING EDGE",
  "CORDECK",
  "CSM",
  "HOUSTON B DECK",
  "HOUSTONBDECK",
];

function getTrojanMinimumProjectMargin() {
  return parseCurrency(state.admin.sections.trojan.values.minimumProjectMargin || 4000);
}

function parseBoostPercentFactor(rawValue) {
  return normalizeBoostFactorInput(rawValue, DEFAULT_BOOST_PERCENT_OF_CSC);
}

function getBoostPercentOfCscFactor() {
  return parseBoostPercentFactor(state.admin.sections.trojan.values.boostPercentOfCSC);
}

function getOptimizationBoostTargetPctDefault() {
  const raw = state.admin.sections.trojan.values.boostTargetPctDefault;
  const parsed = Number.parseFloat(String(raw ?? "").trim());
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_BOOST_TARGET_PCT;
  }
  return parsed;
}

function getOptimizationBoostUndercutBuffer() {
  const value = parseCurrency(state.admin.sections.trojan.values.boostUndercutBuffer);
  if (value <= 0) {
    return DEFAULT_BOOST_UNDERCUT_BUFFER;
  }
  return value;
}

function enforceMinProjectMarginByPriority(participants, minProjectMargin) {
  const minMargin = parsePositiveNumberOrZero(minProjectMargin);
  if (!Array.isArray(participants) || participants.length === 0 || minMargin <= 0) {
    return;
  }
  let totalMargin = participants.reduce((sum, item) => sum + parsePositiveNumberOrZero(item.marginAmount), 0);
  let requiredIncrease = Math.max(0, minMargin - totalMargin);
  if (requiredIncrease <= 0) {
    return;
  }

  for (let index = 0; index < MIN_MARGIN_ALLOCATION_PRIORITY.length; index += 1) {
    if (requiredIncrease <= 0) {
      break;
    }
    const prioritySupplier = MIN_MARGIN_ALLOCATION_PRIORITY[index];
    const normalizedPriority = normalizeUpperTrim(prioritySupplier);
    const participant = participants.find((item) => normalizeUpperTrim(item.supplier) === normalizedPriority);
    if (!participant) {
      continue;
    }
    if (participant.locked) {
      continue;
    }
    if (parsePositiveNumberOrZero(participant.subtotalCost) <= 0) {
      continue;
    }
    participant.marginAmount += requiredIncrease;
    if (typeof participant.sync === "function") {
      participant.sync(participant.marginAmount);
    }
    totalMargin += requiredIncrease;
    requiredIncrease = Math.max(0, minMargin - totalMargin);
  }
}

function parseCurrency(inputValue, options = {}) {
  const { blankAsZero = true } = options;
  if (inputValue === null || inputValue === undefined) {
    return blankAsZero ? 0 : Number.NaN;
  }

  const raw = String(inputValue).trim();
  if (raw === "") {
    return blankAsZero ? 0 : Number.NaN;
  }

  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (cleaned === "") {
    return blankAsZero ? 0 : Number.NaN;
  }

  const dotIndex = cleaned.indexOf(".");
  const normalized =
    dotIndex === -1 ? cleaned : `${cleaned.slice(0, dotIndex)}.${cleaned.slice(dotIndex + 1).replace(/\./g, "")}`;
  const parsed = Number.parseFloat(normalized);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function formatCurrency(value, options = {}) {
  const { blankAsEmpty = false } = options;
  if (blankAsEmpty && (value === "" || value === null || value === undefined)) {
    return "";
  }

  const numeric = parseCurrency(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

function formatAdminTimestamp(timestamp) {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function setAdminStatus(message, options = {}) {
  if (!adminStatusText) {
    return;
  }
  const { isError = false, clearAfterMs = 2500 } = options;
  adminStatusText.textContent = message || "";
  adminStatusText.style.color = isError ? "#b91c1c" : "";
  if (adminStatusTimer) {
    window.clearTimeout(adminStatusTimer);
    adminStatusTimer = null;
  }
  if (message && clearAfterMs > 0) {
    adminStatusTimer = window.setTimeout(() => {
      if (adminStatusText.textContent === message) {
        adminStatusText.textContent = "";
        adminStatusText.style.color = "";
      }
      adminStatusTimer = null;
    }, clearAfterMs);
  }
}

function getSupabaseSafeErrorMessage(error, fallback = "Unknown error") {
  const message = String(error?.message || "").trim();
  if (message) {
    return message.slice(0, 200);
  }
  return fallback;
}

function logSupabaseOperationFailure(operation, context = {}) {
  const error = context.error || null;
  console.error("Supabase operation failed", {
    operation,
    status: Number.isFinite(Number(context.status)) ? Number(context.status) : null,
    code: typeof error?.code === "string" ? error.code : null,
    message: typeof error?.message === "string" ? error.message : null,
    details: typeof error?.details === "string" ? error.details : null,
    hint: typeof error?.hint === "string" ? error.hint : null,
  });
}

function parseStoredJsonObject(storageKey) {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

function readSupplierRowsFromStorage() {
  const stored = localStorage.getItem(SUPPLIERS_STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function buildAdminLocalStorageSnapshot() {
  const snapshot = {};
  ADMIN_LOCAL_EXPORT_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      snapshot[key] = value;
    }
  });
  return snapshot;
}

function buildSettingsExportPayload() {
  return {
    sharedSettingsBlob: buildSharedSettingsBlobFromState(),
    suppliers: state.suppliers.isLoaded ? state.suppliers.rows : readSupplierRowsFromStorage(),
    adminLocalStorage: buildAdminLocalStorageSnapshot(),
  };
}

function downloadSettingsExportFile() {
  const payload = buildSettingsExportPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);
  link.href = objectUrl;
  link.download = `trojan-settings-${dateStamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

function importSuppliersRows(rows) {
  if (!Array.isArray(rows)) {
    return false;
  }
  const columns = deriveSupplierColumns(rows);
  const normalizedRows = normalizeSupplierRows(rows, columns);
  state.suppliers.columns = columns;
  state.suppliers.rows = normalizedRows;
  state.suppliers.draftRows = normalizedRows.map((row) => ({ ...row }));
  state.suppliers.nameColumnKey = findSupplierNameColumn(columns);
  state.suppliers.isLoaded = true;
  state.suppliers.isLoading = false;
  state.suppliers.isEditing = false;
  state.suppliers.loadError = "";
  localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(normalizedRows));
  return true;
}

async function handleSettingsImportFile(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid JSON structure.");
  }
  const sharedSettingsBlob = parsed.sharedSettingsBlob;
  if (!sharedSettingsBlob || typeof sharedSettingsBlob !== "object") {
    throw new Error("Missing sharedSettingsBlob.");
  }

  const adminLocalStorage = parsed.adminLocalStorage;
  if (adminLocalStorage && typeof adminLocalStorage === "object") {
    Object.entries(adminLocalStorage).forEach(([key, value]) => {
      if (typeof value === "string") {
        localStorage.setItem(key, value);
      } else if (value !== null && value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
  }

  localStorage.setItem(
    SHARED_SETTINGS_KEYS.trojanPricing,
    JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.trojanPricing] || {}),
  );
  localStorage.setItem(
    SHARED_SETTINGS_KEYS.cscPricing,
    JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.cscPricing] || {}),
  );
  localStorage.setItem(
    SHARED_SETTINGS_KEYS.canoPricing,
    JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.canoPricing] || {}),
  );
  localStorage.setItem(
    SHARED_SETTINGS_KEYS.trojanLeadTimes,
    JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.trojanLeadTimes] || {}),
  );
  localStorage.setItem(
    SHARED_SETTINGS_KEYS.cscLeadTimes,
    JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.cscLeadTimes] || {}),
  );
  localStorage.setItem(
    SHARED_SETTINGS_KEYS.canoLeadTimes,
    JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.canoLeadTimes] || {}),
  );

  importSuppliersRows(parsed.suppliers);
  loadAdminState();
  renderAdminSections();
  if (state.currentPage === "suppliers") {
    renderSuppliersPage();
  }
  updateCalculator();
  await syncSharedSettingsToSupabase(sharedSettingsBlob);
}

function buildAdminPricingPayloadFromState() {
  const payload = {};
  Object.keys(ADMIN_SECTION_CONFIG).forEach((sectionKey) => {
    payload[sectionKey] = {};
    ADMIN_SECTION_CONFIG[sectionKey].fields.forEach((field) => {
      if (field.type === "text") {
        payload[sectionKey][field.key] = String(state.admin.sections[sectionKey].values[field.key] || "").trim();
      } else {
        payload[sectionKey][field.key] = parseCurrency(state.admin.sections[sectionKey].values[field.key]);
      }
    });
  });
  payload.csc = normalizeCscValues(state.admin.sections.csc.values);
  payload.cano = normalizeCanoValues(state.admin.sections.cano.values);
  payload.detailing = normalizeDetailingValues(state.admin.sections.detailing.values);
  payload.trojan.documentConditions = normalizeTrojanDocumentConditions(
    state.admin.sections.trojan.values.documentConditions,
  );
  payload.leadTimes = normalizeLeadTimesValues({
    trojan: state.admin.sections.trojan.values.leadTimes,
    csc: state.admin.sections.csc.values.leadTimes,
    cano: state.admin.sections.cano.values.leadTimes,
  });
  return payload;
}

function writeAdminStateToLocalStorage(payload) {
  localStorage.setItem(ADMIN_PRICING_STORAGE_KEY, JSON.stringify(payload));
  localStorage.setItem(
    ADMIN_TROJAN_MIN_PROJECT_MARGIN_STORAGE_KEY,
    String(parseCurrency(state.admin.sections.trojan.values.minimumProjectMargin)),
  );
  localStorage.setItem(
    ADMIN_DETAILING_BUCKETS_STORAGE_KEY,
    JSON.stringify(normalizeDetailingValues(state.admin.sections.detailing.values).buckets),
  );
  localStorage.setItem(ADMIN_CHANGELOG_STORAGE_KEY, JSON.stringify(state.admin.changelog));
}

function buildSharedSettingsBlobFromState() {
  return {
    [SHARED_SETTINGS_KEYS.trojanPricing]: {
      coilCostPerLb: parseCurrency(state.admin.sections.trojan.values.coilCostPerLb),
      inboundFreightPerLb: parseCurrency(state.admin.sections.trojan.values.inboundFreightPerLb),
      laborPerLb: parseCurrency(state.admin.sections.trojan.values.laborPerLb),
      outboundFreightPerMi: parseCurrency(state.admin.sections.trojan.values.outboundFreightPerMi),
      minimumOutboundFreightPerTruck: parseCurrency(state.admin.sections.trojan.values.minimumOutboundFreightPerTruck),
      facilityAddress: String(state.admin.sections.trojan.values.facilityAddress || "").trim(),
      accessoriesCostPerScrew: parseCurrency(state.admin.sections.trojan.values.accessoriesCostPerScrew),
      accessoriesCostPerTon: parseCurrency(state.admin.sections.trojan.values.accessoriesCostPerTon),
      minimumProjectMargin: parseCurrency(state.admin.sections.trojan.values.minimumProjectMargin),
      boostPercentOfCSC: getBoostPercentOfCscFactor(),
      boostTargetPctDefault: getOptimizationBoostTargetPctDefault(),
      boostUndercutBuffer: getOptimizationBoostUndercutBuffer(),
    },
    [SHARED_SETTINGS_KEYS.cscPricing]: normalizeCscValues(state.admin.sections.csc.values),
    [SHARED_SETTINGS_KEYS.canoPricing]: normalizeCanoValues(state.admin.sections.cano.values),
    [SHARED_SETTINGS_KEYS.trojanLeadTimes]: normalizeLeadTimesValues({
      trojan: state.admin.sections.trojan.values.leadTimes,
    }).trojan,
    [SHARED_SETTINGS_KEYS.cscLeadTimes]: normalizeLeadTimesValues({
      csc: state.admin.sections.csc.values.leadTimes,
    }).csc,
    [SHARED_SETTINGS_KEYS.canoLeadTimes]: normalizeLeadTimesValues({
      cano: state.admin.sections.cano.values.leadTimes,
    }).cano,
  };
}

function applySharedSettingsBlobToState(blob) {
  if (!blob || typeof blob !== "object") {
    return false;
  }
  const trojanPricing = blob[SHARED_SETTINGS_KEYS.trojanPricing];
  const cscPricing = blob[SHARED_SETTINGS_KEYS.cscPricing];
  const canoPricing = blob[SHARED_SETTINGS_KEYS.canoPricing];
  const trojanLeadTimes = blob[SHARED_SETTINGS_KEYS.trojanLeadTimes];
  const cscLeadTimes = blob[SHARED_SETTINGS_KEYS.cscLeadTimes];
  const canoLeadTimes = blob[SHARED_SETTINGS_KEYS.canoLeadTimes];

  if (
    !trojanPricing &&
    !cscPricing &&
    !canoPricing &&
    !trojanLeadTimes &&
    !cscLeadTimes &&
    !canoLeadTimes
  ) {
    return false;
  }

  if (trojanPricing && typeof trojanPricing === "object") {
    const trojan = state.admin.sections.trojan.values;
    trojan.coilCostPerLb = parseCurrency(trojanPricing.coilCostPerLb);
    trojan.inboundFreightPerLb = parseCurrency(trojanPricing.inboundFreightPerLb);
    trojan.laborPerLb = parseCurrency(trojanPricing.laborPerLb);
    trojan.outboundFreightPerMi = parseCurrency(trojanPricing.outboundFreightPerMi);
    trojan.minimumOutboundFreightPerTruck = parseCurrency(trojanPricing.minimumOutboundFreightPerTruck);
    trojan.facilityAddress = String(trojanPricing.facilityAddress || "").trim();
    trojan.accessoriesCostPerScrew = parseCurrency(trojanPricing.accessoriesCostPerScrew);
    trojan.accessoriesCostPerTon = parseCurrency(trojanPricing.accessoriesCostPerTon);
    trojan.minimumProjectMargin = parseCurrency(trojanPricing.minimumProjectMargin);
    trojan.boostPercentOfCSC = String(
      parseBoostPercentFactor(
        trojanPricing.boostPercentOfCSC === undefined ? DEFAULT_BOOST_PERCENT_OF_CSC : trojanPricing.boostPercentOfCSC,
      ),
    );
    trojan.boostTargetPctDefault = String(
      Number.isFinite(Number(trojanPricing.boostTargetPctDefault))
        ? Number(trojanPricing.boostTargetPctDefault)
        : DEFAULT_BOOST_TARGET_PCT,
    );
    trojan.boostUndercutBuffer = parseCurrency(trojanPricing.boostUndercutBuffer || DEFAULT_BOOST_UNDERCUT_BUFFER);
  }
  if (cscPricing && typeof cscPricing === "object") {
    state.admin.sections.csc.values = normalizeCscValues(cscPricing);
  }
  if (canoPricing && typeof canoPricing === "object") {
    state.admin.sections.cano.values = normalizeCanoValues(canoPricing);
  }
  const leadTimes = normalizeLeadTimesValues({
    trojan: trojanLeadTimes,
    csc: cscLeadTimes,
    cano: canoLeadTimes,
  });
  state.admin.sections.trojan.values.leadTimes = leadTimes.trojan;
  state.admin.sections.csc.values.leadTimes = leadTimes.csc;
  state.admin.sections.cano.values.leadTimes = leadTimes.cano;
  return true;
}

function applyAdminPricingPayloadToState(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return;
  }
  Object.keys(ADMIN_SECTION_CONFIG).forEach((sectionKey) => {
    const fields = ADMIN_SECTION_CONFIG[sectionKey].fields;
    const sourceValues = parsed?.[sectionKey];
    if (!sourceValues || typeof sourceValues !== "object") {
      return;
    }
    fields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(sourceValues, field.key)) {
        if (field.type === "text") {
          state.admin.sections[sectionKey].values[field.key] = String(sourceValues[field.key] || "").trim();
        } else {
          state.admin.sections[sectionKey].values[field.key] = parseCurrency(sourceValues[field.key]);
        }
      }
    });
  });
  state.admin.sections.csc.values = normalizeCscValues(parsed?.csc);
  state.admin.sections.cano.values = normalizeCanoValues(parsed?.cano);
  state.admin.sections.detailing.values = normalizeDetailingValues(parsed?.detailing);
  state.admin.sections.trojan.values.documentConditions = normalizeTrojanDocumentConditions(parsed?.trojan?.documentConditions);
  const leadTimes = normalizeLeadTimesValues(parsed?.leadTimes);
  state.admin.sections.trojan.values.leadTimes = leadTimes.trojan;
  state.admin.sections.csc.values.leadTimes = leadTimes.csc;
  state.admin.sections.cano.values.leadTimes = leadTimes.cano;
}

async function syncSharedSettingsToSupabase(settingsBlob = null) {
  if (!supabase) {
    if (!supabaseConfig.isConfigured) {
      setAdminStatus("Supabase not configured (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY)", { isError: true });
    }
    return;
  }
  const payload = settingsBlob && typeof settingsBlob === "object" ? settingsBlob : buildSharedSettingsBlobFromState();
  const { error, status } = await supabase
    .from(SUPABASE_APP_SETTINGS_TABLE)
    .upsert({ id: SUPABASE_APP_SETTINGS_ID, data: payload }, { onConflict: "id" });

  if (error) {
    logSupabaseOperationFailure("syncSharedSettingsToSupabase", { status, error });
    setAdminStatus(`Save failed: ${getSupabaseSafeErrorMessage(error)}`, { isError: true });
    return;
  }
  setAdminStatus("Saved for all users");
}

async function saveOutboundAddress(addressPayload = {}) {
  const outboundAddress = String(addressPayload?.facilityAddress || "").trim();
  if (!outboundAddress) {
    setAdminStatus("Save failed: Outbound Address is required", { isError: true, clearAfterMs: 6000 });
    return { ok: false, reason: "validation" };
  }
  if (!supabase) {
    const message = !supabaseConfig.isConfigured
      ? "Save failed: Supabase not configured (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY)"
      : "Save failed: Supabase client unavailable";
    setAdminStatus(message, { isError: true, clearAfterMs: 6000 });
    return { ok: false, reason: "config" };
  }

  state.admin.sections.trojan.values.facilityAddress = outboundAddress;
  const sharedSettingsBlob = buildSharedSettingsBlobFromState();

  const { data, error, status } = await supabase
    .from(SUPABASE_APP_SETTINGS_TABLE)
    .upsert({ id: SUPABASE_APP_SETTINGS_ID, data: sharedSettingsBlob }, { onConflict: "id" })
    .select("id,data");

  if (error) {
    logSupabaseOperationFailure("saveOutboundAddress.upsert", { status, error });
    const uiMessage = getSupabaseSafeErrorMessage(error);
    setAdminStatus(`Save failed: ${uiMessage}`, { isError: true, clearAfterMs: 7000 });
    return { ok: false, reason: "supabase_error", status, message: uiMessage };
  }

  const rows = Array.isArray(data) ? data : data ? [data] : [];
  if (rows.length < 1) {
    const uiMessage = "No row was written to app_settings";
    logSupabaseOperationFailure("saveOutboundAddress.no_rows", { status, error: { message: uiMessage } });
    setAdminStatus(`Save failed: ${uiMessage}`, { isError: true, clearAfterMs: 7000 });
    return { ok: false, reason: "no_rows", status };
  }

  const row = rows[0] && typeof rows[0] === "object" ? rows[0] : {};
  const rowData = row.data && typeof row.data === "object" ? row.data : {};
  const blob = rowData?.sharedSettingsBlob && typeof rowData.sharedSettingsBlob === "object" ? rowData.sharedSettingsBlob : rowData;
  const savedAddress = String(blob?.[SHARED_SETTINGS_KEYS.trojanPricing]?.facilityAddress || "").trim();
  if (!savedAddress) {
    const uiMessage = "Saved row did not contain outbound address";
    logSupabaseOperationFailure("saveOutboundAddress.readback_missing", { status, error: { message: uiMessage } });
    setAdminStatus(`Save failed: ${uiMessage}`, { isError: true, clearAfterMs: 7000 });
    return { ok: false, reason: "readback_missing", status };
  }

  state.admin.sections.trojan.values.facilityAddress = savedAddress;
  state.admin.outboundAddressLastSavedAt = Date.now();
  const payload = buildAdminPricingPayloadFromState();
  writeAdminStateToLocalStorage(payload);
  setAdminStatus(`Outbound Address saved (${formatAdminTimestamp(state.admin.outboundAddressLastSavedAt)})`, {
    clearAfterMs: 6000,
  });
  renderAdminSections();
  scheduleCalcMilesFromTrojan();
  updateCalculator();
  return { ok: true, savedAddress, status };
}

async function loadRemoteSharedSettings() {
  if (!supabase) {
    return false;
  }
  const { data, error } = await supabase
    .from(SUPABASE_APP_SETTINGS_TABLE)
    .select("data")
    .eq("id", SUPABASE_APP_SETTINGS_ID)
    .single();
  if (error || !data || typeof data.data !== "object" || !data.data) {
    return false;
  }
  const blob = data.data?.sharedSettingsBlob && typeof data.data.sharedSettingsBlob === "object" ? data.data.sharedSettingsBlob : data.data;
const applied = applySharedSettingsBlobToState(blob);

  if (applied) {
    localStorage.setItem("trojan_pricing_v1", JSON.stringify(data.data[SHARED_SETTINGS_KEYS.trojanPricing] || {}));
    localStorage.setItem("csc_pricing_v1", JSON.stringify(data.data[SHARED_SETTINGS_KEYS.cscPricing] || {}));
    localStorage.setItem("cano_pricing_v1", JSON.stringify(data.data[SHARED_SETTINGS_KEYS.canoPricing] || {}));
    localStorage.setItem("trojan_lead_times_v1", JSON.stringify(data.data[SHARED_SETTINGS_KEYS.trojanLeadTimes] || {}));
    localStorage.setItem("csc_lead_times_v1", JSON.stringify(data.data[SHARED_SETTINGS_KEYS.cscLeadTimes] || {}));
    localStorage.setItem("cano_lead_times_v1", JSON.stringify(data.data[SHARED_SETTINGS_KEYS.canoLeadTimes] || {}));
    const payload = buildAdminPricingPayloadFromState();
    writeAdminStateToLocalStorage(payload);
  }
  return applied;
}

function saveAdminState(options = {}) {
  const { skipRemoteSync = false } = options;
  const payload = buildAdminPricingPayloadFromState();
  writeAdminStateToLocalStorage(payload);
  const sharedSettingsBlob = buildSharedSettingsBlobFromState();
  localStorage.setItem("trojan_pricing_v1", JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.trojanPricing] || {}));
  localStorage.setItem("csc_pricing_v1", JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.cscPricing] || {}));
  localStorage.setItem("cano_pricing_v1", JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.canoPricing] || {}));
  localStorage.setItem("trojan_lead_times_v1", JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.trojanLeadTimes] || {}));
  localStorage.setItem("csc_lead_times_v1", JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.cscLeadTimes] || {}));
  localStorage.setItem("cano_lead_times_v1", JSON.stringify(sharedSettingsBlob[SHARED_SETTINGS_KEYS.canoLeadTimes] || {}));
  if (!skipRemoteSync) {
    void syncSharedSettingsToSupabase(sharedSettingsBlob);
  }
}

function loadAdminState() {
  state.admin = createDefaultAdminState();

  const pricingRaw = localStorage.getItem(ADMIN_PRICING_STORAGE_KEY);
  if (pricingRaw) {
    try {
      const parsed = JSON.parse(pricingRaw);
      applyAdminPricingPayloadToState(parsed);
    } catch (_error) {
      // Ignore malformed local storage payload and keep defaults.
    }
  }
  const sharedSettingsBlob = {
    [SHARED_SETTINGS_KEYS.trojanPricing]: parseStoredJsonObject("trojan_pricing_v1"),
    [SHARED_SETTINGS_KEYS.cscPricing]: parseStoredJsonObject("csc_pricing_v1"),
    [SHARED_SETTINGS_KEYS.canoPricing]: parseStoredJsonObject("cano_pricing_v1"),
    [SHARED_SETTINGS_KEYS.trojanLeadTimes]: parseStoredJsonObject("trojan_lead_times_v1"),
    [SHARED_SETTINGS_KEYS.cscLeadTimes]: parseStoredJsonObject("csc_lead_times_v1"),
    [SHARED_SETTINGS_KEYS.canoLeadTimes]: parseStoredJsonObject("cano_lead_times_v1"),
  };
  applySharedSettingsBlobToState(sharedSettingsBlob);

  const detailingRowsRaw = localStorage.getItem(ADMIN_DETAILING_BUCKETS_STORAGE_KEY);
  if (detailingRowsRaw) {
    try {
      const parsedRows = JSON.parse(detailingRowsRaw);
      state.admin.sections.detailing.values = normalizeDetailingValues({
        ...state.admin.sections.detailing.values,
        buckets: parsedRows,
      });
    } catch (_error) {
      // Ignore malformed detailing payload and keep defaults.
    }
  }

  const trojanMinMarginRaw = localStorage.getItem(ADMIN_TROJAN_MIN_PROJECT_MARGIN_STORAGE_KEY);
  if (trojanMinMarginRaw !== null) {
    const parsed = parseCurrency(trojanMinMarginRaw);
    state.admin.sections.trojan.values.minimumProjectMargin = parsed;
  }

  const changelogRaw = localStorage.getItem(ADMIN_CHANGELOG_STORAGE_KEY);
  if (changelogRaw) {
    try {
      const parsed = JSON.parse(changelogRaw);
      if (Array.isArray(parsed)) {
        state.admin.changelog = parsed;
      }
    } catch (_error) {
      // Ignore malformed changelog payload and keep defaults.
    }
  }

  nextTrojanConditionId =
    state.admin.sections.trojan.values.documentConditions.reduce(
      (maxId, row) => Math.max(maxId, Number.parseInt(String(row?.id ?? ""), 10) || 0),
      0,
    ) + 1;
}

function saveCalculatorDraftState() {
  const payload = {
    projectName: state.projectName,
    projectLocation: state.projectLocation,
    projectComplexityTier: state.projectComplexityTier,
    submittalsLeadTime: state.submittalsLeadTime,
    fabricationLeadTime: state.fabricationLeadTime,
    takeoffByTrojan: state.takeoffByTrojan,
    cutListProvided: state.cutListProvided,
    specsReviewed: state.specsReviewed,
    milesFromTrojanFacility: state.milesFromTrojanFacility,
    scope: state.scope,
    deckSpecsCollapsed: state.deckSpecsCollapsed,
    deckReviewMode: state.deckReviewMode,
    joistReviewMode: state.joistReviewMode,
    deckFlags: { ...state.deckFlags },
    deckFlagSelectionOrder: Array.isArray(state.deckFlagSelectionOrder) ? [...state.deckFlagSelectionOrder] : [],
    deckProfiles: Array.isArray(state.deckProfiles) ? state.deckProfiles.map((item) => ({ ...item })) : [],
    accessories: Array.isArray(state.accessories) ? state.accessories.map((item) => ({ ...item })) : [],
    joists: { ...state.joists },
    joistItems: Array.isArray(state.joistItems) ? state.joistItems.map((item) => ({ ...item })) : [],
    takeoff: {
      ...state.takeoff,
      areas: Array.isArray(state.takeoff.areas)
        ? state.takeoff.areas.map((area) => ({
            ...area,
            deckLines: Array.isArray(area.deckLines) ? area.deckLines.map((line) => ({ ...line })) : [],
            joistGroups: Array.isArray(area.joistGroups)
              ? area.joistGroups.map((group) => ({
                  ...group,
                  marks: Array.isArray(group.marks) ? group.marks.map((line) => ({ ...line })) : [],
                }))
              : [],
          }))
        : [],
    },
    pricingMargins: { ...state.pricingMargins },
    pricingMarginOverrides: { ...state.pricingMarginOverrides },
    pricingDetailing: { ...state.pricingDetailing },
    appliedOptimizationSelection: { ...state.appliedOptimizationSelection },
    pricingOptimizationBoost: { ...state.pricingOptimizationBoost },
    pricingSections: { ...state.pricingSections },
    currentPage: state.currentPage,
  };
  try {
    localStorage.setItem(CALCULATOR_DRAFT_STORAGE_KEY, JSON.stringify(payload));
  } catch (_error) {
    // Ignore storage failures.
  }
}

function loadCalculatorDraftState() {
  try {
    const raw = localStorage.getItem(CALCULATOR_DRAFT_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return;
    }

    state.projectName = String(parsed.projectName ?? state.projectName);
    state.projectLocation = String(parsed.projectLocation ?? state.projectLocation);
    state.projectComplexityTier = String(parsed.projectComplexityTier ?? state.projectComplexityTier);
    state.submittalsLeadTime = String(parsed.submittalsLeadTime ?? state.submittalsLeadTime);
    state.fabricationLeadTime = String(parsed.fabricationLeadTime ?? state.fabricationLeadTime);
    state.takeoffByTrojan = String(parsed.takeoffByTrojan ?? state.takeoffByTrojan).toUpperCase() === "NO" ? "NO" : "YES";
    state.cutListProvided = String(parsed.cutListProvided ?? state.cutListProvided).toUpperCase() === "YES" ? "YES" : "NO";
    state.specsReviewed = String(parsed.specsReviewed ?? state.specsReviewed).toUpperCase() === "YES" ? "YES" : "NO";
    state.milesFromTrojanFacility = String(parsed.milesFromTrojanFacility ?? state.milesFromTrojanFacility);
    state.scope = "joist-deck";
    state.deckSpecsCollapsed = Boolean(parsed.deckSpecsCollapsed);
    state.deckReviewMode = Boolean(parsed.deckReviewMode);
    state.joistReviewMode = Boolean(parsed.joistReviewMode);
    if (parsed.deckFlags && typeof parsed.deckFlags === "object") {
      state.deckFlags = { ...state.deckFlags, ...parsed.deckFlags };
    }
    if (Array.isArray(parsed.deckFlagSelectionOrder)) {
      state.deckFlagSelectionOrder = [...parsed.deckFlagSelectionOrder];
    }
    if (Array.isArray(parsed.deckProfiles)) {
      state.deckProfiles = parsed.deckProfiles.map((item) => ({ ...createDefaultDeckProfile(), ...item }));
    }
    if (Array.isArray(parsed.accessories)) {
      state.accessories = parsed.accessories.map((item) => ({ ...createDefaultAccessory(), ...item }));
    }
    if (parsed.joists && typeof parsed.joists === "object") {
      state.joists = { ...state.joists, ...parsed.joists };
    }
    if (Array.isArray(parsed.joistItems)) {
      state.joistItems = parsed.joistItems.map((item) => ({ ...createDefaultJoistItem(), ...item }));
    }
    if (parsed.takeoff && typeof parsed.takeoff === "object") {
      state.takeoff = {
        ...state.takeoff,
        ...parsed.takeoff,
        areas: Array.isArray(parsed.takeoff.areas)
          ? parsed.takeoff.areas.map((area) => {
              const defaultArea = createDefaultTakeoffArea();
              return {
                ...defaultArea,
                id: Number(area?.id) || defaultArea.id,
                name: String(area?.name || defaultArea.name),
                isCollapsed: Boolean(area?.isCollapsed),
                deckLines: Array.isArray(area?.deckLines)
                  ? area.deckLines.map((line) => {
                      const defaultLine = createDefaultTakeoffDeckLine();
                      return {
                        ...defaultLine,
                        ...line,
                        specs: {
                          ...defaultLine.specs,
                          ...(line?.specs && typeof line.specs === "object" ? line.specs : {}),
                        },
                      };
                    })
                  : [],
                joistGroups: Array.isArray(area?.joistGroups)
                  ? area.joistGroups.map((group) => ({
                      ...createDefaultTakeoffJoistGroup(),
                      ...group,
                      marks: Array.isArray(group?.marks)
                        ? group.marks.map((line) => ({ ...createDefaultTakeoffJoistMark(), ...line }))
                        : [],
                    }))
                  : Array.isArray(area?.joistLines)
                    ? [
                        {
                          ...createDefaultTakeoffJoistGroup(),
                          isCollapsed: false,
                          marks: area.joistLines.map((line) => ({ ...createDefaultTakeoffJoistMark(), ...line })),
                        },
                      ]
                    : [],
              };
            })
          : [],
      };
      if (!state.takeoff.projectLocation && typeof parsed.takeoff.cityState === "string") {
        state.takeoff.projectLocation = parsed.takeoff.cityState;
      }
    }
    if (parsed.pricingMargins && typeof parsed.pricingMargins === "object") {
      state.pricingMargins = { ...state.pricingMargins, ...parsed.pricingMargins };
    }
    if (parsed.pricingMarginOverrides && typeof parsed.pricingMarginOverrides === "object") {
      state.pricingMarginOverrides = { ...state.pricingMarginOverrides, ...parsed.pricingMarginOverrides };
    }
    if (parsed.pricingDetailing && typeof parsed.pricingDetailing === "object") {
      state.pricingDetailing = { ...state.pricingDetailing, ...parsed.pricingDetailing };
    }
    if (parsed.appliedOptimizationSelection && typeof parsed.appliedOptimizationSelection === "object") {
      state.appliedOptimizationSelection = {
        ...state.appliedOptimizationSelection,
        ...parsed.appliedOptimizationSelection,
      };
    }
    if (parsed.pricingOptimizationBoost && typeof parsed.pricingOptimizationBoost === "object") {
      state.pricingOptimizationBoost = {
        ...state.pricingOptimizationBoost,
        ...parsed.pricingOptimizationBoost,
      };
    }
    if (parsed.pricingSections && typeof parsed.pricingSections === "object") {
      state.pricingSections = { ...state.pricingSections, ...parsed.pricingSections };
    }

    nextDeckProfileId =
      state.deckProfiles.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;
    nextAccessoryId = state.accessories.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;
    nextJoistItemId = state.joistItems.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;
    const allTakeoffAreas = Array.isArray(state.takeoff.areas) ? state.takeoff.areas : [];
    const allTakeoffItems = allTakeoffAreas.flatMap((area) => [
      ...(Array.isArray(area.deckLines) ? area.deckLines : []),
      ...((Array.isArray(area.joistGroups) ? area.joistGroups : []).flatMap((group) => [
        group,
        ...(Array.isArray(group?.marks) ? group.marks : []),
      ])),
    ]);
    nextTakeoffItemId = allTakeoffItems.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;
    nextTakeoffAreaId = allTakeoffAreas.reduce((maxId, area) => Math.max(maxId, Number(area.id) || 0), 0) + 1;
    state.takeoff.nextAreaNumber = Math.max(
      parsePositiveNumberOrZero(state.takeoff.nextAreaNumber) || 1,
      allTakeoffAreas.length + 1,
    );
  } catch (_error) {
    // Ignore restore failures and continue with defaults.
  }
}

function clearProjectState() {
  // Project-scoped persisted data keys only.
  localStorage.removeItem(CALCULATOR_DRAFT_STORAGE_KEY);
  localStorage.removeItem(PROPOSAL_DATA_STORAGE_KEY);
}

function resetProjectStateInMemory() {
  if (pricingOptimizationTimer) {
    window.clearTimeout(pricingOptimizationTimer);
    pricingOptimizationTimer = null;
  }
  state.projectName = "";
  state.projectLocation = "";
  state.projectComplexityTier = "2";
  state.submittalsLeadTime = "";
  state.fabricationLeadTime = "";
  state.takeoffByTrojan = "YES";
  state.cutListProvided = "NO";
  state.specsReviewed = "NO";
  state.milesFromTrojanFacility = "";
  state.scope = "joist-deck";
  state.adminReturnPage = "project";
  state.deckSpecsCollapsed = false;
  state.deckReviewMode = false;
  state.joistReviewMode = false;
  state.deckFlags = {
    americanSteelRequired: false,
    americanManufacturing: false,
    sdiManufacturer: false,
    specifiedManufacturer: false,
    specifiedManufacturerName: "",
  };
  state.deckFlagSelectionOrder = [];
  state.deckProfiles = [];
  state.accessories = [];
  state.joists = {
    supplier: "CSC",
    tons: "",
  };
  state.joistItems = [];
  state.takeoff = {
    bidNo: "",
    jobNumber: "",
    jobName: "",
    projectLocation: "",
    areas: [],
    nextAreaNumber: 1,
  };
  state.totals = {
    joistsTotal: 0,
    totalDeckSqs: 0,
    deckTotal: 0,
    totalDeckTons: 0,
    trojanDeckTons: 0,
    brokeredDeckTons: 0,
    trojanShipping: 0,
    trojanShippingTrucks: 0,
    trojanShippingMiles: 0,
    trojanShippingRate: 0,
    grandTotal: 0,
  };
  state.pricingSections = {
    trojanDeck: true,
    brokeredDeck: true,
    accessories: false,
    joists: true,
    detailing: true,
  };
  state.pricingOptimizationVisible = false;
  state.pricingOptimizationLoading = false;
  state.pricingOptimizationScenarios = [];
  state.appliedOptimizationSelection = {
    deckMode: "auto",
    deckVendor: "",
    deckAssignments: [],
    joistVendor: "",
    label: "",
    scenarioId: "",
    trojanDeckMarginPercentOverride: null,
  };
  state.pricingOptimizationBoost = {
    isBoosted: false,
    boostFactor: DEFAULT_BOOST_PERCENT_OF_CSC,
    cscTotal: 0,
    boostTotal: 0,
    previousAppliedSelection: null,
    boostedOptionId: null,
    boostedOriginalTrojanMarginPercent: null,
    boostedTrojanMarginPercent: null,
    benchmarkSubtotal: 0,
    targetSubtotal: 0,
    notice: "",
  };
  state.pricingMargins = {
    trojanDeck: 15,
    brokeredDeck: 5,
    joists: 5,
  };
  state.pricingMarginOverrides = {
    trojanDeck: false,
    brokeredDeck: false,
    joists: false,
  };
  state.pricingDetailing = {
    detailingPercentAuto: 0,
    detailingPercentOverride: null,
    detailingAmount: 0,
    subtotal: 0,
    finalTotal: 0,
  };
  state.vendorPlan = null;

  nextDeckProfileId = 1;
  nextAccessoryId = 1;
  nextJoistItemId = 1;
  nextTakeoffItemId = 1;
  nextTakeoffAreaId = 1;
}

function reloadProjectHome() {
  resetProjectStateInMemory();

  if (projectNameInput) {
    projectNameInput.value = "";
  }
  if (projectLocationInput) {
    projectLocationInput.value = "";
  }
  if (projectComplexityInput) {
    projectComplexityInput.value = "2";
  }
  if (submittalsLeadTimeInput) {
    submittalsLeadTimeInput.value = "";
  }
  if (fabricationLeadTimeInput) {
    fabricationLeadTimeInput.value = "";
  }
  if (takeoffByTrojanInput) {
    takeoffByTrojanInput.value = "YES";
  }
  if (cutListProvidedInput) {
    cutListProvidedInput.value = "NO";
  }
  if (specsReviewedInput) {
    specsReviewedInput.value = "NO";
  }
  if (milesFromTrojanInput) {
    milesFromTrojanInput.value = "";
  }
  if (takeoffBidNoInput) {
    takeoffBidNoInput.value = "";
  }
  if (takeoffJobNumberInput) {
    takeoffJobNumberInput.value = "";
  }
  if (takeoffJobNameInput) {
    takeoffJobNameInput.value = "";
  }
  if (takeoffProjectLocationInput) {
    takeoffProjectLocationInput.value = "";
  }
  scopeRadios.forEach((radio) => {
    radio.checked = false;
  });
  if (supplierInput) {
    supplierInput.value = state.joists.supplier;
  }

  updateProjectHeader();
  renderDeckProfiles();
  renderJoistItems();
  renderTakeoffPage();
  updateJoistReviewUI();
  updateWizardButtons();
  updateCalculator();
  setPage("project");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function deriveSupplierColumns(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }
  const firstRow = rows.find((row) => row && typeof row === "object");
  if (!firstRow) {
    return [];
  }
  return Object.keys(firstRow);
}

function normalizeSupplierRows(rows, columns) {
  if (!Array.isArray(rows) || !Array.isArray(columns)) {
    return [];
  }
  return rows
    .filter((row) => row && typeof row === "object")
    .map((row) => {
      const normalized = {};
      columns.forEach((column) => {
        normalized[column] = String(row[column] ?? "").trim();
      });
      return normalized;
    })
    .filter((row) => columns.some((column) => row[column] !== ""));
}

function findSupplierNameColumn(columns) {
  const normalized = columns.map((column) => ({
    key: column,
    text: String(column || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim(),
  }));
  const exactPreferred = normalized.find((entry) => entry.text === "name" || entry.text === "supplier name");
  if (exactPreferred) {
    return exactPreferred.key;
  }
  const includesName = normalized.find((entry) => entry.text.includes("name"));
  if (includesName) {
    return includesName.key;
  }
  const supplierFallback = normalized.find((entry) => entry.text.includes("supplier"));
  return supplierFallback ? supplierFallback.key : "";
}

function setSuppliersStatus(message) {
  if (!suppliersStatusText) {
    return;
  }
  suppliersStatusText.textContent = message;
}

function validateSupplierRows(rows, columns, nameColumnKey) {
  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const isBlank = columns.every((column) => String(row[column] || "").trim() === "");
    if (isBlank) {
      return { isValid: false, message: `Row ${index + 1} cannot be blank.` };
    }
    if (nameColumnKey && String(row[nameColumnKey] || "").trim() === "") {
      return { isValid: false, message: `Row ${index + 1} is missing ${nameColumnKey}.` };
    }
  }
  return { isValid: true, message: "" };
}

function setSuppliersEditing(isEditing) {
  state.suppliers.isEditing = isEditing;
  suppliersEditButton?.classList.toggle("hidden", isEditing);
  suppliersSaveButton?.classList.toggle("hidden", !isEditing);
  suppliersCancelButton?.classList.toggle("hidden", !isEditing);
  suppliersAddRowButton?.classList.toggle("hidden", !isEditing);
}

function renderSuppliersTable() {
  if (!suppliersTableContainer) {
    return;
  }
  const columns = state.suppliers.columns;
  const rows = state.suppliers.isEditing ? state.suppliers.draftRows : state.suppliers.rows;

  if (!state.suppliers.isLoaded && state.suppliers.isLoading) {
    suppliersTableContainer.innerHTML = "";
    return;
  }

  if (columns.length === 0) {
    suppliersTableContainer.innerHTML = '<p class="help-text">No supplier data available.</p>';
    return;
  }

  const headCells = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("");
  const actionHead = state.suppliers.isEditing ? "<th>Actions</th>" : "";
  const bodyRows = rows
    .map((row, rowIndex) => {
      const cells = columns
        .map((column) => {
          const value = String(row[column] ?? "");
          if (!state.suppliers.isEditing) {
            return `<td>${escapeHtml(value)}</td>`;
          }
          return `<td><input type="text" data-suppliers-row="${rowIndex}" data-suppliers-column="${escapeHtml(column)}" value="${escapeHtml(value)}" /></td>`;
        })
        .join("");
      const actions = state.suppliers.isEditing
        ? `<td><button type="button" class="btn-secondary suppliers-delete-row-button" data-suppliers-delete-row="${rowIndex}">Delete</button></td>`
        : "";
      return `<tr>${cells}${actions}</tr>`;
    })
    .join("");

  suppliersTableContainer.innerHTML = `
    <div class="suppliers-table-scroll">
      <table class="suppliers-table">
        <thead>
          <tr>${headCells}${actionHead}</tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    </div>
  `;
}

function renderSuppliersPage() {
  setSuppliersEditing(state.suppliers.isEditing);
  if (state.suppliers.loadError) {
    setSuppliersStatus(state.suppliers.loadError);
  } else if (!state.suppliers.isLoaded && state.suppliers.isLoading) {
    setSuppliersStatus("Loading suppliers...");
  } else {
    const rowCount = state.suppliers.rows.length;
    setSuppliersStatus(`${rowCount} row${rowCount === 1 ? "" : "s"} loaded.`);
  }
  renderSuppliersTable();
}

async function ensureSuppliersLoaded() {
  if (state.suppliers.isLoaded || state.suppliers.isLoading) {
    return;
  }

  state.suppliers.isLoading = true;
  state.suppliers.loadError = "";
  renderSuppliersPage();

  try {
    let sourceRows = [];
    let loadedFromStorage = false;
    let stored = null;
    try {
      stored = localStorage.getItem(SUPPLIERS_STORAGE_KEY);
    } catch (_storageError) {
      stored = null;
    }

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          sourceRows = parsed;
          loadedFromStorage = true;
        }
      } catch (_error) {
        // Ignore malformed payload and continue to file fetch.
      }
    }

    if (!loadedFromStorage) {
      try {
        const response = await fetch("data/suppliers.json", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const parsed = await response.json();
        if (Array.isArray(parsed)) {
          sourceRows = parsed;
        }
      } catch (_error) {
        state.suppliers.loadError = "Unable to load suppliers data.";
      }
    }

    const columns = deriveSupplierColumns(sourceRows);
    const rows = normalizeSupplierRows(sourceRows, columns);
    state.suppliers.columns = columns;
    state.suppliers.rows = rows;
    state.suppliers.draftRows = rows.map((row) => ({ ...row }));
    state.suppliers.nameColumnKey = findSupplierNameColumn(columns);
    state.suppliers.isLoaded = true;
    state.suppliers.isEditing = false;
  } finally {
    state.suppliers.isLoading = false;
    renderSuppliersPage();
  }
}

function canonicalKey(depth, profile, gage) {
  let depthText = String(depth || "").trim();
  const profileText = String(profile || "").trim().replace(/ /g, "");
  const gageText = String(gage || "").trim();

  if (depthText.endsWith(".0")) {
    depthText = depthText.slice(0, -2);
  }

  return `${depthText}${profileText}${gageText}`.toUpperCase();
}

function getEnabledPages() {
  return ["project", "deck", "joist", "pricing"];
}

function updateProjectHeader() {
  const normalized = state.projectName.trim();
  projectNameDisplay.textContent = normalized === "" ? "PROJECT" : normalized.toUpperCase();
}

function normalizeUpperTrim(value) {
  return String(value || "").trim().toUpperCase();
}

function hasTrojanDeckProfiles() {
  return state.deckProfiles.some((profile) => normalizeUpperTrim(profile.specs.manufacturer) === "TROJAN");
}

function requiresMilesFromTrojan() {
  return hasTrojanDeckProfiles();
}

function getProjectMissingMessages() {
  const messages = [];
  if (state.projectName.trim() === "") {
    messages.push("MISSING: PROJECT NAME");
  }
  if (state.projectLocation.trim() === "") {
    messages.push("MISSING: PROJECT LOCATION");
  }
  if (requiresMilesFromTrojan() && parsePositiveNumberOrZero(state.milesFromTrojanFacility) <= 0) {
    messages.push("MISSING: MILES FROM TROJAN FACILITY");
  }
  return messages;
}

function getDeckMissingMessages() {
  const messages = [];
  if (state.deckProfiles.length === 0) {
    messages.push("MISSING: AT LEAST 1 DECK PROFILE");
    return messages;
  }

  state.deckProfiles.forEach((profile, index) => {
    const number = index + 1;
    ["depth", "profile", "gage", "finish", "grade"].forEach((field) => {
      if ((profile.specs[field] || "") === "") {
        messages.push(`MISSING: DECK PROFILE #${number}: ${field.toUpperCase()}`);
      }
    });

    if (profile.rowSqs <= 0) {
      messages.push(`MISSING: DECK PROFILE #${number}: TOTAL PROFILE SQS`);
    }

    if (profile.requiresOverride && parsePositiveNumberOrZero(profile.overrideTons) <= 0) {
      messages.push(`MISSING: DECK PROFILE #${number}: OVERRIDE TONS`);
    }
  });

  return messages;
}

function getJoistMissingMessages() {
  const messages = [];
  if ((state.joists.supplier || "").trim() === "") {
    messages.push("MISSING: SUPPLIER");
  }
  if (state.joistItems.length === 0) {
    messages.push("MISSING: AT LEAST 1 JOIST");
  }
  if (parsePositiveNumberOrZero(state.joists.tons) <= 0) {
    messages.push("MISSING: JOIST TONS");
  }
  return messages;
}

function validateProjectPage() {
  return getProjectMissingMessages().length === 0;
}

function validateDeckPage() {
  return getDeckMissingMessages().length === 0;
}

function validateJoistPage() {
  return getJoistMissingMessages().length === 0;
}

function setMilesFromTrojanValue(milesValue) {
  state.milesFromTrojanFacility = milesValue;
  if (milesFromTrojanInput) {
    milesFromTrojanInput.value = milesValue;
  }
  updateCalculator();
}

function calcMilesFromTrojan(options = {}) {
  const { force = false } = options;
  const origin = String(state.admin.sections.trojan.values.facilityAddress || "").trim();
  const destination = String(state.projectLocation || "").trim();

  if (origin === "" || destination === "") {
    lastMilesRouteKey = "";
    setMilesFromTrojanValue("");
    return;
  }

  const routeKey = `${origin}::${destination}`;
  if (!force && routeKey === lastMilesRouteKey) {
    return;
  }
  lastMilesRouteKey = routeKey;

  loadGooglePlacesApi().then((ready) => {
    if (!ready || !window.google?.maps?.DistanceMatrixService) {
      lastMilesRouteKey = "";
      setMilesFromTrojanValue("");
      return;
    }

    const requestToken = ++lastMilesRequestToken;
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (requestToken !== lastMilesRequestToken) {
          return;
        }
        if (status !== "OK") {
          lastMilesRouteKey = "";
          setMilesFromTrojanValue("");
          return;
        }

        const element = response?.rows?.[0]?.elements?.[0];
        const distanceMeters = element?.distance?.value;
        if (element?.status !== "OK" || !Number.isFinite(distanceMeters) || distanceMeters <= 0) {
          lastMilesRouteKey = "";
          setMilesFromTrojanValue("");
          return;
        }

        const miles = distanceMeters / 1609.344;
        setMilesFromTrojanValue(miles.toFixed(1));
      },
    );
  });
}

function scheduleCalcMilesFromTrojan(options = {}) {
  const { force = false } = options;
  clearTimeout(milesCalcDebounceTimer);
  milesCalcDebounceTimer = setTimeout(() => {
    calcMilesFromTrojan({ force });
  }, 500);
}

function loadGooglePlacesApi() {
  if (googlePlacesApiReady) {
    return Promise.resolve(true);
  }
  if (googlePlacesApiPromise) {
    return googlePlacesApiPromise;
  }

  const apiKey =
    typeof window !== "undefined" && typeof window[GOOGLE_MAPS_API_GLOBAL_KEY] === "string"
      ? window[GOOGLE_MAPS_API_GLOBAL_KEY].trim()
      : "";
  if (apiKey === "") {
    // eslint-disable-next-line no-console
    console.warn("GOOGLE_MAPS_API_KEY is not set. Address autocomplete is disabled.");
    return Promise.resolve(false);
  }

  if (window.google?.maps?.places) {
    googlePlacesApiReady = true;
    return Promise.resolve(true);
  }

  googlePlacesApiPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      googlePlacesApiReady = Boolean(window.google?.maps?.places);
      resolve(googlePlacesApiReady);
    };
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return googlePlacesApiPromise;
}

function setPacContainersVisibility(visible) {
  const pacContainers = document.querySelectorAll(".pac-container");
  pacContainers.forEach((container) => {
    container.style.display = visible ? "" : "none";
  });
}

function bindPacVisibilityHandlers(inputElement) {
  if (!inputElement || inputElement.dataset.pacFixBound === "true") {
    return;
  }
  const showPacContainers = () => setPacContainersVisibility(true);
  inputElement.addEventListener("focus", showPacContainers);
  inputElement.addEventListener("click", showPacContainers);
  inputElement.addEventListener("input", showPacContainers);
  inputElement.dataset.pacFixBound = "true";
}

function attachGoogleAddressAutocomplete(inputElement) {
  if (!inputElement) {
    return;
  }

  bindPacVisibilityHandlers(inputElement);

  if (inputElement.dataset.gmapsBound === "true") {
    return;
  }
  if (!window.google?.maps?.places) {
    return;
  }

  const autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
    types: ["geocode"],
    fields: ["formatted_address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place?.formatted_address) {
      inputElement.value = place.formatted_address;
    }
    inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    setTimeout(() => {
      inputElement.blur();
      setPacContainersVisibility(false);
    }, 20);
  });

  googleAddressAutocompleteRefs.set(inputElement, { inputElement, autocomplete });
  inputElement.dataset.gmapsBound = "true";
}

function initAddressAutocompletes() {
  loadGooglePlacesApi().then((ready) => {
    if (!ready) {
      return;
    }
    attachGoogleAddressAutocomplete(projectLocationInput);
    attachGoogleAddressAutocomplete(takeoffProjectLocationInput);
    const adminAddressInputs = adminSectionsList.querySelectorAll('[data-admin-type="text"]');
    adminAddressInputs.forEach((input) => attachGoogleAddressAutocomplete(input));
  });
}

function setPage(page) {
  const enabled = getEnabledPages();
  let targetPage = page;
  if (targetPage !== "admin" && targetPage !== "suppliers" && !enabled.includes(targetPage)) {
    targetPage = "project";
  }

  if (targetPage === "admin" && state.currentPage !== "admin") {
    state.adminReturnPage = state.currentPage;
  }

  state.currentPage = targetPage;

  pageProject.classList.toggle("hidden", targetPage !== "project");
  pageTakeoff?.classList.toggle("hidden", targetPage !== "takeoff");
  pageDeck.classList.toggle("hidden", targetPage !== "deck");
  pageJoist.classList.toggle("hidden", targetPage !== "joist");
  pagePricing.classList.toggle("hidden", targetPage !== "pricing");
  pageAdmin?.classList.toggle("hidden", targetPage !== "admin");
  pageSuppliers?.classList.toggle("hidden", targetPage !== "suppliers");
  mainTabsNav?.classList.toggle("hidden", targetPage === "admin" || targetPage === "suppliers");
  resetProjectSideBtn?.classList.toggle("hidden", targetPage === "admin" || targetPage === "suppliers");

  if (targetPage === "pricing") {
    state.pricingSections.trojanDeck = true;
    state.pricingSections.accessories = true;
    state.pricingSections.brokeredDeck = true;
    state.pricingSections.joists = true;
    state.pricingSections.detailing = true;
    scheduleCalcMilesFromTrojan();
    renderPricingSections();
  }
  if (targetPage === "suppliers") {
    ensureSuppliersLoaded();
  }
  if (targetPage === "takeoff") {
    renderTakeoffPage();
  }

  updateWizardButtons();
  updateMainTabs();
}

function updateMainTabs() {
  if (!mainTabButtons.length) {
    return;
  }
  mainTabButtons.forEach((button) => {
    const pageKey = String(button.getAttribute("data-main-tab") || "").trim();
    const isActive = state.currentPage === pageKey;
    button.classList.toggle("is-active", isActive);
    button.classList.remove("is-disabled");
    button.disabled = false;
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function openSuppliersPage() {
  state.adminReturnPage = "admin";
  setPage("suppliers");
}

function navigateNext() {
  const enabled = getEnabledPages();
  const index = enabled.indexOf(state.currentPage);
  if (index === -1 || index === enabled.length - 1) {
    return;
  }
  setPage(enabled[index + 1]);
}

function navigateBack() {
  const enabled = getEnabledPages();
  const index = enabled.indexOf(state.currentPage);
  if (index <= 0) {
    return;
  }
  setPage(enabled[index - 1]);
}

function updateWizardButtons() {
  projectNextButton.disabled = false;

  if (state.scope === "deck-only") {
    deckNextButton.textContent = "NEXT: PRICING";
  } else {
    deckNextButton.textContent = "NEXT: JOIST";
  }
  deckNextButton.classList.toggle("hidden", !state.deckReviewMode);
  joistNextButton.classList.toggle("hidden", !state.joistReviewMode);
}

function getBucketSelectionTons(tons) {
  const normalizedTons = parsePositiveNumberOrZero(tons);
  if (normalizedTons <= 0) {
    return 0;
  }
  // Bucket matching rule: round up to next whole ton before selecting range.
  return Math.ceil(normalizedTons);
}

function getCscBucketMatch(scope, tons, adminPricing = null) {
  const snapshot = adminPricing || getAdminPricingSnapshot();
  const normalizedScope = String(scope || "").trim().toUpperCase();
  const rows =
    normalizedScope === "DECK"
      ? snapshot.csc?.deck?.buckets || []
      : normalizedScope === "JOISTS"
        ? snapshot.csc?.joists?.buckets || []
        : [];
  const normalizedRows = rows.map((row) => ({
    start: parseCurrency(row.start),
    end: parseCurrency(row.end),
    cost: parseCurrency(row.cost),
  }));
  if (normalizedRows.length === 0) {
    return null;
  }
  const bucketTons = getBucketSelectionTons(tons);
  let matched = normalizedRows.find((row) => bucketTons >= row.start && bucketTons <= row.end);
  if (!matched) {
    matched = [...normalizedRows].sort((a, b) => b.end - a.end)[0];
  }
  return matched
    ? {
        ...matched,
        bucketTons,
      }
    : null;
}

function getBucketPrice({ vendor, scope, tons, adminPricing = null }) {
  const normalizedVendor = String(vendor || "").trim().toUpperCase();
  const normalizedScope = String(scope || "").trim().toUpperCase();
  const rawTons = parsePositiveNumberOrZero(tons);
  const snapshot = adminPricing || getAdminPricingSnapshot();
  const bucketTons = getBucketSelectionTons(rawTons);

  if (rawTons <= 0) {
    return {
      pricePerTon: 0,
      rawTons,
      bucketTons,
      bucketStart: null,
      bucketEnd: null,
    };
  }

  if (normalizedVendor === "CSC" && (normalizedScope === "DECK" || normalizedScope === "JOISTS")) {
    const match = getCscBucketMatch(normalizedScope, rawTons, snapshot);
    return {
      pricePerTon: match ? parseCurrency(match.cost) : 0,
      rawTons,
      bucketTons,
      bucketStart: match ? match.start : null,
      bucketEnd: match ? match.end : null,
    };
  }

  if (normalizedVendor === "CANO" && (normalizedScope === "DECK" || normalizedScope === "JOISTS")) {
    const perLb = parseCurrency(snapshot.cano?.perLb);
    return {
      pricePerTon: perLb > 0 ? perLb * 2000 : 0,
      rawTons,
      bucketTons,
      bucketStart: null,
      bucketEnd: null,
    };
  }

  if (normalizedVendor === "TROJAN" && normalizedScope === "DECK") {
    const trojan = snapshot.trojan || {};
    const perLb =
      parseCurrency(trojan.coilCostPerLb) +
      parseCurrency(trojan.inboundFreightPerLb) +
      parseCurrency(trojan.laborPerLb);
    return {
      pricePerTon: perLb > 0 ? perLb * 2000 : 0,
      rawTons,
      bucketTons,
      bucketStart: null,
      bucketEnd: null,
    };
  }

  return {
    pricePerTon: 0,
    rawTons,
    bucketTons,
    bucketStart: null,
    bucketEnd: null,
  };
}

function getCscBucketForTons(tons) {
  const match = getCscBucketMatch("JOISTS", tons);
  return match
    ? {
        start: match.start,
        end: match.end,
        cost: match.cost,
        bucketTons: match.bucketTons,
      }
    : null;
}

function getCscDeckBucketForTons(tons) {
  const match = getCscBucketMatch("DECK", tons);
  return match
    ? {
        start: match.start,
        end: match.end,
        cost: match.cost,
        bucketTons: match.bucketTons,
      }
    : null;
}

function parseProjectStateCode(locationText) {
  const text = String(locationText || "").trim().toUpperCase();
  const match = text.match(/,\s*([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?\s*$/);
  return match ? match[1] : "";
}

function parseSupplierBoolean(value) {
  return String(value || "")
    .trim()
    .toUpperCase() === "TRUE";
}

function parseSupplierDepths(value) {
  return String(value || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => Number.parseFloat(part))
    .filter((part) => Number.isFinite(part));
}

function normalizeRuleKey(key) {
  return String(key || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "");
}

function getRuleValue(row, aliases) {
  if (!row || typeof row !== "object") {
    return undefined;
  }
  const aliasSet = new Set(aliases.map((alias) => normalizeRuleKey(alias)));
  const entries = Object.entries(row);
  for (let index = 0; index < entries.length; index += 1) {
    const [key, value] = entries[index];
    if (aliasSet.has(normalizeRuleKey(key))) {
      return value;
    }
  }
  return undefined;
}

function getSupplierLookupDetails(row) {
  const id = String(getRuleValue(row, ["ID", "SUPPLIER ID", "supplierId"]) || "").trim();
  const code = String(getRuleValue(row, ["CODE", "SUPPLIER CODE", "supplierCode"]) || "").trim();
  const name = String(getRuleValue(row, ["NAME", "SUPPLIER NAME", "supplierName"]) || "").trim();
  const supplier = String(getRuleValue(row, ["SUPPLIER", "supplier", "NAME"]) || "").trim();
  const canonicalSource = supplier || name || code || id;
  return {
    id,
    code,
    name,
    supplier,
    canonical: normalizeUpperTrim(canonicalSource),
  };
}

function normalizeSupplierPricingVendor(value) {
  const normalized = normalizeUpperTrim(value);
  if (!normalized) {
    return "";
  }
  if (normalized.includes("TROJAN")) {
    return "TROJAN";
  }
  if (normalized.includes("CSC")) {
    return "CSC";
  }
  if (normalized.includes("CANO")) {
    return "CANO";
  }
  if (normalized.includes("CUTTING") && normalized.includes("EDGE")) {
    return "CUTTING EDGE";
  }
  if (normalized.includes("CORDECK")) {
    return "CORDECK";
  }
  if (normalized.includes("HOUSTON") && normalized.includes("DECK")) {
    return "HOUSTONBDECK";
  }
  if (normalized === "CSM") {
    return "CSM";
  }
  return normalized;
}

function resolveSupplierForPricing(selectedValue) {
  const selectedRaw = String(selectedValue || "");
  const normalizedSelected = normalizeUpperTrim(selectedRaw);
  const rows = getActiveSupplierRules();
  let matchedRow = null;

  if (normalizedSelected) {
    matchedRow =
      rows.find((row) => {
        const details = getSupplierLookupDetails(row);
        const candidates = [details.id, details.code, details.name, details.supplier]
          .map((item) => normalizeUpperTrim(item))
          .filter(Boolean);
        return candidates.includes(normalizedSelected);
      }) || null;
  }

  const matchedDetails = matchedRow ? getSupplierLookupDetails(matchedRow) : null;
  const canonical = matchedDetails?.canonical || normalizedSelected;
  return {
    selectedRaw,
    normalizedSelected,
    matchedRow,
    pricingSupplier: normalizeSupplierPricingVendor(canonical),
  };
}

function logSupplierPricingDebug(message, payload) {
  if (!import.meta.env.DEV) {
    return;
  }
  console.debug(`[supplier-pricing] ${message}`, payload);
}

function normalizeSupplierRuleRow(row) {
  const supplier = String(getRuleValue(row, ["SUPPLIER", "supplier", "NAME"]) || "")
    .trim()
    .toUpperCase();
  const priority = Number.parseInt(String(getRuleValue(row, ["PRIORITY", "priority"]) ?? ""), 10);
  const deckLocation = String(getRuleValue(row, ["DECK LOCATION", "deckLocation"]) || "")
    .trim()
    .toUpperCase();

  const knownKeys = new Set(
    [
      "SUPPLIER",
      "DECK",
      "DEPTH",
      "JOISTS",
      "AMERICAN STEEL REQUIRED",
      "AMERICAN MANUFACTURING",
      "SDI MANUFACTURING",
      "SDI MANUFACTURER",
      "PRIORITY",
      "JOIST LOCATION",
      "DECK LOCATION",
    ].map((key) => normalizeRuleKey(key)),
  );
  const profileAvailability = {};
  Object.entries(row || {}).forEach(([key, value]) => {
    const normalizedKey = normalizeRuleKey(key);
    if (!normalizedKey || knownKeys.has(normalizedKey)) {
      return;
    }
    const upperValue = String(value || "").trim().toUpperCase();
    if (upperValue === "TRUE" || upperValue === "FALSE") {
      profileAvailability[normalizedKey] = upperValue === "TRUE";
    }
  });

  return {
    supplier,
    deck: parseSupplierBoolean(getRuleValue(row, ["DECK"])),
    joists: parseSupplierBoolean(getRuleValue(row, ["JOISTS"])),
    depths: parseSupplierDepths(getRuleValue(row, ["DEPTH"])),
    americanSteelRequired: parseSupplierBoolean(getRuleValue(row, ["AMERICAN STEEL REQUIRED"])),
    americanManufacturing: parseSupplierBoolean(getRuleValue(row, ["AMERICAN MANUFACTURING"])),
    sdiManufacturing: parseSupplierBoolean(getRuleValue(row, ["SDI MANUFACTURING", "SDI MANUFACTURER"])),
    priority: Number.isFinite(priority) ? priority : Number.MAX_SAFE_INTEGER,
    deckLocation,
    profileAvailability,
  };
}

function getActiveSupplierRules() {
  if (Array.isArray(state.suppliers.rows) && state.suppliers.rows.length > 0) {
    const normalized = state.suppliers.rows
      .map((row) => normalizeSupplierRuleRow(row))
      .filter((row) => row.supplier !== "");
    const hasUsableRows = normalized.some((row) => row.deck && row.depths.length > 0 && row.priority < Number.MAX_SAFE_INTEGER);
    if (hasUsableRows) {
      return state.suppliers.rows;
    }
  }
  return DEFAULT_SUPPLIER_RULE_ROWS;
}

function getDeckManufacturerOptionValue(vendorName) {
  const normalized = normalizeUpperTrim(vendorName);
  if (!normalized) {
    return "";
  }
  const matched = deckSpecOptions.manufacturer.find((option) => normalizeUpperTrim(option) === normalized);
  return matched || vendorName;
}

function getDeckRateForVendor(vendor, tons, adminPricing) {
  if (vendor === "TROJAN") {
    const trojan = adminPricing.trojan || {};
    const perLb =
      parseCurrency(trojan.coilCostPerLb) +
      parseCurrency(trojan.inboundFreightPerLb) +
      parseCurrency(trojan.laborPerLb);
    return perLb > 0 ? perLb * 2000 : 0;
  }
  if (vendor === "CSC") {
    return getBucketPrice({ vendor: "CSC", scope: "DECK", tons, adminPricing }).pricePerTon;
  }
  if (vendor === "CANO") {
    const canoPerLb = parseCurrency(adminPricing.cano?.perLb);
    return canoPerLb > 0 ? canoPerLb * 2000 : 0;
  }
  const baseLocalRate = getDeckRateForVendor("CSC", tons, adminPricing);
  const localFactor = {
    "CUTTING EDGE": 1.0,
    CORDECK: 1.03,
    CSM: 1.05,
    HOUSTONBDECK: 1.08,
  }[vendor] || 1.08;
  return baseLocalRate > 0 ? baseLocalRate * localFactor : 0;
}

function getJoistRateForVendor(vendor, tons, adminPricing) {
  if (vendor === "CSC") {
    return getBucketPrice({ vendor: "CSC", scope: "JOISTS", tons, adminPricing }).pricePerTon;
  }
  if (vendor === "CANO") {
    const canoPerLb = parseCurrency(adminPricing.cano?.perLb);
    return canoPerLb > 0 ? canoPerLb * 2000 : 0;
  }
  return 0;
}

function getShippingPenalty(vendor, context) {
  const stateCode = context.projectStateCode;
  const localStates = new Set(["TX", "OK", "LA", "AR"]);
  if (vendor === "CSC") {
    let penalty = 0;
    if (context.includesJoists && context.hasBrokeredDeck) {
      penalty += 120;
    }
    if (localStates.has(stateCode)) {
      penalty += 80;
    }
    return penalty;
  }
  if (vendor === "CANO") {
    if (["TX", "NM", "AZ", "CA"].includes(stateCode)) {
      return 40;
    }
    return 220;
  }
  if (["CUTTING EDGE", "CORDECK", "CSM", "HOUSTONBDECK"].includes(vendor)) {
    return localStates.has(stateCode) ? -120 : 20;
  }
  return 0;
}

function isTrojanEligibleForLine(line, flags) {
  if (!line) {
    return false;
  }
  if (flags.sdiManufacturer) {
    return false;
  }
  const depth = String(line.specs?.depth || "").trim();
  if (depth !== "1.5" && depth !== "2.0") {
    return false;
  }
  return true;
}

function isVendorAllowedByFlags(vendor, flags) {
  if (vendor === "CANO" && (flags.americanSteelRequired || flags.americanManufacturing)) {
    return false;
  }
  if (vendor === "TROJAN" && flags.sdiManufacturer) {
    return false;
  }
  return true;
}

// Pure vendor strategy engine used by calculator + pricing render.
function selectVendorsForProject(input, adminPricing) {
  const flags = input.deckFlags || {};
  const lines = input.deckLines || [];
  const scope = input.scope || "";
  const includesJoists = scope === "joists-only" || scope === "joist-deck";
  const isDeckOnly = scope === "deck-only";
  const projectStateCode = parseProjectStateCode(input.projectLocation);
  const supplierRules = Array.isArray(input.supplierRules)
    ? input.supplierRules.map(normalizeSupplierRuleRow).filter((row) => row.supplier !== "")
    : [];

  const eligibleJoistVendors = ["CSC", "CANO"].filter((vendor) => isVendorAllowedByFlags(vendor, flags));
  const joistSupplierRules = supplierRules.filter(
    (row) => row.joists && eligibleJoistVendors.includes(row.supplier) && row.priority < Number.MAX_SAFE_INTEGER,
  );

  function rankJoistSupplierRules(rows) {
    return [...rows].sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      const aLocalMatch = a.deckLocation !== "" && a.deckLocation === projectStateCode ? 1 : 0;
      const bLocalMatch = b.deckLocation !== "" && b.deckLocation === projectStateCode ? 1 : 0;
      if (aLocalMatch !== bLocalMatch) {
        return bLocalMatch - aLocalMatch;
      }
      return a.supplier.localeCompare(b.supplier);
    });
  }

  let chosenJoistVendor = includesJoists ? rankJoistSupplierRules(joistSupplierRules)[0]?.supplier || "CSC" : null;

  const deckAssignments = [];
  const localDeckPriority = ["CUTTING EDGE", "CORDECK", "CSM", "HOUSTONBDECK"];

  function getEligibleDeckSuppliersForLine(line) {
    if (!line) {
      return [];
    }
    const depthNumber = Number.parseFloat(String(line.specs?.depth || "").trim());
    if (!Number.isFinite(depthNumber)) {
      return [];
    }
    const profileKey = normalizeRuleKey(String(line.specs?.profile || "").trim());

    // Selection order: specs constraints first, then product/depth availability.
    const specsEligible = supplierRules.filter((row) => {
      if (!row.deck) {
        return false;
      }
      if (flags.americanSteelRequired && !row.americanSteelRequired) {
        return false;
      }
      if (flags.americanManufacturing && !row.americanManufacturing) {
        return false;
      }
      if (flags.sdiManufacturer && !row.sdiManufacturing) {
        return false;
      }
      return true;
    });

    return specsEligible.filter((row) => {
      const depthMatch = row.depths.some((depth) => Math.abs(depth - depthNumber) < 0.0001);
      if (!depthMatch) {
        return false;
      }
      if (!profileKey) {
        return true;
      }
      if (!row.profileAvailability || !Object.prototype.hasOwnProperty.call(row.profileAvailability, profileKey)) {
        return true;
      }
      return Boolean(row.profileAvailability[profileKey]);
    });
  }

  function rankDeckSuppliers(candidates) {
    return [...candidates].sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      const aLocalMatch = a.deckLocation !== "" && a.deckLocation === projectStateCode ? 1 : 0;
      const bLocalMatch = b.deckLocation !== "" && b.deckLocation === projectStateCode ? 1 : 0;
      if (aLocalMatch !== bLocalMatch) {
        return bLocalMatch - aLocalMatch;
      }
      return a.supplier.localeCompare(b.supplier);
    });
  }

  lines.forEach((line, index) => {
    const tons = parsePositiveNumberOrZero(line.rowTons);
    const depthText = String(line?.specs?.depth || "").trim();
    const profileText = String(line?.specs?.profile || "").trim();

    let vendor = null;
    let reason = "";
    const eligibleDeckSuppliers = getEligibleDeckSuppliersForLine(line);
    const specifiedVendor = String(flags.specifiedManufacturerName || "").trim().toUpperCase();

    // Trojan should be selected first for 1.5/2.0 unless blocked by hard constraints.
    if (!vendor) {
      const trojanPreferredDepth = depthText === "1.5" || depthText === "2.0";
      const trojanAllowedBySpecs = !flags.sdiManufacturer;
      if (trojanPreferredDepth && trojanAllowedBySpecs) {
        vendor = "TROJAN";
        reason = "Trojan preferred for 1.5/2.0 depth";
      }
    }

    // Specified manufacturer can override after profile is selected.
    if (!vendor && flags.specifiedManufacturer && specifiedVendor && profileText && eligibleDeckSuppliers.length > 0) {
      const specifiedMatch = eligibleDeckSuppliers.find((row) => row.supplier === specifiedVendor);
      if (specifiedMatch) {
        vendor = specifiedMatch.supplier;
        reason = "Specified manufacturer override";
      }
    }

    if (!vendor && eligibleDeckSuppliers.length > 0) {
      const rankedDeckSuppliers = rankDeckSuppliers(eligibleDeckSuppliers);
      vendor = rankedDeckSuppliers[0].supplier;
      reason = `Supplier rules priority ${rankedDeckSuppliers[0].priority}`;
    }

    if (!vendor) {
      const fallbackVendors = isDeckOnly ? localDeckPriority : [...eligibleJoistVendors, ...localDeckPriority];
      vendor = fallbackVendors[0] || "CSC";
      reason = "Fallback vendor (no supplier rule match)";
    }

    const pricePerTon = getDeckRateForVendor(vendor, tons, adminPricing);
    deckAssignments.push({
      lineId: line.id,
      lineIndex: index,
      profile: line.profileName || line.specs?.profile || "",
      sqs: parsePositiveNumberOrZero(line.rowSqs),
      vendor,
      reason,
      tons,
      pricePerTon,
      extendedTotal: tons * pricePerTon,
    });
  });

  const trojanDeckTons = deckAssignments
    .filter((item) => item.vendor === "TROJAN")
    .reduce((sum, item) => sum + item.tons, 0);
  const brokeredDeckTons = deckAssignments
    .filter((item) => item.vendor !== "TROJAN")
    .reduce((sum, item) => sum + item.tons, 0);

  if (includesJoists) {
    const deckSuppliersUsed = new Set(deckAssignments.map((item) => String(item.vendor || "").trim().toUpperCase()));
    const joistSuppliersUsedOnDeck = joistSupplierRules.filter((row) => deckSuppliersUsed.has(row.supplier));
    if (joistSuppliersUsedOnDeck.length > 0) {
      chosenJoistVendor = rankJoistSupplierRules(joistSuppliersUsedOnDeck)[0].supplier;
    } else if (joistSupplierRules.length > 0) {
      chosenJoistVendor = rankJoistSupplierRules(joistSupplierRules)[0].supplier;
    }
  }

  const grouped = {};
  deckAssignments.filter((item) => item.tons > 0).forEach((item) => {
    if (!grouped[item.vendor]) {
      grouped[item.vendor] = { vendor: item.vendor, tons: 0, pricePerTon: item.pricePerTon, extendedTotal: 0 };
    }
    grouped[item.vendor].tons += item.tons;
    grouped[item.vendor].extendedTotal += item.extendedTotal;
  });

  const trojanDeckSchedule = Object.values(grouped).filter((item) => item.vendor === "TROJAN");
  const brokeredDeckSchedule = Object.values(grouped).filter((item) => item.vendor !== "TROJAN");

  const joistTons = parsePositiveNumberOrZero(input.joistTons);
  const joistPricePerTon = chosenJoistVendor ? getJoistRateForVendor(chosenJoistVendor, joistTons, adminPricing) : 0;
  const joistExtraShippingFee =
    chosenJoistVendor === "CSC" && joistTons > 0 && joistTons <= 9
      ? parseCurrency(adminPricing.csc?.joists?.extraShippingFee_0_9)
      : 0;

  return {
    deckAssignments,
    rollups: { trojanDeckTons, brokeredDeckTons },
    chosenJoistVendor,
    joistPricePerTon,
    joistExtraShippingFee,
    pricingSchedule: {
      trojanDeck: trojanDeckSchedule,
      trojanDeckLines: deckAssignments.filter((item) => item.vendor === "TROJAN"),
      brokeredDeck: brokeredDeckSchedule,
      joists: chosenJoistVendor
        ? {
            vendor: chosenJoistVendor,
            tons: joistTons,
            pricePerTon: joistPricePerTon,
            extraShippingFee: joistExtraShippingFee,
            total: joistTons * joistPricePerTon + joistExtraShippingFee,
          }
        : null,
    },
  };
}

function runVendorStrategyHarness() {
  const adminPricing = {
    trojan: {
      coilCostPerLb: 0.45,
      inboundFreightPerLb: 0.05,
      laborPerLb: 0.12,
    },
    csc: normalizeCscValues(createDefaultCscValues()),
    cano: { perLb: 1.89 },
  };
  const scenarios = [
    {
      name: "SDI blocks Trojan",
      input: {
        scope: "deck-only",
        projectLocation: "Dallas, TX",
        deckFlags: { sdiManufacturer: true, americanSteelRequired: false, americanManufacturing: false },
        deckLines: [{ id: 1, specs: { depth: "1.5", profile: "NIA-24" }, rowTons: 12 }],
        joistTons: 0,
      },
    },
    {
      name: "Depth 3.0 blocks Trojan",
      input: {
        scope: "deck-only",
        projectLocation: "Austin, TX",
        deckFlags: { sdiManufacturer: false, americanSteelRequired: false, americanManufacturing: false },
        deckLines: [{ id: 2, specs: { depth: "3.0", profile: "NP-32" }, rowTons: 8 }],
        joistTons: 0,
      },
    },
  ];
  return scenarios.map((scenario) => ({
    name: scenario.name,
    result: selectVendorsForProject(scenario.input, adminPricing),
  }));
}

function setPoundsVisibility() {
  // Joist page now uses line-item accordion inputs only.
}

function createBlankInputs() {
  return {
    sqs: "",
    sqft: "",
    lf: "",
    lfWidthIn: "",
    pcs: "",
    cutWidthIn: "",
    lengthFt: "",
    inches: "",
  };
}

function createDefaultDeckProfile() {
  return {
    id: nextDeckProfileId++,
    specs: {
      depth: "",
      manufacturer: "",
      profile: "",
      gage: "",
      finish: "",
      paintTop: "",
      paintBottom: "",
      grade: "",
    },
    manufacturerExplicit: false,
    method: "SQS",
    inputs: createBlankInputs(),
    overrideTons: "",
    rowSqFt: 0,
    rowSqs: 0,
    rowTons: 0,
    tonsFromOverride: false,
    requiresOverride: false,
    showOverride: true,
    showWeightWarning: false,
    missingLookupMessage: "",
    lastWarnSignature: "",
    weightStatus: "INCOMPLETE",
    isCollapsed: false,
  };
}

function createDefaultAccessory() {
  return {
    id: nextAccessoryId++,
    type: "",
    screwCount: null,
    tons: null,
    isCollapsed: false,
  };
}

function applyCommonDeckProfilePreset(profile) {
  if (!profile) {
    return;
  }
  profile.specs.depth = "1.5";
  profile.specs.profile = "B";
  profile.specs.gage = "20";
  profile.specs.finish = "G60";
  profile.specs.grade = "50";
  profile.specs.manufacturer = "";
  profile.manufacturerExplicit = false;
  autoPopulateDeckWidthForProfile(profile);
}

function createDefaultJoistItem() {
  return {
    id: nextJoistItemId++,
    series: "",
    units: "",
    tons: "",
    isCollapsed: false,
  };
}

function createDefaultTakeoffDeckLine() {
  return {
    id: nextTakeoffItemId++,
    specs: {
      depth: "",
      profile: "",
      gage: "",
      finish: "",
      grade: "",
      paintTop: "",
      paintBottom: "",
    },
    squares: "",
    isCollapsed: false,
  };
}

function createDefaultTakeoffArea() {
  const number = parsePositiveNumberOrZero(state.takeoff.nextAreaNumber) || 1;
  state.takeoff.nextAreaNumber = number + 1;
  return {
    id: nextTakeoffAreaId++,
    name: `TO AREA #${number}`,
    isCollapsed: false,
    deckSectionCollapsed: false,
    joistSectionCollapsed: false,
    deckLines: [],
    joistGroups: [],
    quickLineId: null,
  };
}

function createDefaultTakeoffJoistMark() {
  return {
    id: nextTakeoffItemId++,
    mark: "",
    qty: "",
    type: "",
    designation: "",
    uplift: "",
    oaLengthFt: "",
    oaLengthIn: "",
  };
}

function createDefaultTakeoffJoistGroup() {
  return {
    id: nextTakeoffItemId++,
    isCollapsed: false,
    marks: [],
  };
}

function findTakeoffAreaById(areaId) {
  return state.takeoff.areas.find((area) => Number(area.id) === Number(areaId));
}

function renumberTakeoffAreas() {
  if (!Array.isArray(state.takeoff.areas)) {
    state.takeoff.areas = [];
  }
  state.takeoff.areas.forEach((area, index) => {
    area.name = `TOA${index + 1}`;
  });
  state.takeoff.nextAreaNumber = state.takeoff.areas.length + 1;
}

function collapseTakeoffAreasExcept(areaId) {
  state.takeoff.areas.forEach((area) => {
    area.isCollapsed = Number(area.id) !== Number(areaId);
  });
}

function getTakeoffDeckWeightInfo(line) {
  const concatKey = canonicalKey(line?.specs?.depth, line?.specs?.profile, line?.specs?.gage);
  const finishKey = String(line?.specs?.finish || "").trim().toUpperCase();
  const lbsPerSquare = Number(weightsLookup?.[concatKey]?.[finishKey] || 0);
  const squares = parsePositiveNumberOrZero(line?.squares);
  const tons = lbsPerSquare > 0 ? (squares * lbsPerSquare) / 2000 : 0;
  return { lbsPerSquare, tons };
}

function applyTakeoffQuickPreset(line, presetKey) {
  if (!line || !line.specs) {
    return;
  }
  const normalized = String(presetKey || "").trim().toUpperCase();
  if (normalized === "1.5B20G60GR50") {
    line.specs.depth = "1.5";
    line.specs.profile = "B";
    line.specs.gage = "20";
    line.specs.finish = "G60";
    line.specs.grade = "50";
    return;
  }
  if (normalized === "1.5B22G60GR50") {
    line.specs.depth = "1.5";
    line.specs.profile = "B";
    line.specs.gage = "22";
    line.specs.finish = "G60";
    line.specs.grade = "50";
    return;
  }
  if (normalized === "2.0VLI20G60GR50") {
    line.specs.depth = "2.0";
    line.specs.profile = "VLI";
    line.specs.gage = "20";
    line.specs.finish = "G60";
    line.specs.grade = "50";
  }
}

function buildTakeoffDeckRowMarkup(area, line, showQuickPresets) {
  const weightInfo = getTakeoffDeckWeightInfo(line);
  const label = [line.specs.depth, line.specs.profile, line.specs.gage, line.specs.finish, line.specs.grade]
    .filter((part) => String(part || "").trim() !== "")
    .join(" ");
  const summaryName = label || "DECK PROFILE";
  return `
    <div class="takeoff-deck-accordion" data-takeoff-area-id="${area.id}" data-takeoff-line-id="${line.id}">
      <div class="takeoff-deck-header" data-action="toggle-takeoff-deck-line" role="button" tabindex="0" aria-expanded="${!line.isCollapsed}">
        <span class="deck-summary-toggle" aria-hidden="true">${line.isCollapsed ? "+" : "−"}</span>
        <span class="deck-summary-name">${escapeHtml(summaryName)}</span>
        <span class="deck-summary-divider" aria-hidden="true">|</span>
        <span class="deck-summary-sqs">SQS: ${formatTwoDecimals(parsePositiveNumberOrZero(line.squares))}</span>
        <span class="deck-summary-divider" aria-hidden="true">|</span>
        <span class="deck-summary-tons">TONS: ${formatTwoDecimals(weightInfo.tons)}</span>
      </div>
      ${
        line.isCollapsed
          ? ""
          : `<div class="takeoff-deck-row">
        ${
          showQuickPresets
            ? `<div class="takeoff-deck-row-presets">
          <button type="button" class="takeoff-quick-btn" data-action="takeoff-quick-profile" data-preset="1.5B20G60Gr50">1.5B20G60Gr50</button>
          <button type="button" class="takeoff-quick-btn" data-action="takeoff-quick-profile" data-preset="1.5B22G60Gr50">1.5B22G60Gr50</button>
          <button type="button" class="takeoff-quick-btn" data-action="takeoff-quick-profile" data-preset="2.0VLI20G60Gr50">2.0VLI20G60Gr50</button>
        </div>`
            : ""
        }
        <div class="takeoff-deck-specs-grid">
          <div class="field-group"><label>Depth</label><select data-takeoff-field="depth">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.depth], line.specs.depth)}</select></div>
          <div class="field-group"><label>Profile</label><select data-takeoff-field="profile">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.profile], line.specs.profile)}</select></div>
          <div class="field-group"><label>Gage</label><select data-takeoff-field="gage">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.gage], line.specs.gage)}</select></div>
          <div class="field-group"><label>Finish</label><select data-takeoff-field="finish">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.finish], line.specs.finish)}</select></div>
          <div class="field-group"><label>Grade</label><select data-takeoff-field="grade">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.grade], line.specs.grade)}</select></div>
          <div class="field-group"><label>Paint Top</label><select data-takeoff-field="paintTop">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.paintTop], line.specs.paintTop)}</select></div>
          <div class="field-group"><label>Paint Bottom</label><select data-takeoff-field="paintBottom">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.paintBottom], line.specs.paintBottom)}</select></div>
          <div class="field-group"><label>SQS</label><input data-takeoff-field="squares" type="number" min="0" step="0.01" value="${escapeHtml(line.squares)}" /></div>
          <div class="field-group"><label>Tons</label><input type="text" readonly value="${formatTwoDecimals(weightInfo.tons)}" /></div>
          <button type="button" class="takeoff-remove-btn" data-action="takeoff-remove-deck-line" aria-label="Remove deck line">&times;</button>
        </div>
      </div>
      `}
    </div>
  `;
}

function buildTakeoffJoistRowMarkup(area, group, line) {
  return `
    <div class="takeoff-joist-row" data-takeoff-area-id="${area.id}" data-takeoff-group-id="${group.id}" data-takeoff-line-id="${line.id}" data-takeoff-kind="joist">
      <div class="field-group"><label>Mark</label><input data-takeoff-field="mark" type="text" value="${escapeHtml(line.mark)}" /></div>
      <div class="field-group"><label>Qty</label><input data-takeoff-field="qty" type="number" min="0" step="1" value="${escapeHtml(line.qty)}" /></div>
      <div class="field-group"><label>Type</label><select data-takeoff-field="type">${buildSelectOptions([{ value: "", label: "" }, ...JOIST_SERIES_OPTIONS], line.type)}</select></div>
      <div class="field-group"><label>Designation</label><input data-takeoff-field="designation" type="text" value="${escapeHtml(line.designation)}" /></div>
      <div class="field-group"><label>Uplift</label><input data-takeoff-field="uplift" type="text" value="${escapeHtml(line.uplift)}" /></div>
      <div class="field-group"><label>OA Length Ft</label><input data-takeoff-field="oaLengthFt" type="number" min="0" step="1" value="${escapeHtml(line.oaLengthFt)}" /></div>
      <div class="field-group"><label>OA Length In</label><input data-takeoff-field="oaLengthIn" type="number" min="0" step="1" value="${escapeHtml(line.oaLengthIn)}" /></div>
      <button type="button" class="takeoff-remove-btn" data-action="takeoff-remove-joist-line" aria-label="Remove joist line">&times;</button>
    </div>
  `;
}

function renderTakeoffPage() {
  if (!pageTakeoff || !takeoffAreasList) {
    return;
  }
  renumberTakeoffAreas();
  if (!Array.isArray(state.takeoff.areas) || state.takeoff.areas.length === 0) {
    takeoffAreasList.innerHTML = '<p class="takeoff-empty">No takeoff areas yet.</p>';
    if (takeoffDoneButton) {
      takeoffDoneButton.classList.add("hidden");
    }
    return;
  }
  takeoffAreasList.innerHTML = state.takeoff.areas
    .map((area, areaIndex) => {
      const summaryTons = area.deckLines.reduce((sum, line) => sum + getTakeoffDeckWeightInfo(line).tons, 0);
      const isCollapsed = Boolean(area.isCollapsed);
      const toaLabel = `TOA${areaIndex + 1}`;
      const deckSectionCollapsed = Boolean(area.deckSectionCollapsed);
      const joistSectionCollapsed = Boolean(area.joistSectionCollapsed);
      return `
        <section class="takeoff-area-accordion" data-takeoff-area-id="${area.id}">
          <div class="takeoff-area-header" data-action="toggle-takeoff-area" role="button" tabindex="0" aria-expanded="${!isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${isCollapsed ? "+" : "−"}</span>
            <span class="deck-summary-name">${escapeHtml(toaLabel)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-tons">TONS: ${formatTwoDecimals(summaryTons)}</span>
            <button type="button" class="takeoff-area-remove-btn" data-action="takeoff-remove-area" aria-label="Remove ${escapeHtml(toaLabel)}">&times;</button>
          </div>
          ${
            isCollapsed
              ? ""
              : `<div class="takeoff-area-content">
                <div class="takeoff-subsection" data-takeoff-area-id="${area.id}" data-takeoff-subsection="deck">
                  <div class="takeoff-subsection-header" data-action="toggle-takeoff-deck-section" role="button" tabindex="0" aria-expanded="${!deckSectionCollapsed}">
                    <span class="deck-summary-toggle" aria-hidden="true">${deckSectionCollapsed ? "+" : "−"}</span>
                    <span class="deck-summary-name">DECK ${escapeHtml(toaLabel)}</span>
                  </div>
                  ${
                    deckSectionCollapsed
                      ? ""
                      : `<div class="takeoff-subsection-content">
                        <div class="takeoff-deck-list">
                          ${
                            area.deckLines.length > 0
                              ? area.deckLines
                                  .map((line, index) => {
                                    const fallbackQuickId = area.deckLines[area.deckLines.length - 1]?.id;
                                    const activeQuickId = Number(area.quickLineId) || Number(fallbackQuickId);
                                    return buildTakeoffDeckRowMarkup(area, line, Number(line.id) === Number(activeQuickId) || (index === area.deckLines.length - 1 && !area.quickLineId));
                                  })
                                  .join("")
                              : ""
                          }
                        </div>
                        <div class="takeoff-actions-row takeoff-line-actions">
                          <button type="button" class="btn-secondary" data-action="takeoff-add-deck">+ ADD DECK</button>
                        </div>
                      </div>`
                  }
                </div>
                <div class="takeoff-subsection" data-takeoff-area-id="${area.id}" data-takeoff-subsection="joist">
                  <div class="takeoff-subsection-header" data-action="toggle-takeoff-joist-section" role="button" tabindex="0" aria-expanded="${!joistSectionCollapsed}">
                    <span class="deck-summary-toggle" aria-hidden="true">${joistSectionCollapsed ? "+" : "−"}</span>
                    <span class="deck-summary-name">JOIST ${escapeHtml(toaLabel)}</span>
                  </div>
                  ${
                    joistSectionCollapsed
                      ? ""
                      : `<div class="takeoff-subsection-content">
                        <div class="takeoff-joist-list">
                          ${
                            Array.isArray(area.joistGroups) && area.joistGroups.length > 0
                              ? area.joistGroups
                                  .map((group, index) => {
                                    const marks = Array.isArray(group.marks) ? group.marks : [];
                                    return `
                                      <div class="takeoff-joist-group" data-takeoff-area-id="${area.id}" data-takeoff-group-id="${group.id}">
                                        <div class="takeoff-joist-group-header" data-action="toggle-takeoff-joist-group" role="button" tabindex="0" aria-expanded="${!group.isCollapsed}">
                                          <span class="deck-summary-toggle" aria-hidden="true">${group.isCollapsed ? "+" : "−"}</span>
                                          <span class="deck-summary-name">MARK ${index + 1}</span>
                                          <button type="button" class="takeoff-mark-remove-btn" data-action="takeoff-remove-mark" aria-label="Remove MARK ${index + 1}">&times;</button>
                                        </div>
                                        ${
                                          group.isCollapsed
                                            ? ""
                                            : `<div class="takeoff-joist-group-content">
                                              <div class="takeoff-joist-marks-list">
                                                ${marks.length > 0 ? marks.map((line) => buildTakeoffJoistRowMarkup(area, group, line)).join("") : ""}
                                              </div>
                                            </div>`
                                        }
                                      </div>
                                    `;
                                  })
                                  .join("")
                              : ""
                          }
                        </div>
                        <div class="takeoff-actions-row takeoff-line-actions">
                          <button type="button" class="btn-secondary" data-action="takeoff-add-mark">+ ADD MARK</button>
                        </div>
                      </div>`
                  }
                </div>
              </div>`
          }
        </section>
      `;
    })
    .join("");
  const hasSelectedProfile = state.takeoff.areas.some((area) =>
    (area.deckLines || []).some((line) => String(line?.specs?.profile || "").trim() !== ""),
  );
  if (takeoffDoneButton) {
    takeoffDoneButton.classList.toggle("hidden", !hasSelectedProfile);
  }
}

function isBridgingSeries(series) {
  return String(series || "").trim().toUpperCase() === "BRIDGING";
}

function findJoistItemById(id) {
  return state.joistItems.find((item) => item.id === id);
}

function collapseAllJoistsExcept(joistId) {
  state.joistItems.forEach((item) => {
    item.isCollapsed = item.id !== joistId;
  });
}

function toggleJoistExpansion(joistId) {
  const selected = findJoistItemById(joistId);
  if (!selected) {
    return;
  }
  const shouldCollapseSelected = !selected.isCollapsed;
  state.joistItems.forEach((item) => {
    item.isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    selected.isCollapsed = false;
  }
}

function syncJoistTotalsFromItems() {
  const totalTons = state.joistItems.reduce((sum, item) => sum + parsePositiveNumberOrZero(item.tons), 0);
  state.joists.tons = totalTons > 0 ? totalTons.toFixed(2) : "";
}

function renderJoistItems() {
  if (!joistItemsList) {
    return;
  }
  if (state.joistItems.length === 0) {
    joistItemsList.innerHTML = '<p class="help-text">No joists added.</p>';
    return;
  }

  const markup = state.joistItems
    .map((item, index) => {
      const toggleSymbol = item.isCollapsed ? "+" : "−";
      const displaySeries = item.series || `Joist #${index + 1}`;
      const unitsText = isBridgingSeries(item.series)
        ? ""
        : `<span class="deck-summary-divider" aria-hidden="true">|</span><span class="deck-summary-sqs">UNITS: ${formatWholeNumber(
            parsePositiveNumberOrZero(item.units),
          )}</span>`;
      const detailsMarkup = item.isCollapsed
        ? ""
        : `
        <div class="deck-row-content">
          <div class="deck-row-top">
            <p class="deck-row-title">Joist ${index + 1}</p>
            <button type="button" class="btn-remove-row btn-remove-joist" aria-label="Remove joist ${index + 1}">Remove</button>
          </div>
          <div class="joist-row-grid">
            <div class="field-group">
              <label>Series</label>
              <select data-group="joist" data-field="series">
                ${buildSelectOptions([{ value: "", label: "" }, ...JOIST_SERIES_OPTIONS], item.series)}
              </select>
            </div>
            ${
              item.series === "" || isBridgingSeries(item.series)
                ? ""
                : `<div class="field-group">
              <label>Units</label>
              <input type="number" min="0" step="1" inputmode="numeric" data-group="joist" data-field="units" value="${item.units}" />
            </div>`
            }
            ${
              item.series === ""
                ? ""
                : `<div class="field-group">
              <label>Tons</label>
              <input type="number" min="0" step="0.01" inputmode="decimal" data-group="joist" data-field="tons" value="${item.tons}" />
            </div>`
            }
          </div>
        </div>
      `;

      return `
      <div class="deck-row" data-joist-id="${item.id}">
        <div class="deck-summary-row" data-joist-summary-id="${item.id}" role="button" tabindex="0" aria-expanded="${!item.isCollapsed}">
          <span class="deck-summary-toggle" aria-hidden="true">${toggleSymbol}</span>
          <span class="deck-summary-name">${escapeHtml(displaySeries)}</span>
          ${unitsText}
          <span class="deck-summary-divider" aria-hidden="true">|</span>
          <span class="deck-summary-tons">TONS: ${formatTwoDecimals(parsePositiveNumberOrZero(item.tons))}</span>
        </div>
        ${detailsMarkup}
      </div>
    `;
    })
    .join("");

  joistItemsList.innerHTML = markup;
}

function renderJoistReviewSummary() {
  if (!joistReviewSummary) {
    return;
  }
  if (!state.joistReviewMode || state.joistItems.length === 0) {
    joistReviewSummary.classList.add("hidden");
    joistReviewSummary.innerHTML = "";
    return;
  }
  joistReviewSummary.classList.remove("hidden");
  joistReviewSummary.innerHTML = `
    <div class="pricing-line-item">
      <div class="pricing-line-item-main">
        <span>TOTAL JOIST TONS</span>
        <strong>${formatTwoDecimals(parsePositiveNumberOrZero(state.joists.tons))}</strong>
      </div>
    </div>
  `;
}

function updateJoistReviewUI() {
  if (!addJoistButton || !joistReviewButton) {
    return;
  }
  const hasItems = state.joistItems.length > 0;
  addJoistButton.classList.toggle("hidden", state.joistReviewMode);
  joistReviewButton.classList.toggle("hidden", !hasItems);
  joistReviewButton.textContent = state.joistReviewMode ? "EDIT" : "REVIEW";
  renderJoistReviewSummary();
}

function isTekAccessoryType(type) {
  return type === "#10TEKSCREWS" || type === "#12TEKSCREWS";
}

function isCcAccessoryType(type) {
  return type === "CC1" || type === "CC2" || type === "CC3";
}

function syncManufacturerForDepth(profile) {
  if (profile.manufacturerExplicit) {
    return;
  }

  const isTrojanDepth = profile.specs.depth === "1.5" || profile.specs.depth === "2.0";
  if (isTrojanDepth && profile.specs.manufacturer === "") {
    profile.specs.manufacturer = "Trojan";
    return;
  }

  if (!isTrojanDepth && profile.specs.manufacturer === "Trojan") {
    profile.specs.manufacturer = "";
  }
}

function isRequiredDeckFieldMissing(profile, field) {
  if (!REQUIRED_DECK_FIELDS.includes(field)) {
    return false;
  }
  return (profile.specs[field] || "") === "";
}

function hasIncompleteDeckProfiles() {
  return state.deckProfiles.some((profile) =>
    REQUIRED_DECK_FIELDS.some((field) => (profile.specs[field] || "") === ""),
  );
}

function autoPopulateDeckWidthForProfile(profile) {
  if (!profile) {
    return;
  }

  const methodNormalized = String(profile.method || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
  if (methodNormalized !== "lf" && methodNormalized !== "cutlist") {
    return;
  }

  const profileText = String(profile.specs.profile || "").trim().toUpperCase();
  const has24 = profileText.includes("-24") || profileText.endsWith("24") || profileText.includes(" 24");
  const has32 = profileText.includes("-32") || profileText.endsWith("32") || profileText.includes(" 32");

  let width = null;
  if (has24) {
    width = "24";
  } else if (has32) {
    width = "32";
  }

  if (!width) {
    return;
  }

  if (methodNormalized === "lf") {
    profile.inputs.lfWidthIn = width;
    return;
  }
  profile.inputs.cutWidthIn = width;
}

function createDuplicatedDeckProfile(lastProfile) {
  if (!lastProfile) {
    return createDefaultDeckProfile();
  }

  const profile = createDefaultDeckProfile();
  profile.specs.depth = lastProfile.specs.depth;
  profile.specs.profile = lastProfile.specs.profile;
  profile.specs.gage = lastProfile.specs.gage;
  profile.specs.finish = lastProfile.specs.finish;
  profile.specs.paintTop = lastProfile.specs.paintTop;
  profile.specs.paintBottom = lastProfile.specs.paintBottom;
  profile.specs.grade = lastProfile.specs.grade;

  if (lastProfile.specs.manufacturer !== "") {
    profile.specs.manufacturer = lastProfile.specs.manufacturer;
    profile.manufacturerExplicit = Boolean(lastProfile.manufacturerExplicit);
  }

  syncManufacturerForDepth(profile);
  return profile;
}

function collapseAllExcept(profileId) {
  state.deckProfiles.forEach((profile) => {
    profile.isCollapsed = profile.id !== profileId;
  });
}

function collapseAllAccessoriesExcept(accessoryId) {
  state.accessories.forEach((accessory) => {
    accessory.isCollapsed = accessory.id !== accessoryId;
  });
}

function toggleDeckProfileExpansion(profileId) {
  const selected = findDeckProfileById(profileId);
  if (!selected) {
    return;
  }
  const shouldCollapseSelected = !selected.isCollapsed;
  state.deckProfiles.forEach((profile) => {
    profile.isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    selected.isCollapsed = false;
  }
}

function findAccessoryById(id) {
  return state.accessories.find((accessory) => accessory.id === id);
}

function toggleAccessoryExpansion(accessoryId) {
  const selected = findAccessoryById(accessoryId);
  if (!selected) {
    return;
  }
  const shouldCollapseSelected = !selected.isCollapsed;
  state.accessories.forEach((accessory) => {
    accessory.isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    selected.isCollapsed = false;
  }
}

function toggleAdminSectionExpansion(sectionKey) {
  const section = state.admin.sections[sectionKey];
  if (!section) {
    return;
  }
  const shouldCollapseSelected = !section.isCollapsed;
  Object.keys(state.admin.sections).forEach((key) => {
    state.admin.sections[key].isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    section.isCollapsed = false;
  }
}

function toggleCscSubsectionExpansion(subsectionKey) {
  const cscSection = state.admin.sections.csc;
  const subsection = cscSection?.subsections?.[subsectionKey];
  if (!subsection) {
    return;
  }
  const shouldCollapseSelected = !subsection.isCollapsed;
  Object.keys(cscSection.subsections).forEach((key) => {
    cscSection.subsections[key].isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    subsection.isCollapsed = false;
  }
}

function toggleTrojanSubsectionExpansion(subsectionKey) {
  const trojanSection = state.admin.sections.trojan;
  const subsection = trojanSection?.subsections?.[subsectionKey];
  if (!subsection) {
    return;
  }
  const shouldCollapseSelected = !subsection.isCollapsed;
  Object.keys(trojanSection.subsections).forEach((key) => {
    trojanSection.subsections[key].isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    subsection.isCollapsed = false;
  }
}

function toggleCanoSubsectionExpansion(subsectionKey) {
  const canoSection = state.admin.sections.cano;
  const subsection = canoSection?.subsections?.[subsectionKey];
  if (!subsection) {
    return;
  }
  const shouldCollapseSelected = !subsection.isCollapsed;
  Object.keys(canoSection.subsections).forEach((key) => {
    canoSection.subsections[key].isCollapsed = true;
  });
  if (!shouldCollapseSelected) {
    subsection.isCollapsed = false;
  }
}

function isTrojanAnySubsectionEditing() {
  const subsections = state.admin.sections.trojan?.subsections || {};
  return Object.values(subsections).some((subsection) => Boolean(subsection?.isEditing));
}

function isCscAnySubsectionEditing() {
  const subsections = state.admin.sections.csc?.subsections || {};
  return Object.values(subsections).some((subsection) => Boolean(subsection?.isEditing));
}

function isCanoAnySubsectionEditing() {
  const subsections = state.admin.sections.cano?.subsections || {};
  return Object.values(subsections).some((subsection) => Boolean(subsection?.isEditing));
}

function buildDeckProfileName(profile) {
  const spec = profile.specs;
  const head = `${spec.depth}${spec.profile}${spec.gage}${spec.finish}`.trim();
  const parts = [];

  if (head !== "") {
    parts.push(head);
  }

  if (spec.paintTop !== "" || spec.paintBottom !== "") {
    const top = spec.paintTop === "" ? "-" : spec.paintTop;
    const bottom = spec.paintBottom === "" ? "-" : spec.paintBottom;
    parts.push(`${top}/${bottom}`);
  }

  if (spec.grade !== "") {
    parts.push(`Gr${spec.grade}`);
  }

  return parts.length === 0 ? "New Profile" : parts.join(" ");
}

function finalizeOverrideVisibility(profile) {
  if (profile.rowTons > 0 && !profile.tonsFromOverride) {
    profile.requiresOverride = false;
    profile.showOverride = false;
  }
}

function buildDeckReviewSupplierSummary() {
  const grouped = new Map();
  state.deckProfiles.forEach((profile) => {
    const supplier = String(profile?.specs?.manufacturer || "").trim() || "—";
    const current = grouped.get(supplier) || { supplier, sqs: 0, tons: 0 };
    current.sqs += parsePositiveNumberOrZero(profile.rowSqs);
    current.tons += parsePositiveNumberOrZero(profile.rowTons);
    grouped.set(supplier, current);
  });
  return Array.from(grouped.values());
}

function computeDeckRow(profile) {
  const inputs = profile.inputs;
  const hasQuantityInput = Object.values(inputs).some((value) => parsePositiveNumberOrZero(value) > 0);
  let rowSqFt = 0;
  let rowSqs = 0;
  profile.tonsFromOverride = false;

  if (profile.method === "SQS") {
    rowSqs = parsePositiveNumberOrZero(inputs.sqs);
    rowSqFt = rowSqs * 100;
  } else if (profile.method === "SqFt") {
    rowSqFt = parsePositiveNumberOrZero(inputs.sqft);
    rowSqs = rowSqFt / 100;
  } else if (profile.method === "LF") {
    const lf = parsePositiveNumberOrZero(inputs.lf);
    const widthIn = parsePositiveNumberOrZero(inputs.lfWidthIn);
    rowSqFt = lf * (widthIn / 12);
    rowSqs = rowSqFt / 100;
  } else if (profile.method === "Cut List") {
    const pcs = parsePositiveNumberOrZero(inputs.pcs);
    const widthIn = parsePositiveNumberOrZero(inputs.cutWidthIn);
    const lengthFt = parsePositiveNumberOrZero(inputs.lengthFt);
    const inches = parsePositiveNumberOrZero(inputs.inches);

    const totalLengthFt = lengthFt + inches / 12;
    rowSqFt = pcs * (widthIn / 12) * totalLengthFt;
    rowSqs = rowSqFt / 100;
  }

  profile.rowSqFt = rowSqFt;
  profile.rowSqs = rowSqs;

  const previousWeightStatus = profile.weightStatus || "INCOMPLETE";

  const hasMissingLookupFields = WEIGHT_LOOKUP_FIELDS.some((field) => (profile.specs[field] || "") === "");
  if (hasMissingLookupFields) {
    profile.weightStatus = "INCOMPLETE";
    profile.requiresOverride = false;
    profile.showOverride = false;
    profile.showWeightWarning = false;
    profile.missingLookupMessage = "";
    profile.rowTons = 0;
    finalizeOverrideVisibility(profile);
    return;
  }

  const concatKey = canonicalKey(profile.specs.depth, profile.specs.profile, profile.specs.gage);
  const finishKey = String(profile.specs.finish || "").toUpperCase();
  const isLookupReady = concatKey !== "" && finishKey !== "";
  const lbsPerSquare = isLookupReady ? weightsLookup[concatKey]?.[finishKey] : undefined;
  const hasLookup = Number.isFinite(Number(lbsPerSquare)) && Number(lbsPerSquare) > 0;

  if (hasLookup) {
    profile.weightStatus = "FOUND";
    if (previousWeightStatus !== "FOUND") {
      profile.overrideTons = "";
    }
    profile.showWeightWarning = false;
    profile.missingLookupMessage = "";
    profile.lastWarnSignature = "";
    const calculatedRowTons = (rowSqs * Number(lbsPerSquare)) / 2000;
    const overrideTons = parsePositiveNumberOrZero(profile.overrideTons);
    if (hasQuantityInput && calculatedRowTons <= 0) {
      profile.requiresOverride = true;
      profile.showOverride = true;
      profile.rowTons = overrideTons > 0 ? overrideTons : 0;
      profile.tonsFromOverride = overrideTons > 0;
      finalizeOverrideVisibility(profile);
      return;
    }
    profile.requiresOverride = false;
    profile.showOverride = false;
    profile.rowTons = calculatedRowTons;
    finalizeOverrideVisibility(profile);
    return;
  }

  profile.weightStatus = "NOT_FOUND";
  profile.requiresOverride = hasQuantityInput;
  profile.showOverride = hasQuantityInput;
  profile.showWeightWarning = false;
  profile.missingLookupMessage = `MISSING KEY: ${concatKey} / ${finishKey}`;
  const warnSignature = `${concatKey}|${finishKey}`;
  if (profile.lastWarnSignature !== warnSignature) {
    // eslint-disable-next-line no-console
    console.warn(`MISSING KEY: ${concatKey} / ${finishKey}`);
    profile.lastWarnSignature = warnSignature;
  }

  const overrideTons = parsePositiveNumberOrZero(profile.overrideTons);
  if (hasQuantityInput && overrideTons > 0) {
    profile.rowTons = overrideTons;
    profile.tonsFromOverride = true;
    finalizeOverrideVisibility(profile);
    return;
  }

  profile.rowTons = 0;
  profile.showWeightWarning = hasQuantityInput;
  finalizeOverrideVisibility(profile);
}

function computeDeckTotals() {
  let totalSqs = 0;
  let totalTons = 0;

  state.deckProfiles.forEach((profile) => {
    computeDeckRow(profile);
    totalSqs += profile.rowSqs;
    totalTons += profile.rowTons;
  });

  return { totalSqs, totalTons };
}

function buildSelectOptions(options, selectedValue) {
  return options
    .map((option) => {
      const value = typeof option === "string" ? option : option.value;
      const label = typeof option === "string" ? option : option.label;
      const selected = value === selectedValue ? "selected" : "";
      return `<option value="${value}" ${selected}>${label}</option>`;
    })
    .join("");
}

function renderMethodInputs(profile) {
  if (profile.method === "SQS") {
    return `
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>SQS</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="sqs" value="${profile.inputs.sqs}" />
        </div>
      </div>
    `;
  }

  if (profile.method === "SqFt") {
    return `
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>SqFt</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="sqft" value="${profile.inputs.sqft}" />
        </div>
      </div>
    `;
  }

  if (profile.method === "LF") {
    return `
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>LF</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="lf" value="${profile.inputs.lf}" />
        </div>
        <div class="field-group">
          <label>Width (in)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="lfWidthIn" value="${profile.inputs.lfWidthIn}" />
        </div>
      </div>
    `;
  }

  if (profile.method === "Cut List") {
    return `
      <div class="deck-row-inputs-grid">
        <div class="field-group">
          <label>PCS</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="pcs" value="${profile.inputs.pcs}" />
        </div>
        <div class="field-group">
          <label>WIDTH (in)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="cutWidthIn" value="${profile.inputs.cutWidthIn}" />
        </div>
        <div class="field-group">
          <label>LENGTH (ft)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="lengthFt" value="${profile.inputs.lengthFt}" />
        </div>
        <div class="field-group">
          <label>INCHES (in)</label>
          <input type="number" min="0" step="any" inputmode="decimal" data-group="inputs" data-field="inches" value="${profile.inputs.inches}" />
        </div>
      </div>
    `;
  }

  return "";
}

function renderDeckProfiles() {
  const selectedSpecFlags = state.deckFlagSelectionOrder.filter((key) => state.deckFlags[key]);
  const specsToggle = state.deckSpecsCollapsed ? "+" : "−";
  const specsContent = state.deckSpecsCollapsed
    ? ""
    : `
      <div class="deck-row-content">
        <fieldset class="deck-flags-fieldset">
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="americanSteelRequired" ${state.deckFlags.americanSteelRequired ? "checked" : ""} />
            AMERICAN STEEL REQUIRED
          </label>
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="americanManufacturing" ${state.deckFlags.americanManufacturing ? "checked" : ""} />
            AMERICAN MANUFACTURING
          </label>
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="sdiManufacturer" ${state.deckFlags.sdiManufacturer ? "checked" : ""} />
            SDI MANUFACTURER
          </label>
          <label class="scope-option">
            <input type="checkbox" data-group="deck-flags" data-field="specifiedManufacturer" ${state.deckFlags.specifiedManufacturer ? "checked" : ""} />
            SPECIFIED MANUFACTURER
          </label>
          ${
            state.deckFlags.specifiedManufacturer
              ? `<div class="field-group">
            <label>Specified Manufacturer Name</label>
            <select data-group="deck-flags" data-field="specifiedManufacturerName">
              ${buildSelectOptions(
                [
                  { value: "", label: "" },
                  "TROJAN",
                  "CANO",
                  "CSC",
                  "CUTTING EDGE",
                  "CORDECK",
                  "CSM",
                  "HOUSTONBDECK",
                ],
                state.deckFlags.specifiedManufacturerName,
              )}
            </select>
          </div>`
              : ""
          }
        </fieldset>
      </div>
    `;
  const specsMarkup = `
    <div class="deck-row deck-specs-row">
      <div class="deck-summary-row deck-specs-summary-row" data-action="toggle-specs" role="button" tabindex="0" aria-expanded="${!state.deckSpecsCollapsed}">
        <span class="deck-summary-toggle" aria-hidden="true">${specsToggle}</span>
        <span class="deck-summary-name">SPECS</span>
        ${
          selectedSpecFlags.length > 0
            ? `<span class="deck-summary-specs-list">${selectedSpecFlags
                .map((key) => `<span class="deck-summary-specs-item">${DECK_FLAG_LABELS[key] || key}</span>`)
                .join("")}</span>`
            : ""
        }
      </div>
      ${specsContent}
    </div>
  `;

  const actionsMarkup = state.deckReviewMode
    ? `
    <div class="deck-actions-row">
      ${state.deckProfiles.length > 0 ? '<button type="button" class="btn-done-accordions">EDIT</button>' : ""}
    </div>
  `
    : `
    <div class="deck-actions-row">
      <button type="button" class="btn-add-profile">+ Add Profile</button>
      ${state.deckProfiles.length > 0 ? '<button type="button" class="btn-duplicate-profile">+ Duplicate Profile</button>' : ""}
      <button type="button" class="btn-duplicate-profile btn-add-accessory">+ Add Accessories</button>
      ${state.deckProfiles.length > 0 ? '<button type="button" class="btn-done-accordions">REVIEW</button>' : ""}
    </div>
  `;
  const reviewSummaryRows = buildDeckReviewSupplierSummary();
  const reviewSummaryMarkup =
    state.deckReviewMode && reviewSummaryRows.length > 0
      ? `
    <div class="deck-review-summary-block">
      ${reviewSummaryRows
        .map(
          (row) => `
        <div class="pricing-line-item">
          <div class="pricing-line-item-main">
            <span>${escapeHtml(row.supplier)}</span>
            <strong>SQS: ${formatTwoDecimals(row.sqs)} | TONS: ${formatTwoDecimals(row.tons)}</strong>
          </div>
        </div>
      `,
        )
        .join("")}
      ${
        reviewSummaryRows.length > 1
          ? `<div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>TOTAL COMBINED</span>
          <strong>SQS: ${formatTwoDecimals(state.totals.totalDeckSqs)} | TONS: ${formatTwoDecimals(
              state.totals.totalDeckTons,
            )}</strong>
        </div>
      </div>`
          : ""
      }
    </div>
  `
      : "";

  const accessoriesMarkup = state.accessories
    .map((accessory, index) => {
      const accessoryDisplayName = accessory.type || `Accessory #${index + 1}`;
      const accessorySummaryMetric = isTekAccessoryType(accessory.type)
        ? `SCREWS: ${formatWholeNumber(Number.isFinite(accessory.screwCount) ? accessory.screwCount : 0)}`
        : isCcAccessoryType(accessory.type)
          ? `TONS: ${formatTwoDecimals(parsePositiveNumberOrZero(accessory.tons))}`
          : "";
      const toggleSymbol = accessory.isCollapsed ? "+" : "−";
      const detailsMarkup = accessory.isCollapsed
        ? ""
        : `
          <div class="deck-row-content">
            <div class="deck-row-top">
              <p class="deck-row-title">${accessoryDisplayName}</p>
              <button type="button" class="btn-remove-row btn-remove-accessory" aria-label="Remove accessory ${index + 1}">Remove</button>
            </div>
            <div class="deck-method-grid">
              <div class="field-group">
                <label>Accessory Type</label>
                <select data-group="accessory" data-field="type">${buildSelectOptions(
                  [{ value: "", label: "" }, ...ACCESSORY_TYPE_OPTIONS],
                  accessory.type,
                )}</select>
              </div>
            </div>
            ${
              isTekAccessoryType(accessory.type)
                ? `<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Screw Count</label>
                <input type="number" min="0" step="1" inputmode="numeric" data-group="accessory" data-field="screwCount" value="${accessory.screwCount ?? ""}" />
              </div>
            </div>`
                : ""
            }
            ${
              isCcAccessoryType(accessory.type)
                ? `<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Tons</label>
                <input type="number" min="0" step="any" inputmode="decimal" data-group="accessory" data-field="tons" value="${accessory.tons ?? ""}" />
              </div>
            </div>`
                : ""
            }
          </div>
        `;

      return `
        <div class="deck-row" data-accessory-id="${accessory.id}">
          <div class="deck-summary-row" data-id="a_${accessory.id}" role="button" tabindex="0" aria-expanded="${!accessory.isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${toggleSymbol}</span>
            <span class="deck-summary-name">${accessoryDisplayName}</span>
            ${
              accessorySummaryMetric
                ? `<span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-sqs">${accessorySummaryMetric}</span>`
                : ""
            }
          </div>
          ${detailsMarkup}
        </div>
      `;
    })
    .join("");

  if (state.deckProfiles.length === 0 && state.accessories.length === 0) {
    deckProfilesList.innerHTML = `${specsMarkup}${actionsMarkup}${reviewSummaryMarkup}<p class="help-text">No deck profiles added.</p>`;
    return;
  }

  const profilesMarkup = state.deckProfiles
    .map((profile, index) => {
      const toggleSymbol = profile.isCollapsed ? "+" : "−";
      const shouldShowOverride = profile.showOverride && profile.requiresOverride;
      const detailsMarkup = profile.isCollapsed
        ? ""
        : `
          <div class="deck-row-content">
            <div class="deck-row-top">
              <p class="deck-row-title">Profile ${index + 1}</p>
              <div class="deck-row-actions">
                <button
                  type="button"
                  class="btn-common-spec"
                  data-action="apply-common-profile"
                  aria-label="Apply common profile preset for profile ${index + 1}"
                >
                  Common: 1.5B20G60 GR50
                </button>
                <button type="button" class="btn-remove-row" aria-label="Remove profile ${index + 1}">Remove</button>
              </div>
            </div>

            <div class="deck-spec-grid">
              <div class="field-group">
                <label>Depth</label>
                <select class="${isRequiredDeckFieldMissing(profile, "depth") ? "required-missing" : ""}" data-group="specs" data-field="depth">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.depth], profile.specs.depth)}</select>
              </div>
              <div class="field-group">
                <label>Profile</label>
                <select class="${isRequiredDeckFieldMissing(profile, "profile") ? "required-missing" : ""}" data-group="specs" data-field="profile">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.profile], profile.specs.profile)}</select>
              </div>
              <div class="field-group">
                <label>Gage</label>
                <select class="${isRequiredDeckFieldMissing(profile, "gage") ? "required-missing" : ""}" data-group="specs" data-field="gage">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.gage], profile.specs.gage)}</select>
              </div>
              <div class="field-group">
                <label>Finish</label>
                <select class="${isRequiredDeckFieldMissing(profile, "finish") ? "required-missing" : ""}" data-group="specs" data-field="finish">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.finish], profile.specs.finish)}</select>
              </div>
              <div class="field-group">
                <label>Paint Top</label>
                <select data-group="specs" data-field="paintTop">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.paintTop], profile.specs.paintTop)}</select>
              </div>
              <div class="field-group">
                <label>Paint Bottom</label>
                <select data-group="specs" data-field="paintBottom">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.paintBottom], profile.specs.paintBottom)}</select>
              </div>
              <div class="field-group">
                <label>Grade</label>
                <select class="${isRequiredDeckFieldMissing(profile, "grade") ? "required-missing" : ""}" data-group="specs" data-field="grade">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.grade], profile.specs.grade)}</select>
              </div>
              <div class="field-group">
                <label>Manufacturer</label>
                <select class="${isRequiredDeckFieldMissing(profile, "manufacturer") ? "required-missing" : ""}" data-group="specs" data-field="manufacturer">${buildSelectOptions([{ value: "", label: "" }, ...deckSpecOptions.manufacturer], profile.specs.manufacturer)}</select>
              </div>
            </div>

            <div class="deck-method-grid">
              <div class="field-group">
                <label>Measurement Method</label>
                <select data-group="row" data-field="method">${buildSelectOptions(deckMethodOptions, profile.method)}</select>
              </div>
            </div>

            ${renderMethodInputs(profile)}

            ${
              shouldShowOverride
                ? `<div class="deck-row-inputs-grid">
              <div class="field-group">
                <label>Override Tons</label>
                <input class="required-missing" type="number" min="0" step="any" inputmode="decimal" data-group="row" data-field="overrideTons" value="${profile.overrideTons}" required />
                ${profile.showWeightWarning ? `<p class="help-text">${profile.missingLookupMessage}</p>` : ""}
              </div>
            </div>`
                : ""
            }
          
            <div class="deck-row-outputs">
              <div class="field-group">
                <label>Total Profile SQS</label>
                <input type="text" class="row-sqs-output" readonly value="${formatTwoDecimals(profile.rowSqs)}" />
              </div>
              <div class="field-group">
                <label>Total Profile Tons</label>
                <input type="text" class="row-tons-output" readonly value="${formatTwoDecimals(profile.rowTons)}" />
              </div>
            </div>
          </div>
        `;

      return `
        <div class="deck-row" data-row-id="${profile.id}">
          <div class="deck-summary-row" data-id="p_${profile.id}" role="button" tabindex="0" aria-expanded="${!profile.isCollapsed}">
            <span class="deck-summary-toggle" aria-hidden="true">${toggleSymbol}</span>
            <span class="deck-summary-name">${buildDeckProfileName(profile)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-supplier">${escapeHtml(profile.specs.manufacturer || "—")}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-sqs">SQS: ${formatTwoDecimals(profile.rowSqs)}</span>
            <span class="deck-summary-divider" aria-hidden="true">|</span>
            <span class="deck-summary-tons">TONS: ${formatTwoDecimals(profile.rowTons)}</span>
          </div>

          ${detailsMarkup}
        </div>
      `;
    })
    .join("");

  deckProfilesList.innerHTML = `${specsMarkup}${profilesMarkup}${accessoriesMarkup}${actionsMarkup}${reviewSummaryMarkup}`;
}

function renderCscSubsection(section, subsectionKey, title) {
  const subsection = section.subsections[subsectionKey];
  const values = section.values[subsectionKey];
  const toggle = subsection.isCollapsed ? "+" : "−";
  const disabled = subsection.isEditing ? "" : "disabled";
  const editLabel = subsection.isEditing ? "SAVE" : "EDIT";
  const addRowDisabled = subsection.isEditing ? "" : "disabled";

  const bucketRows = (values.buckets || []).map((bucketRow, index) => {
    const startValue = parseCurrency(bucketRow.start);
    const endValue = parseCurrency(bucketRow.end);
    const costValue = parseCurrency(bucketRow.cost);
    return `
      <div class="csc-bucket-row">
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-start"
          data-csc-subsection="${subsectionKey}"
          data-csc-row="${index}"
          value="${startValue}"
          ${disabled}
        />
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-end"
          data-csc-subsection="${subsectionKey}"
          data-csc-row="${index}"
          value="${endValue}"
          ${disabled}
        />
        <input
          type="text"
          inputmode="decimal"
          data-csc-field="bucket-cost"
          data-csc-subsection="${subsectionKey}"
          data-csc-row="${index}"
          value="${subsection.isEditing ? String(costValue) : formatCurrency(costValue)}"
          ${disabled}
        />
      </div>
    `;
  }).join("");

  const extraShippingField =
    subsectionKey === "joists"
      ? `
        <div class="field-group csc-extra-row">
          <label>Extra shipping fee for 0-9 tons (flat $)</label>
          <input
            type="text"
            inputmode="decimal"
            data-csc-field="extra-shipping-0-9"
            data-csc-subsection="joists"
            value="${subsection.isEditing ? String(parseCurrency(values.extraShippingFee_0_9)) : formatCurrency(values.extraShippingFee_0_9)}"
            ${disabled}
          />
        </div>
      `
      : "";

  const contentMarkup = subsection.isCollapsed
    ? ""
    : `
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="csc-toggle-edit" data-csc-subsection="${subsectionKey}">
            ${editLabel}
          </button>
          <button type="button" class="btn-secondary" data-action="csc-add-row" data-csc-subsection="${subsectionKey}" ${addRowDisabled}>
            + Add Row
          </button>
        </div>
        <div class="csc-bucket-grid">
          <div class="csc-bucket-header">
            <span>Start</span>
            <span>End</span>
            <span>Cost / Ton</span>
          </div>
          ${bucketRows}
        </div>
        ${extraShippingField}
      </div>
    `;

  return `
    <section class="admin-section csc-subsection" data-csc-subsection="${subsectionKey}">
      <div class="admin-summary-row" data-action="csc-toggle-sub" data-csc-subsection="${subsectionKey}" role="button" tabindex="0" aria-expanded="${!subsection.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
        <span class="admin-summary-name">${title}</span>
      </div>
      ${contentMarkup}
    </section>
  `;
}

function renderLeadTimesSubsection(supplierKey, subsection, values, title = "LEAD TIMES") {
  const normalizedSupplier = String(supplierKey || "").trim().toLowerCase();
  const toggle = subsection.isCollapsed ? "+" : "−";
  const disabled = subsection.isEditing ? "" : "disabled";
  const editLabel = subsection.isEditing ? "SAVE" : "EDIT";

  const rows = normalizedSupplier === "trojan"
    ? [
        { key: "submittalsDeckOnly", label: "Submittals (Deck Only)" },
        { key: "submittalsJoistsUnder50", label: "Submittals (Joists < 50T)" },
        { key: "submittalsDeckAndJoistsOver50", label: "Submittals (Deck+Joists >= 50T)" },
        { key: "fabrication", label: "Fabrication" },
      ]
    : [{ key: "fabrication", label: "Fabrication" }];

  const rowsMarkup = rows
    .map((row) => {
      const minValue = parseLeadTimeInteger(values?.[row.key]?.min);
      const maxValue = parseLeadTimeInteger(values?.[row.key]?.max);
      return `
        <div class="csc-bucket-row">
          <span>${row.label}</span>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-leadtime-supplier="${normalizedSupplier}"
            data-leadtime-path="${row.key}"
            data-leadtime-bound="min"
            value="${minValue === "" ? "" : minValue}"
            ${disabled}
          />
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-leadtime-supplier="${normalizedSupplier}"
            data-leadtime-path="${row.key}"
            data-leadtime-bound="max"
            value="${maxValue === "" ? "" : maxValue}"
            ${disabled}
          />
        </div>
      `;
    })
    .join("");

  const errorMessage = subsection.error ? `<p class="help-text">${escapeHtml(subsection.error)}</p>` : "";

  const contentMarkup = subsection.isCollapsed
    ? ""
    : `
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button
            type="button"
            class="btn-primary"
            data-action="leadtime-toggle-edit"
            data-leadtime-supplier="${normalizedSupplier}"
          >
            ${editLabel}
          </button>
        </div>
        <div class="csc-bucket-grid">
          <div class="csc-bucket-header">
            <span>Type</span>
            <span>Min</span>
            <span>Max</span>
          </div>
          ${rowsMarkup}
        </div>
        ${errorMessage}
      </div>
    `;

  return `
    <section class="admin-section csc-subsection" data-leadtime-subsection="${normalizedSupplier}">
      <div
        class="admin-summary-row"
        data-action="leadtime-toggle-sub"
        data-leadtime-supplier="${normalizedSupplier}"
        role="button"
        tabindex="0"
        aria-expanded="${!subsection.isCollapsed}"
      >
        <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
        <span class="admin-summary-name">${title}</span>
      </div>
      ${contentMarkup}
    </section>
  `;
}

function renderDetailingSection(section, sectionKey, title) {
  const values = normalizeDetailingValues(section.values);
  section.values = values;
  const toggle = section.isCollapsed ? "+" : "−";
  const disabled = section.isEditing ? "" : "disabled";
  const editLabel = section.isEditing ? "SAVE" : "EDIT";
  const addRowDisabled = section.isEditing ? "" : "disabled";

  const bucketRows = (values.buckets || [])
    .map((bucketRow, index) => {
      const startValue = parseCurrency(bucketRow.start);
      const endValue = parseCurrency(bucketRow.end);
      const scopeType = String(bucketRow.scopeType || "DECK+JOISTS").toUpperCase();
      const tier = Number.parseInt(String(bucketRow.tier || 2), 10);
      const detailingPercent = parseCurrency(bucketRow.detailingPercent);
      return `
      <div class="detailing-bucket-row">
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="bucket-start"
          data-detailing-row="${index}"
          value="${startValue}"
          ${disabled}
        />
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="bucket-end"
          data-detailing-row="${index}"
          value="${endValue}"
          ${disabled}
        />
        <select
          data-detailing-field="scope-type"
          data-detailing-row="${index}"
          ${disabled}
        >
          ${DETAILING_SCOPE_TYPES.map(
            (option) => `<option value="${option}" ${option === scopeType ? "selected" : ""}>${option}</option>`,
          ).join("")}
        </select>
        <select
          data-detailing-field="tier"
          data-detailing-row="${index}"
          ${disabled}
        >
          ${DETAILING_TIERS.map(
            (option) => `<option value="${option}" ${option === tier ? "selected" : ""}>${option}</option>`,
          ).join("")}
        </select>
        <input
          type="text"
          inputmode="decimal"
          data-detailing-field="detailing-percent"
          data-detailing-row="${index}"
          value="${section.isEditing ? String(detailingPercent) : formatTwoDecimals(detailingPercent)}"
          ${disabled}
        />
      </div>
    `;
    })
    .join("");

  const contentMarkup = section.isCollapsed
    ? ""
    : `
      <div class="admin-section-content" data-admin-content="${sectionKey}">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="detailing-toggle-edit" data-section="${sectionKey}">
            ${editLabel}
          </button>
          <button type="button" class="btn-secondary" data-action="detailing-add-row" data-section="${sectionKey}" ${addRowDisabled}>
            + Add Row
          </button>
        </div>
        <div class="detailing-bucket-grid csc-bucket-grid">
          <div class="detailing-bucket-header csc-bucket-header">
            <span>Start Tons</span>
            <span>End Tons</span>
            <span>Scope Type</span>
            <span>Tier</span>
            <span>Detailing %</span>
          </div>
          ${bucketRows}
        </div>
        <p class="help-text">Minimum detailing fee applied automatically: ${formatMoney(Math.max(500, parseCurrency(values.minimumFee)))}</p>
      </div>
    `;

  return `
    <section class="admin-section" data-admin-section="${sectionKey}">
      <div class="admin-summary-row" data-admin-id="${sectionKey}" role="button" tabindex="0" aria-expanded="${!section.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
        <span class="admin-summary-name">${title}</span>
      </div>
      ${contentMarkup}
    </section>
  `;
}

function renderTrojanSubsection(section, subsectionKey, title) {
  const subsection = section.subsections[subsectionKey];
  const toggle = subsection.isCollapsed ? "+" : "−";
  const disabled = subsection.isEditing ? "" : "disabled";
  const editLabel = subsection.isEditing ? "SAVE" : "EDIT";

  if (subsectionKey === "conditions") {
    const rows = Array.isArray(section.values.documentConditions) ? section.values.documentConditions : [];
    const addRowDisabled = subsection.isEditing ? "" : "disabled";
    const rowsMarkup =
      rows.length > 0
        ? rows
            .map(
              (row, index) => `
        <div class="trojan-conditions-row" data-trojan-condition-row="${row.id}">
          <select data-trojan-condition-field="slot" data-trojan-condition-id="${row.id}" ${disabled}>
            ${TROJAN_DOCUMENT_CONDITION_SLOTS.map(
              (slot) =>
                `<option value="${slot.value}" ${slot.value === row.slot ? "selected" : ""}>${slot.label}</option>`,
            ).join("")}
          </select>
          <input
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            data-trojan-condition-field="after-number"
            data-trojan-condition-id="${row.id}"
            value="${Number.isFinite(Number(row.afterNumber)) ? Number(row.afterNumber) : 0}"
            ${disabled}
            title="Insert after numbered item"
          />
          <textarea
            rows="3"
            data-trojan-condition-field="text"
            data-trojan-condition-id="${row.id}"
            ${disabled}
          >${escapeHtml(row.text || "")}</textarea>
          <button
            type="button"
            class="btn-secondary"
            data-action="trojan-remove-condition-row"
            data-trojan-condition-id="${row.id}"
            ${addRowDisabled}
          >
            Remove
          </button>
        </div>
      `,
            )
            .join("")
        : '<p class="help-text">No custom conditions yet.</p>';

    const contentMarkup = subsection.isCollapsed
      ? ""
      : `
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="trojan-toggle-edit" data-trojan-subsection="${subsectionKey}">
            ${editLabel}
          </button>
          <button type="button" class="btn-secondary" data-action="trojan-add-condition-row" data-trojan-subsection="${subsectionKey}" ${addRowDisabled}>
            + Add Row
          </button>
        </div>
        <div class="trojan-conditions-list">
          ${rowsMarkup}
        </div>
      </div>
    `;

    return `
      <section class="admin-section csc-subsection" data-trojan-subsection="${subsectionKey}">
        <div class="admin-summary-row" data-action="trojan-toggle-sub" data-trojan-subsection="${subsectionKey}" role="button" tabindex="0" aria-expanded="${!subsection.isCollapsed}">
          <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
          <span class="admin-summary-name">${title}</span>
        </div>
        ${contentMarkup}
      </section>
    `;
  }

  if (subsectionKey === "leadTimes") {
    return renderLeadTimesSubsection("trojan", subsection, section.values.leadTimes, title);
  }

  const fieldKeys = TROJAN_SUBSECTION_FIELDS[subsectionKey] || [];
  const fields = fieldKeys
    .map((fieldKey) => ADMIN_SECTION_CONFIG.trojan.fields.find((field) => field.key === fieldKey))
    .filter(Boolean);

  const fieldsMarkup = fields
    .map((field) => {
      const storedValue = section.values[field.key];
      const value =
        field.type === "text"
          ? String(storedValue || "")
          : subsection.isEditing
            ? (storedValue === "" ? "" : String(parseCurrency(storedValue)))
            : formatCurrency(storedValue, { blankAsEmpty: true });
      return `
        <div class="field-group">
          <label>${field.label}</label>
          <input
            type="text"
            inputmode="${field.type === "text" ? "text" : "decimal"}"
            data-admin-field="${field.key}"
            data-admin-type="${field.type || "currency"}"
            autocomplete="${field.type === "text" ? "street-address" : "off"}"
            value="${value}"
            ${disabled}
          />
        </div>
      `;
    })
    .join("");

  const outboundSavedAtMarkup =
    subsectionKey === "outbound" && Number.isFinite(Number(state.admin.outboundAddressLastSavedAt))
      ? `<p class="help-text">Last saved at ${formatAdminTimestamp(state.admin.outboundAddressLastSavedAt)}</p>`
      : "";

  const contentMarkup = subsection.isCollapsed
    ? ""
    : `
      <div class="admin-section-content">
        <div class="admin-section-actions">
          <button type="button" class="btn-primary" data-action="trojan-toggle-edit" data-trojan-subsection="${subsectionKey}">
            ${editLabel}
          </button>
        </div>
        ${fieldsMarkup}
        ${outboundSavedAtMarkup}
      </div>
    `;

  return `
    <section class="admin-section csc-subsection" data-trojan-subsection="${subsectionKey}">
      <div class="admin-summary-row" data-action="trojan-toggle-sub" data-trojan-subsection="${subsectionKey}" role="button" tabindex="0" aria-expanded="${!subsection.isCollapsed}">
        <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
        <span class="admin-summary-name">${title}</span>
      </div>
      ${contentMarkup}
    </section>
  `;
}

function renderAdminSections() {
  const markup = Object.keys(ADMIN_SECTION_CONFIG)
    .map((sectionKey) => {
      const config = ADMIN_SECTION_CONFIG[sectionKey];
      const section = state.admin.sections[sectionKey];
      const toggle = section.isCollapsed ? "+" : "−";

      if (sectionKey === "trojan") {
        const contentMarkup = section.isCollapsed
          ? ""
          : `
            <div class="admin-section-content" data-admin-content="${sectionKey}">
              <div class="csc-subsections">
                ${renderTrojanSubsection(section, "inbound", "INBOUND")}
                ${renderTrojanSubsection(section, "mfg", "MFG")}
                ${renderTrojanSubsection(section, "outbound", "OUTBOUND")}
                ${renderTrojanSubsection(section, "accessories", "ACCESSORIES")}
                ${renderTrojanSubsection(section, "leadTimes", "LEAD TIMES")}
                ${renderTrojanSubsection(section, "margins", "MARGINS")}
                ${renderTrojanSubsection(section, "conditions", "CONDITIONS")}
              </div>
            </div>
          `;

        return `
          <section class="admin-section" data-admin-section="${sectionKey}">
            <div class="admin-summary-row" data-admin-id="${sectionKey}" role="button" tabindex="0" aria-expanded="${!section.isCollapsed}">
              <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
              <span class="admin-summary-name">${config.label}</span>
            </div>
            ${contentMarkup}
          </section>
        `;
      }

      if (sectionKey === "csc") {
        const contentMarkup = section.isCollapsed
          ? ""
          : `
            <div class="admin-section-content" data-admin-content="${sectionKey}">
              <div class="csc-subsections">
                ${renderCscSubsection(section, "joists", "JOISTS")}
                ${renderCscSubsection(section, "deck", "DECK")}
                ${renderLeadTimesSubsection("csc", section.subsections.leadTimes, section.values.leadTimes, "LEAD TIMES")}
              </div>
            </div>
          `;

        return `
          <section class="admin-section" data-admin-section="${sectionKey}">
            <div class="admin-summary-row" data-admin-id="${sectionKey}" role="button" tabindex="0" aria-expanded="${!section.isCollapsed}">
              <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
              <span class="admin-summary-name">${config.label}</span>
            </div>
            ${contentMarkup}
          </section>
        `;
      }

      if (sectionKey === "detailing") {
        return renderDetailingSection(section, sectionKey, config.label);
      }

      if (sectionKey === "cano") {
        const contentMarkup = section.isCollapsed
          ? ""
          : `
            <div class="admin-section-content" data-admin-content="${sectionKey}">
              <div class="admin-section-actions">
                <button type="button" class="btn-primary" data-action="admin-toggle-edit" data-section="${sectionKey}">
                  ${section.isEditing ? "SAVE" : "EDIT"}
                </button>
              </div>
              <div class="field-group">
                <label>$/LB</label>
                <input
                  type="text"
                  inputmode="decimal"
                  data-admin-field="perLb"
                  data-admin-type="currency"
                  autocomplete="off"
                  value="${
                    section.isEditing
                      ? (section.values.perLb === "" ? "" : String(parseCurrency(section.values.perLb)))
                      : formatCurrency(section.values.perLb, { blankAsEmpty: true })
                  }"
                  ${section.isEditing ? "" : "disabled"}
                />
              </div>
              <div class="csc-subsections">
                ${renderLeadTimesSubsection("cano", section.subsections.leadTimes, section.values.leadTimes, "LEAD TIMES")}
              </div>
            </div>
          `;

        return `
          <section class="admin-section" data-admin-section="${sectionKey}">
            <div class="admin-summary-row" data-admin-id="${sectionKey}" role="button" tabindex="0" aria-expanded="${!section.isCollapsed}">
              <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
              <span class="admin-summary-name">${config.label}</span>
            </div>
            ${contentMarkup}
          </section>
        `;
      }

      const fieldsMarkup = config.fields
        .map((field) => {
          const storedValue = section.values[field.key];
          const value =
            field.type === "text"
              ? String(storedValue || "")
              : section.isEditing
                ? (storedValue === "" ? "" : String(parseCurrency(storedValue)))
                : formatCurrency(storedValue, { blankAsEmpty: true });
          const disabled = section.isEditing ? "" : "disabled";
          return `
            <div class="field-group">
              <label>${field.label}</label>
              <input
                type="text"
                inputmode="${field.type === "text" ? "text" : "decimal"}"
                data-admin-field="${field.key}"
                data-admin-type="${field.type || "currency"}"
                autocomplete="${field.type === "text" ? "street-address" : "off"}"
                value="${value}"
                ${disabled}
              />
            </div>
          `;
        })
        .join("");

      const contentMarkup = section.isCollapsed
        ? ""
        : `
          <div class="admin-section-content" data-admin-content="${sectionKey}">
            <div class="admin-section-actions">
              <button type="button" class="btn-primary" data-action="admin-toggle-edit" data-section="${sectionKey}">
                ${section.isEditing ? "SAVE" : "EDIT"}
              </button>
            </div>
            ${fieldsMarkup}
          </div>
        `;

      return `
        <section class="admin-section" data-admin-section="${sectionKey}">
          <div class="admin-summary-row" data-admin-id="${sectionKey}" role="button" tabindex="0" aria-expanded="${!section.isCollapsed}">
            <span class="admin-summary-toggle" aria-hidden="true">${toggle}</span>
            <span class="admin-summary-name">${config.label}</span>
          </div>
          ${contentMarkup}
        </section>
      `;
    })
    .join("");

  adminSectionsList.innerHTML = markup;
  initAddressAutocompletes();
}

function renderAdminChangelog() {
  if (state.admin.changelog.length === 0) {
    adminChangelogList.innerHTML = '<p class="help-text">No changelog entries yet.</p>';
    return;
  }

  const entriesMarkup = [...state.admin.changelog]
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(
      (entry) => `
      <div class="admin-changelog-entry">
        <div class="admin-changelog-line">${formatAdminTimestamp(entry.timestamp)}</div>
        <div class="admin-changelog-line">${entry.section} | ${entry.metric}</div>
        <div class="admin-changelog-line">${
          typeof entry.from === "string" || typeof entry.to === "string"
            ? `${String(entry.from || "")} → ${String(entry.to || "")}`
            : `${formatCurrency(entry.from)} → ${formatCurrency(entry.to)}`
        }</div>
      </div>
    `,
    )
    .join("");

  adminChangelogList.innerHTML = entriesMarkup;
}

function saveAdminSection(sectionKey) {
  const sectionElement = adminSectionsList.querySelector(`[data-admin-section="${sectionKey}"]`);
  if (!sectionElement) {
    return;
  }

  const section = state.admin.sections[sectionKey];
  const config = ADMIN_SECTION_CONFIG[sectionKey];
  const previousValues = { ...section.values };

  config.fields.forEach((field) => {
    const input = sectionElement.querySelector(`[data-admin-field="${field.key}"]`);
    if (!input) {
      return;
    }
    const nextValue =
      field.type === "text" ? String(input.value || "").trim() : parseCurrency(input.value);
    section.values[field.key] = nextValue;
  });

  config.fields.forEach((field) => {
    const fromValue =
      field.type === "text"
        ? String(previousValues[field.key] || "").trim()
        : parseCurrency(previousValues[field.key]);
    const toValue =
      field.type === "text" ? String(section.values[field.key] || "").trim() : parseCurrency(section.values[field.key]);
    if (fromValue !== toValue) {
      state.admin.changelog.push({
        timestamp: Date.now(),
        section: config.label,
        metric: field.label,
        from: fromValue,
        to: toValue,
      });
    }
  });

  section.isEditing = false;
  saveAdminState();
  renderAdminSections();
  if (sectionKey === "trojan") {
    scheduleCalcMilesFromTrojan();
  }
}

function saveCscSubsection(subsectionKey) {
  const cscSectionElement = adminSectionsList.querySelector('[data-admin-section="csc"]');
  if (!cscSectionElement) {
    return;
  }
  const section = state.admin.sections.csc;
  const subsection = section.values[subsectionKey];
  if (!subsection) {
    return;
  }

  (subsection.buckets || []).forEach((_, index) => {
    const startInput = cscSectionElement.querySelector(
      `[data-csc-field="bucket-start"][data-csc-subsection="${subsectionKey}"][data-csc-row="${index}"]`,
    );
    const endInput = cscSectionElement.querySelector(
      `[data-csc-field="bucket-end"][data-csc-subsection="${subsectionKey}"][data-csc-row="${index}"]`,
    );
    const costInput = cscSectionElement.querySelector(
      `[data-csc-field="bucket-cost"][data-csc-subsection="${subsectionKey}"][data-csc-row="${index}"]`,
    );
    subsection.buckets[index] = {
      start: parseCurrency(startInput?.value),
      end: parseCurrency(endInput?.value),
      cost: parseCurrency(costInput?.value),
    };
  });

  if (subsectionKey === "joists") {
    const extraShippingInput = cscSectionElement.querySelector(
      '[data-csc-field="extra-shipping-0-9"][data-csc-subsection="joists"]',
    );
    if (extraShippingInput) {
      subsection.extraShippingFee_0_9 = parseCurrency(extraShippingInput.value);
    }
  }

  section.subsections[subsectionKey].isEditing = false;
  saveAdminState();
  renderAdminSections();
  updateCalculator();
}

function addCscBucketRow(subsectionKey) {
  const section = state.admin.sections.csc;
  const subsectionState = section.subsections?.[subsectionKey];
  const subsectionValues = section.values?.[subsectionKey];
  if (!subsectionState || !subsectionValues || !Array.isArray(subsectionValues.buckets)) {
    return;
  }
  if (!subsectionState.isEditing) {
    return;
  }

  const lastRow = subsectionValues.buckets[subsectionValues.buckets.length - 1];
  const lastEnd = lastRow ? parseCurrency(lastRow.end) : 0;
  const nextStart = subsectionValues.buckets.length > 0 ? lastEnd + 1 : 0;
  subsectionValues.buckets.push({
    start: nextStart,
    end: nextStart,
    cost: 0,
  });
  renderAdminSections();
}

function saveDetailingSection() {
  const detailingSectionElement = adminSectionsList.querySelector('[data-admin-section="detailing"]');
  if (!detailingSectionElement) {
    return;
  }
  const section = state.admin.sections.detailing;
  const values = normalizeDetailingValues(section.values);
  values.buckets = (values.buckets || []).map((_, index) => {
    const startInput = detailingSectionElement.querySelector(
      `[data-detailing-field="bucket-start"][data-detailing-row="${index}"]`,
    );
    const endInput = detailingSectionElement.querySelector(
      `[data-detailing-field="bucket-end"][data-detailing-row="${index}"]`,
    );
    const scopeInput = detailingSectionElement.querySelector(
      `[data-detailing-field="scope-type"][data-detailing-row="${index}"]`,
    );
    const tierInput = detailingSectionElement.querySelector(
      `[data-detailing-field="tier"][data-detailing-row="${index}"]`,
    );
    const percentInput = detailingSectionElement.querySelector(
      `[data-detailing-field="detailing-percent"][data-detailing-row="${index}"]`,
    );
    return {
      start: parseCurrency(startInput?.value),
      end: parseCurrency(endInput?.value),
      scopeType: DETAILING_SCOPE_TYPES.includes(String(scopeInput?.value || "").toUpperCase())
        ? String(scopeInput.value).toUpperCase()
        : "DECK+JOISTS",
      tier: DETAILING_TIERS.includes(Number.parseInt(String(tierInput?.value || ""), 10))
        ? Number.parseInt(String(tierInput.value), 10)
        : 2,
      detailingPercent: parseCurrency(percentInput?.value),
    };
  });
  section.values = normalizeDetailingValues(values);
  section.isEditing = false;
  saveAdminState();
  renderAdminSections();
  updateCalculator();
}

function addDetailingBucketRow() {
  const section = state.admin.sections.detailing;
  if (!section.isEditing) {
    return;
  }
  const values = normalizeDetailingValues(section.values);
  const lastRow = values.buckets[values.buckets.length - 1];
  const lastEnd = lastRow ? parseCurrency(lastRow.end) : 0;
  const nextStart = values.buckets.length > 0 ? lastEnd + 1 : 0;
  values.buckets.push({
    start: nextStart,
    end: nextStart,
    scopeType: "DECK+JOISTS",
    tier: 2,
    detailingPercent: 4,
  });
  section.values = values;
  renderAdminSections();
}

function addTrojanConditionRow() {
  const section = state.admin.sections.trojan;
  const subsectionState = section.subsections?.conditions;
  if (!subsectionState || !subsectionState.isEditing) {
    return;
  }
  if (!Array.isArray(section.values.documentConditions)) {
    section.values.documentConditions = [];
  }
  section.values.documentConditions.push({
    id: nextTrojanConditionId,
    slot: "GENERAL_SALE_TERMS_CONTINUED",
    afterNumber: 0,
    text: "",
  });
  nextTrojanConditionId += 1;
  renderAdminSections();
}

function saveTrojanSubsection(subsectionKey) {
  const trojanSectionElement = adminSectionsList.querySelector('[data-admin-section="trojan"]');
  if (!trojanSectionElement) {
    return;
  }
  const section = state.admin.sections.trojan;
  const subsectionState = section.subsections?.[subsectionKey];
  if (!subsectionState) {
    return;
  }

  if (subsectionKey === "conditions") {
    const rowElements = Array.from(trojanSectionElement.querySelectorAll("[data-trojan-condition-row]"));
    const nextRows = rowElements
      .map((rowElement) => {
        const id = Number.parseInt(String(rowElement.getAttribute("data-trojan-condition-row") || ""), 10);
        const slotInput = rowElement.querySelector('[data-trojan-condition-field="slot"]');
        const afterNumberInput = rowElement.querySelector('[data-trojan-condition-field="after-number"]');
        const textInput = rowElement.querySelector('[data-trojan-condition-field="text"]');
        const slotRaw = String(slotInput?.value || "").trim().toUpperCase();
        const slot = TROJAN_DOCUMENT_CONDITION_SLOT_VALUES.includes(slotRaw)
          ? slotRaw
          : "GENERAL_SALE_TERMS_CONTINUED";
        const afterNumber = Number.parseInt(String(afterNumberInput?.value ?? ""), 10);
        const text = String(textInput?.value || "").trim();
        return {
          id: Number.isFinite(id) && id > 0 ? id : nextTrojanConditionId++,
          slot,
          afterNumber: Number.isFinite(afterNumber) && afterNumber >= 0 ? afterNumber : 0,
          text,
        };
      })
      .filter((row) => row.text !== "");
    section.values.documentConditions = nextRows;
    subsectionState.isEditing = false;
    saveAdminState();
    renderAdminSections();
    return;
  }

  const fieldKeys = TROJAN_SUBSECTION_FIELDS[subsectionKey] || [];
  const previousValues = { ...section.values };

  fieldKeys.forEach((fieldKey) => {
    const fieldConfig = ADMIN_SECTION_CONFIG.trojan.fields.find((field) => field.key === fieldKey);
    if (!fieldConfig) {
      return;
    }
    const input = trojanSectionElement.querySelector(`[data-admin-field="${fieldKey}"]`);
    if (!input) {
      return;
    }
    const nextValue =
      fieldConfig.type === "text" ? String(input.value || "").trim() : parseCurrency(input.value);
    section.values[fieldKey] = nextValue;

    const fromValue =
      fieldConfig.type === "text"
        ? String(previousValues[fieldKey] || "").trim()
        : parseCurrency(previousValues[fieldKey]);
    const toValue = fieldConfig.type === "text" ? String(nextValue || "").trim() : parseCurrency(nextValue);
    if (fromValue !== toValue) {
      state.admin.changelog.push({
        timestamp: Date.now(),
        section: "TROJAN",
        metric: fieldConfig.label,
        from: fromValue,
        to: toValue,
      });
    }
  });

  subsectionState.isEditing = false;
  if (subsectionKey === "outbound") {
    saveAdminState({ skipRemoteSync: true });
    renderAdminSections();
    void saveOutboundAddress({
      facilityAddress: section.values.facilityAddress,
    });
    return;
  }

  saveAdminState();
  renderAdminSections();
  updateCalculator();
}

function getSupplierLeadTimesState(supplierKey) {
  const normalized = String(supplierKey || "").trim().toLowerCase();
  if (!["trojan", "csc", "cano"].includes(normalized)) {
    return null;
  }
  const section = state.admin.sections[normalized];
  const subsection = section?.subsections?.leadTimes;
  const values = section?.values?.leadTimes;
  if (!section || !subsection || !values) {
    return null;
  }
  return { section, subsection, values, normalized };
}

function saveLeadTimesSubsection(supplierKey) {
  const leadTimeState = getSupplierLeadTimesState(supplierKey);
  if (!leadTimeState) {
    return;
  }
  const { subsection, values, normalized } = leadTimeState;
  const sectionElement = adminSectionsList.querySelector(`[data-admin-section="${normalized}"]`);
  if (!sectionElement) {
    return;
  }

  const paths =
    normalized === "trojan"
      ? ["submittalsDeckOnly", "submittalsJoistsUnder50", "submittalsDeckAndJoistsOver50", "fabrication"]
      : ["fabrication"];
  const nextValues = JSON.parse(JSON.stringify(values));

  for (const path of paths) {
    const minInput = sectionElement.querySelector(
      `[data-leadtime-supplier="${normalized}"][data-leadtime-path="${path}"][data-leadtime-bound="min"]`,
    );
    const maxInput = sectionElement.querySelector(
      `[data-leadtime-supplier="${normalized}"][data-leadtime-path="${path}"][data-leadtime-bound="max"]`,
    );

    const minRaw = String(minInput?.value ?? "").trim();
    const maxRaw = String(maxInput?.value ?? "").trim();
    const parsedMin = parseLeadTimeInteger(minRaw);
    const parsedMax = parseLeadTimeInteger(maxRaw);

    if ((minRaw !== "" && parsedMin === "") || (maxRaw !== "" && parsedMax === "")) {
      subsection.error = `${path[0].toUpperCase()}${path.slice(1)} lead times must be non-negative integers.`;
      renderAdminSections();
      return;
    }
    if (parsedMin !== "" && parsedMax !== "" && parsedMin > parsedMax) {
      subsection.error = `${path[0].toUpperCase()}${path.slice(1)} Min must be less than or equal to Max.`;
      renderAdminSections();
      return;
    }

    nextValues[path] = {
      min: parsedMin,
      max: parsedMax,
    };
  }

  subsection.error = "";
  subsection.isEditing = false;
  leadTimeState.section.values.leadTimes = nextValues;
  saveAdminState();
  renderAdminSections();
  updateCalculator();
}

function updateDeckOutputs() {
  const { totalSqs, totalTons } = computeDeckTotals();

  state.deckProfiles.forEach((profile) => {
    const rowElement = deckProfilesList.querySelector(`[data-row-id="${profile.id}"]`);
    if (!rowElement) {
      return;
    }

    const summarySqs = rowElement.querySelector(".deck-summary-sqs");
    const summaryTons = rowElement.querySelector(".deck-summary-tons");
    const rowSqsOutput = rowElement.querySelector(".row-sqs-output");
    const rowTonsOutput = rowElement.querySelector(".row-tons-output");

    if (summarySqs) {
      summarySqs.textContent = `SQS: ${formatTwoDecimals(profile.rowSqs)}`;
    }
    if (summaryTons) {
      summaryTons.textContent = `TONS: ${formatTwoDecimals(profile.rowTons)}`;
    }

    if (rowSqsOutput) {
      rowSqsOutput.value = formatTwoDecimals(profile.rowSqs);
    }
    if (rowTonsOutput) {
      rowTonsOutput.value = formatTwoDecimals(profile.rowTons);
    }
  });

  state.totals.totalDeckSqs = totalSqs;
  state.totals.totalDeckTons = totalTons;
  state.totals.deckTotal = 0;

  totalDeckSqsOutput.value = formatTwoDecimals(state.totals.totalDeckSqs);
  deckTotalOutput.value = formatMoney(state.totals.deckTotal);
  totalDeckTonsOutput.value = formatTwoDecimals(state.totals.totalDeckTons);

  deckSummaryBlock.classList.add("hidden");
}

function resetJoistsOutputs() {
  // Legacy single-row output fields were removed from the joist page.
}

function calculateJoistsTotal() {
  const tonsText = state.joists.tons.trim();

  if (tonsText === "") {
    resetJoistsOutputs();
    return 0;
  }

  const tons = Number(tonsText);
  if (Number.isNaN(tons) || tons < 0) {
    resetJoistsOutputs();
    return 0;
  }

  const supplierLookup = resolveSupplierForPricing(state.joists.supplier);
  if (supplierLookup.pricingSupplier === "CSC") {
    const bucket = getCscBucketForTons(tons);
    if (!bucket || bucket.cost <= 0) {
      resetJoistsOutputs();
      return 0;
    }

    const extraShippingFee = tons <= 9 ? parseCurrency(state.admin.sections.csc.values.joists.extraShippingFee_0_9) : 0;
    const totalPrice = tons * bucket.cost + extraShippingFee;
    return totalPrice;
  }

  if (supplierLookup.pricingSupplier === "CANO") {
    const perLb = parseCurrency(state.admin.sections.cano.values.perLb);
    if (perLb <= 0) {
      return 0;
    }
    const pounds = tons * pricing.CANO.poundsPerTon;
    return pounds * perLb;
  }

  return 0;
}

function computeTrojanShipping() {
  const totalTrojanDeckTons = state.deckProfiles.reduce((sum, profile) => {
    if (normalizeUpperTrim(profile.specs.manufacturer) !== "TROJAN") {
      return sum;
    }
    return sum + (Number.isFinite(profile.rowTons) ? profile.rowTons : 0);
  }, 0);

  const outboundRatePerMile = parseCurrency(state.admin.sections.trojan.values.outboundFreightPerMi);
  const minimumFreightPerTruck = parseCurrency(state.admin.sections.trojan.values.minimumOutboundFreightPerTruck);
  const miles = parsePositiveNumberOrZero(state.milesFromTrojanFacility);

  if (totalTrojanDeckTons <= 0 || outboundRatePerMile <= 0 || miles <= 0) {
    return {
      cost: 0,
      trucks: 0,
      miles,
      rate: outboundRatePerMile,
      totalTrojanDeckTons,
    };
  }

  const totalTrojanDeckLbs = totalTrojanDeckTons * 2000;
  const truckCapacityLbs = 48000;
  const trucks = Math.ceil(totalTrojanDeckLbs / truckCapacityLbs);
  const freightPerTruck = Math.max(miles * outboundRatePerMile, minimumFreightPerTruck);
  const cost = trucks * freightPerTruck;

  return {
    cost,
    trucks,
    miles,
    rate: outboundRatePerMile,
    totalTrojanDeckTons,
  };
}

function updatePricingSummary() {
  if (pricingJoistsTotalOutput) {
    pricingJoistsTotalOutput.value = formatMoney(state.totals.joistsTotal);
  }
  if (pricingDeckSqsOutput) {
    pricingDeckSqsOutput.value = formatTwoDecimals(state.totals.totalDeckSqs);
  }
  if (pricingDeckTotalOutput) {
    pricingDeckTotalOutput.value = formatMoney(state.totals.deckTotal);
  }
  if (pricingDeckTonsOutput) {
    pricingDeckTonsOutput.value = formatTwoDecimals(state.totals.totalDeckTons);
  }
  if (pricingTrojanShippingCost) {
    pricingTrojanShippingCost.textContent = formatMoney(state.totals.trojanShipping);
  }
  if (pricingTrojanShippingMeta) {
    pricingTrojanShippingMeta.textContent = `TRUCKS: ${state.totals.trojanShippingTrucks || 0} | MILES: ${formatTwoDecimals(
      state.totals.trojanShippingMiles || 0,
    )} | RATE: ${formatCurrency(state.totals.trojanShippingRate || 0)}/MI`;
  }
  const showTrojanShipping =
    state.totals.trojanShipping > 0 &&
    (state.totals.trojanShippingTrucks || 0) > 0 &&
    (state.totals.trojanShippingMiles || 0) > 0 &&
    (state.totals.trojanShippingRate || 0) > 0;
  if (pricingTrojanShippingRow) {
    pricingTrojanShippingRow.classList.toggle("hidden", !showTrojanShipping);
  }
  if (grandTotalOutput) {
    grandTotalOutput.value = formatMoney(state.totals.grandTotal);
  }
  const trojanTons = parsePositiveNumberOrZero(state.totals.trojanDeckTons);
  const brokeredTons = parsePositiveNumberOrZero(state.totals.brokeredDeckTons);
  const joistTons = parsePositiveNumberOrZero(state.joists.tons);
  if (pricingTonnageTotalOutput) {
    const totalTons = trojanTons + brokeredTons + joistTons;
    pricingTonnageTotalOutput.textContent = formatTwoDecimals(totalTons);
  }
}

function renderPricingScheduleRows(rows) {
  if (!rows || rows.length === 0) {
    return '<p class="help-text">No line items.</p>';
  }
  return rows
    .map(
      (row) => `
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>${row.vendor}</span>
          <strong>${formatMoney(row.extendedTotal)}</strong>
        </div>
        <p class="pricing-line-item-meta">TONS: ${formatTwoDecimals(row.tons)} | RATE: ${formatMoney(row.pricePerTon)}/TON</p>
      </div>
    `,
    )
    .join("");
}

function renderTrojanDeckLineRows(rows) {
  const filtered = (rows || []).filter((row) => row.tons > 0);
  if (filtered.length === 0) {
    return '<p class="help-text">No Trojan deck lines.</p>';
  }
  return filtered
    .map(
      (row) => `
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>${row.profile}</span>
          <strong>TONS: ${formatTwoDecimals(row.tons)}</strong>
        </div>
        <p class="pricing-line-item-meta">SQS: ${formatTwoDecimals(row.sqs)} | TONS: ${formatTwoDecimals(row.tons)}</p>
      </div>
    `,
    )
    .join("");
}

function renderBrokeredDeckLineRows(rows) {
  const filtered = (rows || []).filter((row) => row.vendor !== "TROJAN" && row.tons > 0);
  if (filtered.length === 0) {
    return '<p class="help-text">No supplier deck lines.</p>';
  }
  return filtered
    .map(
      (row) => `
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>${row.profile}</span>
          <strong>TONS: ${formatTwoDecimals(row.tons)}</strong>
        </div>
        <p class="pricing-line-item-meta">SUPPLIER: ${row.vendor} | SQS: ${formatTwoDecimals(row.sqs)} | TONS: ${formatTwoDecimals(row.tons)}</p>
      </div>
    `,
    )
    .join("");
}

function renderAccessoriesScheduleRows(accessories) {
  if (!accessories || accessories.length === 0) {
    return '<p class="help-text">No accessories.</p>';
  }
  return accessories
    .map((item, index) => {
      const type = item.type || `Accessory #${index + 1}`;
      const qty = isTekAccessoryType(item.type)
        ? `SCREWS: ${Number.isFinite(item.screwCount) ? item.screwCount : 0}`
        : isCcAccessoryType(item.type)
          ? `TONS: ${formatTwoDecimals(parsePositiveNumberOrZero(item.tons))}`
          : "No quantity";
      return `
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>${type}</span>
          <strong>${qty}</strong>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderTrojanDeckCogs(overrideBreakdown = null) {
  const breakdown = overrideBreakdown || getTrojanDeckCogsBreakdown();
  if (!breakdown.hasTrojanDeck) {
    return '<p class="help-text">No Trojan deck tons in scope.</p>';
  }

  const isDerivedMargin = Boolean(breakdown.isBoostDerivedMargin);
  const marginMeta = isDerivedMargin
    ? "Margin % is derived from active Boost pricing."
    : `${formatMoney(breakdown.totalCogs)} x ${formatTwoDecimals(breakdown.marginPercent)}% (minimum ${formatMoney(
        breakdown.minimumMarginAmount,
      )})`;

  return `
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Coil Cost</span><strong>${formatMoney(breakdown.coilCost)}</strong></div>
        <p class="pricing-cogs-meta">${formatWholeNumber(breakdown.lbs)} LB x ${formatCurrency(
          parseCurrency(state.admin.sections.trojan.values.coilCostPerLb),
        )}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Inbound Freight</span><strong>${formatMoney(breakdown.inboundCost)}</strong></div>
        <p class="pricing-cogs-meta">${formatWholeNumber(breakdown.lbs)} LB x ${formatCurrency(
          parseCurrency(state.admin.sections.trojan.values.inboundFreightPerLb),
        )}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Labor</span><strong>${formatMoney(breakdown.laborCost)}</strong></div>
        <p class="pricing-cogs-meta">${formatWholeNumber(breakdown.lbs)} LB x ${formatCurrency(
          parseCurrency(state.admin.sections.trojan.values.laborPerLb),
        )}/LB</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total Trucks</span><strong>${formatWholeNumber(breakdown.trucks)}</strong></div>
        <p class="pricing-cogs-meta">${formatWholeNumber(breakdown.lbs)} LB / 48,000 LB per truck</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total Miles</span><strong>${formatTwoDecimals(breakdown.miles)}</strong></div>
        <p class="pricing-cogs-meta">Facility to project location (driving)</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Outbound Freight</span><strong>${formatMoney(breakdown.outboundCost)}</strong></div>
        <p class="pricing-cogs-meta">${formatWholeNumber(breakdown.trucks)} trucks x ${formatTwoDecimals(
          breakdown.miles,
        )} miles x ${formatCurrency(parseCurrency(state.admin.sections.trojan.values.outboundFreightPerMi))}/MI (min ${formatCurrency(
          parseCurrency(state.admin.sections.trojan.values.minimumOutboundFreightPerTruck),
        )}/truck)</p>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Total COGS</span><strong>${formatMoney(breakdown.totalCogs)}</strong></div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Margin %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${breakdown.marginPercent}"
            data-action="pricing-margin-input"
            data-pricing-margin-section="trojanDeck"
            ${isDerivedMargin ? "disabled" : ""}
          />
        </div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${formatMoney(breakdown.marginAmount)}</strong></div>
        <p class="pricing-cogs-meta">${marginMeta}</p>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Retail Trojan Deck Price</span><strong>${formatMoney(
          breakdown.totalWithMargin,
        )}</strong></div>
      </div>
    </div>
  `;
}

function getTrojanDeckCogsBreakdown(trojanDeckTonsOverride = null) {
  const trojan = state.admin.sections.trojan.values;
  const trojanDeckTons =
    trojanDeckTonsOverride === null
      ? parsePositiveNumberOrZero(state.totals.trojanDeckTons)
      : parsePositiveNumberOrZero(trojanDeckTonsOverride);
  const lbs = trojanDeckTons * 2000;
  const coilRate = parseCurrency(trojan.coilCostPerLb);
  const inboundRate = parseCurrency(trojan.inboundFreightPerLb);
  const laborRate = parseCurrency(trojan.laborPerLb);
  const outboundRate = parseCurrency(trojan.outboundFreightPerMi);
  const minimumFreightPerTruck = parseCurrency(trojan.minimumOutboundFreightPerTruck);
  const miles = parsePositiveNumberOrZero(state.milesFromTrojanFacility);
  const trucks = trojanDeckTons > 0 ? Math.ceil(lbs / 48000) : 0;
  const coilCost = lbs * coilRate;
  const inboundCost = lbs * inboundRate;
  const laborCost = lbs * laborRate;
  const outboundCost = trucks * Math.max(miles * outboundRate, minimumFreightPerTruck);
  const totalCogs = coilCost + inboundCost + laborCost + outboundCost;
  const minimumMarginAmount = getTrojanMinimumProjectMargin();
  const marginApplied = applyPricingMargin(totalCogs, "trojanDeck", getAppliedOptimizationTrojanMarginPercentOverride());
  const marginAmount = marginApplied.marginAmount;
  const totalWithMargin = totalCogs + marginAmount;

  return {
    hasTrojanDeck: trojanDeckTons > 0,
    trojanDeckTons,
    lbs,
    trucks,
    miles,
    coilCost,
    inboundCost,
    laborCost,
    outboundCost,
    totalCogs,
    marginPercent: marginApplied.marginPercent,
    minimumMarginAmount,
    marginAmount,
    totalWithMargin,
  };
}

function getAccessoriesCogsBreakdown() {
  const trojan = state.admin.sections.trojan.values;
  const costPerScrew = parseCurrency(trojan.accessoriesCostPerScrew);
  const costPerTon = parseCurrency(trojan.accessoriesCostPerTon);

  const totalScrewCount = (state.accessories || []).reduce((sum, item) => {
    if (!isTekAccessoryType(item.type)) {
      return sum;
    }
    const count = Number.isFinite(item.screwCount) ? item.screwCount : 0;
    return sum + Math.max(0, count);
  }, 0);

  const totalAccessoryTons = (state.accessories || []).reduce((sum, item) => {
    if (!isCcAccessoryType(item.type)) {
      return sum;
    }
    return sum + parsePositiveNumberOrZero(item.tons);
  }, 0);

  const screwCost = totalScrewCount * costPerScrew;
  const tonnageCost = totalAccessoryTons * costPerTon;
  const totalCogs = screwCost + tonnageCost;

  return {
    hasAccessories: totalScrewCount > 0 || totalAccessoryTons > 0,
    totalScrewCount,
    totalAccessoryTons,
    costPerScrew,
    costPerTon,
    screwCost,
    tonnageCost,
    totalCogs,
  };
}

function renderAccessoriesCogs() {
  const breakdown = getAccessoriesCogsBreakdown();
  if (!breakdown.hasAccessories) {
    return '<p class="help-text">No accessories in scope.</p>';
  }

  const screwLineItem =
    breakdown.totalScrewCount > 0
      ? `
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Screw Count Cost</span><strong>${formatMoney(breakdown.screwCost)}</strong></div>
        <p class="pricing-cogs-meta">${formatWholeNumber(breakdown.totalScrewCount)} screws x ${formatCurrency(
          breakdown.costPerScrew,
        )} each</p>
      </div>
    `
      : "";

  const tonnageLineItem =
    breakdown.totalAccessoryTons > 0
      ? `
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Accessories Tonnage Cost</span><strong>${formatMoney(
          breakdown.tonnageCost,
        )}</strong></div>
        <p class="pricing-cogs-meta">${formatTwoDecimals(breakdown.totalAccessoryTons)} tons x ${formatCurrency(
          breakdown.costPerTon,
        )}/TON</p>
      </div>
    `
      : "";

  return `
    <div class="pricing-cogs-grid">
      ${screwLineItem}
      ${tonnageLineItem}
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Accessories COGS Delivered</span><strong>${formatMoney(
          breakdown.totalCogs,
        )}</strong></div>
      </div>
    </div>
  `;
}

function getJoistsPricingBreakdown() {
  const tons = parsePositiveNumberOrZero(state.joists.tons);
  const supplierLookup = resolveSupplierForPricing(state.joists.supplier);
  const supplier = supplierLookup.pricingSupplier;
  logSupplierPricingDebug("selected supplier value from UI", supplierLookup.selectedRaw);
  logSupplierPricingDebug("supplier object found", supplierLookup.matchedRow || "not found");
  if (tons <= 0 || supplier === "") {
    return {
      hasJoists: false,
      vendor: supplier,
      supplier,
      tons: 0,
      lbs: 0,
      baseCost: 0,
      surcharge: 0,
      subtotalCost: 0,
      marginPercent: getPricingMarginPercent("joists"),
      marginAmount: 0,
      totalCost: 0,
      detail: "",
      errorMessage: "",
    };
  }

  if (supplier === "CANO") {
    const perLb = parseCurrency(state.admin.sections.cano.values.perLb);
    logSupplierPricingDebug("price fields being used for calculation", {
      supplier,
      perLbRaw: state.admin.sections.cano.values.perLb,
      perLb,
      tons,
    });
    if (perLb <= 0) {
      const marginAppliedMissing = applyPricingMargin(0, "joists");
      return {
        hasJoists: true,
        vendor: supplier,
        supplier,
        tons,
        lbs: tons * 2000,
        baseCost: 0,
        surcharge: 0,
        subtotalCost: 0,
        marginPercent: marginAppliedMissing.marginPercent,
        marginAmount: marginAppliedMissing.marginAmount,
        totalCost: 0,
        detail: "",
        errorMessage: "Missing required pricing for CANO: perLb ($/LB).",
      };
    }
    const lbs = tons * 2000;
    const baseCost = lbs * perLb;
    const marginApplied = applyPricingMargin(baseCost, "joists");
    return {
      hasJoists: true,
      vendor: supplier,
      supplier,
      tons,
      lbs,
      baseCost,
      surcharge: 0,
      subtotalCost: baseCost,
      marginPercent: marginApplied.marginPercent,
      marginAmount: marginApplied.marginAmount,
      totalCost: marginApplied.totalWithMargin,
      detail: `${formatWholeNumber(lbs)} LB x ${formatCurrency(perLb)}/LB`,
      errorMessage: "",
    };
  }

  if (supplier === "CSC") {
    const bucketPrice = getBucketPrice({ vendor: "CSC", scope: "JOISTS", tons });
    const ratePerTon = bucketPrice.pricePerTon;
    logSupplierPricingDebug("price fields being used for calculation", {
      supplier,
      tons,
      bucketStart: bucketPrice.bucketStart,
      bucketEnd: bucketPrice.bucketEnd,
      ratePerTon,
      extraShippingFee_0_9: state.admin.sections.csc.values.joists.extraShippingFee_0_9,
    });
    if (ratePerTon <= 0) {
      const marginAppliedMissing = applyPricingMargin(0, "joists");
      return {
        hasJoists: true,
        vendor: supplier,
        supplier,
        tons,
        lbs: tons * 2000,
        baseCost: 0,
        surcharge: 0,
        subtotalCost: 0,
        marginPercent: marginAppliedMissing.marginPercent,
        marginAmount: marginAppliedMissing.marginAmount,
        totalCost: 0,
        detail: "",
        errorMessage: "Missing required pricing for CSC: JOISTS bucket cost for selected tonnage.",
      };
    }
    const baseCost = tons * ratePerTon;
    const surcharge =
      bucketPrice.bucketStart === 0 && bucketPrice.bucketEnd === 9
        ? parseCurrency(state.admin.sections.csc.values.joists.extraShippingFee_0_9)
        : 0;
    const subtotalCost = baseCost + surcharge;
    const marginApplied = applyPricingMargin(subtotalCost, "joists");
    return {
      hasJoists: true,
      vendor: supplier,
      supplier,
      tons,
      lbs: tons * 2000,
      baseCost,
      surcharge,
      subtotalCost,
      marginPercent: marginApplied.marginPercent,
      marginAmount: marginApplied.marginAmount,
      totalCost: marginApplied.totalWithMargin,
      detail: `${formatTwoDecimals(tons)} TONS x ${formatCurrency(ratePerTon)}/TON`,
      errorMessage: "",
    };
  }

  logSupplierPricingDebug("price fields being used for calculation", {
    supplier,
    tons,
    note: "No configured joist pricing branch for supplier",
  });
  const marginApplied = applyPricingMargin(0, "joists");
  return {
    hasJoists: true,
    vendor: supplier,
    supplier,
    tons,
    lbs: tons * 2000,
    baseCost: 0,
    surcharge: 0,
    subtotalCost: 0,
    marginPercent: marginApplied.marginPercent,
    marginAmount: marginApplied.marginAmount,
    totalCost: 0,
    detail: "",
    errorMessage: `No joist pricing configured for supplier "${supplierLookup.selectedRaw || supplier}".`,
  };
}

function applyMinimumMarginToLiveBreakdowns(trojanBreakdown, brokeredBreakdown, joistsBreakdown) {
  const participants = [];
  if (trojanBreakdown?.hasTrojanDeck) {
    participants.push({
      supplier: "TROJAN",
      subtotalCost: parsePositiveNumberOrZero(trojanBreakdown.totalCogs),
      marginAmount: parsePositiveNumberOrZero(trojanBreakdown.marginAmount),
      locked: Boolean(state.pricingMarginOverrides.trojanDeck),
      sync: (marginAmount) => {
        trojanBreakdown.marginAmount = marginAmount;
        trojanBreakdown.marginPercent =
          trojanBreakdown.totalCogs > 0 ? (marginAmount / trojanBreakdown.totalCogs) * 100 : trojanBreakdown.marginPercent;
        trojanBreakdown.totalWithMargin = trojanBreakdown.totalCogs + marginAmount;
      },
    });
  }

  (brokeredBreakdown?.entries || []).forEach((entry) => {
    participants.push({
      supplier: String(entry.vendor || "").trim().toUpperCase(),
      subtotalCost: parsePositiveNumberOrZero(entry.cost),
      marginAmount: parsePositiveNumberOrZero(entry.marginAmount),
      locked: Boolean(state.pricingMarginOverrides.brokeredDeck),
      sync: (marginAmount) => {
        entry.marginAmount = marginAmount;
        entry.marginPercent = entry.cost > 0 ? (marginAmount / entry.cost) * 100 : entry.marginPercent;
        entry.totalCost = entry.cost + marginAmount;
      },
    });
  });

  if (joistsBreakdown?.hasJoists) {
    participants.push({
      supplier: String(joistsBreakdown.vendor || "").trim().toUpperCase(),
      subtotalCost: parsePositiveNumberOrZero(joistsBreakdown.subtotalCost),
      marginAmount: parsePositiveNumberOrZero(joistsBreakdown.marginAmount),
      locked: Boolean(state.pricingMarginOverrides.joists),
      sync: (marginAmount) => {
        joistsBreakdown.marginAmount = marginAmount;
        joistsBreakdown.marginPercent =
          joistsBreakdown.subtotalCost > 0
            ? (marginAmount / joistsBreakdown.subtotalCost) * 100
            : joistsBreakdown.marginPercent;
        joistsBreakdown.totalCost = joistsBreakdown.subtotalCost + marginAmount;
      },
    });
  }

  enforceMinProjectMarginByPriority(participants, getTrojanMinimumProjectMargin());

  if (brokeredBreakdown) {
    brokeredBreakdown.marginAmount = (brokeredBreakdown.entries || []).reduce(
      (sum, entry) => sum + parsePositiveNumberOrZero(entry.marginAmount),
      0,
    );
    brokeredBreakdown.marginPercent =
      brokeredBreakdown.subtotalCost > 0 ? (brokeredBreakdown.marginAmount / brokeredBreakdown.subtotalCost) * 100 : 0;
    brokeredBreakdown.totalCost = brokeredBreakdown.subtotalCost + brokeredBreakdown.marginAmount;
  }
}

function renderJoistsCogs(overrideBreakdown = null) {
  const breakdown = overrideBreakdown || getJoistsPricingBreakdown();
  if (!breakdown.hasJoists) {
    return '<p class="help-text">No joists in scope.</p>';
  }
  const detailMarkup = breakdown.detail ? `<p class="pricing-cogs-meta">${breakdown.detail}</p>` : "";
  const errorMarkup = breakdown.errorMessage ? `<p class="help-text">${escapeHtml(breakdown.errorMessage)}</p>` : "";

  const surchargeLineItem =
    breakdown.surcharge > 0
      ? `
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>CSC Surcharge (&lt;10 Tons)</span><strong>${formatMoney(
          breakdown.surcharge,
        )}</strong></div>
      </div>
    `
      : "";

  return `
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>${breakdown.supplier} Joist Cost</span><strong>${formatMoney(
          breakdown.baseCost,
        )}</strong></div>
        ${detailMarkup}
        ${errorMarkup}
      </div>
      ${surchargeLineItem}
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Margin %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${breakdown.marginPercent}"
            data-action="pricing-margin-input"
            data-pricing-margin-section="joists"
          />
        </div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${formatMoney(breakdown.marginAmount)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Joist Cost</span><strong>${formatMoney(breakdown.totalCost)}</strong></div>
      </div>
    </div>
  `;
}

function getDetailingScopeType(deckTons, joistTons) {
  const hasDeck = parsePositiveNumberOrZero(deckTons) > 0;
  const hasJoists = parsePositiveNumberOrZero(joistTons) > 0;
  if (hasDeck && hasJoists) {
    return "DECK+JOISTS";
  }
  if (hasDeck) {
    return "DECK_ONLY";
  }
  if (hasJoists) {
    return "JOIST_ONLY";
  }
  return "";
}

function findDetailingBucket(totalTons, scopeType, tier) {
  const values = normalizeDetailingValues(state.admin.sections.detailing.values);
  const bucketTons = getBucketSelectionTons(totalTons);
  const normalizedTier = Number.parseInt(String(tier || 2), 10);
  const rows = values.buckets || [];
  const directMatch = rows.find(
    (row) =>
      row.scopeType === scopeType &&
      row.tier === normalizedTier &&
      bucketTons >= parseCurrency(row.start) &&
      bucketTons <= parseCurrency(row.end),
  );
  if (directMatch) {
    return { ...directMatch, bucketTons };
  }

  const sameScopeTier = rows.filter((row) => row.scopeType === scopeType && row.tier === normalizedTier);
  const fallbackByScopeTier = sameScopeTier.sort((a, b) => parseCurrency(a.end) - parseCurrency(b.end))[sameScopeTier.length - 1];
  if (fallbackByScopeTier) {
    return { ...fallbackByScopeTier, bucketTons };
  }

  const sameScope = rows.filter((row) => row.scopeType === scopeType);
  const fallbackByScope = sameScope.sort((a, b) => parseCurrency(a.end) - parseCurrency(b.end))[sameScope.length - 1];
  if (fallbackByScope) {
    return { ...fallbackByScope, bucketTons };
  }

  return null;
}

function getDetailingPricingBreakdown(subtotal, deckTons, joistTons, options = {}) {
  const syncState = options.syncState !== false;
  const safeSubtotal = parsePositiveNumberOrZero(subtotal);
  const safeDeckTons = parsePositiveNumberOrZero(deckTons);
  const safeJoistTons = parsePositiveNumberOrZero(joistTons);
  const totalTons = safeDeckTons + safeJoistTons;
  const scopeType = getDetailingScopeType(safeDeckTons, safeJoistTons);
  const tier = Number.parseInt(String(state.projectComplexityTier || "2"), 10) || 2;
  const detailingValues = normalizeDetailingValues(state.admin.sections.detailing.values);
  const minimumFee = Math.max(500, parseCurrency(detailingValues.minimumFee));
  const matchedBucket = scopeType ? findDetailingBucket(totalTons, scopeType, tier) : null;
  const autoPercent = matchedBucket ? parseCurrency(matchedBucket.detailingPercent) : 0;
  const overridePercent =
    state.pricingDetailing.detailingPercentOverride === null ||
    state.pricingDetailing.detailingPercentOverride === undefined
      ? null
      : parsePositiveNumberOrZero(state.pricingDetailing.detailingPercentOverride);
  const appliedPercent = overridePercent !== null ? overridePercent : autoPercent;
  const isZeroOverride = overridePercent !== null && appliedPercent === 0;
  const detailingAmount =
    safeSubtotal > 0
      ? isZeroOverride
        ? 0
        : Math.max(safeSubtotal * (appliedPercent / 100), minimumFee)
      : 0;
  const finalTotal = safeSubtotal + detailingAmount;

  if (syncState) {
    state.pricingDetailing.detailingPercentAuto = autoPercent;
    state.pricingDetailing.detailingAmount = detailingAmount;
    state.pricingDetailing.subtotal = safeSubtotal;
    state.pricingDetailing.finalTotal = finalTotal;
  }

  return {
    subtotal: safeSubtotal,
    deckTons: safeDeckTons,
    joistTons: safeJoistTons,
    totalTons,
    scopeType,
    tier,
    minimumFee,
    matchedBucket,
    autoPercent,
    overridePercent,
    appliedPercent,
    detailingAmount,
    finalTotal,
  };
}

function renderDetailingCogs(breakdown) {
  if (!breakdown || breakdown.subtotal <= 0) {
    return '<p class="help-text">No pricing subtotal in scope.</p>';
  }
  const resetButton =
    breakdown.overridePercent !== null
      ? `
      <button
        type="button"
        class="btn-secondary"
        data-action="pricing-detailing-reset-auto"
      >
        RESET TO AUTO
      </button>
    `
      : "";

  return `
    <div class="pricing-cogs-grid">
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Auto Detailing %</span><strong>${formatTwoDecimals(breakdown.autoPercent)}%</strong></div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Detailing %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${formatTwoDecimals(breakdown.appliedPercent)}"
            data-action="pricing-detailing-percent-input"
          />
        </div>
        ${resetButton}
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Minimum Detailing Fee</span><strong>${formatMoney(breakdown.minimumFee)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Detailing Cost</span><strong>${formatMoney(breakdown.detailingAmount)}</strong></div>
      </div>
    </div>
  `;
}

function getBrokeredDeckPricingBreakdown() {
  const roundToTwo = (value) => Math.round(parsePositiveNumberOrZero(value) * 100) / 100;
  const assignments = (state.vendorPlan?.deckAssignments || []).filter((item) => item.vendor !== "TROJAN" && item.tons > 0);
  const adminPricingSnapshot = getAdminPricingSnapshot();
  const grouped = new Map();
  assignments.forEach((item) => {
    const vendor = String(item.vendor || "").trim().toUpperCase();
    if (!grouped.has(vendor)) {
      grouped.set(vendor, { vendor, tons: 0, lbs: 0, cost: 0, pricingMode: "none", detail: "", errorMessage: "" });
    }
    const entry = grouped.get(vendor);
    entry.tons += parsePositiveNumberOrZero(item.tons);
  });

  const entries = Array.from(grouped.values()).map((entry) => {
    const supplierLookup = resolveSupplierForPricing(entry.vendor);
    const pricingVendor = supplierLookup.pricingSupplier;
    entry.tons = roundToTwo(entry.tons);
    entry.lbs = entry.tons * 2000;
    if (pricingVendor === "CANO") {
      const perLb = parseCurrency(state.admin.sections.cano.values.perLb);
      entry.cost = perLb > 0 ? entry.lbs * perLb : 0;
      entry.pricingMode = "cano";
      entry.detail = `${formatWholeNumber(entry.lbs)} LB x ${formatCurrency(perLb)}/LB`;
      if (perLb <= 0) {
        entry.errorMessage = "Missing required pricing for CANO: perLb ($/LB).";
      }
      return entry;
    }
    const ratePerTon = getDeckRateForVendor(pricingVendor, entry.tons, adminPricingSnapshot);
    if (ratePerTon > 0) {
      entry.cost = entry.tons * ratePerTon;
      entry.pricingMode = pricingVendor === "CSC" ? "csc" : "factor";
      entry.detail = `${formatTwoDecimals(entry.tons)} TONS x ${formatCurrency(ratePerTon)}/TON`;
      return entry;
    }

    entry.cost = 0;
    entry.pricingMode = "none";
    entry.detail = "";
    entry.errorMessage = `No pricing configured for supplier "${entry.vendor}".`;
    return entry;
  });

  const totalCost = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.cost), 0);
  const totalTons = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.tons), 0);
  const totalLbs = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.lbs), 0);
  entries.forEach((entry) => {
    const marginApplied = applyPricingMargin(entry.cost, "brokeredDeck");
    entry.marginPercent = marginApplied.marginPercent;
    entry.marginAmount = marginApplied.marginAmount;
    entry.totalCost = entry.cost + entry.marginAmount;
  });
  const marginAmount = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.marginAmount), 0);
  const marginPercent = totalCost > 0 ? (marginAmount / totalCost) * 100 : getPricingMarginPercent("brokeredDeck");

  return {
    hasBrokeredDeck: entries.length > 0,
    entries,
    subtotalCost: totalCost,
    marginPercent,
    marginAmount,
    totalCost: totalCost + marginAmount,
    totalTons,
    totalLbs,
  };
}

function renderBrokeredDeckCogs(overrideBreakdown = null) {
  const breakdown = overrideBreakdown || getBrokeredDeckPricingBreakdown();
  if (!breakdown.hasBrokeredDeck) {
    return '<p class="help-text">No supplier deck tons in scope.</p>';
  }

  const lineItems = breakdown.entries
    .map(
      (entry) => `
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>${entry.vendor} Deck Cost</span><strong>${formatMoney(entry.cost)}</strong></div>
        ${entry.detail ? `<p class="pricing-cogs-meta">${entry.detail}</p>` : ""}
        ${entry.errorMessage ? `<p class="help-text">${escapeHtml(entry.errorMessage)}</p>` : ""}
      </div>
    `,
    )
    .join("");

  return `
    <div class="pricing-cogs-grid">
      ${lineItems}
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row">
          <span>Margin %</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value="${breakdown.marginPercent}"
            data-action="pricing-margin-input"
            data-pricing-margin-section="brokeredDeck"
          />
        </div>
      </div>
      <div class="pricing-cogs-item">
        <div class="pricing-cogs-row"><span>Margin Amount</span><strong>${formatMoney(breakdown.marginAmount)}</strong></div>
      </div>
      <div class="pricing-cogs-item pricing-cogs-total">
        <div class="pricing-cogs-row"><span>Total Supplier Deck Cost</span><strong>${formatMoney(breakdown.totalCost)}</strong></div>
      </div>
    </div>
  `;
}

function getBrokeredDeckTonsForOptimization() {
  return Math.round(
    ((state.vendorPlan?.deckAssignments || [])
      .filter((item) => String(item.vendor || "").trim().toUpperCase() !== "TROJAN")
      .reduce((sum, item) => sum + parsePositiveNumberOrZero(item.tons), 0) *
      100) /
      100,
  );
}

function getVendorDeckCostBreakdownForOptimization(vendor, tons) {
  const normalizedVendor = String(vendor || "").trim().toUpperCase();
  const normalizedTons = Math.round(parsePositiveNumberOrZero(tons) * 100) / 100;
  if (normalizedTons <= 0 || (normalizedVendor !== "CSC" && normalizedVendor !== "CANO")) {
    return {
      vendor: normalizedVendor,
      tons: 0,
      subtotalCost: 0,
      marginPercent: getPricingMarginPercent("brokeredDeck"),
      marginAmount: 0,
      totalCost: 0,
      detail: "No supplier deck tons in scope",
    };
  }

  if (normalizedVendor === "CANO") {
    const lbs = normalizedTons * 2000;
    const perLb = parseCurrency(state.admin.sections.cano.values.perLb);
    const subtotalCost = lbs * perLb;
    const margin = applyPricingMargin(subtotalCost, "brokeredDeck");
    return {
      vendor: normalizedVendor,
      tons: normalizedTons,
      subtotalCost,
      marginPercent: margin.marginPercent,
      marginAmount: margin.marginAmount,
      totalCost: margin.totalWithMargin,
      detail: `${formatWholeNumber(lbs)} LB x ${formatCurrency(perLb)}/LB`,
    };
  }

  const bucketPrice = getBucketPrice({ vendor: "CSC", scope: "DECK", tons: normalizedTons });
  const ratePerTon = bucketPrice.pricePerTon;
  const subtotalCost = normalizedTons * ratePerTon;
  const margin = applyPricingMargin(subtotalCost, "brokeredDeck");
  return {
    vendor: normalizedVendor,
    tons: normalizedTons,
    subtotalCost,
    marginPercent: margin.marginPercent,
    marginAmount: margin.marginAmount,
    totalCost: margin.totalWithMargin,
    detail: `${formatTwoDecimals(normalizedTons)} TONS x ${formatCurrency(ratePerTon)}/TON`,
  };
}

function getVendorJoistCostBreakdownForOptimization(vendor, tons) {
  const normalizedVendor = String(vendor || "").trim().toUpperCase();
  const normalizedTons = parsePositiveNumberOrZero(tons);
  if (normalizedTons <= 0 || (normalizedVendor !== "CSC" && normalizedVendor !== "CANO")) {
    return {
      vendor: normalizedVendor,
      tons: 0,
      subtotalCost: 0,
      surcharge: 0,
      marginPercent: getPricingMarginPercent("joists"),
      marginAmount: 0,
      totalCost: 0,
      detail: "No joist tons in scope",
    };
  }

  if (normalizedVendor === "CANO") {
    const lbs = normalizedTons * 2000;
    const perLb = parseCurrency(state.admin.sections.cano.values.perLb);
    const subtotalCost = lbs * perLb;
    const margin = applyPricingMargin(subtotalCost, "joists");
    return {
      vendor: normalizedVendor,
      tons: normalizedTons,
      subtotalCost,
      surcharge: 0,
      marginPercent: margin.marginPercent,
      marginAmount: margin.marginAmount,
      totalCost: margin.totalWithMargin,
      detail: `${formatWholeNumber(lbs)} LB x ${formatCurrency(perLb)}/LB`,
    };
  }

  const bucketPrice = getBucketPrice({ vendor: "CSC", scope: "JOISTS", tons: normalizedTons });
  const ratePerTon = bucketPrice.pricePerTon;
  const baseCost = normalizedTons * ratePerTon;
  const surcharge =
    bucketPrice.bucketStart === 0 && bucketPrice.bucketEnd === 9
      ? parseCurrency(state.admin.sections.csc.values.joists.extraShippingFee_0_9)
      : 0;
  const subtotalCost = baseCost + surcharge;
  const margin = applyPricingMargin(subtotalCost, "joists");
  return {
    vendor: normalizedVendor,
    tons: normalizedTons,
    subtotalCost,
    surcharge,
    marginPercent: margin.marginPercent,
    marginAmount: margin.marginAmount,
    totalCost: margin.totalWithMargin,
    detail: `${formatTwoDecimals(normalizedTons)} TONS x ${formatCurrency(ratePerTon)}/TON`,
  };
}

const KNOWN_OPTIMIZATION_SUPPLIERS = ["TROJAN", "CANO", "CSC", "CUTTING EDGE", "CORDECK", "CSM", "HOUSTONBDECK"];

function isSupplierRuleEligibleForFlags(rule, flags) {
  if (!rule) {
    return false;
  }
  if (flags.americanSteelRequired && !rule.americanSteelRequired) {
    return false;
  }
  if (flags.americanManufacturing && !rule.americanManufacturing) {
    return false;
  }
  if (flags.sdiManufacturer && !rule.sdiManufacturing) {
    return false;
  }
  return true;
}

function isSupplierRuleMatchForDeckLine(rule, line, flags = {}) {
  if (!rule || !line) {
    return false;
  }
  if (!isSupplierRuleEligibleForFlags(rule, flags)) {
    return false;
  }
  if (String(rule.supplier || "").trim().toUpperCase() === "TROJAN" && !isTrojanEligibleForLine(line, flags)) {
    return false;
  }
  const depthNumber = Number.parseFloat(String(line.specs?.depth || "").trim());
  if (!Number.isFinite(depthNumber)) {
    return false;
  }
  const depthMatch = (rule.depths || []).some((depth) => Math.abs(depth - depthNumber) < 0.0001);
  if (!depthMatch) {
    return false;
  }
  const profileKey = normalizeRuleKey(String(line.specs?.profile || "").trim());
  if (!profileKey) {
    return true;
  }
  if (!rule.profileAvailability || !Object.prototype.hasOwnProperty.call(rule.profileAvailability, profileKey)) {
    return true;
  }
  return Boolean(rule.profileAvailability[profileKey]);
}

function getOptimizationFallbackRuleMap() {
  const map = new Map();
  DEFAULT_SUPPLIER_RULE_ROWS.forEach((row) => {
    const normalized = normalizeSupplierRuleRow(row);
    if (normalized.supplier) {
      map.set(normalized.supplier, normalized);
    }
  });
  return map;
}

function getSupplierCatalog(normalizedRules = null) {
  const sourceRules = Array.isArray(normalizedRules)
    ? normalizedRules
    : getActiveSupplierRules()
        .map((row) => normalizeSupplierRuleRow(row))
        .filter((row) => row.supplier !== "");
  const fallbackMap = getOptimizationFallbackRuleMap();
  const usableRules = sourceRules
    .map((rule) => {
      if (!rule || !rule.supplier) {
        return null;
      }
      const fallback = fallbackMap.get(rule.supplier);
      return {
        ...rule,
        deck: Boolean(rule.deck),
        joists: Boolean(rule.joists),
        depths: Array.isArray(rule.depths) && rule.depths.length > 0 ? rule.depths : fallback?.depths || [],
        priority:
          Number.isFinite(rule.priority) && rule.priority < Number.MAX_SAFE_INTEGER
            ? rule.priority
            : fallback?.priority || Number.MAX_SAFE_INTEGER,
      };
    })
    .filter(Boolean);

  const rulesBySupplier = new Map();
  usableRules.forEach((rule) => {
    const supplier = String(rule.supplier || "").trim().toUpperCase();
    if (!supplier) {
      return;
    }
    if (!rulesBySupplier.has(supplier)) {
      rulesBySupplier.set(supplier, []);
    }
    rulesBySupplier.get(supplier).push(rule);
  });

  KNOWN_OPTIMIZATION_SUPPLIERS.forEach((supplier) => {
    if (!rulesBySupplier.has(supplier) && fallbackMap.has(supplier)) {
      rulesBySupplier.set(supplier, [{ ...fallbackMap.get(supplier) }]);
    }
  });

  const vendors = Array.from(rulesBySupplier.keys()).sort((a, b) => {
    const aPriority = Math.min(
      ...(rulesBySupplier.get(a) || []).map((rule) =>
        Number.isFinite(rule.priority) ? rule.priority : Number.MAX_SAFE_INTEGER,
      ),
    );
    const bPriority = Math.min(
      ...(rulesBySupplier.get(b) || []).map((rule) =>
        Number.isFinite(rule.priority) ? rule.priority : Number.MAX_SAFE_INTEGER,
      ),
    );
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    return a.localeCompare(b);
  });

  return {
    rulesBySupplier,
    vendors,
  };
}

function getProjectRequirements(input = {}) {
  const deckLines = (input.deckLines || []).filter((line) => parsePositiveNumberOrZero(line.rowTons) > 0);
  const deckTons = Math.round(deckLines.reduce((sum, line) => sum + parsePositiveNumberOrZero(line.rowTons), 0) * 100) / 100;
  const joistTons = parsePositiveNumberOrZero(input.joistTons);
  const flags = { ...(input.flags || {}) };
  const specifiedManufacturerName = String(flags.specifiedManufacturerName || "").trim().toUpperCase();
  return {
    deckLines,
    deckTons,
    joistTons,
    flags,
    specifiedManufacturerName,
    hasDeckScope: deckTons > 0,
    hasJoistScope: joistTons > 0,
  };
}

function getDeckOptimizationCandidateVendors(normalizedRules) {
  const catalog = getSupplierCatalog(normalizedRules);
  return catalog.vendors.filter((vendor) => (catalog.rulesBySupplier.get(vendor) || []).some((rule) => rule.deck));
}

function getJoistOptimizationCandidateVendors(normalizedRules) {
  const catalog = getSupplierCatalog(normalizedRules);
  return catalog.vendors.filter((vendor) => (catalog.rulesBySupplier.get(vendor) || []).some((rule) => rule.joists));
}

function hasDeckPricingForOptimization(vendor, tons, adminPricingSnapshot) {
  const normalizedVendor = String(vendor || "").trim().toUpperCase();
  const normalizedTons = parsePositiveNumberOrZero(tons);
  if (normalizedTons <= 0) {
    return true;
  }
  if (normalizedVendor === "TROJAN") {
    const breakdown = getTrojanDeckCogsBreakdown(normalizedTons);
    return parsePositiveNumberOrZero(breakdown.totalCogs) > 0 || parsePositiveNumberOrZero(breakdown.totalWithMargin) > 0;
  }
  if (normalizedVendor === "CSC" || normalizedVendor === "CANO") {
    const breakdown = getVendorDeckCostBreakdownForOptimization(normalizedVendor, normalizedTons);
    return parsePositiveNumberOrZero(breakdown.subtotalCost) > 0 || parsePositiveNumberOrZero(breakdown.totalCost) > 0;
  }
  const rate = getDeckRateForVendor(normalizedVendor, normalizedTons, adminPricingSnapshot);
  return parsePositiveNumberOrZero(rate) > 0;
}

function isVendorFeasibleForDeckLine(vendor, line, requirements, catalog) {
  const normalizedVendor = String(vendor || "").trim().toUpperCase();
  const vendorRules = catalog.rulesBySupplier.get(normalizedVendor) || [];
  if (vendorRules.length === 0) {
    return false;
  }
  return vendorRules.some((rule) => rule.deck && isSupplierRuleMatchForDeckLine(rule, line, requirements.flags));
}

function getVendorsFeasibleForDeckLines(
  lines,
  requirements,
  catalog,
  adminPricingSnapshot,
  pricedSupplierSets,
  allowedSuppliers = null,
) {
  if (!Array.isArray(lines) || lines.length === 0) {
    return [];
  }
  const totalTons = lines.reduce((sum, line) => sum + parsePositiveNumberOrZero(line.rowTons), 0);
  const allowedSet = allowedSuppliers ? new Set(allowedSuppliers.map((item) => String(item || "").trim().toUpperCase())) : null;
  const pricedDeckSet = pricedSupplierSets?.pricedDeckSuppliers || new Set();
  return catalog.vendors.filter((vendor) => {
    if (!pricedDeckSet.has(vendor)) {
      return false;
    }
    if (allowedSet && !allowedSet.has(vendor)) {
      return false;
    }
    const allLinesMatch = lines.every((line) => isVendorFeasibleForDeckLine(vendor, line, requirements, catalog));
    if (!allLinesMatch) {
      return false;
    }
    return hasDeckPricingForOptimization(vendor, totalTons, adminPricingSnapshot);
  });
}

function buildDeckAssignmentsForOptimizationMap(deckLines, assignmentByLineId, adminPricingSnapshot) {
  return (deckLines || []).map((line, index) => {
    const tons = parsePositiveNumberOrZero(line.rowTons);
    const vendor = String(assignmentByLineId.get(line.id) || "").trim().toUpperCase();
    const pricePerTon = getDeckRateForVendor(vendor, tons, adminPricingSnapshot);
    return {
      lineId: line.id,
      lineIndex: index,
      profile: line.profileName || line.specs?.profile || "",
      sqs: parsePositiveNumberOrZero(line.rowSqs),
      vendor,
      reason: "Optimization scenario selection",
      tons,
      pricePerTon,
      extendedTotal: tons * pricePerTon,
    };
  });
}

function enumerateFeasibleDeckAssignments(requirements, catalog, adminPricingSnapshot, pricedSupplierSets) {
  if (!requirements.hasDeckScope) {
    return [{ deckMode: "auto", deckVendor: "", deckAssignments: [], deckBreakdown: null }];
  }

  const specifiedOnly =
    requirements.flags.specifiedManufacturer && requirements.specifiedManufacturerName
      ? [requirements.specifiedManufacturerName]
      : null;
  const deckLines = requirements.deckLines;
  const trojanEligibleLines = deckLines.filter((line) => isTrojanEligibleForLine(line, requirements.flags));
  const nonTrojanLines = deckLines.filter((line) => !isTrojanEligibleForLine(line, requirements.flags));
  const scenariosBySignature = new Map();

  function addDeckScenario(assignmentByLineId) {
    const deckAssignments = buildDeckAssignmentsForOptimizationMap(deckLines, assignmentByLineId, adminPricingSnapshot);
    if (deckAssignments.some((assignment) => !assignment.vendor)) {
      return;
    }
    const deckBreakdown = getDeckBreakdownFromAssignments(deckAssignments);
    if (!deckBreakdown.entries.length || parsePositiveNumberOrZero(deckBreakdown.totalCost) <= 0) {
      return;
    }
    const signature = deckAssignments
      .map((assignment) => `${assignment.lineId}:${assignment.vendor}`)
      .sort()
      .join("|");
    if (scenariosBySignature.has(signature)) {
      return;
    }
    const vendorsUsed = Array.from(new Set(deckAssignments.map((assignment) => assignment.vendor))).sort();
    scenariosBySignature.set(signature, {
      deckMode: vendorsUsed.length > 1 ? "mix" : "single",
      deckVendor: vendorsUsed.length === 1 ? vendorsUsed[0] : "",
      deckAssignments,
      deckBreakdown,
    });
  }

  const allLineVendors = getVendorsFeasibleForDeckLines(
    deckLines,
    requirements,
    catalog,
    adminPricingSnapshot,
    pricedSupplierSets,
    specifiedOnly,
  );
  allLineVendors.forEach((vendor) => {
    const assignmentByLineId = new Map(deckLines.map((line) => [line.id, vendor]));
    addDeckScenario(assignmentByLineId);
  });

  if (trojanEligibleLines.length > 0 && nonTrojanLines.length > 0) {
    const trojanGroupVendors = getVendorsFeasibleForDeckLines(
      trojanEligibleLines,
      requirements,
      catalog,
      adminPricingSnapshot,
      pricedSupplierSets,
      specifiedOnly,
    );
    const nonTrojanGroupVendors = getVendorsFeasibleForDeckLines(
      nonTrojanLines,
      requirements,
      catalog,
      adminPricingSnapshot,
      pricedSupplierSets,
      specifiedOnly,
    );
    trojanGroupVendors.forEach((trojanGroupVendor) => {
      nonTrojanGroupVendors.forEach((nonTrojanGroupVendor) => {
        const assignmentByLineId = new Map();
        trojanEligibleLines.forEach((line) => assignmentByLineId.set(line.id, trojanGroupVendor));
        nonTrojanLines.forEach((line) => assignmentByLineId.set(line.id, nonTrojanGroupVendor));
        addDeckScenario(assignmentByLineId);
      });
    });
  }

  return Array.from(scenariosBySignature.values());
}

function enumerateFeasibleJoistSuppliers(requirements, catalog, pricedSupplierSets) {
  if (!requirements.hasJoistScope) {
    return [""];
  }
  const pricedJoistSet = pricedSupplierSets?.pricedJoistSuppliers || new Set();
  return catalog.vendors.filter((vendor) => {
    if (!pricedJoistSet.has(vendor)) {
      return false;
    }
    const vendorRules = catalog.rulesBySupplier.get(vendor) || [];
    const hasJoistRule = vendorRules.some(
      (rule) => rule.joists && isSupplierRuleEligibleForFlags(rule, requirements.flags),
    );
    if (!hasJoistRule) {
      return false;
    }
    const pricing = getVendorJoistCostBreakdownForOptimization(vendor, requirements.joistTons);
    return parsePositiveNumberOrZero(pricing.subtotalCost) > 0 || parsePositiveNumberOrZero(pricing.totalCost) > 0;
  });
}

function getOptimizationEligibleDeckVendors(deckLines, flags, normalizedRules, candidateVendors = []) {
  const catalog = getSupplierCatalog(normalizedRules);
  const adminPricingSnapshot = getAdminPricingSnapshot();
  const pricedSupplierSets = getPricedSupplierSets(adminPricingSnapshot);
  const requirements = getProjectRequirements({
    deckLines,
    joistTons: 0,
    flags,
  });
  const candidateSet = new Set((candidateVendors || []).map((item) => String(item || "").trim().toUpperCase()));
  const scenarios = enumerateFeasibleDeckAssignments(requirements, catalog, adminPricingSnapshot, pricedSupplierSets);
  const vendors = new Set();
  scenarios.forEach((scenario) => {
    (scenario.deckAssignments || []).forEach((assignment) => {
      if (assignment.vendor) {
        vendors.add(String(assignment.vendor).trim().toUpperCase());
      }
    });
  });
  return Array.from(vendors.values()).filter((vendor) => candidateSet.size === 0 || candidateSet.has(vendor));
}

function getOptimizationEligibleJoistVendors(flags, normalizedRules, candidateVendors = []) {
  const catalog = getSupplierCatalog(normalizedRules);
  const pricedSupplierSets = getPricedSupplierSets(getAdminPricingSnapshot());
  const candidateSet = new Set((candidateVendors || []).map((item) => String(item || "").trim().toUpperCase()));
  const vendors = enumerateFeasibleJoistSuppliers(
    getProjectRequirements({
      deckLines: [],
      joistTons: parsePositiveNumberOrZero(state.joists.tons),
      flags,
    }),
    catalog,
    pricedSupplierSets,
  );
  return vendors.filter((vendor) => candidateSet.size === 0 || candidateSet.has(vendor));
}

function buildOptimizationScenarioLabel(deckBreakdown, joistVendor, includesJoists) {
  const parts = [];
  const deckEntries = (deckBreakdown?.entries || [])
    .filter((entry) => parsePositiveNumberOrZero(entry.tons) > 0)
    .sort((a, b) => {
      const aTrojan = a.vendor === "TROJAN" ? 0 : 1;
      const bTrojan = b.vendor === "TROJAN" ? 0 : 1;
      if (aTrojan !== bTrojan) {
        return aTrojan - bTrojan;
      }
      return String(a.vendor || "").localeCompare(String(b.vendor || ""));
    });
  deckEntries.forEach((entry) => {
    parts.push(`${entry.vendor} DECK`);
  });
  if (includesJoists && joistVendor) {
    parts.push(`${joistVendor} JOIST`);
  }
  return parts.join(" + ");
}

function getAdminPricingSnapshot() {
  return {
    trojan: { ...state.admin.sections.trojan.values },
    csc: normalizeCscValues(state.admin.sections.csc.values),
    cano: normalizeCanoValues(state.admin.sections.cano.values),
  };
}

function getLeadTimesConfig() {
  return normalizeLeadTimesValues({
    trojan: state.admin.sections.trojan.values.leadTimes,
    csc: state.admin.sections.csc.values.leadTimes,
    cano: state.admin.sections.cano.values.leadTimes,
  });
}

function normalizeLeadTimeSupplierSelections(supplierSelections, scopeType) {
  const normalizedScopeType = String(scopeType || "").trim().toLowerCase();
  const includeDeck = normalizedScopeType !== "joistonly" && normalizedScopeType !== "joist_only";
  const includeJoists = normalizedScopeType !== "deckonly" && normalizedScopeType !== "deck_only";

  const normalizedDeckSuppliers = new Set();
  const normalizedJoistSuppliers = new Set();

  const deckRaw = Array.isArray(supplierSelections?.deckSuppliers)
    ? supplierSelections.deckSuppliers
    : supplierSelections?.deckSupplier
      ? [supplierSelections.deckSupplier]
      : [];
  const joistRaw = Array.isArray(supplierSelections?.joistSuppliers)
    ? supplierSelections.joistSuppliers
    : supplierSelections?.joistSupplier
      ? [supplierSelections.joistSupplier]
      : [];

  if (includeDeck) {
    deckRaw.forEach((supplier) => {
      const normalized = String(supplier || "").trim().toUpperCase();
      if (LEAD_TIME_SUPPLIER_KEYS.includes(normalized)) {
        normalizedDeckSuppliers.add(normalized);
      }
    });
  }
  if (includeJoists) {
    joistRaw.forEach((supplier) => {
      const normalized = String(supplier || "").trim().toUpperCase();
      if (normalized !== "TROJAN" && LEAD_TIME_SUPPLIER_KEYS.includes(normalized)) {
        normalizedJoistSuppliers.add(normalized);
      }
    });
  }

  return {
    deckSuppliers: [...normalizedDeckSuppliers],
    joistSuppliers: [...normalizedJoistSuppliers],
    includeDeck,
    includeJoists,
  };
}

function getTrojanSubmittalsRange(leadTimesConfig, projectContext = {}) {
  const config = normalizeLeadTimesValues(leadTimesConfig);
  const hasJoists = Boolean(projectContext.hasJoistScope);
  const totalTons = parsePositiveNumberOrZero(projectContext.totalTons);
  let key = "submittalsDeckOnly";
  if (hasJoists) {
    key = totalTons >= 50 ? "submittalsDeckAndJoistsOver50" : "submittalsJoistsUnder50";
  }
  return {
    min: parseLeadTimeInteger(config.trojan?.[key]?.min),
    max: parseLeadTimeInteger(config.trojan?.[key]?.max),
    key,
  };
}

function getLeadTimeRange({ supplierSelections, specType, scopeType, leadTimesConfig }) {
  const normalizedSelections = normalizeLeadTimeSupplierSelections(supplierSelections, scopeType);
  const config = normalizeLeadTimesValues(leadTimesConfig);
  const submittalsRequired = specType?.submittalsRequired !== false;
  const hasDeckScope = Boolean(specType?.hasDeckScope ?? normalizedSelections.includeDeck);
  const hasJoistScope = Boolean(specType?.hasJoistScope ?? normalizedSelections.includeJoists);
  const totalTons = parsePositiveNumberOrZero(specType?.totalTons);
  const components = [];

  if (submittalsRequired) {
    const trojanSubmittals = getTrojanSubmittalsRange(config, {
      hasDeckScope,
      hasJoistScope,
      totalTons,
    });
    if (trojanSubmittals.min !== "" && trojanSubmittals.max !== "") {
      components.push({
        source: "TROJAN",
        component: "Submittals",
        min: trojanSubmittals.min,
        max: trojanSubmittals.max,
        rule: trojanSubmittals.key,
      });
    }
  }

  const involvedSuppliers = new Set();
  normalizedSelections.deckSuppliers.forEach((supplier) => involvedSuppliers.add(supplier));
  normalizedSelections.joistSuppliers.forEach((supplier) => involvedSuppliers.add(supplier));

  involvedSuppliers.forEach((supplier) => {
    const configKey = supplier.toLowerCase();
    const fabricationMin = parseLeadTimeInteger(config[configKey]?.fabrication?.min);
    const fabricationMax = parseLeadTimeInteger(config[configKey]?.fabrication?.max);
    if (fabricationMin !== "" && fabricationMax !== "") {
      components.push({
        source: supplier,
        component: "Fabrication",
        min: fabricationMin,
        max: fabricationMax,
      });
    }
  });

  const breakdown = [];
  let overallMin = null;
  let overallMax = null;
  components.forEach((component) => {
    breakdown.push(component);
    overallMin = overallMin === null ? component.min : Math.max(overallMin, component.min);
    overallMax = overallMax === null ? component.max : Math.max(overallMax, component.max);
  });

  return {
    min: overallMin === null ? "" : overallMin,
    max: overallMax === null ? "" : overallMax,
    breakdown,
  };
}

function formatLeadTimeRangeText(range) {
  const min = parseLeadTimeInteger(range?.min);
  const max = parseLeadTimeInteger(range?.max);
  if (min === "" || max === "") {
    return "";
  }
  return `${min}-${max} WEEKS`;
}

function updateComputedLeadTimes() {
  const deckSuppliers = new Set();
  (state.vendorPlan?.deckAssignments || []).forEach((assignment) => {
    if (parsePositiveNumberOrZero(assignment?.tons) <= 0) {
      return;
    }
    const supplier = String(assignment?.vendor || "").trim().toUpperCase();
    if (LEAD_TIME_SUPPLIER_KEYS.includes(supplier)) {
      deckSuppliers.add(supplier);
    }
  });

  const joistSuppliers = new Set();
  const joistTons = parsePositiveNumberOrZero(state.joists.tons);
  if (joistTons > 0) {
    const joistSupplier = String(state.vendorPlan?.chosenJoistVendor || state.joists.supplier || "")
      .trim()
      .toUpperCase();
    if (LEAD_TIME_SUPPLIER_KEYS.includes(joistSupplier)) {
      joistSuppliers.add(joistSupplier);
    }
  }

  const scopeType =
    deckSuppliers.size > 0 && joistSuppliers.size > 0
      ? "deckAndJoist"
      : deckSuppliers.size > 0
        ? "deckOnly"
        : joistSuppliers.size > 0
          ? "joistOnly"
          : "deckAndJoist";
  const leadTimesConfig = getLeadTimesConfig();
  const totalTons =
    parsePositiveNumberOrZero(state.totals.totalDeckTons) + parsePositiveNumberOrZero(state.joists.tons);
  const projectLeadTimeRange = getLeadTimeRange({
    supplierSelections: { deckSuppliers: [...deckSuppliers], joistSuppliers: [...joistSuppliers] },
    specType: {
      submittalsRequired: true,
      hasDeckScope: deckSuppliers.size > 0,
      hasJoistScope: joistSuppliers.size > 0,
      totalTons,
    },
    scopeType,
    leadTimesConfig,
  });
  const submittalsRange = getTrojanSubmittalsRange(leadTimesConfig, {
    hasDeckScope: deckSuppliers.size > 0,
    hasJoistScope: joistSuppliers.size > 0,
    totalTons,
  });

  state.submittalsLeadTime = formatLeadTimeRangeText(submittalsRange);
  state.fabricationLeadTime = formatLeadTimeRangeText(projectLeadTimeRange);

  if (submittalsLeadTimeInput) {
    submittalsLeadTimeInput.value = state.submittalsLeadTime;
  }
  if (fabricationLeadTimeInput) {
    fabricationLeadTimeInput.value = state.fabricationLeadTime;
  }
}

function getPricedSupplierSets(adminPricingSnapshot = getAdminPricingSnapshot()) {
  const pricedDeckSuppliers = new Set();
  const pricedJoistSuppliers = new Set();
  const pricedAccessorySuppliers = new Set();

  const trojanCoil = parseCurrency(adminPricingSnapshot.trojan?.coilCostPerLb);
  const trojanInbound = parseCurrency(adminPricingSnapshot.trojan?.inboundFreightPerLb);
  const trojanLabor = parseCurrency(adminPricingSnapshot.trojan?.laborPerLb);
  if (trojanCoil > 0 || trojanInbound > 0 || trojanLabor > 0) {
    pricedDeckSuppliers.add("TROJAN");
  }
  const trojanAccessoryScrew = parseCurrency(adminPricingSnapshot.trojan?.accessoriesCostPerScrew);
  const trojanAccessoryTon = parseCurrency(adminPricingSnapshot.trojan?.accessoriesCostPerTon);
  if (trojanAccessoryScrew > 0 || trojanAccessoryTon > 0) {
    pricedAccessorySuppliers.add("TROJAN");
  }

  const cscDeckBuckets = adminPricingSnapshot.csc?.deck?.buckets || [];
  if (cscDeckBuckets.some((row) => parseCurrency(row?.cost) > 0)) {
    pricedDeckSuppliers.add("CSC");
  }
  const cscJoistBuckets = adminPricingSnapshot.csc?.joists?.buckets || [];
  if (cscJoistBuckets.some((row) => parseCurrency(row?.cost) > 0)) {
    pricedJoistSuppliers.add("CSC");
  }

  const canoPerLb = parseCurrency(adminPricingSnapshot.cano?.perLb);
  if (canoPerLb > 0) {
    pricedDeckSuppliers.add("CANO");
    pricedJoistSuppliers.add("CANO");
  }

  return {
    pricedDeckSuppliers,
    pricedJoistSuppliers,
    pricedAccessorySuppliers,
  };
}

function getDeckCostBreakdownForOptimizationVendor(vendor, tons) {
  const normalizedVendor = String(vendor || "").trim().toUpperCase();
  const normalizedTons = parsePositiveNumberOrZero(tons);
  if (normalizedTons <= 0) {
    return {
      vendor: normalizedVendor,
      tons: 0,
      subtotalCost: 0,
      marginPercent: getPricingMarginPercent("brokeredDeck"),
      marginAmount: 0,
      totalCost: 0,
      detail: "No supplier deck tons in scope",
    };
  }
  if (normalizedVendor === "TROJAN") {
    const trojan = getTrojanDeckCogsBreakdown(normalizedTons);
    return {
      vendor: "TROJAN",
      tons: normalizedTons,
      subtotalCost: trojan.totalCogs,
      marginPercent: trojan.marginPercent,
      marginAmount: trojan.marginAmount,
      totalCost: trojan.totalWithMargin,
      detail: `${formatWholeNumber(trojan.lbs)} LB total production + freight`,
    };
  }
  if (normalizedVendor === "CANO" || normalizedVendor === "CSC") {
    return getVendorDeckCostBreakdownForOptimization(normalizedVendor, tons);
  }
  const adminPricingSnapshot = getAdminPricingSnapshot();
  const ratePerTon = getDeckRateForVendor(normalizedVendor, normalizedTons, adminPricingSnapshot);
  if (parsePositiveNumberOrZero(ratePerTon) <= 0) {
    return {
      vendor: normalizedVendor,
      tons: normalizedTons,
      subtotalCost: 0,
      marginPercent: getPricingMarginPercent("brokeredDeck"),
      marginAmount: 0,
      totalCost: 0,
      detail: "No admin pricing configured for this supplier",
    };
  }
  const subtotalCost = normalizedTons * ratePerTon;
  const margin = applyPricingMargin(subtotalCost, "brokeredDeck");
  return {
    vendor: normalizedVendor,
    tons: normalizedTons,
    subtotalCost,
    marginPercent: margin.marginPercent,
    marginAmount: margin.marginAmount,
    totalCost: margin.totalWithMargin,
    detail: `${formatTwoDecimals(normalizedTons)} TONS x ${formatCurrency(ratePerTon)}/TON`,
  };
}

function getDeckBreakdownFromAssignments(assignments) {
  const grouped = new Map();
  (assignments || []).forEach((assignment) => {
    const tons = parsePositiveNumberOrZero(assignment.tons);
    if (tons <= 0) {
      return;
    }
    const vendor = String(assignment.vendor || "").trim().toUpperCase();
    grouped.set(vendor, (grouped.get(vendor) || 0) + tons);
  });
  const entries = Array.from(grouped.entries()).map(([vendor, tons]) =>
    getDeckCostBreakdownForOptimizationVendor(vendor, tons),
  );
  const totalCost = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.totalCost), 0);
  const subtotalCost = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.subtotalCost), 0);
  const marginAmount = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.marginAmount), 0);
  const totalTons = entries.reduce((sum, entry) => sum + parsePositiveNumberOrZero(entry.tons), 0);
  const detail = entries.map((entry) => `${entry.vendor}: ${entry.detail}`).join(" | ");
  return {
    vendor: entries.length === 1 ? entries[0].vendor : "MIXED",
    tons: totalTons,
    subtotalCost,
    marginAmount,
    totalCost,
    detail,
    entries,
  };
}

function applyMinimumMarginToScenarioDeckAndJoists(deckBreakdown, joistBreakdown) {
  const participants = [];
  (deckBreakdown?.entries || []).forEach((entry) => {
    participants.push({
      supplier: String(entry.vendor || "").trim().toUpperCase(),
      subtotalCost: parsePositiveNumberOrZero(entry.subtotalCost),
      marginAmount: parsePositiveNumberOrZero(entry.marginAmount),
      locked:
        String(entry.vendor || "").trim().toUpperCase() === "TROJAN"
          ? Boolean(state.pricingMarginOverrides.trojanDeck)
          : Boolean(state.pricingMarginOverrides.brokeredDeck),
      sync: (marginAmount) => {
        entry.marginAmount = marginAmount;
        entry.marginPercent = entry.subtotalCost > 0 ? (marginAmount / entry.subtotalCost) * 100 : entry.marginPercent;
        entry.totalCost = entry.subtotalCost + entry.marginAmount;
      },
    });
  });

  if (joistBreakdown) {
    participants.push({
      supplier: String(joistBreakdown.vendor || "").trim().toUpperCase(),
      subtotalCost: parsePositiveNumberOrZero(joistBreakdown.subtotalCost),
      marginAmount: parsePositiveNumberOrZero(joistBreakdown.marginAmount),
      locked: Boolean(state.pricingMarginOverrides.joists),
      sync: (marginAmount) => {
        joistBreakdown.marginAmount = marginAmount;
        joistBreakdown.marginPercent =
          joistBreakdown.subtotalCost > 0 ? (marginAmount / joistBreakdown.subtotalCost) * 100 : joistBreakdown.marginPercent;
        joistBreakdown.totalCost = joistBreakdown.subtotalCost + joistBreakdown.marginAmount;
      },
    });
  }

  enforceMinProjectMarginByPriority(participants, getTrojanMinimumProjectMargin());

  if (deckBreakdown) {
    deckBreakdown.marginAmount = (deckBreakdown.entries || []).reduce(
      (sum, entry) => sum + parsePositiveNumberOrZero(entry.marginAmount),
      0,
    );
    deckBreakdown.totalCost = (deckBreakdown.entries || []).reduce(
      (sum, entry) => sum + parsePositiveNumberOrZero(entry.totalCost),
      0,
    );
    deckBreakdown.detail = (deckBreakdown.entries || []).map((entry) => `${entry.vendor}: ${entry.detail}`).join(" | ");
  }
}

function cloneOptimizationDeckBreakdown(breakdown) {
  if (!breakdown || typeof breakdown !== "object") {
    return null;
  }
  return {
    ...breakdown,
    entries: Array.isArray(breakdown.entries)
      ? breakdown.entries.map((entry) => ({
          ...entry,
        }))
      : [],
  };
}

function cloneOptimizationJoistBreakdown(breakdown) {
  if (!breakdown || typeof breakdown !== "object") {
    return null;
  }
  return {
    ...breakdown,
  };
}

function getScenarioDeckVendors(scenario) {
  return Array.from(
    new Set(
      (scenario?.deckBreakdown?.entries || [])
        .map((entry) => String(entry.vendor || "").trim().toUpperCase())
        .filter(Boolean),
    ),
  );
}

function getScenarioTrojanDeckEntry(scenario) {
  return (scenario?.deckBreakdown?.entries || []).find(
    (entry) => String(entry.vendor || "").trim().toUpperCase() === "TROJAN",
  );
}

function applyBoostToScenario(scenario, boostedTrojanMarginPercent) {
  const trojanEntry = getScenarioTrojanDeckEntry(scenario);
  if (!trojanEntry) {
    return scenario;
  }
  const safeMarginPercent = parsePositiveNumberOrZero(boostedTrojanMarginPercent);
  const trojanSubtotal = parsePositiveNumberOrZero(trojanEntry.subtotalCost);
  const trojanMarginAmount = trojanSubtotal * (safeMarginPercent / 100);
  trojanEntry.marginPercent = safeMarginPercent;
  trojanEntry.marginAmount = trojanMarginAmount;
  trojanEntry.totalCost = trojanSubtotal + trojanMarginAmount;
  if (scenario.deckBreakdown) {
    scenario.deckBreakdown.marginAmount = (scenario.deckBreakdown.entries || []).reduce(
      (sum, entry) => sum + parsePositiveNumberOrZero(entry.marginAmount),
      0,
    );
    scenario.deckBreakdown.totalCost = (scenario.deckBreakdown.entries || []).reduce(
      (sum, entry) => sum + parsePositiveNumberOrZero(entry.totalCost),
      0,
    );
  }
  scenario.marginAmount = (scenario.deckBreakdown?.marginAmount || 0) + (scenario.joistBreakdown?.marginAmount || 0);
  scenario.subtotalCost =
    (scenario.deckBreakdown?.totalCost || 0) + (scenario.joistBreakdown?.totalCost || 0) + (scenario.accessoriesCost || 0);
  const detailingBreakdown = getDetailingPricingBreakdown(
    scenario.subtotalCost,
    parsePositiveNumberOrZero(scenario.deckTons),
    parsePositiveNumberOrZero(scenario.joistTons),
    { syncState: false },
  );
  scenario.detailingAmount = parsePositiveNumberOrZero(detailingBreakdown.detailingAmount);
  scenario.finalTotal = parsePositiveNumberOrZero(detailingBreakdown.finalTotal);
  scenario.boosted = true;
  scenario.boostedTrojanMarginPercent = safeMarginPercent;
  return scenario;
}

function getOptimizationBoostContextFromScenarios(scenarios = []) {
  const optionRows = (scenarios || []).map((scenario) => {
    const trojanEntry = getScenarioTrojanDeckEntry(scenario);
    return {
      id: String(scenario.id || ""),
      subtotal: parsePositiveNumberOrZero(scenario.subtotalCost),
      deckVendors: getScenarioDeckVendors(scenario),
      joistVendor: String(scenario.joistVendor || "").trim().toUpperCase(),
      trojanDeckBaseSubtotal: parsePositiveNumberOrZero(trojanEntry?.subtotalCost),
      currentTrojanMarginPercent: parsePositiveNumberOrZero(trojanEntry?.marginPercent),
    };
  });
  const plan = buildOptimizationBoostPlan(optionRows, {
    maxMarginPercent: OPTIMIZATION_BOOST_MAX_MARGIN_PERCENT,
    boostTargetPctDefault: getOptimizationBoostTargetPctDefault(),
    boostUndercutBuffer: getOptimizationBoostUndercutBuffer(),
  });
  const hasCscOnlyOption = optionRows.some((option) => isCscOnlyOption(option));
  const hasTrojanManufacturingOption = optionRows.some((option) => hasTrojanDeckOption(option));
  let unavailableReason = "";
  if (!hasCscOnlyOption) {
    unavailableReason = "No CSC-only benchmark found.";
  } else if (!hasTrojanManufacturingOption) {
    unavailableReason = "No Trojan manufacturing option found.";
  }
  return {
    plan,
    unavailableReason,
  };
}

function applyBoostToScenarioListIfNeeded(scenarios) {
  if (!state.pricingOptimizationBoost.isBoosted || !state.pricingOptimizationBoost.boostedOptionId) {
    return scenarios;
  }
  return (scenarios || []).map((scenario) => {
    if (String(scenario.id || "") !== String(state.pricingOptimizationBoost.boostedOptionId)) {
      return scenario;
    }
    return applyBoostToScenario(scenario, state.pricingOptimizationBoost.boostedTrojanMarginPercent);
  });
}

function sortScenariosForDisplay(scenarios) {
  const sorted = [...(scenarios || [])].sort((a, b) => {
    if (a.finalTotal !== b.finalTotal) {
      return a.finalTotal - b.finalTotal;
    }
    return b.marginAmount - a.marginAmount;
  });
  const appliedId = String(state.appliedOptimizationSelection.scenarioId || "");
  if (!appliedId) {
    return sorted;
  }
  return sorted.sort((a, b) => {
    const aApplied = String(a.id || "") === appliedId ? 1 : 0;
    const bApplied = String(b.id || "") === appliedId ? 1 : 0;
    if (aApplied !== bApplied) {
      return bApplied - aApplied;
    }
    return 0;
  });
}

function buildScenarioList(requirements, catalog, adminPricingSnapshot) {
  const accessoriesTotal = getAccessoriesCogsBreakdown().totalCogs || 0;
  const pricedSupplierSets = getPricedSupplierSets(adminPricingSnapshot);
  const deckScenarios = enumerateFeasibleDeckAssignments(
    requirements,
    catalog,
    adminPricingSnapshot,
    pricedSupplierSets,
  );
  const joistVendors = enumerateFeasibleJoistSuppliers(requirements, catalog, pricedSupplierSets);
  const scenarioBySignature = new Map();

  deckScenarios.forEach((deckScenario) => {
    joistVendors.forEach((joistVendor) => {
      if (requirements.hasJoistScope && !joistVendor) {
        return;
      }
      const joistBreakdownRaw = joistVendor
        ? getVendorJoistCostBreakdownForOptimization(joistVendor, requirements.joistTons)
        : null;
      if (requirements.hasJoistScope && parsePositiveNumberOrZero(joistBreakdownRaw?.totalCost) <= 0) {
        return;
      }
      const deckBreakdown = cloneOptimizationDeckBreakdown(deckScenario.deckBreakdown);
      const joistBreakdown = cloneOptimizationJoistBreakdown(joistBreakdownRaw);
      applyMinimumMarginToScenarioDeckAndJoists(deckBreakdown, joistBreakdown);
      const label = buildOptimizationScenarioLabel(deckBreakdown, joistVendor, requirements.hasJoistScope);
      if (!label) {
        return;
      }
      const assignmentSignature = (deckScenario.deckAssignments || [])
        .map((assignment) => `${assignment.lineId}:${assignment.vendor}`)
        .sort()
        .join("|");
      const signature = `${assignmentSignature}::JOIST:${joistVendor || ""}`;
      if (scenarioBySignature.has(signature)) {
        return;
      }
      const vendorsUsedInDeck = new Set((deckScenario.deckAssignments || []).map((assignment) => assignment.vendor));
      if ([...vendorsUsedInDeck].some((vendor) => !pricedSupplierSets.pricedDeckSuppliers.has(vendor))) {
        return;
      }
      if (joistVendor && !pricedSupplierSets.pricedJoistSuppliers.has(joistVendor)) {
        return;
      }
      const subtotalCost = (deckBreakdown?.totalCost || 0) + (joistBreakdown?.totalCost || 0) + accessoriesTotal;
      if (parsePositiveNumberOrZero(subtotalCost) <= 0) {
        return;
      }
      const detailingBreakdown = getDetailingPricingBreakdown(subtotalCost, requirements.deckTons, requirements.joistTons, {
        syncState: false,
      });
      const finalTotal = parsePositiveNumberOrZero(detailingBreakdown.finalTotal);
      const marginAmount = (deckBreakdown?.marginAmount || 0) + (joistBreakdown?.marginAmount || 0);
      const deckSuppliers = Array.from(
        new Set(
          (deckScenario.deckAssignments || [])
            .filter((assignment) => parsePositiveNumberOrZero(assignment.tons) > 0)
            .map((assignment) => String(assignment.vendor || "").trim().toUpperCase())
            .filter((vendor) => LEAD_TIME_SUPPLIER_KEYS.includes(vendor)),
        ),
      );
      const joistSuppliers =
        joistVendor && LEAD_TIME_SUPPLIER_KEYS.includes(String(joistVendor).trim().toUpperCase())
          ? [String(joistVendor).trim().toUpperCase()]
          : [];
      const scenarioScopeType =
        deckSuppliers.length > 0 && joistSuppliers.length > 0
          ? "deckAndJoist"
          : deckSuppliers.length > 0
            ? "deckOnly"
            : joistSuppliers.length > 0
              ? "joistOnly"
              : "deckAndJoist";
      const scenarioLeadTime = getLeadTimeRange({
        supplierSelections: { deckSuppliers, joistSuppliers },
        specType: {
          submittalsRequired: true,
          hasDeckScope: requirements.hasDeckScope,
          hasJoistScope: requirements.hasJoistScope,
          totalTons: parsePositiveNumberOrZero(requirements.deckTons) + parsePositiveNumberOrZero(requirements.joistTons),
        },
        scopeType: scenarioScopeType,
        leadTimesConfig: getLeadTimesConfig(),
      });
      scenarioBySignature.set(signature, {
        id: signature,
        label,
        deckVendor: deckScenario.deckVendor || "",
        deckMode: deckScenario.deckMode || "auto",
        deckAssignments: Array.isArray(deckScenario.deckAssignments) ? deckScenario.deckAssignments : [],
        joistVendor: joistVendor || "",
        deckBreakdown,
        joistBreakdown,
        accessoriesCost: accessoriesTotal,
        deckTons: requirements.deckTons,
        joistTons: requirements.joistTons,
        subtotalCost,
        detailingAmount: parsePositiveNumberOrZero(detailingBreakdown.detailingAmount),
        finalTotal,
        marginAmount,
        leadTimeRange: scenarioLeadTime,
      });
    });
  });

  return Array.from(scenarioBySignature.values());
}

function buildPricingOptimizationScenarios() {
  const requirements = getProjectRequirements({
    deckLines: state.deckProfiles || [],
    joistTons: state.joists.tons,
    flags: state.deckFlags || {},
  });
  const normalizedRules = getActiveSupplierRules()
    .map((row) => normalizeSupplierRuleRow(row))
    .filter((row) => row.supplier !== "");
  const catalog = getSupplierCatalog(normalizedRules);
  const adminPricingSnapshot = getAdminPricingSnapshot();

  const deckVendors = getOptimizationEligibleDeckVendors(
    requirements.deckLines,
    requirements.flags,
    normalizedRules,
    getDeckOptimizationCandidateVendors(normalizedRules),
  );
  const joistVendors = getOptimizationEligibleJoistVendors(
    requirements.flags,
    normalizedRules,
    getJoistOptimizationCandidateVendors(normalizedRules),
  );

  const baseScenarios = buildScenarioList(requirements, catalog, adminPricingSnapshot);
  const boostedScenarios = applyBoostToScenarioListIfNeeded(baseScenarios);
  const scenarios = sortScenariosForDisplay(boostedScenarios);
  const boostContext = getOptimizationBoostContextFromScenarios(baseScenarios);
  return {
    hasComparableScope: requirements.hasDeckScope || requirements.hasJoistScope,
    deckTons: requirements.deckTons,
    joistTons: requirements.joistTons,
    eligibleDeckVendors: deckVendors,
    eligibleJoistVendors: joistVendors,
    boostContext,
    scenarios,
    bestScenario: scenarios[0] || null,
  };
}

function getBoostPricingContext(optimization) {
  const scenarios = Array.isArray(optimization?.scenarios) ? optimization.scenarios : [];
  const cscOnlyScenarios = scenarios.filter((scenario) => {
    const deckVendors = getScenarioDeckVendors(scenario);
    if (deckVendors.length === 0 || deckVendors.some((vendor) => vendor !== "CSC")) {
      return false;
    }
    return true;
  });
  if (cscOnlyScenarios.length === 0) {
    return {
      available: false,
      reason: "No CSC total available for boost.",
      cscTotal: 0,
      boostTotal: 0,
      boostFactor: getBoostPercentOfCscFactor(),
    };
  }
  const cscTotal = cscOnlyScenarios.reduce(
    (maxTotal, scenario) => Math.max(maxTotal, parsePositiveNumberOrZero(scenario.finalTotal)),
    0,
  );
  const boostFactor = getBoostPercentOfCscFactor();
  const boostTotal = computeBoostTotalFromCsc(cscTotal, boostFactor);
  return {
    available: cscTotal > 0,
    reason: cscTotal > 0 ? "" : "No CSC total available for boost.",
    cscTotal,
    boostTotal,
    boostFactor,
  };
}

function getScenarioDisplayPricing(scenario, isBoostedApplied, boostContext) {
  const baseSubtotal = parsePositiveNumberOrZero(scenario?.subtotalCost);
  const baseMarginAmount = parsePositiveNumberOrZero(scenario?.marginAmount);
  const baseCost = Math.max(0, baseSubtotal - baseMarginAmount);
  if (!isBoostedApplied || !boostContext?.available || parsePositiveNumberOrZero(boostContext.boostTotal) <= 0) {
    const marginPercent = baseSubtotal > 0 ? (baseMarginAmount / baseSubtotal) * 100 : 0;
    return {
      subtotal: baseSubtotal,
      marginAmount: baseMarginAmount,
      marginPercent,
    };
  }
  const boostedSubtotal = parsePositiveNumberOrZero(boostContext.boostTotal);
  const boostedMarginAmount = boostedSubtotal - baseCost;
  const boostedMarginPercent = boostedSubtotal > 0 ? (boostedMarginAmount / boostedSubtotal) * 100 : 0;
  return {
    subtotal: boostedSubtotal,
    marginAmount: boostedMarginAmount,
    marginPercent: boostedMarginPercent,
  };
}

function getActiveBoostTotalIfEnabled() {
  if (!state.pricingOptimizationBoost.isBoosted) {
    return 0;
  }
  const appliedScenarioId = String(state.appliedOptimizationSelection.scenarioId || "");
  if (!appliedScenarioId || appliedScenarioId === "BOOST") {
    return 0;
  }
  const optimization = buildPricingOptimizationScenarios();
  const hasAppliedScenario = (optimization.scenarios || []).some(
    (scenario) => String(scenario.id || "") === appliedScenarioId,
  );
  if (!hasAppliedScenario) {
    return 0;
  }
  const boostContext = getBoostPricingContext(optimization);
  if (!boostContext.available || boostContext.boostTotal <= 0) {
    return 0;
  }
  state.pricingOptimizationBoost.boostFactor = boostContext.boostFactor;
  state.pricingOptimizationBoost.cscTotal = boostContext.cscTotal;
  state.pricingOptimizationBoost.boostTotal = boostContext.boostTotal;
  return boostContext.boostTotal;
}

function getBoostedAppliedScenarioContext() {
  if (!state.pricingOptimizationBoost.isBoosted) {
    return null;
  }
  const appliedScenarioId = String(state.appliedOptimizationSelection.scenarioId || "");
  if (!appliedScenarioId || appliedScenarioId === "BOOST") {
    return null;
  }
  const optimization = buildPricingOptimizationScenarios();
  const scenario = (optimization.scenarios || []).find((row) => String(row.id || "") === appliedScenarioId);
  if (!scenario) {
    return null;
  }
  const trojanEntry = getScenarioTrojanDeckEntry(scenario);
  if (!trojanEntry) {
    return null;
  }
  const baseScenarioSubtotal = parsePositiveNumberOrZero(scenario.subtotalCost);
  const boostContext = getBoostPricingContext(optimization);
  if (!boostContext.available || boostContext.boostTotal <= 0 || baseScenarioSubtotal <= 0) {
    return null;
  }
  const boostScale = boostContext.boostTotal / baseScenarioSubtotal;
  return {
    boostScale,
    trojanSellTotal: parsePositiveNumberOrZero(trojanEntry.totalCost) * boostScale,
  };
}

function renderPricingOptimizationResults() {
  if (!pricingOptimizeResults) {
    return;
  }
  if (pricingOptimizeButton) {
    pricingOptimizeButton.classList.toggle("is-loading", Boolean(state.pricingOptimizationLoading));
    pricingOptimizeButton.setAttribute(
      "aria-label",
      state.pricingOptimizationLoading ? "Optimizing" : "Optimize",
    );
  }
  if (!state.pricingOptimizationVisible) {
    if (pricingBoostButton) {
      pricingBoostButton.disabled = false;
      pricingBoostButton.title = "Toggle Boost pricing";
      pricingBoostButton.classList.toggle("is-active", Boolean(state.pricingOptimizationBoost.isBoosted));
      pricingBoostButton.setAttribute("aria-pressed", state.pricingOptimizationBoost.isBoosted ? "true" : "false");
      pricingBoostButton.textContent = state.pricingOptimizationBoost.isBoosted ? "Revert" : "Boost";
    }
    pricingOptimizeResults.classList.add("hidden");
    pricingOptimizeResults.innerHTML = "";
    return;
  }
  if (state.pricingOptimizationLoading) {
    pricingOptimizeResults.classList.remove("hidden");
    pricingOptimizeResults.innerHTML = `<p class="help-text pricing-optimize-loading-text">CRUNCHING NUMBERS...</p>`;
    return;
  }

  const optimization = buildPricingOptimizationScenarios();
  const boostContext = getBoostPricingContext(optimization);
  state.pricingOptimizationScenarios = optimization.scenarios;
  if (pricingBoostButton) {
    pricingBoostButton.classList.toggle("is-active", Boolean(state.pricingOptimizationBoost.isBoosted));
    pricingBoostButton.setAttribute("aria-pressed", state.pricingOptimizationBoost.isBoosted ? "true" : "false");
    if (state.pricingOptimizationBoost.isBoosted) {
      pricingBoostButton.disabled = false;
      pricingBoostButton.title = "Restore original pricing";
      pricingBoostButton.textContent = "Revert";
    } else {
      pricingBoostButton.disabled = false;
      pricingBoostButton.title = boostContext.reason || "Toggle Boost pricing";
      pricingBoostButton.textContent = "Boost";
    }
  }
  if (!optimization.hasComparableScope || optimization.scenarios.length === 0) {
    const deckConstraintText =
      optimization.deckTons > 0 && optimization.eligibleDeckVendors.length === 0
        ? "No deck supplier option meets current supplier-list specs/product rules with available pricing."
        : "";
    const joistConstraintText =
      optimization.joistTons > 0 && optimization.eligibleJoistVendors.length === 0
        ? "No joist supplier option meets current supplier-list specs/product rules with available pricing."
        : "";
    const constraints = [deckConstraintText, joistConstraintText].filter(Boolean).join(" ");
    pricingOptimizeResults.classList.remove("hidden");
    pricingOptimizeResults.innerHTML = `<p class="help-text">${
      constraints || "No valid supplier setup available for current scope/specs with configured pricing."
    }</p>`;
    return;
  }

  const boostNoticeMarkup = state.pricingOptimizationBoost.notice
    ? `<p class="pricing-boost-toast">${escapeHtml(state.pricingOptimizationBoost.notice)}</p>`
    : "";
  const scenarioMarkup = optimization.scenarios
    .map((scenario, index) => {
      const isBest = index === 0;
      const isApplied = String(state.appliedOptimizationSelection.scenarioId || "") === String(scenario.id || "");
      const isBoosted = Boolean(state.pricingOptimizationBoost.isBoosted && isApplied);
      const deckLine =
        scenario.deckBreakdown && Array.isArray(scenario.deckBreakdown.entries)
          ? scenario.deckBreakdown.entries
              .map((entry) => {
                const entryTons = parsePositiveNumberOrZero(entry.tons);
                const baseUnitPrice = entryTons > 0 ? parsePositiveNumberOrZero(entry.subtotalCost) / entryTons : 0;
                return renderOptimizationSummaryLine({
                  scopeLabel: "DECK",
                  vendorLabel: entry.vendor,
                  quantity: entryTons,
                  unitLabel: "TON",
                  baseUnitPrice,
                  marginPercent: entry.marginPercent,
                  lineTotal: entry.totalCost,
                });
              })
              .join("")
          : scenario.deckBreakdown
            ? renderOptimizationSummaryLine({
                scopeLabel: "DECK",
                vendorLabel: scenario.deckBreakdown.vendor,
                quantity: scenario.deckBreakdown.tons,
                unitLabel: "TON",
                baseUnitPrice:
                  parsePositiveNumberOrZero(scenario.deckBreakdown.tons) > 0
                    ? parsePositiveNumberOrZero(scenario.deckBreakdown.subtotalCost) /
                      parsePositiveNumberOrZero(scenario.deckBreakdown.tons)
                    : 0,
                marginPercent: scenario.deckBreakdown.marginPercent,
                lineTotal: scenario.deckBreakdown.totalCost,
              })
            : "";
      const joistLine = scenario.joistBreakdown
        ? renderOptimizationSummaryLine({
            scopeLabel: "JOISTS",
            vendorLabel: scenario.joistBreakdown.vendor,
            quantity: scenario.joistBreakdown.tons,
            unitLabel: "TON",
            baseUnitPrice:
              parsePositiveNumberOrZero(scenario.joistBreakdown.tons) > 0
                ? parsePositiveNumberOrZero(scenario.joistBreakdown.subtotalCost) /
                  parsePositiveNumberOrZero(scenario.joistBreakdown.tons)
                : 0,
            marginPercent: scenario.joistBreakdown.marginPercent,
            lineTotal: scenario.joistBreakdown.totalCost,
            suffixText:
              parsePositiveNumberOrZero(scenario.joistBreakdown.surcharge) > 0
                ? `Surcharge ${toCurrency(scenario.joistBreakdown.surcharge)}`
                : "",
          })
        : "";
      const accessoriesLine =
        parsePositiveNumberOrZero(scenario.accessoriesCost) > 0
          ? renderOptimizationSummaryLine({
              scopeLabel: "ACCESSORIES",
              quantity: 1,
              unitLabel: "LOT",
              baseUnitPrice: scenario.accessoriesCost,
              marginPercent: 0,
              lineTotal: scenario.accessoriesCost,
            })
          : "";
      const leadTimeLine = scenario.leadTimeRange
        ? `<p class="pricing-line-item-meta">LEAD TIME: ${
            formatLeadTimeRangeText(scenario.leadTimeRange) || "N/A"
          }</p>`
        : "";
      const boostedBadge = isBoosted ? '<span class="pricing-boosted-badge">BOOSTED</span>' : "";
      const displayPricing = getScenarioDisplayPricing(scenario, isBoosted, boostContext);
      return `
        <div class="pricing-line-item ${isBest ? "pricing-optimization-best" : ""} ${
          isBoosted ? "pricing-optimization-boosted" : ""
        }">
          <div class="pricing-line-item-main">
            <span>OPTION: ${scenario.label} ${boostedBadge}</span>
            <strong>${formatMoney(displayPricing.subtotal || 0)}</strong>
          </div>
          <div class="pricing-option-secondary">
            <p class="pricing-line-item-meta pricing-line-item-meta-margin">
              <span>TOTAL MARGIN:</span>
              <span>${formatMoney(displayPricing.marginAmount || 0)} (${formatTwoDecimals(displayPricing.marginPercent)}%)</span>
            </p>
          </div>
          <div class="pricing-optimization-actions">
            <button
              type="button"
              class="btn-secondary"
              data-action="apply-optimized-option"
              data-optimization-index="${index}"
            >
              ${isApplied ? "APPLIED" : "APPLY"}
            </button>
          </div>
          ${deckLine}
          ${joistLine}
          ${accessoriesLine}
          ${leadTimeLine}
        </div>
      `;
    })
    .join("");

  pricingOptimizeResults.classList.remove("hidden");
  pricingOptimizeResults.innerHTML = `
    <div class="pricing-project-summary">
      ${boostNoticeMarkup}
      <div class="pricing-line-item">
        <div class="pricing-line-item-main">
          <span>OPTIMIZATION SUMMARY</span>
          <span>SUBTOTAL PRICE</span>
        </div>
      </div>
      ${scenarioMarkup}
    </div>
  `;
}

function togglePricingOptimizationBoost() {
  if (state.pricingOptimizationBoost.isBoosted) {
    const previousSelection =
      state.pricingOptimizationBoost.previousAppliedSelection &&
      typeof state.pricingOptimizationBoost.previousAppliedSelection === "object"
        ? { ...state.pricingOptimizationBoost.previousAppliedSelection }
        : null;
    state.pricingOptimizationBoost = {
      isBoosted: false,
      boostFactor: getBoostPercentOfCscFactor(),
      cscTotal: 0,
      boostTotal: 0,
      previousAppliedSelection: null,
      boostedOptionId: null,
      boostedOriginalTrojanMarginPercent: null,
      boostedTrojanMarginPercent: null,
      benchmarkSubtotal: 0,
      targetSubtotal: 0,
      notice: "",
    };
    if (previousSelection) {
      state.appliedOptimizationSelection = {
        ...state.appliedOptimizationSelection,
        ...previousSelection,
      };
    }
    updateCalculator();
    return;
  }

  const optimization = buildPricingOptimizationScenarios();
  const boostContext = getBoostPricingContext(optimization);
  if (!boostContext.available || boostContext.boostTotal <= 0) {
    state.pricingOptimizationBoost.notice = boostContext.reason || "Unable to boost with current options.";
    renderPricingOptimizationResults();
    return;
  }

  state.pricingOptimizationBoost = {
    isBoosted: true,
    boostFactor: boostContext.boostFactor,
    cscTotal: boostContext.cscTotal,
    boostTotal: boostContext.boostTotal,
    previousAppliedSelection: {
      ...state.appliedOptimizationSelection,
    },
    boostedOptionId: null,
    boostedOriginalTrojanMarginPercent: null,
    boostedTrojanMarginPercent: null,
    benchmarkSubtotal: 0,
    targetSubtotal: 0,
    notice: "",
  };
  updateCalculator();
}

function applyPricingOptimizationScenario(index) {
  const scenario = state.pricingOptimizationScenarios[index];
  if (!scenario) {
    return;
  }
  state.appliedOptimizationSelection = {
    deckMode: scenario.deckMode || "auto",
    deckVendor: scenario.deckVendor || "",
    deckAssignments: Array.isArray(scenario.deckAssignments)
      ? scenario.deckAssignments.map((assignment) => ({
          lineId: assignment.lineId,
          vendor: String(assignment.vendor || "").trim().toUpperCase(),
        }))
      : [],
    joistVendor: scenario.joistVendor || "",
    label: scenario.label || "",
    scenarioId: scenario.id || "",
    trojanDeckMarginPercentOverride: null,
  };
  state.pricingOptimizationVisible = false;
  updateCalculator();
}

function formatProposalDate(date) {
  const d = date instanceof Date ? date : new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatSequentialQuoteRef(sequence) {
  const safeSequence = Number.isFinite(sequence) && sequence > 0 ? Math.floor(sequence) : PROPOSAL_QUOTE_START;
  return `${PROPOSAL_QUOTE_PREFIX}${String(safeSequence).padStart(6, "0")}`;
}

function getAndLogNextQuoteRef() {
  try {
    const rawCounter = window.localStorage.getItem(PROPOSAL_QUOTE_COUNTER_STORAGE_KEY);
    const parsedCounter = Number.parseInt(String(rawCounter ?? ""), 10);
    const nextSequence =
      Number.isFinite(parsedCounter) && parsedCounter >= PROPOSAL_QUOTE_START
        ? parsedCounter
        : PROPOSAL_QUOTE_START;
    const quoteRef = formatSequentialQuoteRef(nextSequence);

    const rawLog = window.localStorage.getItem(PROPOSAL_QUOTE_LOG_STORAGE_KEY);
    const parsedLog = JSON.parse(rawLog || "[]");
    const log = Array.isArray(parsedLog) ? parsedLog : [];
    log.push({
      quoteRef,
      generatedAt: new Date().toISOString(),
      projectName: state.projectName || "",
      location: state.projectLocation || "",
    });

    window.localStorage.setItem(PROPOSAL_QUOTE_COUNTER_STORAGE_KEY, String(nextSequence + 1));
    window.localStorage.setItem(PROPOSAL_QUOTE_LOG_STORAGE_KEY, JSON.stringify(log));
    return quoteRef;
  } catch (_error) {
    return `TROJ-${Date.now().toString().slice(-8)}`;
  }
}

function buildProposalDataFromState(options = {}) {
  const quoteRefOverride = String(options.quoteRef || "").trim();
  const now = new Date();
  const validUntil = new Date(now);
  validUntil.setDate(validUntil.getDate() + 30);

  const assignmentMap = new Map(
    (state.vendorPlan?.deckAssignments || []).map((assignment) => [assignment.lineId, assignment]),
  );

  const deckLines = (state.deckProfiles || [])
    .filter((profile) => parsePositiveNumberOrZero(profile.rowTons) > 0 || parsePositiveNumberOrZero(profile.rowSqs) > 0)
    .map((profile) => {
      const assignment = assignmentMap.get(profile.id);
      const tons = parsePositiveNumberOrZero(profile.rowTons);
      const sqs = parsePositiveNumberOrZero(profile.rowSqs);
      const pricePerTon = parsePositiveNumberOrZero(assignment?.pricePerTon);
      return {
        type: buildDeckProfileName(profile) || profile.specs.profile || "Deck",
        sqs,
        tons,
        manufacturer: String(profile.specs.manufacturer || assignment?.vendor || "").trim(),
        pricePerTon,
        extended: tons * pricePerTon,
      };
    });

  const joistsBreakdown = getJoistsPricingBreakdown();
  const totalJoistTons = parsePositiveNumberOrZero(state.joists.tons);
  const joistRatePerTon = totalJoistTons > 0 ? joistsBreakdown.baseCost / totalJoistTons : 0;
  const joistLines = (state.joistItems || [])
    .filter((item) => parsePositiveNumberOrZero(item.tons) > 0)
    .map((item) => {
      const tons = parsePositiveNumberOrZero(item.tons);
      const units = parsePositiveNumberOrZero(item.units);
      return {
        description: item.series || "Joist",
        units,
        tons,
        manufacturer: String(state.joists.supplier || "").trim(),
        pricePerTon: joistRatePerTon,
        extended: tons * joistRatePerTon,
      };
    });
  if (joistsBreakdown.surcharge > 0) {
    joistLines.push({
      description: "CSC Surcharge (<10 tons)",
      units: 0,
      tons: 0,
      manufacturer: "CSC",
      pricePerTon: 0,
      extended: joistsBreakdown.surcharge,
    });
  }

  const accessoriesLines = (state.accessories || [])
    .map((item, index) => ({
      type: (item.type || `ACCESSORY #${index + 1}`).toUpperCase(),
      screwCount: Number.isFinite(item.screwCount) ? item.screwCount : 0,
      tons: parsePositiveNumberOrZero(item.tons),
    }))
    .filter((line) => line.screwCount > 0 || line.tons > 0);

  const trojanBreakdown = getTrojanDeckCogsBreakdown();
  const brokeredBreakdown = getBrokeredDeckPricingBreakdown();
  applyMinimumMarginToLiveBreakdowns(trojanBreakdown, brokeredBreakdown, joistsBreakdown);
  const adjustedTrojanTotal = trojanBreakdown.totalWithMargin || 0;
  const brokeredTotal = brokeredBreakdown.totalCost || 0;
  const accessoriesTotal = getAccessoriesCogsBreakdown().totalCogs || 0;
  const joistsTotal = joistsBreakdown.totalCost || 0;
  const totalDeckTons = parsePositiveNumberOrZero(state.totals.totalDeckTons);
  const totalJoistsTons = parsePositiveNumberOrZero(state.joists.tons);
  const subtotal = adjustedTrojanTotal + brokeredTotal + accessoriesTotal + joistsTotal;
  const detailingBreakdown = getDetailingPricingBreakdown(subtotal, totalDeckTons, totalJoistsTons);
  const activeBoostTotal = getActiveBoostTotalIfEnabled();
  const grandTotal = activeBoostTotal > 0 ? activeBoostTotal : detailingBreakdown.finalTotal;

  const trojanMarginAmount = parsePositiveNumberOrZero(trojanBreakdown.marginAmount);
  const trojanMarginPercent = parsePositiveNumberOrZero(trojanBreakdown.marginPercent);
  const brokerMarginAmount =
    parsePositiveNumberOrZero(brokeredBreakdown.marginAmount) + parsePositiveNumberOrZero(joistsBreakdown.marginAmount);
  const brokerSubtotal =
    parsePositiveNumberOrZero(brokeredBreakdown.subtotalCost) + parsePositiveNumberOrZero(joistsBreakdown.subtotalCost);
  const brokerMarginPercent = brokerSubtotal > 0 ? (brokerMarginAmount / brokerSubtotal) * 100 : 0;
  const totalMarginAmount = trojanMarginAmount + brokerMarginAmount;
  const blendedOverallMarginPercent = grandTotal > 0 ? (totalMarginAmount / grandTotal) * 100 : 0;

  return {
    quoteRef: quoteRefOverride || `TROJ-${Date.now().toString().slice(-8)}`,
    proposalDate: formatProposalDate(now),
    validUntilDate: formatProposalDate(validUntil),
    projectName: state.projectName || "PROJECT",
    locationText: state.projectLocation || "",
    submittalsLeadTime: state.submittalsLeadTime || "",
    fabricationLeadTime: state.fabricationLeadTime || "",
    takeoffByTrojan: state.takeoffByTrojan || "YES",
    cutListProvided: state.cutListProvided || "NO",
    specsReviewed: state.specsReviewed || "NO",
    documentConditions: normalizeTrojanDocumentConditions(state.admin.sections.trojan.values.documentConditions),
    contactName: "Trojan Steel Team",
    contactPhone: "",
    contactEmail: "",
    deckLines,
    accessoriesLines,
    joistLines,
    totals: {
      totalTons: totalDeckTons + totalJoistsTons,
      totalDeckTons,
      totalJoistTons: totalJoistsTons,
      grandTotal,
    },
    margins: {
      trojan: {
        amount: trojanMarginAmount,
        percent: trojanMarginPercent,
      },
      broker: {
        amount: brokerMarginAmount,
        percent: brokerMarginPercent,
      },
      total: {
        amount: totalMarginAmount,
        blendedPercent: blendedOverallMarginPercent,
      },
    },
  };
}

function openProposalGenerator() {
  try {
    saveCalculatorDraftState();
    const quoteRef = getAndLogNextQuoteRef();
    const proposalData = buildProposalDataFromState({ quoteRef });
    window.localStorage.setItem(PROPOSAL_DATA_STORAGE_KEY, JSON.stringify(proposalData));
    const previewUrl = `/tools/proposal.html?returnPage=${encodeURIComponent("pricing")}`;
    const previewWindow = window.open(previewUrl, "_blank");
    if (!previewWindow) {
      window.location.href = previewUrl;
      return;
    }
    try {
      previewWindow.focus();
    } catch (_focusError) {
      // no-op: some browsers restrict focusing newly opened tabs
    }
  } catch (error) {
    console.error("Failed to generate proposal", error);
    window.alert("Unable to generate proposal. Check console for details.");
  }
}

function renderPricingSections() {
  if (
    !pricingTrojanDeckSection ||
    !pricingAccessoriesSection ||
    !pricingBrokeredDeckSection ||
    !pricingJoistsSection ||
    !pricingDetailingSection
  ) {
    return;
  }

  const deckInScope = state.scope === "deck-only" || state.scope === "joist-deck";
  const joistsInScope = state.scope === "joists-only" || state.scope === "joist-deck";
  const hasTrojanAssignments = (state.vendorPlan?.deckAssignments || []).some((item) => item.vendor === "TROJAN");
  const hasBrokeredAssignments = (state.vendorPlan?.deckAssignments || []).some((item) => item.vendor !== "TROJAN");
  pricingTrojanDeckSection.classList.toggle("hidden", !hasTrojanAssignments);
  const brokeredSuppliers = Array.from(
    new Set(
      (state.vendorPlan?.deckAssignments || [])
        .filter((item) => item.vendor !== "TROJAN")
        .map((item) => String(item.vendor || "").trim())
        .filter(Boolean),
    ),
  );
  const selectedDeckSuppliers = Array.from(
    new Set(
      (state.deckProfiles || [])
        .map((profile) => String(profile?.specs?.manufacturer || "").trim().toUpperCase())
        .filter((name) => name !== "" && name !== "TROJAN"),
    ),
  );
  if (pricingBrokeredDeckName) {
    const resolvedSuppliers = brokeredSuppliers.length > 0 ? brokeredSuppliers : selectedDeckSuppliers;
    pricingBrokeredDeckName.textContent =
      resolvedSuppliers.length === 0
        ? "SUPPLIER DECK"
        : resolvedSuppliers.length === 1
          ? `${resolvedSuppliers[0]} DECK`
          : `${resolvedSuppliers.join(" + ")} DECK`;
  }
  if (pricingJoistsName) {
    const joistVendor = String(state.vendorPlan?.pricingSchedule?.joists?.vendor || "").trim();
    pricingJoistsName.textContent = joistVendor ? `${joistVendor} JOISTS` : "JOISTS";
  }
  const trojanBreakdown = getTrojanDeckCogsBreakdown();
  pricingTrojanDeckSection.classList.toggle("hidden", !(deckInScope && hasTrojanAssignments));
  const accessoriesBreakdown = getAccessoriesCogsBreakdown();
  if (pricingAccessoriesHeaderCogs) {
    const accessoriesCollapsed = Boolean(state.pricingSections.accessories);
    pricingAccessoriesHeaderCogs.textContent =
      accessoriesCollapsed && accessoriesBreakdown.hasAccessories ? formatMoney(accessoriesBreakdown.totalCogs) : "";
  }
  const brokeredBreakdown = getBrokeredDeckPricingBreakdown();
  const joistsBreakdown = getJoistsPricingBreakdown();
  applyMinimumMarginToLiveBreakdowns(trojanBreakdown, brokeredBreakdown, joistsBreakdown);
  const boostedScenarioContext = getBoostedAppliedScenarioContext();
  if (trojanBreakdown.hasTrojanDeck && boostedScenarioContext && boostedScenarioContext.trojanSellTotal > 0) {
    const effectiveSell = parsePositiveNumberOrZero(boostedScenarioContext.trojanSellTotal);
    const totalCogs = parsePositiveNumberOrZero(trojanBreakdown.totalCogs);
    const marginAmount = effectiveSell - totalCogs;
    const marginPercent = effectiveSell > 0 ? (marginAmount / effectiveSell) * 100 : 0;
    trojanBreakdown.marginAmount = marginAmount;
    trojanBreakdown.marginPercent = marginPercent;
    trojanBreakdown.totalWithMargin = effectiveSell;
    trojanBreakdown.isBoostDerivedMargin = true;
  } else {
    trojanBreakdown.isBoostDerivedMargin = false;
  }
  if (pricingTrojanHeaderCogs) {
    const trojanCollapsed = Boolean(state.pricingSections.trojanDeck);
    pricingTrojanHeaderCogs.textContent =
      trojanCollapsed && trojanBreakdown.hasTrojanDeck ? formatMoney(trojanBreakdown.totalWithMargin) : "";
  }
  if (pricingBrokeredHeaderCogs) {
    const brokeredCollapsed = Boolean(state.pricingSections.brokeredDeck);
    pricingBrokeredHeaderCogs.textContent =
      brokeredCollapsed && brokeredBreakdown.hasBrokeredDeck ? formatMoney(brokeredBreakdown.totalCost) : "";
  }
  if (pricingJoistsHeaderCogs) {
    const joistsCollapsed = Boolean(state.pricingSections.joists);
    pricingJoistsHeaderCogs.textContent =
      joistsCollapsed && joistsBreakdown.hasJoists ? formatMoney(joistsBreakdown.totalCost) : "";
  }
  const subtotal =
    (trojanBreakdown.totalWithMargin || 0) +
    (accessoriesBreakdown.totalCogs || 0) +
    (brokeredBreakdown.totalCost || 0) +
    (joistsBreakdown.totalCost || 0);
  const detailingBreakdown = getDetailingPricingBreakdown(
    subtotal,
    parsePositiveNumberOrZero(state.totals.totalDeckTons),
    parsePositiveNumberOrZero(state.joists.tons),
  );
  const activeBoostTotal = getActiveBoostTotalIfEnabled();
  const effectiveSubtotal = activeBoostTotal > 0 ? activeBoostTotal : detailingBreakdown.subtotal;
  const effectiveFinalTotal = activeBoostTotal > 0 ? activeBoostTotal : detailingBreakdown.finalTotal;
  if (pricingDetailingHeaderCogs) {
    const detailingCollapsed = Boolean(state.pricingSections.detailing);
    pricingDetailingHeaderCogs.textContent =
      detailingCollapsed && detailingBreakdown.subtotal > 0 ? formatMoney(detailingBreakdown.detailingAmount) : "";
  }
  if (pricingSubtotalOutput) {
    pricingSubtotalOutput.textContent = formatMoney(effectiveSubtotal);
  }
  if (pricingProjectTotalCostOutput) {
    pricingProjectTotalCostOutput.textContent = formatMoney(effectiveFinalTotal);
  }
  if (pricingMarginSummaryOutput) {
    const finalProjectPrice = effectiveFinalTotal;
    const trojanMarginAmount =
      trojanBreakdown.hasTrojanDeck && trojanBreakdown.marginAmount > 0
        ? parsePositiveNumberOrZero(trojanBreakdown.marginAmount)
        : 0;
    const trojanMarginBase = trojanBreakdown.hasTrojanDeck ? parsePositiveNumberOrZero(trojanBreakdown.totalCogs) : 0;
    const trojanMarginPercent = trojanMarginBase > 0 ? (trojanMarginAmount / trojanMarginBase) * 100 : 0;
    const brokerDeckMarginAmount = brokeredBreakdown.hasBrokeredDeck
      ? parsePositiveNumberOrZero(brokeredBreakdown.marginAmount)
      : 0;
    const joistMarginAmount = joistsBreakdown.hasJoists ? parsePositiveNumberOrZero(joistsBreakdown.marginAmount) : 0;
    const brokerMarginAmount =
      brokerDeckMarginAmount +
      joistMarginAmount;
    const brokerMarginBase =
      (brokeredBreakdown.hasBrokeredDeck ? parsePositiveNumberOrZero(brokeredBreakdown.subtotalCost) : 0) +
      (joistsBreakdown.hasJoists ? parsePositiveNumberOrZero(joistsBreakdown.subtotalCost) : 0);
    const brokerMarginPercent = brokerMarginBase > 0 ? (brokerMarginAmount / brokerMarginBase) * 100 : 0;
    const totalMarginAmount = trojanMarginAmount + brokerMarginAmount;
    const blendedMarginPercent = finalProjectPrice > 0 ? (totalMarginAmount / finalProjectPrice) * 100 : 0;
    const marginRows = [];
    if (trojanMarginAmount > 0) {
      marginRows.push(`
        <div class="pricing-margin-summary-row">
          <div class="pricing-margin-summary-main">
            <span>TROJAN MARGIN</span>
            <strong>${formatMoney(trojanMarginAmount)} (${formatTwoDecimals(trojanMarginPercent)}%)</strong>
          </div>
        </div>
      `);
    }
    if (brokerMarginAmount > 0) {
      marginRows.push(`
        <div class="pricing-margin-summary-row">
          <div class="pricing-margin-summary-main">
            <span>BROKER MARGIN</span>
            <strong>${formatMoney(brokerMarginAmount)} (${formatTwoDecimals(brokerMarginPercent)}%)</strong>
          </div>
        </div>
      `);
    }
    if (totalMarginAmount > 0) {
      marginRows.push(`
        <div class="pricing-margin-summary-row pricing-margin-summary-total">
          <div class="pricing-margin-summary-main">
            <span>TOTAL MARGIN</span>
            <strong>${formatMoney(totalMarginAmount)} (${formatTwoDecimals(blendedMarginPercent)}%)</strong>
          </div>
        </div>
      `);
    }
    pricingMarginSummaryOutput.innerHTML =
      marginRows.length > 0 ? `<div class="pricing-margin-summary">${marginRows.join("")}</div>` : "";
  }
  pricingAccessoriesSection.classList.toggle("hidden", !(deckInScope && accessoriesBreakdown.hasAccessories));
  pricingBrokeredDeckSection.classList.toggle("hidden", !(deckInScope && hasBrokeredAssignments));
  pricingJoistsSection.classList.toggle("hidden", !joistsInScope);
  pricingDetailingSection.classList.toggle("hidden", !(deckInScope || joistsInScope));

  const sectionMap = {
    trojanDeck: { section: pricingTrojanDeckSection, content: pricingTrojanDeckContent },
    accessories: { section: pricingAccessoriesSection, content: pricingAccessoriesContent },
    brokeredDeck: { section: pricingBrokeredDeckSection, content: pricingBrokeredDeckContent },
    joists: { section: pricingJoistsSection, content: pricingJoistsContent },
    detailing: { section: pricingDetailingSection, content: pricingDetailingContent },
  };

  Object.keys(sectionMap).forEach((key) => {
    const node = sectionMap[key];
    const collapsed = Boolean(state.pricingSections[key]);
    if (!node.content || !node.section) {
      return;
    }
    node.content.classList.toggle("hidden", collapsed);
    const header = node.section.querySelector(".pricing-accordion-header");
    const toggle = header?.querySelector(".deck-summary-toggle");
    if (header) {
      header.setAttribute("aria-expanded", String(!collapsed));
    }
    if (toggle) {
      toggle.textContent = collapsed ? "+" : "−";
    }
  });
  if (pricingTrojanDeckSchedule) {
    pricingTrojanDeckSchedule.innerHTML = renderTrojanDeckCogs(trojanBreakdown);
  }
  if (pricingTrojanDeckCogs) {
    pricingTrojanDeckCogs.innerHTML = "";
  }
  if (pricingBrokeredDeckSchedule) {
    pricingBrokeredDeckSchedule.innerHTML = renderBrokeredDeckCogs(brokeredBreakdown);
  }
  if (pricingAccessoriesSchedule) {
    pricingAccessoriesSchedule.innerHTML = renderAccessoriesCogs();
  }
  if (pricingJoistVendorSchedule) {
    pricingJoistVendorSchedule.innerHTML = renderJoistsCogs(joistsBreakdown);
  }
  if (pricingDetailingSchedule) {
    pricingDetailingSchedule.innerHTML = renderDetailingCogs(detailingBreakdown);
  }
  renderPricingOptimizationResults();
}

function updateVendorStrategyAndAssignments() {
  const adminPricing = {
    trojan: { ...state.admin.sections.trojan.values },
    csc: normalizeCscValues(state.admin.sections.csc.values),
    cano: normalizeCanoValues(state.admin.sections.cano.values),
  };
  const strategy = selectVendorsForProject(
    {
      scope: state.scope,
      projectLocation: state.projectLocation,
      deckFlags: state.deckFlags,
      supplierRules: getActiveSupplierRules(),
      deckLines: state.deckProfiles.map((profile) => ({
        id: profile.id,
        specs: profile.specs,
        rowTons: profile.rowTons,
        rowSqs: profile.rowSqs,
        profileName: buildDeckProfileName(profile),
      })),
      joistTons: state.joists.tons,
    },
    adminPricing,
  );

  const forcedDeckMode = String(state.appliedOptimizationSelection.deckMode || "auto").trim().toLowerCase();
  const forcedDeckVendor = String(state.appliedOptimizationSelection.deckVendor || "").trim().toUpperCase();
  const canForceSingleDeckVendor = forcedDeckMode === "single" && forcedDeckVendor !== "";
  const forcedDeckAssignments =
    Array.isArray(state.appliedOptimizationSelection.deckAssignments) && forcedDeckMode === "mix"
      ? state.appliedOptimizationSelection.deckAssignments
      : [];
  const forcedDeckAssignmentMap = new Map(
    forcedDeckAssignments.map((assignment) => [Number(assignment.lineId), String(assignment.vendor || "").trim().toUpperCase()]),
  );
  if (canForceSingleDeckVendor) {
    const adminPricingSnapshot = getAdminPricingSnapshot();
    strategy.deckAssignments.forEach((assignment) => {
      assignment.vendor = forcedDeckVendor;
      assignment.reason = "Optimization selection override";
      assignment.pricePerTon = getDeckRateForVendor(forcedDeckVendor, parsePositiveNumberOrZero(assignment.tons), adminPricingSnapshot);
      assignment.extendedTotal = parsePositiveNumberOrZero(assignment.tons) * parsePositiveNumberOrZero(assignment.pricePerTon);
    });
  } else if (forcedDeckMode === "mix" && forcedDeckAssignmentMap.size > 0) {
    const adminPricingSnapshot = getAdminPricingSnapshot();
    strategy.deckAssignments.forEach((assignment) => {
      const selectedVendor = forcedDeckAssignmentMap.get(Number(assignment.lineId));
      if (!selectedVendor) {
        return;
      }
      assignment.vendor = selectedVendor;
      assignment.reason = "Optimization mix override";
      assignment.pricePerTon = getDeckRateForVendor(selectedVendor, parsePositiveNumberOrZero(assignment.tons), adminPricingSnapshot);
      assignment.extendedTotal = parsePositiveNumberOrZero(assignment.tons) * parsePositiveNumberOrZero(assignment.pricePerTon);
    });
  } else if (forcedDeckMode === "single" && forcedDeckVendor !== "") {
    state.appliedOptimizationSelection.deckMode = "auto";
    state.appliedOptimizationSelection.deckVendor = "";
    state.appliedOptimizationSelection.scenarioId = "";
    state.appliedOptimizationSelection.trojanDeckMarginPercentOverride = null;
  } else if (forcedDeckMode === "mix" && forcedDeckAssignmentMap.size > 0) {
    state.appliedOptimizationSelection.deckMode = "auto";
    state.appliedOptimizationSelection.deckAssignments = [];
    state.appliedOptimizationSelection.scenarioId = "";
    state.appliedOptimizationSelection.trojanDeckMarginPercentOverride = null;
  }

  const forcedJoistVendor = String(state.appliedOptimizationSelection.joistVendor || "").trim().toUpperCase();
  if (forcedJoistVendor !== "") {
    strategy.chosenJoistVendor = forcedJoistVendor;
    if (strategy.pricingSchedule?.joists) {
      strategy.pricingSchedule.joists.vendor = forcedJoistVendor;
    }
  }

  strategy.deckAssignments.forEach((assignment) => {
    const profile = findDeckProfileById(assignment.lineId);
    if (!profile) {
      return;
    }
    const selectedVendor = assignment.vendor;
    profile.specs.manufacturer = getDeckManufacturerOptionValue(selectedVendor);
    profile.manufacturerExplicit = false;
  });

  if ((state.scope === "joists-only" || state.scope === "joist-deck") && strategy.chosenJoistVendor) {
    state.joists.supplier = strategy.chosenJoistVendor;
    supplierInput.value = state.joists.supplier;
  }

  const deckRollups = computeDeckRollups(strategy.deckAssignments);
  strategy.rollups = {
    trojanDeckTons: deckRollups.trojanDeckTons,
    brokeredDeckTons: deckRollups.brokeredDeckTons,
  };
  state.vendorPlan = strategy;
  state.totals.trojanDeckTons = deckRollups.trojanDeckTons;
  state.totals.brokeredDeckTons = deckRollups.brokeredDeckTons;
  state.totals.deckTotal = deckRollups.totalExtended;
}

function updateCalculator() {
  setPoundsVisibility();
  updateDeckOutputs();
  updateVendorStrategyAndAssignments();
  updateComputedLeadTimes();

  state.totals.joistsTotal = calculateJoistsTotal();
  const trojanShipping = computeTrojanShipping();
  state.totals.trojanShipping = trojanShipping.cost;
  state.totals.trojanShippingTrucks = trojanShipping.trucks;
  state.totals.trojanShippingMiles = trojanShipping.miles;
  state.totals.trojanShippingRate = trojanShipping.rate;
  const pricingSubtotal =
    (getTrojanDeckCogsBreakdown().totalWithMargin || 0) +
    (getAccessoriesCogsBreakdown().totalCogs || 0) +
    (getBrokeredDeckPricingBreakdown().totalCost || 0) +
    (getJoistsPricingBreakdown().totalCost || 0);
  state.totals.grandTotal = getDetailingPricingBreakdown(
    pricingSubtotal,
    parsePositiveNumberOrZero(state.totals.totalDeckTons),
    parsePositiveNumberOrZero(state.joists.tons),
  ).finalTotal;
  const activeBoostTotal = getActiveBoostTotalIfEnabled();
  if (activeBoostTotal > 0) {
    state.totals.grandTotal = activeBoostTotal;
  }

  if (deckTrojanTonsOutput) {
    deckTrojanTonsOutput.value = formatTwoDecimals(state.totals.trojanDeckTons || 0);
  }
  if (deckBrokeredTonsOutput) {
    deckBrokeredTonsOutput.value = formatTwoDecimals(state.totals.brokeredDeckTons || 0);
  }
  deckTotalOutput.value = formatMoney(state.totals.deckTotal);

  validateProjectPage(true);
  validateDeckPage(true);
  validateJoistPage(true);
  updatePricingSummary();

  renderPricingSections();
}

function findDeckProfileById(id) {
  return state.deckProfiles.find((profile) => profile.id === id);
}

function findDeckProfileByDataId(dataId) {
  if (!dataId || !dataId.startsWith("p_")) {
    return;
  }
  return findDeckProfileById(Number(dataId.slice(2)));
}

function handleDeckProfilesClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest(".btn-add-profile")) {
    const newProfile = createDefaultDeckProfile();
    state.deckProfiles.push(newProfile);
    state.deckReviewMode = false;
    state.deckSpecsCollapsed = true;
    collapseAllExcept(newProfile.id);
    renderDeckProfiles();
    updateCalculator();
    return;
  }

  if (target.closest('[data-action="apply-common-profile"]')) {
    const rowElement = target.closest("[data-row-id]");
    if (!rowElement) {
      return;
    }
    const profile = findDeckProfileById(Number(rowElement.getAttribute("data-row-id")));
    if (!profile) {
      return;
    }
    applyCommonDeckProfilePreset(profile);
    renderDeckProfiles();
    updateCalculator();
    return;
  }

  if (target.closest(".btn-add-accessory")) {
    const newAccessory = createDefaultAccessory();
    state.accessories.push(newAccessory);
    state.deckReviewMode = false;
    state.deckSpecsCollapsed = true;
    collapseAllExcept(-1);
    collapseAllAccessoriesExcept(newAccessory.id);
    renderDeckProfiles();
    updateWizardButtons();
    return;
  }

  if (target.closest(".btn-done-accordions")) {
    if (state.deckReviewMode) {
      state.deckReviewMode = false;
      renderDeckProfiles();
      updateWizardButtons();
      return;
    }
    updateCalculator();
    state.deckReviewMode = true;
    state.deckSpecsCollapsed = true;
    collapseAllExcept(-1);
    collapseAllAccessoriesExcept(-1);
    renderDeckProfiles();
    updateWizardButtons();
    return;
  }

  if (target.closest(".btn-duplicate-profile")) {
    if (state.deckProfiles.length === 1) {
      const newProfile = createDuplicatedDeckProfile(state.deckProfiles[0]);
      state.deckProfiles.push(newProfile);
      state.deckReviewMode = false;
      state.deckSpecsCollapsed = true;
      collapseAllExcept(newProfile.id);
      renderDeckProfiles();
      updateCalculator();
      return;
    }

    if (state.deckProfiles.length > 1) {
      duplicateProfileSelect.innerHTML = state.deckProfiles
        .map((profile, index) => `<option value="${profile.id}">${index + 1}. ${buildDeckProfileName(profile)}</option>`)
        .join("");
      duplicateProfileDialog.showModal();
    }
    return;
  }

  if (target.closest(".btn-remove-row")) {
    const accessoryElement = target.closest("[data-accessory-id]");
    if (accessoryElement) {
      const accessory = findAccessoryById(Number(accessoryElement.getAttribute("data-accessory-id")));
      if (!accessory) {
        return;
      }
      state.accessories = state.accessories.filter((item) => item.id !== accessory.id);
      if (state.deckProfiles.length === 0) {
        state.deckReviewMode = false;
      }
      renderDeckProfiles();
      updateWizardButtons();
      return;
    }

    const rowElement = target.closest("[data-row-id]");
    if (!rowElement) {
      return;
    }
    const profile = findDeckProfileById(Number(rowElement.getAttribute("data-row-id")));
    if (!profile) {
      return;
    }
    state.deckProfiles = state.deckProfiles.filter((item) => item.id !== profile.id);
    if (state.deckProfiles.length === 0) {
      state.deckReviewMode = false;
    }
    renderDeckProfiles();
    updateCalculator();
    updateWizardButtons();
    return;
  }

  if (target.closest(".deck-row-content")) {
    event.stopPropagation();
    return;
  }

  const specsRow = target.closest('[data-action="toggle-specs"]');
  if (specsRow) {
    const shouldCollapseSpecs = !state.deckSpecsCollapsed;
    state.deckProfiles.forEach((profile) => {
      profile.isCollapsed = true;
    });
    state.deckSpecsCollapsed = shouldCollapseSpecs;
    renderDeckProfiles();
    return;
  }

  const summaryRow = target.closest(".deck-summary-row");
  if (!summaryRow) {
    return;
  }
  const dataId = summaryRow.getAttribute("data-id") || "";
  if (dataId.startsWith("a_")) {
    state.deckSpecsCollapsed = true;
    toggleAccessoryExpansion(Number(dataId.slice(2)));
    renderDeckProfiles();
    return;
  }
  const profile = findDeckProfileByDataId(summaryRow.getAttribute("data-id"));
  if (!profile) {
    return;
  }
  state.deckSpecsCollapsed = true;
  toggleDeckProfileExpansion(profile.id);
  renderDeckProfiles();
}

function handleDeckProfilesChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
    return;
  }

  const group = target.getAttribute("data-group");
  const field = target.getAttribute("data-field");
  if (group === "accessory" && field === "type") {
    const accessoryElement = target.closest("[data-accessory-id]");
    if (!accessoryElement) {
      return;
    }
    const accessory = findAccessoryById(Number(accessoryElement.getAttribute("data-accessory-id")));
    if (!accessory) {
      return;
    }
    accessory.type = target.value || "";
    if (isTekAccessoryType(accessory.type)) {
      accessory.tons = null;
    } else if (isCcAccessoryType(accessory.type)) {
      accessory.screwCount = null;
    } else {
      accessory.screwCount = null;
      accessory.tons = null;
    }
    renderDeckProfiles();
    updateCalculator();
    return;
  }

  if (group === "deck-flags" && field) {
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      state.deckFlags[field] = Boolean(target.checked);
      if (target.checked) {
        state.deckFlagSelectionOrder = state.deckFlagSelectionOrder.filter((key) => key !== field);
        state.deckFlagSelectionOrder.push(field);
      } else {
        state.deckFlagSelectionOrder = state.deckFlagSelectionOrder.filter((key) => key !== field);
      }
      if (field === "specifiedManufacturer" && !target.checked) {
        state.deckFlags.specifiedManufacturerName = "";
      }
    } else {
      state.deckFlags[field] = String(target.value || "").trim().toUpperCase();
    }
    updateCalculator();
    renderDeckProfiles();
    return;
  }

  const rowElement = target.closest("[data-row-id]");
  if (!rowElement) {
    return;
  }

  const profile = findDeckProfileById(Number(rowElement.getAttribute("data-row-id")));
  if (!profile) {
    return;
  }

  if (!group || !field) {
    return;
  }

  if (group === "specs") {
    profile.specs[field] = target.value || "";

    if (field === "manufacturer") {
      profile.manufacturerExplicit = profile.specs.manufacturer !== "";
    }

    if (field === "depth" || field === "manufacturer") {
      syncManufacturerForDepth(profile);
    }
    if (field === "profile") {
      autoPopulateDeckWidthForProfile(profile);
    }

    renderDeckProfiles();
    updateCalculator();
    return;
  }

  if (group === "row" && field === "method") {
    profile.method = target.value;
    profile.inputs = createBlankInputs();
    autoPopulateDeckWidthForProfile(profile);
    renderDeckProfiles();
    updateCalculator();
    return;
  }

  if (group === "row" && field === "overrideTons") {
    profile.overrideTons = target.value;
    updateCalculator();
    return;
  }
}

function handleDeckProfilesInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const group = target.getAttribute("data-group");
  const field = target.getAttribute("data-field");
  if (group === "accessory" && (field === "screwCount" || field === "tons")) {
    const accessoryElement = target.closest("[data-accessory-id]");
    if (!accessoryElement) {
      return;
    }
    const accessory = findAccessoryById(Number(accessoryElement.getAttribute("data-accessory-id")));
    if (!accessory) {
      return;
    }
    if (field === "screwCount") {
      const parsed = Number.parseInt(target.value, 10);
      accessory.screwCount = Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
    } else {
      const parsed = Number(target.value);
      accessory.tons = Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
    }
    updateCalculator();
    return;
  }

  const rowElement = target.closest("[data-row-id]");
  if (!rowElement) {
    return;
  }

  const profile = findDeckProfileById(Number(rowElement.getAttribute("data-row-id")));
  if (!profile) {
    return;
  }

  if (!group || !field) {
    return;
  }

  if (group === "inputs") {
    profile.inputs[field] = target.value;
    updateCalculator();
    return;
  }

  if (group === "row" && field === "overrideTons") {
    profile.overrideTons = target.value;
    updateCalculator();
    return;
  }
}

function handleDeckProfilesKeydown(event) {
  if (!(event.target instanceof Element)) {
    return;
  }
  const specsRow = event.target.closest('[data-action="toggle-specs"]');
  if (specsRow && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    const shouldCollapseSpecs = !state.deckSpecsCollapsed;
    state.deckProfiles.forEach((profile) => {
      profile.isCollapsed = true;
    });
    state.deckSpecsCollapsed = shouldCollapseSpecs;
    renderDeckProfiles();
    return;
  }
  const summaryRow = event.target.closest(".deck-summary-row");
  if (!summaryRow || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const dataId = summaryRow.getAttribute("data-id") || "";
  if (dataId.startsWith("a_")) {
    state.deckSpecsCollapsed = true;
    toggleAccessoryExpansion(Number(dataId.slice(2)));
    renderDeckProfiles();
    return;
  }
  const profile = findDeckProfileByDataId(summaryRow.getAttribute("data-id"));
  if (!profile) {
    return;
  }
  state.deckSpecsCollapsed = true;
  toggleDeckProfileExpansion(profile.id);
  renderDeckProfiles();
}

function handleJoistItemsClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest(".btn-remove-joist")) {
    const rowElement = target.closest("[data-joist-id]");
    if (!rowElement) {
      return;
    }
    const joistItem = findJoistItemById(Number(rowElement.getAttribute("data-joist-id")));
    if (!joistItem) {
      return;
    }
    state.joistItems = state.joistItems.filter((item) => item.id !== joistItem.id);
    state.joistReviewMode = false;
    syncJoistTotalsFromItems();
    renderJoistItems();
    updateJoistReviewUI();
    updateWizardButtons();
    updateCalculator();
    return;
  }

  if (target.closest(".deck-row-content")) {
    event.stopPropagation();
    return;
  }

  const summaryRow = target.closest("[data-joist-summary-id]");
  if (!summaryRow) {
    return;
  }
  toggleJoistExpansion(Number(summaryRow.getAttribute("data-joist-summary-id")));
  renderJoistItems();
}

function handleJoistItemsChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
    return;
  }
  const rowElement = target.closest("[data-joist-id]");
  if (!rowElement) {
    return;
  }
  const joistItem = findJoistItemById(Number(rowElement.getAttribute("data-joist-id")));
  if (!joistItem) {
    return;
  }

  const group = target.getAttribute("data-group");
  const field = target.getAttribute("data-field");
  if (group !== "joist" || !field) {
    return;
  }

  if (field === "series") {
    state.joistReviewMode = false;
    joistItem.series = target.value || "";
    if (isBridgingSeries(joistItem.series)) {
      joistItem.units = "";
    }
    renderJoistItems();
    updateJoistReviewUI();
    updateWizardButtons();
    updateCalculator();
  }
}

function handleJoistItemsInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  const rowElement = target.closest("[data-joist-id]");
  if (!rowElement) {
    return;
  }
  const joistItem = findJoistItemById(Number(rowElement.getAttribute("data-joist-id")));
  if (!joistItem) {
    return;
  }
  const group = target.getAttribute("data-group");
  const field = target.getAttribute("data-field");
  if (group !== "joist" || !field) {
    return;
  }

  if (field === "units") {
    state.joistReviewMode = false;
    const parsed = Number.parseInt(target.value, 10);
    joistItem.units = Number.isFinite(parsed) && parsed >= 0 ? String(parsed) : "";
  } else if (field === "tons") {
    state.joistReviewMode = false;
    joistItem.tons = target.value;
  }

  syncJoistTotalsFromItems();
  updateJoistReviewUI();
  updateWizardButtons();
  updateCalculator();
}

function handleJoistItemsKeydown(event) {
  if (!(event.target instanceof Element)) {
    return;
  }
  const summaryRow = event.target.closest("[data-joist-summary-id]");
  if (!summaryRow || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  toggleJoistExpansion(Number(summaryRow.getAttribute("data-joist-summary-id")));
  renderJoistItems();
}

projectNameInput.addEventListener("input", (event) => {
  state.projectName = event.target.value;
  updateProjectHeader();
  validateProjectPage(true);
});

projectLocationInput.addEventListener("input", (event) => {
  state.projectLocation = event.target.value;
  scheduleCalcMilesFromTrojan();
  updateCalculator();
  validateProjectPage(true);
});

projectComplexityInput?.addEventListener("change", (event) => {
  const nextTier = String(event.target.value || "2");
  state.projectComplexityTier = ["1", "2", "3"].includes(nextTier) ? nextTier : "2";
  updateCalculator();
});

submittalsLeadTimeInput?.addEventListener("input", (event) => {
  state.submittalsLeadTime = String(event.target.value || "");
});

fabricationLeadTimeInput?.addEventListener("input", (event) => {
  state.fabricationLeadTime = String(event.target.value || "");
});

takeoffByTrojanInput?.addEventListener("change", (event) => {
  state.takeoffByTrojan = String(event.target.value || "").toUpperCase() === "NO" ? "NO" : "YES";
});

cutListProvidedInput?.addEventListener("change", (event) => {
  state.cutListProvided = String(event.target.value || "").toUpperCase() === "YES" ? "YES" : "NO";
});

specsReviewedInput?.addEventListener("change", (event) => {
  state.specsReviewed = String(event.target.value || "").toUpperCase() === "YES" ? "YES" : "NO";
});

takeoffBidNoInput?.addEventListener("input", (event) => {
  state.takeoff.bidNo = String(event.target.value || "");
  saveCalculatorDraftState();
});

takeoffJobNumberInput?.addEventListener("input", (event) => {
  state.takeoff.jobNumber = String(event.target.value || "");
  saveCalculatorDraftState();
});

takeoffJobNameInput?.addEventListener("input", (event) => {
  state.takeoff.jobName = String(event.target.value || "");
  saveCalculatorDraftState();
});

takeoffProjectLocationInput?.addEventListener("input", (event) => {
  state.takeoff.projectLocation = String(event.target.value || "");
  saveCalculatorDraftState();
});

takeoffAddAreaButton?.addEventListener("click", () => {
  state.takeoff.areas.forEach((area) => {
    area.isCollapsed = true;
  });
  const area = createDefaultTakeoffArea();
  state.takeoff.areas.push(area);
  renumberTakeoffAreas();
  renderTakeoffPage();
  saveCalculatorDraftState();
});

takeoffDoneButton?.addEventListener("click", () => {
  state.takeoff.areas.forEach((area) => {
    area.isCollapsed = true;
    area.deckSectionCollapsed = true;
    area.joistSectionCollapsed = true;
    area.deckLines.forEach((line) => {
      line.isCollapsed = true;
    });
    (area.joistGroups || []).forEach((group) => {
      group.isCollapsed = true;
    });
  });
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const removeAreaButton = target.closest('[data-action="takeoff-remove-area"]');
  if (removeAreaButton) {
    const areaElement = removeAreaButton.closest("[data-takeoff-area-id]");
    if (!areaElement) {
      return;
    }
    const areaId = Number(areaElement.getAttribute("data-takeoff-area-id"));
    state.takeoff.areas = state.takeoff.areas.filter((area) => Number(area.id) !== areaId);
    renumberTakeoffAreas();
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }
  const removeMarkButton = target.closest('[data-action="takeoff-remove-mark"]');
  if (removeMarkButton) {
    const groupElement = removeMarkButton.closest("[data-takeoff-group-id]");
    if (!groupElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(groupElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const groupId = Number(groupElement.getAttribute("data-takeoff-group-id"));
    area.joistGroups = (area.joistGroups || []).filter((group) => Number(group.id) !== groupId);
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }
  const toggleHeader = target.closest('[data-action="toggle-takeoff-area"]');
  if (toggleHeader) {
    const areaElement = toggleHeader.closest("[data-takeoff-area-id]");
    if (!areaElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const isCurrentlyCollapsed = Boolean(area.isCollapsed);
    if (isCurrentlyCollapsed) {
      state.takeoff.areas.forEach((entry) => {
        entry.isCollapsed = true;
      });
      area.isCollapsed = false;
    } else {
      area.isCollapsed = true;
    }
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const deckHeader = target.closest('[data-action="toggle-takeoff-deck-line"]');
  if (deckHeader) {
    const row = deckHeader.closest("[data-takeoff-line-id]");
    if (!row) {
      return;
    }
    const area = findTakeoffAreaById(Number(row.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const lineId = Number(row.getAttribute("data-takeoff-line-id"));
    const line = area.deckLines.find((entry) => Number(entry.id) === lineId);
    if (!line) {
      return;
    }
    const isCurrentlyCollapsed = Boolean(line.isCollapsed);
    if (isCurrentlyCollapsed) {
      area.deckLines.forEach((entry) => {
        entry.isCollapsed = true;
      });
      line.isCollapsed = false;
    } else {
      line.isCollapsed = true;
    }
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const deckSectionHeader = target.closest('[data-action="toggle-takeoff-deck-section"]');
  if (deckSectionHeader) {
    const areaElement = deckSectionHeader.closest("[data-takeoff-area-id]");
    if (!areaElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    area.deckSectionCollapsed = !Boolean(area.deckSectionCollapsed);
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const joistSectionHeader = target.closest('[data-action="toggle-takeoff-joist-section"]');
  if (joistSectionHeader) {
    const areaElement = joistSectionHeader.closest("[data-takeoff-area-id]");
    if (!areaElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    area.joistSectionCollapsed = !Boolean(area.joistSectionCollapsed);
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const joistHeader = target.closest('[data-action="toggle-takeoff-joist-group"]');
  if (joistHeader) {
    const groupElement = joistHeader.closest("[data-takeoff-group-id]");
    if (!groupElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(groupElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const groupId = Number(groupElement.getAttribute("data-takeoff-group-id"));
    const group = (area.joistGroups || []).find((entry) => Number(entry.id) === groupId);
    if (!group) {
      return;
    }
    const isCurrentlyCollapsed = Boolean(group.isCollapsed);
    if (isCurrentlyCollapsed) {
      (area.joistGroups || []).forEach((entry) => {
        entry.isCollapsed = true;
      });
      group.isCollapsed = false;
    } else {
      group.isCollapsed = true;
    }
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const addDeckButton = target.closest('[data-action="takeoff-add-deck"]');
  if (addDeckButton) {
    const areaElement = addDeckButton.closest("[data-takeoff-area-id]");
    if (!areaElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const newLine = createDefaultTakeoffDeckLine();
    area.deckLines.forEach((entry) => {
      entry.isCollapsed = true;
    });
    area.deckLines.push(newLine);
    area.quickLineId = newLine.id;
    area.isCollapsed = false;
    collapseTakeoffAreasExcept(area.id);
    area.isCollapsed = false;
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const addMarkButton = target.closest('[data-action="takeoff-add-mark"]');
  if (addMarkButton) {
    const areaElement = addMarkButton.closest("[data-takeoff-area-id]");
    if (!areaElement) {
      return;
    }
    const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const newGroup = createDefaultTakeoffJoistGroup();
    newGroup.marks.push(createDefaultTakeoffJoistMark());
    area.joistGroups = Array.isArray(area.joistGroups) ? area.joistGroups : [];
    area.joistGroups.forEach((group) => {
      group.isCollapsed = true;
    });
    area.joistGroups.push(newGroup);
    area.isCollapsed = false;
    collapseTakeoffAreasExcept(area.id);
    area.isCollapsed = false;
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const quickPresetButton = target.closest('[data-action="takeoff-quick-profile"]');
  if (quickPresetButton) {
    const row = quickPresetButton.closest("[data-takeoff-line-id]");
    if (!row) {
      return;
    }
    const area = findTakeoffAreaById(Number(row.getAttribute("data-takeoff-area-id")));
    if (!area) {
      return;
    }
    const line = area.deckLines.find((entry) => Number(entry.id) === Number(row.getAttribute("data-takeoff-line-id")));
    if (!line) {
      return;
    }
    area.quickLineId = line.id;
    applyTakeoffQuickPreset(line, quickPresetButton.getAttribute("data-preset"));
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }

  const removeDeckButton = target.closest('[data-action="takeoff-remove-deck-line"]');
  const removeJoistButton = target.closest('[data-action="takeoff-remove-joist-line"]');
  if (!removeDeckButton && !removeJoistButton) {
    return;
  }
  const row = (removeDeckButton || removeJoistButton).closest("[data-takeoff-line-id]");
  if (!row) {
    return;
  }
  const area = findTakeoffAreaById(Number(row.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  const rowId = Number(row.getAttribute("data-takeoff-line-id"));
  const kind = String(row.getAttribute("data-takeoff-kind") || "deck").toLowerCase();
  if (kind === "joist" || removeJoistButton) {
    const groupId = Number(row.getAttribute("data-takeoff-group-id"));
    const group = (area.joistGroups || []).find((entry) => Number(entry.id) === groupId);
    if (!group) {
      return;
    }
    group.marks = (group.marks || []).filter((line) => Number(line.id) !== rowId);
  } else {
    area.deckLines = area.deckLines.filter((line) => Number(line.id) !== rowId);
    if (Number(area.quickLineId) === rowId) {
      area.quickLineId = area.deckLines.length > 0 ? area.deckLines[area.deckLines.length - 1].id : null;
    }
  }
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const toggleHeader = event.target.closest('[data-action="toggle-takeoff-area"]');
  if (!toggleHeader || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const areaElement = toggleHeader.closest("[data-takeoff-area-id]");
  if (!areaElement) {
    return;
  }
  const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  const isCurrentlyCollapsed = Boolean(area.isCollapsed);
  if (isCurrentlyCollapsed) {
    state.takeoff.areas.forEach((entry) => {
      entry.isCollapsed = true;
    });
    area.isCollapsed = false;
  } else {
    area.isCollapsed = true;
  }
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const deckSectionHeader = event.target.closest('[data-action="toggle-takeoff-deck-section"]');
  if (!deckSectionHeader || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const areaElement = deckSectionHeader.closest("[data-takeoff-area-id]");
  if (!areaElement) {
    return;
  }
  const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  area.deckSectionCollapsed = !Boolean(area.deckSectionCollapsed);
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const joistSectionHeader = event.target.closest('[data-action="toggle-takeoff-joist-section"]');
  if (!joistSectionHeader || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const areaElement = joistSectionHeader.closest("[data-takeoff-area-id]");
  if (!areaElement) {
    return;
  }
  const area = findTakeoffAreaById(Number(areaElement.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  area.joistSectionCollapsed = !Boolean(area.joistSectionCollapsed);
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const deckHeader = event.target.closest('[data-action="toggle-takeoff-deck-line"]');
  if (!deckHeader || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const row = deckHeader.closest("[data-takeoff-line-id]");
  if (!row) {
    return;
  }
  const area = findTakeoffAreaById(Number(row.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  const lineId = Number(row.getAttribute("data-takeoff-line-id"));
  const line = area.deckLines.find((entry) => Number(entry.id) === lineId);
  if (!line) {
    return;
  }
  const isCurrentlyCollapsed = Boolean(line.isCollapsed);
  if (isCurrentlyCollapsed) {
    area.deckLines.forEach((entry) => {
      entry.isCollapsed = true;
    });
    line.isCollapsed = false;
  } else {
    line.isCollapsed = true;
  }
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const joistHeader = event.target.closest('[data-action="toggle-takeoff-joist-group"]');
  if (!joistHeader || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const groupElement = joistHeader.closest("[data-takeoff-group-id]");
  if (!groupElement) {
    return;
  }
  const area = findTakeoffAreaById(Number(groupElement.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  const groupId = Number(groupElement.getAttribute("data-takeoff-group-id"));
  const group = (area.joistGroups || []).find((entry) => Number(entry.id) === groupId);
  if (!group) {
    return;
  }
  const isCurrentlyCollapsed = Boolean(group.isCollapsed);
  if (isCurrentlyCollapsed) {
    (area.joistGroups || []).forEach((entry) => {
      entry.isCollapsed = true;
    });
    group.isCollapsed = false;
  } else {
    group.isCollapsed = true;
  }
  renderTakeoffPage();
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) {
    return;
  }
  const field = target.getAttribute("data-takeoff-field");
  if (!field) {
    return;
  }
  const row = target.closest("[data-takeoff-line-id]");
  if (!row) {
    return;
  }
  const area = findTakeoffAreaById(Number(row.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  const lineId = Number(row.getAttribute("data-takeoff-line-id"));
  const kind = String(row.getAttribute("data-takeoff-kind") || "deck").toLowerCase();
  if (kind === "joist") {
    const groupId = Number(row.getAttribute("data-takeoff-group-id"));
    const group = (area.joistGroups || []).find((entry) => Number(entry.id) === groupId);
    if (!group) {
      return;
    }
    const joistLine = (group.marks || []).find((entry) => Number(entry.id) === lineId);
    if (!joistLine) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(joistLine, field)) {
      joistLine[field] = target.value;
    }
    saveCalculatorDraftState();
    return;
  }
  const line = area.deckLines.find((entry) => Number(entry.id) === lineId);
  if (!line) {
    return;
  }
  if (field === "squares") {
    line.squares = target.value;
  } else if (Object.prototype.hasOwnProperty.call(line.specs, field)) {
    line.specs[field] = target.value;
  }
  saveCalculatorDraftState();
});

pageTakeoff?.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLSelectElement)) {
    return;
  }
  const field = target.getAttribute("data-takeoff-field");
  if (!field) {
    return;
  }
  const row = target.closest("[data-takeoff-line-id]");
  if (!row) {
    return;
  }
  const area = findTakeoffAreaById(Number(row.getAttribute("data-takeoff-area-id")));
  if (!area) {
    return;
  }
  const lineId = Number(row.getAttribute("data-takeoff-line-id"));
  const kind = String(row.getAttribute("data-takeoff-kind") || "deck").toLowerCase();
  if (kind === "joist") {
    const groupId = Number(row.getAttribute("data-takeoff-group-id"));
    const group = (area.joistGroups || []).find((entry) => Number(entry.id) === groupId);
    if (!group) {
      return;
    }
    const joistLine = (group.marks || []).find((entry) => Number(entry.id) === lineId);
    if (!joistLine) {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(joistLine, field)) {
      joistLine[field] = target.value;
    }
    renderTakeoffPage();
    saveCalculatorDraftState();
    return;
  }
  const line = area.deckLines.find((entry) => Number(entry.id) === lineId);
  if (!line) {
    return;
  }
  if (field === "squares") {
    line.squares = target.value;
  } else if (Object.prototype.hasOwnProperty.call(line.specs, field)) {
    line.specs[field] = target.value;
  }
  renderTakeoffPage();
  saveCalculatorDraftState();
});

if (milesFromTrojanInput) {
  milesFromTrojanInput.addEventListener("input", (event) => {
    state.milesFromTrojanFacility = event.target.value;
    updateCalculator();
    validateProjectPage(true);
  });
}

scopeRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    state.scope = event.target.value;
    updateWizardButtons();
    validateProjectPage(true);

    const enabled = getEnabledPages();
    if (!enabled.includes(state.currentPage)) {
      setPage("project");
    }
  });
});

mainTabsNav?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const tabButton = target.closest("[data-main-tab]");
  if (!tabButton || !(tabButton instanceof HTMLButtonElement) || tabButton.disabled) {
    return;
  }
  const pageKey = String(tabButton.getAttribute("data-main-tab") || "").trim();
  if (!pageKey) {
    return;
  }
  setPage(pageKey);
});

projectNextButton.addEventListener("click", () => {
  if (!validateProjectPage(true)) {
    return;
  }
  navigateNext();
});

deckBackButton.addEventListener("click", navigateBack);
deckNextButton.addEventListener("click", () => {
  updateCalculator();
  navigateNext();
});
joistBackButton.addEventListener("click", navigateBack);
joistNextButton.addEventListener("click", () => {
  updateCalculator();
  if (!validateJoistPage(true)) {
    return;
  }
  navigateNext();
});
pricingBackButton.addEventListener("click", navigateBack);
resetProjectBtn?.addEventListener("click", () => {
  clearProjectState();
  reloadProjectHome();
});
resetProjectSideBtn?.addEventListener("click", () => {
  clearProjectState();
  reloadProjectHome();
});
pricingStartButton.addEventListener("click", () => setPage("project"));
pricingOptimizeButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  state.pricingOptimizationVisible = !state.pricingOptimizationVisible;
  renderPricingOptimizationResults();
});
pricingBoostButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  togglePricingOptimizationBoost();
});
pricingProposalButton?.addEventListener("click", () => {
  openProposalGenerator();
});
adminOpenButton.addEventListener("click", () => setPage("admin"));
adminBackButton.addEventListener("click", () => setPage(state.adminReturnPage || "project"));
adminCloseButton.addEventListener("click", () => setPage("project"));
adminSuppliersButton?.addEventListener("click", openSuppliersPage);
adminChangelogButton.addEventListener("click", () => {
  renderAdminChangelog();
  adminChangelogDialog.showModal();
});
adminExportSettingsButton?.addEventListener("click", () => {
  try {
    downloadSettingsExportFile();
    setAdminStatus("Settings exported");
  } catch (_error) {
    setAdminStatus("Export failed", { isError: true });
  }
});
adminImportSettingsButton?.addEventListener("click", () => {
  if (!adminImportSettingsInput) {
    return;
  }
  adminImportSettingsInput.value = "";
  adminImportSettingsInput.click();
});
adminImportSettingsInput?.addEventListener("change", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !target.files || target.files.length === 0) {
    return;
  }
  const [file] = target.files;
  if (!file) {
    return;
  }
  try {
    await handleSettingsImportFile(file);
    setAdminStatus("Settings imported");
  } catch (_error) {
    setAdminStatus("Import failed", { isError: true });
  } finally {
    target.value = "";
  }
});
adminChangelogCloseButton.addEventListener("click", () => adminChangelogDialog.close());
suppliersBackButton?.addEventListener("click", () => setPage("admin"));
suppliersEditButton?.addEventListener("click", () => {
  if (!state.suppliers.isLoaded) {
    return;
  }
  state.suppliers.draftRows = state.suppliers.rows.map((row) => ({ ...row }));
  state.suppliers.isEditing = true;
  renderSuppliersPage();
});
suppliersCancelButton?.addEventListener("click", () => {
  state.suppliers.draftRows = state.suppliers.rows.map((row) => ({ ...row }));
  state.suppliers.isEditing = false;
  state.suppliers.loadError = "";
  renderSuppliersPage();
});
suppliersAddRowButton?.addEventListener("click", () => {
  if (!state.suppliers.isEditing) {
    return;
  }
  const newRow = {};
  state.suppliers.columns.forEach((column) => {
    newRow[column] = "";
  });
  state.suppliers.draftRows.push(newRow);
  renderSuppliersPage();
});
suppliersSaveButton?.addEventListener("click", () => {
  if (!state.suppliers.isEditing) {
    return;
  }
  const validation = validateSupplierRows(
    state.suppliers.draftRows,
    state.suppliers.columns,
    state.suppliers.nameColumnKey,
  );
  if (!validation.isValid) {
    setSuppliersStatus(validation.message);
    return;
  }
  state.suppliers.rows = normalizeSupplierRows(state.suppliers.draftRows, state.suppliers.columns);
  localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(state.suppliers.rows));
  state.suppliers.draftRows = state.suppliers.rows.map((row) => ({ ...row }));
  state.suppliers.isEditing = false;
  state.suppliers.loadError = "";
  renderSuppliersPage();
});

suppliersTableContainer?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element) || !state.suppliers.isEditing) {
    return;
  }
  const deleteButton = target.closest("[data-suppliers-delete-row]");
  if (!deleteButton) {
    return;
  }
  const rowIndex = Number(deleteButton.getAttribute("data-suppliers-delete-row"));
  if (!Number.isInteger(rowIndex) || rowIndex < 0) {
    return;
  }
  state.suppliers.draftRows.splice(rowIndex, 1);
  renderSuppliersPage();
});

suppliersTableContainer?.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement) || !state.suppliers.isEditing) {
    return;
  }
  const rowIndex = Number(target.getAttribute("data-suppliers-row"));
  const columnKey = target.getAttribute("data-suppliers-column");
  if (!Number.isInteger(rowIndex) || rowIndex < 0 || !columnKey) {
    return;
  }
  const row = state.suppliers.draftRows[rowIndex];
  if (!row || !Object.prototype.hasOwnProperty.call(row, columnKey)) {
    return;
  }
  row[columnKey] = target.value;
});

pageAdmin?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  if (target.closest("#adminSuppliersButton")) {
    openSuppliersPage();
  }
});

adminSectionsList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const trojanEditButton = target.closest('[data-action="trojan-toggle-edit"]');
  if (trojanEditButton) {
    const subsectionKey = trojanEditButton.getAttribute("data-trojan-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.trojan.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState) {
      return;
    }
    if (subsectionState.isEditing) {
      saveTrojanSubsection(subsectionKey);
      return;
    }
    subsectionState.isEditing = true;
    renderAdminSections();
    return;
  }

  const leadTimeEditButton = target.closest('[data-action="leadtime-toggle-edit"]');
  if (leadTimeEditButton) {
    const supplierKey = String(leadTimeEditButton.getAttribute("data-leadtime-supplier") || "").toLowerCase();
    const leadTimeState = getSupplierLeadTimesState(supplierKey);
    if (!leadTimeState) {
      return;
    }
    if (leadTimeState.subsection.isEditing) {
      saveLeadTimesSubsection(supplierKey);
      return;
    }
    leadTimeState.subsection.error = "";
    leadTimeState.subsection.isEditing = true;
    renderAdminSections();
    return;
  }

  const leadTimeSummary = target.closest('[data-action="leadtime-toggle-sub"]');
  if (leadTimeSummary) {
    const supplierKey = String(leadTimeSummary.getAttribute("data-leadtime-supplier") || "").toLowerCase();
    const leadTimeState = getSupplierLeadTimesState(supplierKey);
    if (!leadTimeState) {
      return;
    }
    if (supplierKey === "trojan") {
      toggleTrojanSubsectionExpansion("leadTimes");
    } else if (supplierKey === "csc") {
      toggleCscSubsectionExpansion("leadTimes");
    } else if (supplierKey === "cano") {
      toggleCanoSubsectionExpansion("leadTimes");
    }
    renderAdminSections();
    return;
  }

  const trojanAddConditionButton = target.closest('[data-action="trojan-add-condition-row"]');
  if (trojanAddConditionButton) {
    addTrojanConditionRow();
    return;
  }

  const trojanRemoveConditionButton = target.closest('[data-action="trojan-remove-condition-row"]');
  if (trojanRemoveConditionButton) {
    const subsectionState = state.admin.sections.trojan.subsections?.conditions;
    if (!subsectionState || !subsectionState.isEditing) {
      return;
    }
    const id = Number.parseInt(String(trojanRemoveConditionButton.getAttribute("data-trojan-condition-id") || ""), 10);
    if (!Number.isFinite(id) || id <= 0) {
      return;
    }
    state.admin.sections.trojan.values.documentConditions = (
      state.admin.sections.trojan.values.documentConditions || []
    ).filter((row) => Number.parseInt(String(row?.id ?? ""), 10) !== id);
    renderAdminSections();
    return;
  }

  const trojanSubSummary = target.closest('[data-action="trojan-toggle-sub"]');
  if (trojanSubSummary) {
    const subsectionKey = trojanSubSummary.getAttribute("data-trojan-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.trojan.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState) {
      return;
    }
    toggleTrojanSubsectionExpansion(subsectionKey);
    renderAdminSections();
    return;
  }

  const cscEditButton = target.closest('[data-action="csc-toggle-edit"]');
  if (cscEditButton) {
    const subsectionKey = cscEditButton.getAttribute("data-csc-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.csc.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState) {
      return;
    }
    if (subsectionState.isEditing) {
      saveCscSubsection(subsectionKey);
      return;
    }
    subsectionState.isEditing = true;
    renderAdminSections();
    return;
  }

  const cscAddRowButton = target.closest('[data-action="csc-add-row"]');
  if (cscAddRowButton) {
    const subsectionKey = cscAddRowButton.getAttribute("data-csc-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.csc.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState || !subsectionState.isEditing) {
      return;
    }
    addCscBucketRow(subsectionKey);
    return;
  }

  const cscSubSummary = target.closest('[data-action="csc-toggle-sub"]');
  if (cscSubSummary) {
    const subsectionKey = cscSubSummary.getAttribute("data-csc-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.csc.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState) {
      return;
    }
    toggleCscSubsectionExpansion(subsectionKey);
    renderAdminSections();
    return;
  }

  const detailingEditButton = target.closest('[data-action="detailing-toggle-edit"]');
  if (detailingEditButton) {
    const section = state.admin.sections.detailing;
    if (!section) {
      return;
    }
    if (section.isEditing) {
      saveDetailingSection();
      return;
    }
    section.isEditing = true;
    renderAdminSections();
    return;
  }

  const detailingAddRowButton = target.closest('[data-action="detailing-add-row"]');
  if (detailingAddRowButton) {
    addDetailingBucketRow();
    return;
  }

  const editButton = target.closest('[data-action="admin-toggle-edit"]');
  if (editButton) {
    const sectionKey = editButton.getAttribute("data-section");
    if (!sectionKey || !state.admin.sections[sectionKey]) {
      return;
    }
    const section = state.admin.sections[sectionKey];
    if (section.isEditing) {
      saveAdminSection(sectionKey);
      return;
    }
    section.isEditing = true;
    renderAdminSections();
    return;
  }

  const summaryRow = target.closest(".admin-summary-row");
  if (!summaryRow) {
    return;
  }

  const sectionKey = summaryRow.getAttribute("data-admin-id");
  if (!sectionKey || !state.admin.sections[sectionKey]) {
    return;
  }

  if (
    state.admin.sections[sectionKey].isEditing ||
    (sectionKey === "trojan" && isTrojanAnySubsectionEditing()) ||
    (sectionKey === "csc" && isCscAnySubsectionEditing()) ||
    (sectionKey === "cano" && isCanoAnySubsectionEditing())
  ) {
    return;
  }
  toggleAdminSectionExpansion(sectionKey);
  renderAdminSections();
});

adminSectionsList.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const trojanSubSummary = event.target.closest('[data-action="trojan-toggle-sub"]');
  if (trojanSubSummary && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    const subsectionKey = trojanSubSummary.getAttribute("data-trojan-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.trojan.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState) {
      return;
    }
    toggleTrojanSubsectionExpansion(subsectionKey);
    renderAdminSections();
    return;
  }

  const cscSubSummary = event.target.closest('[data-action="csc-toggle-sub"]');
  if (cscSubSummary && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    const subsectionKey = cscSubSummary.getAttribute("data-csc-subsection");
    const subsectionState = subsectionKey ? state.admin.sections.csc.subsections[subsectionKey] : null;
    if (!subsectionKey || !subsectionState) {
      return;
    }
    toggleCscSubsectionExpansion(subsectionKey);
    renderAdminSections();
    return;
  }

  const leadTimeSummary = event.target.closest('[data-action="leadtime-toggle-sub"]');
  if (leadTimeSummary && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    const supplierKey = String(leadTimeSummary.getAttribute("data-leadtime-supplier") || "").toLowerCase();
    const leadTimeState = getSupplierLeadTimesState(supplierKey);
    if (!leadTimeState) {
      return;
    }
    if (supplierKey === "trojan") {
      toggleTrojanSubsectionExpansion("leadTimes");
    } else if (supplierKey === "csc") {
      toggleCscSubsectionExpansion("leadTimes");
    } else if (supplierKey === "cano") {
      toggleCanoSubsectionExpansion("leadTimes");
    }
    renderAdminSections();
    return;
  }

  const summaryRow = event.target.closest(".admin-summary-row");
  if (!summaryRow || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const sectionKey = summaryRow.getAttribute("data-admin-id");
  if (!sectionKey || !state.admin.sections[sectionKey]) {
    return;
  }
  if (
    state.admin.sections[sectionKey].isEditing ||
    (sectionKey === "trojan" && isTrojanAnySubsectionEditing()) ||
    (sectionKey === "csc" && isCscAnySubsectionEditing()) ||
    (sectionKey === "cano" && isCanoAnySubsectionEditing())
  ) {
    return;
  }
  toggleAdminSectionExpansion(sectionKey);
  renderAdminSections();
});

adminSectionsList.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  if (!target.hasAttribute("data-admin-field")) {
    return;
  }
  const sectionElement = target.closest("[data-admin-section]");
  if (!sectionElement) {
    return;
  }
  const sectionKey = sectionElement.getAttribute("data-admin-section");
  if (!sectionKey || !state.admin.sections[sectionKey]?.isEditing) {
    return;
  }
  if (target.getAttribute("data-admin-type") === "text") {
    return;
  }
  if (target.value.trim() === "") {
    return;
  }
  target.value = String(parseCurrency(target.value));
});

adminSectionsList.addEventListener("focusout", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  if (!target.hasAttribute("data-admin-field")) {
    return;
  }
  const sectionElement = target.closest("[data-admin-section]");
  if (!sectionElement) {
    return;
  }
  const sectionKey = sectionElement.getAttribute("data-admin-section");
  if (!sectionKey || !state.admin.sections[sectionKey]?.isEditing) {
    return;
  }
  if (target.getAttribute("data-admin-type") === "text") {
    return;
  }
  if (target.value.trim() === "") {
    return;
  }
  target.value = formatCurrency(parseCurrency(target.value));
});

deckProfilesList.addEventListener("click", handleDeckProfilesClick);
deckProfilesList.addEventListener("change", handleDeckProfilesChange);
deckProfilesList.addEventListener("input", handleDeckProfilesInput);
deckProfilesList.addEventListener("keydown", handleDeckProfilesKeydown);
joistItemsList?.addEventListener("click", handleJoistItemsClick);
joistItemsList?.addEventListener("change", handleJoistItemsChange);
joistItemsList?.addEventListener("input", handleJoistItemsInput);
joistItemsList?.addEventListener("keydown", handleJoistItemsKeydown);

addJoistButton?.addEventListener("click", () => {
  const joistItem = createDefaultJoistItem();
  state.joistItems.push(joistItem);
  state.joistReviewMode = false;
  collapseAllJoistsExcept(joistItem.id);
  renderJoistItems();
  syncJoistTotalsFromItems();
  updateJoistReviewUI();
  updateWizardButtons();
  updateCalculator();
});

joistReviewButton?.addEventListener("click", () => {
  if (state.joistItems.length === 0) {
    return;
  }
  if (state.joistReviewMode) {
    state.joistReviewMode = false;
    renderJoistItems();
    updateJoistReviewUI();
    updateWizardButtons();
    return;
  }
  syncJoistTotalsFromItems();
  state.joistReviewMode = true;
  state.joistItems.forEach((item) => {
    item.isCollapsed = true;
  });
  renderJoistItems();
  updateJoistReviewUI();
  updateWizardButtons();
  updateCalculator();
});

duplicateConfirmButton.addEventListener("click", () => {
  const selectedId = Number(duplicateProfileSelect.value);
  const sourceProfile = findDeckProfileById(selectedId);
  if (sourceProfile) {
    const newProfile = createDuplicatedDeckProfile(sourceProfile);
    state.deckProfiles.push(newProfile);
    state.deckReviewMode = false;
    state.deckSpecsCollapsed = true;
    collapseAllExcept(newProfile.id);
    renderDeckProfiles();
    updateCalculator();
    updateWizardButtons();
  }
  duplicateProfileDialog.close();
});

duplicateCancelButton.addEventListener("click", () => {
  duplicateProfileDialog.close();
});

supplierInput.addEventListener("change", (event) => {
  state.joists.supplier = event.target.value;
  updateCalculator();
});

pagePricing.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const proposalButton = target.closest("#pricingProposalButton");
  if (proposalButton) {
    openProposalGenerator();
    return;
  }
  const boostButton = target.closest("#pricingBoostButton");
  if (boostButton) {
    togglePricingOptimizationBoost();
    return;
  }
  const optimizeButton = target.closest("#pricingOptimizeButton");
  if (optimizeButton) {
    if (state.pricingOptimizationLoading) {
      return;
    }
    if (state.pricingOptimizationVisible) {
      state.pricingOptimizationVisible = false;
      state.pricingOptimizationLoading = false;
      if (pricingOptimizationTimer) {
        window.clearTimeout(pricingOptimizationTimer);
        pricingOptimizationTimer = null;
      }
      renderPricingOptimizationResults();
      return;
    }
    state.pricingOptimizationVisible = true;
    state.pricingOptimizationLoading = true;
    renderPricingOptimizationResults();
    if (pricingOptimizationTimer) {
      window.clearTimeout(pricingOptimizationTimer);
    }
    pricingOptimizationTimer = window.setTimeout(() => {
      state.pricingOptimizationLoading = false;
      pricingOptimizationTimer = null;
      if (state.pricingOptimizationVisible) {
        renderPricingOptimizationResults();
      }
    }, 650);
    return;
  }
  const applyButton = target.closest('[data-action="apply-optimized-option"]');
  if (applyButton) {
    const index = Number(applyButton.getAttribute("data-optimization-index"));
    if (Number.isInteger(index) && index >= 0) {
      applyPricingOptimizationScenario(index);
    }
    return;
  }
  const resetDetailingButton = target.closest('[data-action="pricing-detailing-reset-auto"]');
  if (resetDetailingButton) {
    state.pricingDetailing.detailingPercentOverride = null;
    renderPricingSections();
    return;
  }
  const header = target.closest('[data-action="toggle-pricing-section"]');
  if (!header) {
    return;
  }
  const sectionKey = header.getAttribute("data-pricing-section");
  if (!sectionKey || !Object.prototype.hasOwnProperty.call(state.pricingSections, sectionKey)) {
    return;
  }
  const isCurrentlyCollapsed = Boolean(state.pricingSections[sectionKey]);
  if (isCurrentlyCollapsed) {
    Object.keys(state.pricingSections).forEach((key) => {
      state.pricingSections[key] = true;
    });
    state.pricingSections[sectionKey] = false;
  } else {
    state.pricingSections[sectionKey] = true;
  }
  renderPricingSections();
});

pagePricing.addEventListener("keydown", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const header = event.target.closest('[data-action="toggle-pricing-section"]');
  if (!header || (event.key !== "Enter" && event.key !== " ")) {
    return;
  }
  event.preventDefault();
  const sectionKey = header.getAttribute("data-pricing-section");
  if (!sectionKey || !Object.prototype.hasOwnProperty.call(state.pricingSections, sectionKey)) {
    return;
  }
  const isCurrentlyCollapsed = Boolean(state.pricingSections[sectionKey]);
  if (isCurrentlyCollapsed) {
    Object.keys(state.pricingSections).forEach((key) => {
      state.pricingSections[key] = true;
    });
    state.pricingSections[sectionKey] = false;
  } else {
    state.pricingSections[sectionKey] = true;
  }
  renderPricingSections();
});

pagePricing.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  if (target.getAttribute("data-action") === "pricing-detailing-percent-input") {
    const nextValue = parsePositiveNumberOrZero(target.value);
    state.pricingDetailing.detailingPercentOverride = nextValue > 0 ? nextValue : 0;
    return;
  }
  if (target.getAttribute("data-action") !== "pricing-margin-input") {
    return;
  }
  const sectionKey = target.getAttribute("data-pricing-margin-section");
  if (!sectionKey || !Object.prototype.hasOwnProperty.call(state.pricingMargins, sectionKey)) {
    return;
  }
  state.pricingMargins[sectionKey] = parsePositiveNumberOrZero(target.value);
  if (Object.prototype.hasOwnProperty.call(state.pricingMarginOverrides, sectionKey)) {
    state.pricingMarginOverrides[sectionKey] = true;
  }
});

pagePricing.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  if (target.getAttribute("data-action") === "pricing-detailing-percent-input") {
    const nextValue = parsePositiveNumberOrZero(target.value);
    state.pricingDetailing.detailingPercentOverride = nextValue > 0 ? nextValue : 0;
    renderPricingSections();
    return;
  }
  if (target.getAttribute("data-action") !== "pricing-margin-input") {
    return;
  }
  const sectionKey = target.getAttribute("data-pricing-margin-section");
  if (!sectionKey || !Object.prototype.hasOwnProperty.call(state.pricingMargins, sectionKey)) {
    return;
  }
  state.pricingMargins[sectionKey] = parsePositiveNumberOrZero(target.value);
  if (Object.prototype.hasOwnProperty.call(state.pricingMarginOverrides, sectionKey)) {
    state.pricingMarginOverrides[sectionKey] = true;
  }
  renderPricingSections();
});

async function init() {
  loadCalculatorDraftState();
  if (submittalsLeadTimeInput) {
    submittalsLeadTimeInput.readOnly = true;
  }
  if (fabricationLeadTimeInput) {
    fabricationLeadTimeInput.readOnly = true;
  }
  supplierInput.value = state.joists.supplier;
  projectNameInput.value = state.projectName;
  projectLocationInput.value = state.projectLocation;
  if (projectComplexityInput) {
    projectComplexityInput.value = ["1", "2", "3"].includes(state.projectComplexityTier)
      ? state.projectComplexityTier
      : "2";
  }
  if (submittalsLeadTimeInput) {
    submittalsLeadTimeInput.value = state.submittalsLeadTime || "";
  }
  if (fabricationLeadTimeInput) {
    fabricationLeadTimeInput.value = state.fabricationLeadTime || "";
  }
  if (takeoffByTrojanInput) {
    takeoffByTrojanInput.value = state.takeoffByTrojan === "NO" ? "NO" : "YES";
  }
  if (cutListProvidedInput) {
    cutListProvidedInput.value = state.cutListProvided === "YES" ? "YES" : "NO";
  }
  if (specsReviewedInput) {
    specsReviewedInput.value = state.specsReviewed === "YES" ? "YES" : "NO";
  }
  if (milesFromTrojanInput) {
    milesFromTrojanInput.value = state.milesFromTrojanFacility;
  }
  if (takeoffBidNoInput) {
    takeoffBidNoInput.value = state.takeoff.bidNo || "";
  }
  if (takeoffJobNumberInput) {
    takeoffJobNumberInput.value = state.takeoff.jobNumber || "";
  }
  if (takeoffJobNameInput) {
    takeoffJobNameInput.value = state.takeoff.jobName || "";
  }
  if (takeoffProjectLocationInput) {
    takeoffProjectLocationInput.value = state.takeoff.projectLocation || "";
  }
  loadAdminState();
  try {
    await loadRemoteSharedSettings();
  } catch (_error) {
    // Fall back to local storage settings when Supabase read fails.
  }

  updateProjectHeader();
  updateWizardButtons();
  renderDeckProfiles();
  renderJoistItems();
  renderTakeoffPage();
  updateJoistReviewUI();
  renderAdminSections();
  renderSuppliersPage();
  updateCalculator();
  scheduleCalcMilesFromTrojan();
  setPage("project");
}

if (typeof window !== "undefined") {
  window.openProposalGenerator = openProposalGenerator;
  window.runVendorStrategyHarness = runVendorStrategyHarness;
}

init().then(() => {
  ensureSuppliersLoaded().then(() => {
    updateCalculator();
  });
});
