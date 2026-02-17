import test from "node:test";
import assert from "node:assert/strict";
import { computeDeckRollups } from "../src/utils/deckRollups.mjs";

test("applying a new optimization option replaces deck rollups without Trojan carryover", () => {
  const optionADeckAssignments = [
    { lineId: 1, vendor: "TROJAN", tons: 120.53, extendedTotal: 256404.35 },
  ];
  const optionBDeckAssignments = [
    { lineId: 1, vendor: "CSC", tons: 120.53, extendedTotal: 265768.65 },
  ];

  const rollupsA = computeDeckRollups(optionADeckAssignments);
  assert.equal(Number(rollupsA.trojanDeckTons.toFixed(2)), 120.53);
  assert.equal(Number((rollupsA.lineTotalsByVendor.TROJAN || 0).toFixed(2)), 256404.35);

  const rollupsB = computeDeckRollups(optionBDeckAssignments);
  assert.equal(Number(rollupsB.trojanDeckTons.toFixed(2)), 0);
  assert.equal(Number(rollupsB.brokeredDeckTons.toFixed(2)), 120.53);
  assert.equal(Object.prototype.hasOwnProperty.call(rollupsB.lineTotalsByVendor, "TROJAN"), false);
  assert.equal(Number((rollupsB.lineTotalsByVendor.CSC || 0).toFixed(2)), 265768.65);

  const accessories = 3100;
  const cscJoists = 164136;
  const appliedSubtotal = rollupsB.totalExtended + cscJoists + accessories;
  assert.equal(Number(appliedSubtotal.toFixed(2)), 433004.65);
});
