export type Category = "Food" | "Transport" | "Shopping" | "Bills" | "Entertainment" | "Other"; 

export interface Expense {
    id: string,
    title: string,
    amount: number,
    category: Category,
    date: string
}