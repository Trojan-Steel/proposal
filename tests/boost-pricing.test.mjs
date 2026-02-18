import test from "node:test";
import assert from "node:assert/strict";
import { computeBoostTotalFromCsc, normalizeBoostFactorInput } from "../src/utils/boostPricing.mjs";

test("boost total uses CSC total times admin factor", () => {
  assert.equal(computeBoostTotalFromCsc(100000, 0.9), 90000);
  assert.equal(computeBoostTotalFromCsc(100000, 0.92), 92000);
});

test("boost factor accepts percent or decimal and clamps safely", () => {
  assert.equal(normalizeBoostFactorInput(90, 0.9), 0.9);
  assert.equal(normalizeBoostFactorInput(0.9, 0.9), 0.9);
  assert.equal(normalizeBoostFactorInput(120, 0.9), 1);
  assert.equal(normalizeBoostFactorInput(-5, 0.9), 0.9);
});

test("boost total never becomes negative", () => {
  assert.equal(computeBoostTotalFromCsc(-1000, 0.9), 0);
  assert.equal(computeBoostTotalFromCsc(1000, -0.5), 900);
});
