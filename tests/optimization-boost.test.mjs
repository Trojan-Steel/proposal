import test from "node:test";
import assert from "node:assert/strict";
import {
  buildOptimizationBoostPlan,
  isCscOnlyOption,
  solveBoostedTrojanMarginPercent,
} from "../src/utils/optimizationBoost.mjs";

const near = (actual, expected, epsilon = 1e-6) => Math.abs(actual - expected) <= epsilon;

test("boost picks highest CSC-only benchmark and solves target margin", () => {
  const options = [
    {
      id: "trojan-csc",
      subtotal: 285000,
      deckVendors: ["TROJAN", "CSC"],
      joistVendor: "CSC",
      trojanDeckBaseSubtotal: 230000,
      currentTrojanMarginPercent: 15,
    },
    {
      id: "csc-csc",
      subtotal: 433004.65,
      deckVendors: ["CSC"],
      joistVendor: "CSC",
      trojanDeckBaseSubtotal: 0,
      currentTrojanMarginPercent: 0,
    },
    {
      id: "csc-deck-only",
      subtotal: 410000,
      deckVendors: ["CSC"],
      joistVendor: "",
      trojanDeckBaseSubtotal: 0,
      currentTrojanMarginPercent: 0,
    },
  ];

  const plan = buildOptimizationBoostPlan(options, 50);
  assert.equal(plan.ok, true);
  assert.equal(plan.boostedOptionId, "trojan-csc");
  assert.ok(near(plan.benchmarkSubtotal, 433004.65));
  assert.ok(near(plan.targetSubtotal, 324753.4875));

  const solved = solveBoostedTrojanMarginPercent({
    optionSubtotal: 285000,
    trojanDeckBaseSubtotal: 230000,
    currentTrojanMarginPercent: 15,
    targetSubtotal: 324753.4875,
    maxMarginPercent: 50,
  });
  assert.ok(near(plan.boostedTrojanMarginPercent, solved));
});

test("boost modifies only selected Trojan option and unboost restores original margin", () => {
  const options = [
    { id: "trojan-a", trojanMargin: 15, subtotal: 425000 },
    { id: "trojan-b", trojanMargin: 15, subtotal: 435000 },
    { id: "csc-only", trojanMargin: 0, subtotal: 433004.65 },
  ];
  const boostedOptionId = "trojan-a";
  const originalMargin = options.find((option) => option.id === boostedOptionId).trojanMargin;
  const boostedMargin = 4.5;

  const boosted = options.map((option) =>
    option.id === boostedOptionId ? { ...option, trojanMargin: boostedMargin, subtotal: 324753.4875 } : { ...option },
  );

  const trojanB = boosted.find((option) => option.id === "trojan-b");
  assert.equal(trojanB.trojanMargin, 15);
  assert.equal(trojanB.subtotal, 435000);
  assert.equal(boosted.find((option) => option.id === boostedOptionId).trojanMargin, boostedMargin);

  const unboosted = boosted.map((option) =>
    option.id === boostedOptionId ? { ...option, trojanMargin: originalMargin, subtotal: 425000 } : { ...option },
  );
  assert.equal(unboosted.find((option) => option.id === boostedOptionId).trojanMargin, originalMargin);
});

test("CSC-only classifier excludes Trojan and non-CSC suppliers", () => {
  assert.equal(isCscOnlyOption({ deckVendors: ["CSC"], joistVendor: "CSC" }), true);
  assert.equal(isCscOnlyOption({ deckVendors: ["CSC"], joistVendor: "" }), true);
  assert.equal(isCscOnlyOption({ deckVendors: ["TROJAN"], joistVendor: "CSC" }), false);
  assert.equal(isCscOnlyOption({ deckVendors: ["CSC", "CANO"], joistVendor: "CSC" }), false);
});
