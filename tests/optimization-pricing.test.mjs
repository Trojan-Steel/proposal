import test from "node:test";
import assert from "node:assert/strict";
import { computeEffectiveUnitPrice, computeLineTotals } from "../src/utils/optimizationPricing.mjs";

const near = (actual, expected, epsilon = 1e-9) => Math.abs(actual - expected) <= epsilon;

test("optimization pricing math is internally consistent", () => {
  const qty = 120.53;
  const baseUnitPrice = 2100;
  const marginPct = 5;

  const effectiveUnitPrice = computeEffectiveUnitPrice(baseUnitPrice, marginPct);
  const totals = computeLineTotals(qty, baseUnitPrice, marginPct);

  assert.ok(near(effectiveUnitPrice, baseUnitPrice * 1.05));
  assert.ok(near(totals.effectiveUnitPrice, baseUnitPrice * 1.05));
  assert.ok(near(totals.lineTotal, qty * totals.effectiveUnitPrice));
  assert.ok(near(totals.marginDollars, qty * baseUnitPrice * 0.05));
});

test("zero margin keeps effective/base equal and zero margin dollars", () => {
  const totals = computeLineTotals(39.08, 4000, 0);
  assert.equal(totals.effectiveUnitPrice, 4000);
  assert.equal(totals.marginDollars, 0);
  assert.equal(totals.lineTotal, 39.08 * 4000);
});
