export const EXPENSE_STORAGE_KEY = "page2booksExpenses";

/** @typedef {{ id: string, savedAt: string, merchant: string, date: string, amount: number, currency: string, category: string, memo: string, sourceUrl: string }} ExpenseEntry */

export function newExpenseId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** @param {ExpenseEntry[]} items @param {Omit<ExpenseEntry, 'id'|'savedAt'>} entry */
export function addExpenseItem(items, entry) {
  const row = {
    id: newExpenseId(),
    savedAt: new Date().toISOString(),
    ...entry,
  };
  return [...(items || []), row];
}

/** @param {ExpenseEntry[]} items @param {string} id */
export function removeExpenseItem(items, id) {
  return (items || []).filter((x) => x.id !== id);
}

/** @returns {Promise<ExpenseEntry[]>} */
export async function loadExpenses() {
  const data = await chrome.storage.local.get(EXPENSE_STORAGE_KEY);
  return /** @type {ExpenseEntry[]} */ (data[EXPENSE_STORAGE_KEY] || []);
}

/** @param {ExpenseEntry[]} items */
export async function saveExpenses(items) {
  await chrome.storage.local.set({ [EXPENSE_STORAGE_KEY]: items });
}
