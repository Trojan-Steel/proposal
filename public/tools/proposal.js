(function () {
  const STORAGE_KEY = "proposalData_v1";
  const LOCAL_LOGO_URL = "../data/templates/trojan-logo.png";
  const proposalRoot = document.getElementById("proposalRoot");
  const downloadButton = document.getElementById("downloadProposalPdfButton");
  const backButton = document.getElementById("backToCalculatorButton");
  const queryParams = new URLSearchParams(window.location.search);
  let logoDataUrl = "";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function upperText(value) {
    return String(value ?? "").toUpperCase();
  }

  function formatMoney(value) {
    const numeric = Number.isFinite(Number(value)) ? Number(value) : 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
  }

  function formatNumber(value, digits) {
    const numeric = Number.isFinite(Number(value)) ? Number(value) : 0;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(numeric);
  }

  function sanitizeFilenamePart(value, fallback = "proposal") {
    const cleaned = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    return cleaned || fallback;
  }

  function buildPdfFilename(data) {
    const projectPart = sanitizeFilenamePart(data?.projectName || "", "");
    const quotePart = sanitizeFilenamePart(data?.quoteRef || "", "");
    const parts = [projectPart, quotePart].filter(Boolean);
    if (!parts.length) {
      return "proposal.pdf";
    }
    return `${parts.join("-")}.pdf`;
  }

  function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `proposal-toast proposal-toast-${type === "error" ? "error" : "success"}`;
    toast.textContent = String(message || "");
    toast.style.position = "fixed";
    toast.style.right = "16px";
    toast.style.bottom = "16px";
    toast.style.zIndex = "9999";
    toast.style.padding = "10px 12px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "13px";
    toast.style.fontWeight = "600";
    toast.style.background = type === "error" ? "#fef2f2" : "#f0fdf4";
    toast.style.color = type === "error" ? "#991b1b" : "#166534";
    toast.style.border = `1px solid ${type === "error" ? "#fecaca" : "#bbf7d0"}`;
    document.body.appendChild(toast);
    window.setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  function toNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function parseCurrencyText(value) {
    if (value === null || value === undefined) {
      return 0;
    }
    const cleaned = String(value).replace(/[^0-9.-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function createExportUuid() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `exp-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
  }

  function collectTableRows(headerLabel) {
    const tables = Array.from(proposalRoot.querySelectorAll(".table-wrap table"));
    const targetTable = tables.find((table) => {
      const heading = table.querySelector("thead th");
      return heading && String(heading.textContent || "").trim().toUpperCase() === String(headerLabel).trim().toUpperCase();
    });
    if (!targetTable) {
      return [];
    }
    return Array.from(targetTable.querySelectorAll("tbody tr"))
      .map((row) => Array.from(row.querySelectorAll("td")).map((cell) => String(cell.textContent || "").trim()))
      .filter((cells) => cells.some((cell) => cell !== ""));
  }

  function buildExportSnapshot(data) {
    const exportMeta = data?.exportMeta && typeof data.exportMeta === "object" ? data.exportMeta : {};
    const deckRows = collectTableRows("DECK");
    const accessoryRows = collectTableRows("ACCESSORIES");
    const joistRows = collectTableRows("JOIST");
    const projectPriceEl = proposalRoot.querySelector(".project-price-value");
    const projectPriceText = projectPriceEl ? String(projectPriceEl.textContent || "") : "";
    const finalSubtotal = projectPriceText ? parseCurrencyText(projectPriceText) : toNumber(data?.totals?.grandTotal);
    const deckSupplierFallback = Array.from(
      new Set((Array.isArray(data?.deckLines) ? data.deckLines : []).map((line) => String(line?.manufacturer || "").trim()).filter(Boolean)),
    ).join(" + ");
    const joistSupplierFallback = Array.from(
      new Set((Array.isArray(data?.joistLines) ? data.joistLines : []).map((line) => String(line?.manufacturer || "").trim()).filter(Boolean)),
    ).join(" + ");

    const snapshot = {
      export_uuid: createExportUuid(),
      created_at_client: new Date().toISOString(),
      quoteRef: String(data?.quoteRef || "").trim(),
      projectName: String(data?.projectName || "").trim(),
      locationText: String(data?.locationText || "").trim(),
      selectedOptionName: String(exportMeta.selectedOptionName || "").trim(),
      isBoostOn: Boolean(exportMeta.isBoostOn),
      finalSubtotal,
      totalMarginDollars: toNumber(data?.margins?.total?.amount),
      totalMarginPct: toNumber(data?.margins?.total?.blendedPercent),
      deckSupplier: String(exportMeta.deckSupplier || deckSupplierFallback || "").trim(),
      joistSupplier: String(exportMeta.joistSupplier || joistSupplierFallback || "").trim(),
      appVersion: String(exportMeta.appVersion || "trojan-estimator-web").trim(),
      keyInputs: {
        proposalDate: String(data?.proposalDate || "").trim(),
        validUntilDate: String(data?.validUntilDate || "").trim(),
        submittalsLeadTime: String(data?.submittalsLeadTime || "").trim(),
        fabricationLeadTime: String(data?.fabricationLeadTime || "").trim(),
        takeoffByTrojan: String(data?.takeoffByTrojan || "").trim(),
        cutListProvided: String(data?.cutListProvided || "").trim(),
        specsReviewed: String(data?.specsReviewed || "").trim(),
      },
      deckLines: deckRows.map((cells) => ({
        type: cells[0] || "",
        sqs: parseCurrencyText(cells[1]),
        tons: parseCurrencyText(cells[2]),
      })),
      accessoryLines: accessoryRows.map((cells) => ({
        type: cells[0] || "",
        screwCount: parseCurrencyText(cells[1]),
        tons: parseCurrencyText(cells[2]),
      })),
      joistLines: joistRows.map((cells) => ({
        description: cells[0] || "",
        units: parseCurrencyText(cells[1]),
        tons: parseCurrencyText(cells[2]),
      })),
      pricingLines: [
        { label: "TOTAL PROJECT PRICE", amount: finalSubtotal },
        { label: "TOTAL MARGIN", amount: toNumber(data?.margins?.total?.amount) },
      ],
      proposalData: data,
    };

    return snapshot;
  }

  async function logExportToSupabase(snapshot) {
    const response = await fetch("/api/quote-export-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        export_uuid: snapshot.export_uuid,
        snapshot,
      }),
    });
    if (!response.ok) {
      const text = (await response.text()).slice(0, 280);
      throw new Error(`status ${response.status}: ${text}`);
    }
    return response.json().catch(() => ({ ok: true }));
  }

  function loadProposalData() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (_error) {
      return null;
    }
  }

  function renderDeckRows(lines) {
    if (!Array.isArray(lines) || lines.length === 0) {
      return '<tr><td>&nbsp;</td><td class="align-center"></td><td class="align-center"></td></tr>';
    }
    return lines
      .map(
        (line) => `
        <tr>
          <td>${escapeHtml(upperText(line.type || "Deck"))}</td>
          <td class="align-center">${formatNumber(line.sqs, 2)}</td>
          <td class="align-center">${formatNumber(line.tons, 2)}</td>
        </tr>
      `,
      )
      .join("");
  }

  function renderAccessoryRows(lines) {
    if (!Array.isArray(lines) || lines.length === 0) {
      return '<tr><td>&nbsp;</td><td class="align-center"></td><td class="align-center"></td></tr>';
    }
    return lines
      .map(
        (line) => {
          const typeUpper = upperText(line.type || "ACCESSORY");
          const isScrewType = typeUpper.includes("TEKSCREWS");
          const screwValue = isScrewType ? formatNumber(line.screwCount, 0) : "";
          const tonsValue = isScrewType ? "" : formatNumber(line.tons, 2);
          return `
        <tr>
          <td>${escapeHtml(typeUpper)}</td>
          <td class="align-center">${screwValue}</td>
          <td class="align-center">${tonsValue}</td>
        </tr>
      `;
        },
      )
      .join("");
  }

  function renderJoistRows(lines) {
    if (!Array.isArray(lines) || lines.length === 0) {
      return '<tr><td>&nbsp;</td><td class="align-center"></td><td class="align-center"></td></tr>';
    }
    return lines
      .map((line) => {
        const descriptionUpper = upperText(line.description || "JOIST");
        const isBridging = descriptionUpper.includes("BRIDGING");
        return `
        <tr>
          <td>${escapeHtml(descriptionUpper)}</td>
          <td class="align-center">${isBridging ? "" : formatNumber(line.units, 0)}</td>
          <td class="align-center">${formatNumber(line.tons, 2)}</td>
        </tr>
      `;
      })
      .join("");
  }

  function renderPageOne(data) {
    const resolvedLogoSrc = logoDataUrl || LOCAL_LOGO_URL;
    const deckLines = Array.isArray(data.deckLines) ? data.deckLines : [];
    const accessoryLines = Array.isArray(data.accessoriesLines) ? data.accessoriesLines : [];
    const joistLines = Array.isArray(data.joistLines) ? data.joistLines : [];

    const deckSqsTotal = deckLines.reduce(
      (sum, line) => sum + (Number.isFinite(Number(line?.sqs)) ? Number(line.sqs) : 0),
      0,
    );
    const accessoryTonsTotal = accessoryLines.reduce(
      (sum, line) => sum + (Number.isFinite(Number(line?.tons)) ? Number(line.tons) : 0),
      0,
    );
    const deckTonsWithAccessories = (Number.isFinite(Number(data.totals?.totalDeckTons)) ? Number(data.totals.totalDeckTons) : 0) + accessoryTonsTotal;
    const joistTonsTotal = Number.isFinite(Number(data.totals?.totalJoistTons)) ? Number(data.totals.totalJoistTons) : 0;
    const totalProjectTons = deckTonsWithAccessories + joistTonsTotal;

    const hasDeckScope = deckLines.some((line) => {
      const sqs = Number(line?.sqs);
      const tons = Number(line?.tons);
      const type = String(line?.type || "").trim();
      return (Number.isFinite(sqs) && sqs > 0) || (Number.isFinite(tons) && tons > 0) || Boolean(type);
    });
    const hasAccessoryScope = accessoryLines.some((line) => {
      const tons = Number(line?.tons);
      const screwCount = Number(line?.screwCount);
      const type = String(line?.type || "").trim();
      return (Number.isFinite(tons) && tons > 0) || (Number.isFinite(screwCount) && screwCount > 0) || Boolean(type);
    });
    const hasJoistScope = joistLines.some((line) => {
      const tons = Number(line?.tons);
      const units = Number(line?.units);
      const description = String(line?.description || "").trim();
      return (Number.isFinite(tons) && tons > 0) || (Number.isFinite(units) && units > 0) || Boolean(description);
    });
    const includedParts = [];
    if (hasDeckScope) includedParts.push("DECK");
    if (hasJoistScope) includedParts.push("JOISTS");
    if (hasAccessoryScope) includedParts.push("ACCESSORIES");
    const includesSentence =
      includedParts.length > 0
        ? `PRICE INCLUDES ALL ${includedParts.join(", ")} LISTED ABOVE.`
        : "PRICE INCLUDES SCOPE LISTED ABOVE.";
    return `
      <section class="proposal-page page-break">
        <div class="proposal-header">
          <img
            src="${resolvedLogoSrc}"
            alt="Trojan Steel"
          />
          <h1 class="project-title">${escapeHtml(upperText(data.projectName || "-"))}</h1>
        </div>

        <div class="proposal-meta-row">
          <div class="proposal-meta-stack">
            <div class="proposal-meta-group">
              <div><strong>SUBMITTALS:</strong> ${escapeHtml(upperText(data.submittalsLeadTime || "-"))}</div>
              <div><strong>FABRICATION:</strong> ${escapeHtml(upperText(data.fabricationLeadTime || "-"))}</div>
            </div>
            <div class="proposal-meta-break" aria-hidden="true"></div>
            <div class="proposal-meta-group">
              <div><strong>PROPOSAL DATE:</strong> ${escapeHtml(upperText(data.proposalDate || "-"))}</div>
              <div><strong>VALID UNTIL:</strong> ${escapeHtml(upperText(data.validUntilDate || "-"))}</div>
              <div><strong>QUOTE REFERENCE:</strong> ${escapeHtml(upperText(data.quoteRef || "-"))}</div>
              <div><strong>PROJECT LOCATION:</strong> ${escapeHtml(upperText(data.locationText || "-"))}</div>
            </div>
            <div class="proposal-meta-break" aria-hidden="true"></div>
            <div class="proposal-meta-inline">
              <span><strong>TAKEOFF BY TROJAN:</strong> ${escapeHtml(upperText(data.takeoffByTrojan || "NO"))}</span>
              <span><strong>CUT LIST:</strong> ${escapeHtml(upperText(data.cutListProvided || "NO"))}</span>
              <span><strong>SPECS:</strong> ${escapeHtml(upperText(data.specsReviewed || "NO"))}</span>
            </div>
            <div data-proposal-conditions-slot="PAGE_1"></div>
          </div>
          <div class="proposal-contact-block">
            <div><strong class="trojan-accent">TROJAN</strong></div>
            <div>${escapeHtml(upperText(data.contactPhone || "(281) 954-4422"))}</div>
            <div>PO BOX 444, STEPHENVILLE, TX 76401</div>
            <div class="contact-link-row"><a href="mailto:${escapeHtml((data.contactEmail || "estimating@trojansteel.com").toLowerCase())}" class="lowercase-text">${escapeHtml((data.contactEmail || "estimating@trojansteel.com").toLowerCase())}</a></div>
            <div class="contact-link-row"><a href="https://www.trojansteel.com" target="_blank" rel="noopener noreferrer" class="lowercase-text">www.trojansteel.com</a></div>
          </div>
        </div>

        <div class="table-wrap">
          <table>
            <colgroup>
              <col class="col-description" />
              <col class="col-measure" />
              <col class="col-tons" />
            </colgroup>
            <thead>
              <tr>
                <th>DECK</th>
                <th class="align-center">SQS</th>
                <th class="align-center">TONS</th>
              </tr>
            </thead>
            <tbody>
              ${renderDeckRows(data.deckLines)}
            </tbody>
          </table>
        </div>
        <div class="table-wrap">
          <table>
            <colgroup>
              <col class="col-description" />
              <col class="col-measure" />
              <col class="col-tons" />
            </colgroup>
            <thead>
              <tr>
                <th>ACCESSORIES</th>
                <th class="align-center">SCREW COUNT</th>
                <th class="align-center">TONS</th>
              </tr>
            </thead>
            <tbody>
              ${renderAccessoryRows(data.accessoriesLines)}
            </tbody>
          </table>
        </div>

        <div class="table-wrap">
          <table>
            <colgroup>
              <col class="col-description" />
              <col class="col-measure" />
              <col class="col-tons" />
            </colgroup>
            <thead>
              <tr>
                <th>JOIST</th>
                <th class="align-center">UNITS</th>
                <th class="align-center">TONS</th>
              </tr>
            </thead>
            <tbody>
              ${renderJoistRows(data.joistLines)}
            </tbody>
          </table>
        </div>

        <div class="inline-totals-row">
          <div class="inline-totals-top">
            <span>TOTAL SQS: <strong>${formatNumber(deckSqsTotal, 2)}</strong></span>
            <span>TOTAL DECK & ACCESSORIES TONS: <strong>${formatNumber(deckTonsWithAccessories, 2)}</strong></span>
            <span>TOTAL JOIST TONS: <strong>${formatNumber(joistTonsTotal, 2)}</strong></span>
          </div>
          <div class="inline-totals-bottom">
            <span class="inline-total-final">TOTAL TONS: <strong>${formatNumber(totalProjectTons, 2)}</strong></span>
          </div>
        </div>

        <div class="price-review-note">
          TROJAN STEEL RESERVES THE RIGHT TO REVIEW THE PRICE OF AN ORDER IF DELIVERY IS NOT ACCEPTED WITHIN 90 DAYS OF PURCHASE ORDER RECEIPT.
        </div>

        <div class="project-price-box">
          <span class="project-price-label">TOTAL PROJECT PRICE</span>
          <span class="project-price-underline" aria-hidden="true"></span>
          <span class="project-price-amount-row">
            <span class="project-price-tax-note">(SALES TAX NOT INCLUDED)</span>
            <span class="project-price-value">${formatMoney(Number(data.totals?.grandTotal) || 0)}</span>
          </span>
        </div>

        <div class="final-note-row">
          <span>${includesSentence}</span>
          <span>FREIGHT INCLUDED</span>
        </div>
      </section>
    `;
  }

  function applyTermsDynamicFields(data) {
    const quoteRef = upperText(data?.quoteRef || "-");
    proposalRoot.querySelectorAll("[data-proposal-quote-ref]").forEach((element) => {
      element.textContent = quoteRef;
    });

    const conditions = Array.isArray(data?.documentConditions) ? data.documentConditions : [];

    const numberedSlots = new Set([
      "STANDARD_EXCLUSIONS",
      "STANDARD_QUALIFICATIONS",
      "GENERAL_SALE_TERMS",
      "GENERAL_SALE_TERMS_CONTINUED",
    ]);

    function buildRangeItems(anchorElement) {
      const parent = anchorElement?.parentElement;
      if (!parent) {
        return { parent: null, rangeElements: [], items: [] };
      }
      const rangeElements = [];
      let sibling = anchorElement.nextElementSibling;
      while (sibling && !sibling.hasAttribute("data-proposal-conditions-slot")) {
        rangeElements.push(sibling);
        sibling = sibling.nextElementSibling;
      }
      const items = [];
      rangeElements.forEach((element) => {
        const text = (element.textContent || "").trim();
        const match = element.tagName === "P" ? text.match(/^(\d+)\.\s+/) : null;
        if (match) {
          items.push({
            type: "block",
            number: Number.parseInt(match[1], 10),
            elements: [element],
            isCustom: false,
          });
          return;
        }
        const lastItem = items[items.length - 1];
        if (element.tagName === "UL" && lastItem?.type === "block") {
          lastItem.elements.push(element);
          return;
        }
        items.push({ type: "element", element });
      });
      return { parent, rangeElements, items };
    }

    function renumberAndRenderSlot(anchorElement, slotConditions) {
      const { parent, rangeElements, items } = buildRangeItems(anchorElement);
      if (!parent || !rangeElements.length) {
        return;
      }

      slotConditions.forEach((condition) => {
        const customParagraph = document.createElement("p");
        customParagraph.textContent = condition.text;
        const customBlock = {
          type: "block",
          number: Number.isFinite(condition.afterNumber) ? condition.afterNumber : 0,
          elements: [customParagraph],
          isCustom: true,
        };
        const afterNumber = Number.isFinite(condition.afterNumber) ? condition.afterNumber : 0;
        let insertAt = items.length;
        if (afterNumber > 0) {
          for (let index = items.length - 1; index >= 0; index -= 1) {
            const item = items[index];
            if (item.type === "block" && item.number === afterNumber) {
              insertAt = index + 1;
              break;
            }
          }
        }
        items.splice(insertAt, 0, customBlock);
      });

      const firstNumbered = items.find((item) => item.type === "block");
      let nextNumber = firstNumbered ? firstNumbered.number : 1;
      items.forEach((item) => {
        if (item.type !== "block") {
          return;
        }
        const firstElement = item.elements[0];
        const currentText = (firstElement.textContent || "").trim();
        const stripped = currentText.replace(/^\d+\.\s*/, "");
        firstElement.textContent = `${nextNumber}. ${upperText(stripped)}`;
        nextNumber += 1;
      });

      rangeElements.forEach((element) => {
        if (element.parentElement === parent) {
          parent.removeChild(element);
        }
      });

      const fragment = document.createDocumentFragment();
      items.forEach((item) => {
        if (item.type === "element") {
          fragment.appendChild(item.element);
          return;
        }
        item.elements.forEach((element) => fragment.appendChild(element));
      });
      parent.insertBefore(fragment, anchorElement.nextSibling);
    }

    proposalRoot.querySelectorAll("[data-proposal-conditions-slot]").forEach((element) => {
      const slot = String(element.getAttribute("data-proposal-conditions-slot") || "").trim().toUpperCase();
      const slotConditions = conditions
        .filter((item) => String(item?.slot || "").trim().toUpperCase() === slot)
        .map((item) => ({
          text: String(item?.text || "").trim(),
          afterNumber: Number.parseInt(String(item?.afterNumber ?? ""), 10),
        }))
        .filter((item) => item.text !== "");

      if (numberedSlots.has(slot)) {
        if (!slotConditions.length) {
          element.innerHTML = "";
          return;
        }
        renumberAndRenderSlot(element, slotConditions);
        element.innerHTML = "";
        return;
      }

      const textLines = slotConditions
        .map((item) => item.text)
        .filter(Boolean);
      if (!textLines.length) {
        element.innerHTML = "";
        return;
      }
      element.innerHTML = `
        <div class="proposal-custom-conditions">
          ${textLines
            .map(
              (text, index) =>
                `<p>${textLines.length > 1 ? `${index + 1}. ` : ""}${escapeHtml(upperText(text))}</p>`,
            )
            .join("")}
        </div>
      `;
    });
  }

  function fallbackTermsMarkup() {
    return `
      <section class="proposal-page terms-page page-break">
        <div class="proposal-header"><h1>EXCLUSIONS & QUALIFICATIONS</h1></div>
        <h3>EXCLUSIONS</h3>
        <ul>
          <li>ENGINEERING, PERMIT FEES, TAXES, AND FIELD INSTALLATION ARE EXCLUDED UNLESS LISTED.</li>
          <li>UNLOADING, STORAGE, AND SITE HANDLING COSTS ARE EXCLUDED.</li>
          <li>ANY SCOPE NOT SPECIFICALLY LISTED IS EXCLUDED.</li>
        </ul>
        <h3>QUALIFICATIONS</h3>
        <ul>
          <li>PRICING IS BASED ON PROPOSAL-DATE ASSUMPTIONS AND RELEASED QUANTITIES.</li>
          <li>SUBMITTAL CHANGES MAY REQUIRE REPRICING.</li>
          <li>FREIGHT ASSUMES STANDARD ACCESS AND RECEIVING CONDITIONS.</li>
        </ul>
      </section>
      <section class="proposal-page terms-page">
        <div class="proposal-header"><h1>TERMS & CONDITIONS</h1></div>
        <ul>
          <li>PROPOSAL VALIDITY CONTROLS ALL LISTED RATES AND TOTALS.</li>
          <li>MATERIAL ESCALATION MAY APPLY AFTER VALIDITY DATE.</li>
          <li>WARRANTY IS LIMITED TO STANDARD MATERIAL/WORKMANSHIP TERMS.</li>
        </ul>
      </section>
    `;
  }

  async function loadTermsMarkup() {
    try {
      const response = await fetch("terms.html", { cache: "no-store" });
      if (!response.ok) {
        return fallbackTermsMarkup();
      }
      return await response.text();
    } catch (_error) {
      return fallbackTermsMarkup();
    }
  }

  async function preloadLogoDataUrl() {
    if (logoDataUrl) {
      return;
    }
    const response = await fetch(`${LOCAL_LOGO_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`LOCAL LOGO NOT FOUND AT ${LOCAL_LOGO_URL}`);
    }
    const blob = await response.blob();
    logoDataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result || ""));
      reader.readAsDataURL(blob);
    });
    if (!logoDataUrl) {
      throw new Error("FAILED TO CONVERT LOCAL LOGO TO DATA URL");
    }
  }

  function waitForImages(container) {
    const images = Array.from(container.querySelectorAll("img"));
    if (images.length === 0) {
      return Promise.resolve();
    }
    return Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(img.naturalWidth > 0);
              return;
            }
            img.addEventListener("load", () => resolve(img.naturalWidth > 0), { once: true });
            img.addEventListener("error", () => resolve(false), { once: true });
          }),
      ),
    ).then((statuses) => statuses.every(Boolean));
  }

  function fitProjectTitleToTwoLines(scopeEl) {
    const root = scopeEl || proposalRoot;
    const titles = Array.from(root.querySelectorAll(".project-title"));
    if (!titles.length) {
      return;
    }
    titles.forEach((titleEl) => {
      const style = window.getComputedStyle(titleEl);
      const defaultSize = parseFloat(style.fontSize) || 38.4; // 2.4rem fallback
      const minSize = Math.max(12, defaultSize * 0.4);
      const lineHeightPx = Number.isFinite(parseFloat(style.lineHeight))
        ? parseFloat(style.lineHeight)
        : defaultSize;
      const maxHeight = lineHeightPx * 2 + 1;

      let size = defaultSize;
      titleEl.style.fontSize = `${size}px`;
      while (titleEl.scrollHeight > maxHeight && size > minSize) {
        size -= 0.5;
        titleEl.style.fontSize = `${size}px`;
      }
    });
  }

  function fitFirstPageToSinglePage() {
    const firstPage = proposalRoot.querySelector(".proposal-page");
    if (!firstPage) {
      return;
    }
    firstPage.classList.remove("compact-1", "compact-2", "compact-3");
    fitProjectTitleToTwoLines(firstPage);
    const compactClasses = ["compact-1", "compact-2", "compact-3"];
    let compactIndex = 0;
    let guard = 0;
    while (firstPage.scrollHeight > firstPage.clientHeight + 1 && guard < 28) {
      guard += 1;
      const title = firstPage.querySelector(".project-title");
      if (title) {
        const currentSize = parseFloat(window.getComputedStyle(title).fontSize) || 38.4;
        if (currentSize > 12) {
          title.style.fontSize = `${Math.max(12, currentSize - 0.5)}px`;
          continue;
        }
      }
      if (compactIndex < compactClasses.length) {
        firstPage.classList.add(compactClasses[compactIndex]);
        compactIndex += 1;
      } else {
        break;
      }
    }
  }

  function fitTermsPagesToBounds() {
    const pages = Array.from(proposalRoot.querySelectorAll(".terms-page"));
    const compactClasses = ["terms-compact-1", "terms-compact-2", "terms-compact-3"];
    if (!pages.length) {
      return;
    }

    const clearAllCompactClasses = () => {
      pages.forEach((page) => {
        page.classList.remove(...compactClasses);
      });
    };

    const allPagesFit = () => pages.every((page) => page.scrollHeight <= page.clientHeight + 1);

    clearAllCompactClasses();
    if (allPagesFit()) {
      return;
    }

    for (const compactClass of compactClasses) {
      clearAllCompactClasses();
      pages.forEach((page) => {
        page.classList.add(compactClass);
      });
      if (allPagesFit()) {
        return;
      }
    }
  }

  async function renderProposal() {
    const data = loadProposalData();
    if (!data) {
      proposalRoot.innerHTML = '<div class="empty-state">NO PROPOSAL DATA FOUND. RETURN TO THE CALCULATOR AND CLICK \"GENERATE PROPOSAL PDF\".</div>';
      return;
    }

    try {
      await preloadLogoDataUrl();
    } catch (_error) {
      logoDataUrl = "";
    }
    const termsMarkup = await loadTermsMarkup();
    proposalRoot.innerHTML = `${renderPageOne(data)}${termsMarkup}`;
    applyTermsDynamicFields(data);
    fitFirstPageToSinglePage();
    fitTermsPagesToBounds();
  }

  async function downloadPdfOneClick() {
    const data = loadProposalData();
    if (!data) {
      window.alert("NO PROPOSAL DATA FOUND. RETURN TO THE CALCULATOR AND TRY AGAIN.");
      return;
    }

    const originalLabel = downloadButton?.textContent || "Download PDF";
    if (downloadButton) {
      downloadButton.disabled = true;
      downloadButton.textContent = "Generating PDF...";
    }
    try {
      const snapshot = buildExportSnapshot(data);
      const healthUrl = "/api/proposal-health";
      const proposalApiUrl = "/api/proposal-render";
      const healthFallbackUrl = "/proposal-api/health";
      const proposalFallbackUrl = "/proposal-api/proposal";
      const canUseLocalFallback = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const fetchWithLocalFallback = async (primaryUrl, fallbackUrl, options) => {
        const response = await fetch(primaryUrl, options);
        if (canUseLocalFallback && response.status === 404) {
          return fetch(fallbackUrl, options);
        }
        return response;
      };
      const healthResponse = await fetchWithLocalFallback(healthUrl, healthFallbackUrl);
      if (!healthResponse.ok) {
        const text = (await healthResponse.text()).slice(0, 200);
        throw new Error(`Health check failed at ${healthUrl} | status ${healthResponse.status} | body: ${text}`);
      }
      const healthJson = await healthResponse.json().catch(() => null);
      if (!healthJson || healthJson.ok !== true) {
        throw new Error(`Health endpoint returned unexpected payload at ${healthUrl}`);
      }
      const response = await fetchWithLocalFallback(proposalApiUrl, proposalFallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalData: data }),
      });
      if (!response.ok) {
        const text = (await response.text()).slice(0, 200);
        throw new Error(`PDF server error at ${proposalApiUrl} | status ${response.status} | body: ${text}`);
      }
      const blob = await response.blob();
      const filename = buildPdfFilename(data);
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      logExportToSupabase(snapshot)
        .then(() => {
          showToast("Export logged", "success");
        })
        .catch((error) => {
          console.error("Export logging failed", {
            operation: "quote_export_log",
            message: error instanceof Error ? error.message : String(error),
          });
          showToast("Export logging failed", "error");
        });
    } catch (_primaryError) {
      const message = _primaryError?.message || String(_primaryError);
      window.alert(
        `PDF GENERATION FAILED.\nHealth URL: /api/proposal-health\nPDF URL: /api/proposal-render\nError: ${message}\nHint: for local npm run dev:all, fallback endpoints /proposal-api/health and /proposal-api/proposal are used if /api/* is unavailable.`,
      );
    } finally {
      if (downloadButton) {
        downloadButton.disabled = false;
        downloadButton.textContent = originalLabel;
      }
    }
  }

  function goBackToCalculator() {
    const params = new URLSearchParams(window.location.search);
    const returnPage = params.get("returnPage") || "pricing";
    const returnUrl = `../index.html?page=${encodeURIComponent(returnPage)}`;
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.focus();
        if (window.opener.location && /index\.html/i.test(window.opener.location.href)) {
          const openerUrl = new URL(window.opener.location.href);
          openerUrl.searchParams.set("page", returnPage);
          window.opener.location.href = openerUrl.toString();
        }
        window.close();
        return;
      } catch (_error) {
        // Fall through to history/navigation fallback.
      }
    }
    window.location.href = returnUrl;
  }

  backButton?.addEventListener("click", goBackToCalculator);
  downloadButton?.addEventListener("click", downloadPdfOneClick);
  window.addEventListener("resize", () => {
    fitFirstPageToSinglePage();
    fitTermsPagesToBounds();
  });
  renderProposal().then(() => {
    if (queryParams.get("autodownload") === "1") {
      window.setTimeout(() => {
        downloadPdfOneClick();
      }, 120);
    }
  });
})();
