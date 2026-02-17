const DEFAULT_MAX_MARGIN_PERCENT = 50;
const DEFAULT_BOOST_TARGET_PCT = 0.855;
const DEFAULT_BOOST_UNDERCUT_BUFFER = 1000;

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

export function computeBoostTarget({
  benchmarkSubtotal,
  boostTargetPctDefault = DEFAULT_BOOST_TARGET_PCT,
  nextCheapestOverallSubtotal,
  boostUndercutBuffer = DEFAULT_BOOST_UNDERCUT_BUFFER,
}) {
  const safeBenchmarkSubtotal = toPositiveNumberOrZero(benchmarkSubtotal);
  const safeTargetPct = toPositiveNumberOrZero(boostTargetPctDefault) || DEFAULT_BOOST_TARGET_PCT;
  const desiredTarget = safeBenchmarkSubtotal * safeTargetPct;
  const safeNextCheapestOverallSubtotal = toPositiveNumberOrZero(nextCheapestOverallSubtotal);
  const safeBuffer = toPositiveNumberOrZero(boostUndercutBuffer);
  const capTarget =
    safeNextCheapestOverallSubtotal > 0
      ? safeNextCheapestOverallSubtotal - safeBuffer
      : Number.POSITIVE_INFINITY;
  const finalTarget = Math.min(desiredTarget, capTarget);
  return {
    desiredTarget,
    capTarget,
    finalTarget,
  };
}

export function buildOptimizationBoostPlan(options, config = {}) {
  const maxMarginPercent =
    Number.isFinite(Number(config.maxMarginPercent)) && Number(config.maxMarginPercent) > 0
      ? Number(config.maxMarginPercent)
      : DEFAULT_MAX_MARGIN_PERCENT;
  const boostTargetPctDefault =
    Number.isFinite(Number(config.boostTargetPctDefault)) && Number(config.boostTargetPctDefault) > 0
      ? Number(config.boostTargetPctDefault)
      : DEFAULT_BOOST_TARGET_PCT;
  const boostUndercutBuffer =
    Number.isFinite(Number(config.boostUndercutBuffer)) && Number(config.boostUndercutBuffer) >= 0
      ? Number(config.boostUndercutBuffer)
      : DEFAULT_BOOST_UNDERCUT_BUFFER;
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
  const nextCheapestOverallOption = normalizedOptions
    .filter((option) => String(option.id || "") !== String(lowestTrojanDeckOption.id || ""))
    .reduce((current, option) => {
      if (!current) {
        return option;
      }
      return toPositiveNumberOrZero(option.subtotal) < toPositiveNumberOrZero(current.subtotal) ? option : current;
    }, null);

  const benchmarkSubtotal = toPositiveNumberOrZero(highestCscOnlyOption.subtotal);
  const nextCheapestOverallSubtotal = toPositiveNumberOrZero(nextCheapestOverallOption?.subtotal);
  const target = computeBoostTarget({
    benchmarkSubtotal,
    boostTargetPctDefault,
    nextCheapestOverallSubtotal,
    boostUndercutBuffer,
  });
  const currentTrojanSubtotal = toPositiveNumberOrZero(lowestTrojanDeckOption.subtotal);
  if (target.finalTarget <= currentTrojanSubtotal) {
    return {
      ok: false,
      reason: "Already above target",
      benchmarkSubtotal,
      desiredTarget: target.desiredTarget,
      capTarget: target.capTarget,
      targetSubtotal: target.finalTarget,
      nextCheapestOverallSubtotal,
      boostedOptionId: String(lowestTrojanDeckOption.id || ""),
    };
  }

  const boostedTrojanMarginPercent = solveBoostedTrojanMarginPercent({
    optionSubtotal: currentTrojanSubtotal,
    trojanDeckBaseSubtotal: lowestTrojanDeckOption.trojanDeckBaseSubtotal,
    currentTrojanMarginPercent: lowestTrojanDeckOption.currentTrojanMarginPercent,
    targetSubtotal: target.finalTarget,
    maxMarginPercent,
  });

  return {
    ok: true,
    benchmarkSubtotal,
    desiredTarget: target.desiredTarget,
    capTarget: target.capTarget,
    targetSubtotal: target.finalTarget,
    nextCheapestOverallSubtotal,
    boostTargetPctDefault,
    boostUndercutBuffer,
    boostedOptionId: String(lowestTrojanDeckOption.id || ""),
    boostedOriginalTrojanMarginPercent: toPositiveNumberOrZero(lowestTrojanDeckOption.currentTrojanMarginPercent),
    boostedTrojanMarginPercent,
  };
}
