export function normalizeBoostFactorInput(value, fallback = 0.9) {
  const parsed = Number.parseFloat(String(value ?? "").trim());
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }
  const normalized = parsed > 1 ? parsed / 100 : parsed;
  return Math.max(0, Math.min(1, normalized));
}

export function computeBoostTotalFromCsc(cscTotal, factor) {
  const total = Number(cscTotal);
  const normalizedTotal = Number.isFinite(total) && total > 0 ? total : 0;
  const normalizedFactor = normalizeBoostFactorInput(factor, 0.9);
  return Math.max(0, normalizedTotal * normalizedFactor);
}
