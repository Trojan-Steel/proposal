const DEFAULT_MAX_MARGIN_PERCENT = 50;

function toPositiveNumberOrZero(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 0;
  }
  return numeric;
}

function normalizeSupplier(value) {
  return String(value || "").trim().toUpperCase();
}

export function hasTrojanDeckOption(option) {
  const deckVendors = Array.isArray(option?.deckVendors) ? option.deckVendors.map(normalizeSupplier) : [];
  return deckVendors.includes("TROJAN");
}

export function isCscOnlyOption(option) {
  const deckVendors = Array.isArray(option?.deckVendors) ? option.deckVendors.map(normalizeSupplier) : [];
  const joistVendor = normalizeSupplier(option?.joistVendor);
  if (deckVendors.length === 0) {
    return false;
  }
  if (deckVendors.some((vendor) => vendor !== "CSC")) {
    return false;
  }
  if (joistVendor !== "" && joistVendor !== "CSC") {
    return false;
  }
  return true;
}

export function solveBoostedTrojanMarginPercent({
  optionSubtotal,
  trojanDeckBaseSubtotal,
  currentTrojanMarginPercent,
  targetSubtotal,
  maxMarginPercent = DEFAULT_MAX_MARGIN_PERCENT,
}) {
  const safeOptionSubtotal = toPositiveNumberOrZero(optionSubtotal);
  const safeTrojanBaseSubtotal = toPositiveNumberOrZero(trojanDeckBaseSubtotal);
  const safeCurrentMarginPercent = toPositiveNumberOrZero(currentTrojanMarginPercent);
  const safeTargetSubtotal = toPositiveNumberOrZero(targetSubtotal);
  const safeMaxMarginPercent = Math.max(0, toPositiveNumberOrZero(maxMarginPercent));
  if (safeTrojanBaseSubtotal <= 0 || safeOptionSubtotal <= 0 || safeTargetSubtotal <= 0) {
    return 0;
  }

  const currentTrojanContribution = safeTrojanBaseSubtotal * (1 + safeCurrentMarginPercent / 100);
  const otherPartsSubtotal = safeOptionSubtotal - currentTrojanContribution;
  const solvedMarginPercent = ((safeTargetSubtotal - otherPartsSubtotal) / safeTrojanBaseSubtotal - 1) * 100;
  const finiteMargin = Number.isFinite(solvedMarginPercent) ? solvedMarginPercent : 0;
  return Math.max(0, Math.min(safeMaxMarginPercent, finiteMargin));
}

export function buildOptimizationBoostPlan(options, maxMarginPercent = DEFAULT_MAX_MARGIN_PERCENT) {
  const normalizedOptions = Array.isArray(options) ? options : [];
  const cscOnlyOptions = normalizedOptions.filter((option) => isCscOnlyOption(option));
  if (cscOnlyOptions.length === 0) {
    return { ok: false, reason: "No CSC-only benchmark found." };
  }
  const trojanDeckOptions = normalizedOptions.filter((option) => hasTrojanDeckOption(option));
  if (trojanDeckOptions.length === 0) {
    return { ok: false, reason: "No Trojan manufacturing option found." };
  }

  const highestCscOnlyOption = cscOnlyOptions.reduce((current, option) =>
    toPositiveNumberOrZero(option.subtotal) > toPositiveNumberOrZero(current.subtotal) ? option : current,
  );
  const lowestTrojanDeckOption = trojanDeckOptions.reduce((current, option) =>
    toPositiveNumberOrZero(option.subtotal) < toPositiveNumberOrZero(current.subtotal) ? option : current,
  );

  const benchmarkSubtotal = toPositiveNumberOrZero(highestCscOnlyOption.subtotal);
  const targetSubtotal = benchmarkSubtotal * 0.75;
  const currentTrojanSubtotal = toPositiveNumberOrZero(lowestTrojanDeckOption.subtotal);
  if (currentTrojanSubtotal >= targetSubtotal) {
    return {
      ok: false,
      reason: "Already above target",
      benchmarkSubtotal,
      targetSubtotal,
      boostedOptionId: String(lowestTrojanDeckOption.id || ""),
    };
  }

  const boostedTrojanMarginPercent = solveBoostedTrojanMarginPercent({
    optionSubtotal: currentTrojanSubtotal,
    trojanDeckBaseSubtotal: lowestTrojanDeckOption.trojanDeckBaseSubtotal,
    currentTrojanMarginPercent: lowestTrojanDeckOption.currentTrojanMarginPercent,
    targetSubtotal,
    maxMarginPercent,
  });

  return {
    ok: true,
    benchmarkSubtotal,
    targetSubtotal,
    boostedOptionId: String(lowestTrojanDeckOption.id || ""),
    boostedOriginalTrojanMarginPercent: toPositiveNumberOrZero(lowestTrojanDeckOption.currentTrojanMarginPercent),
    boostedTrojanMarginPercent,
  };
}
