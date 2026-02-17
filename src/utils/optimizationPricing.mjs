function toNumberOrZero(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return 0;
  }
  return numeric;
}

function toMarginRate(marginPercent) {
  const margin = toNumberOrZero(marginPercent);
  if (margin <= 0) {
    return 0;
  }
  return margin > 1 ? margin / 100 : margin;
}

export function toCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(toNumberOrZero(value));
}

export function toPct(marginPercent) {
  return `${(toMarginRate(marginPercent) * 100).toFixed(2)}%`;
}

export function computeEffectiveUnitPrice(baseUnitPrice, marginPercent) {
  const base = toNumberOrZero(baseUnitPrice);
  const rate = toMarginRate(marginPercent);
  return base * (1 + rate);
}

export function computeLineTotals(quantity, baseUnitPrice, marginPercent) {
  const qty = toNumberOrZero(quantity);
  const base = toNumberOrZero(baseUnitPrice);
  const rate = toMarginRate(marginPercent);
  const effectiveUnitPrice = base * (1 + rate);
  const marginDollars = qty * base * rate;
  const lineTotal = qty * effectiveUnitPrice;
  return {
    quantity: qty,
    baseUnitPrice: base,
    marginRate: rate,
    effectiveUnitPrice,
    marginDollars,
    lineTotal,
  };
}
