export const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"]

export type Category = (typeof categories)[number];

export interface Expense {
    id: string,
    title: string,
    amount: number,
    category: Category,
    date: string
}