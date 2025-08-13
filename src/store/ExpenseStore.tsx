import { create } from "zustand";
import type { Expense } from "../types";
import { getExpenses, addExpense as addExpenseToLS, deleteExpense as deleteExpenseFromLS } from "../localStorageService";

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  fetchExpenses: () => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: getExpenses(),

  fetchExpenses: () => set({ expenses: getExpenses() }),

  addExpense: (expense) => {
    addExpenseToLS(expense);
    set((state) => ({ expenses: [expense, ...state.expenses] }));
  },

  deleteExpense: (id) => {
    deleteExpenseFromLS(id);
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) }));
  },
}));
