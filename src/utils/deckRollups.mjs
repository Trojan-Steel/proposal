function toPositiveNumberOrZero(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }
  return parsed;
}

function normalizeVendor(value) {
  return String(value || "").trim().toUpperCase();
}

export function computeDeckRollups(deckAssignments = []) {
  const lineTotalsByVendor = {};
  let trojanDeckTons = 0;
  let brokeredDeckTons = 0;
  let totalExtended = 0;

  (Array.isArray(deckAssignments) ? deckAssignments : []).forEach((assignment) => {
    const vendor = normalizeVendor(assignment?.vendor);
    const tons = toPositiveNumberOrZero(assignment?.tons);
    const extendedTotal = toPositiveNumberOrZero(assignment?.extendedTotal);
    if (!vendor) {
      return;
    }

    if (vendor === "TROJAN") {
      trojanDeckTons += tons;
    } else {
      brokeredDeckTons += tons;
    }
    totalExtended += extendedTotal;
    lineTotalsByVendor[vendor] = (lineTotalsByVendor[vendor] || 0) + extendedTotal;
  });

  return {
    trojanDeckTons,
    brokeredDeckTons,
    totalExtended,
    lineTotalsByVendor,
  };
}
