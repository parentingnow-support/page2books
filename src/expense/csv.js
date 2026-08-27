/** @param {unknown} value */
function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

/**
 * @param {Array<{ date?: string, amount?: number, currency?: string, merchant?: string, category?: string, memo?: string, sourceUrl?: string }>} items
 * @param {(value: string) => string} [labelForCategory]
 */
export function expensesToCsv(items, labelForCategory = (v) => v || "") {
  const header = "date,amount,currency,merchant,category,memo,source_url";
  const rows = (items || []).map((row) => {
    const category = labelForCategory(row.category || "");
    return [
      row.date,
      row.amount,
      row.currency,
      row.merchant,
      category,
      row.memo,
      row.sourceUrl,
    ]
      .map(csvEscape)
      .join(",");
  });
  return [header, ...rows].join("\n");
}
