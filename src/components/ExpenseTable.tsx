import { useState, useEffect } from "react";
import type { Expense } from '../types'
import { getExpenses, deleteExpense } from "../localStorageService";

export default function ExpenseTable() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        setExpenses(getExpenses());
    }, [])

    if (expenses.length === 0) return <p>No Expenses Found.</p>

    const handleExpenseDelete = (id: string) => {
        deleteExpense(id);
        setExpenses(getExpenses());
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp) => (
                        <tr key={exp.id}>
                            <td>{exp.title}</td>
                            <td>{exp.amount}</td>
                            <td>{exp.category}</td>
                            <td>{exp.date}</td>
                            <button onClick={() => handleExpenseDelete(exp.id)}>Delete</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}