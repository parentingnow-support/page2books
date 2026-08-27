/** KR freelancer expense categories (value → label). */
export const EXPENSE_CATEGORIES = [
  { value: "saas", label: "SaaS / 구독" },
  { value: "ads", label: "광고" },
  { value: "office", label: "사무 / 소모품" },
  { value: "travel", label: "교통 / 출장" },
  { value: "meals", label: "식대 / 접대" },
  { value: "fees", label: "수수료" },
  { value: "other", label: "기타" },
];

/** @param {string} value */
export function categoryLabel(value) {
  return EXPENSE_CATEGORIES.find((c) => c.value === value)?.label || value || "—";
}
