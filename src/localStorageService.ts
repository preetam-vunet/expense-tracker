import type { Expense } from "./types";

const STORAGE_KEY = 'expense-info'

export function getExpenses() : Expense[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) as Expense[] : [];
}

export function addExpense(expense: Expense): void {
    const expenses = getExpenses();
    expenses.push(expense);
    expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function deleteExpense(id: string): void {
    const expenses = getExpenses();
    const sortedExpenses = expenses.filter(expense => expense.id != id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedExpenses));
}
