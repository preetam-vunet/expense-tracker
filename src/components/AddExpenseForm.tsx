import {useState} from 'react';
import {v4 as uuid} from 'uuid';
import type {Expense, Category} from '../types';
import { addExpense } from '../localStorageService';
import {categories} from '../types'

export default function AddExpensesForm() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<Category>("");
    const [date, setDate] = useState("");

    const handleExpenseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !amount || !category || !date) return;

        const newExpense: Expense = {
            id: uuid(),
            title,
            amount,
            category: category as Category,
            date
        }

        addExpense(newExpense);

        setTitle("");
        setAmount(0);
        setCategory("");
        setDate("");
    } 

    return (
        <>
            <form onSubmit={handleExpenseSubmit}>
                <input 
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                />
                <input 
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    required
                />
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >   
                    <option value="" disabled hidden>
                        Select Category
                    </option>
                    {categories.map((cat) => (
                        <option value={cat} key={cat}>{cat}</option>
                    ))}
                </select>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                 />
                 <button type='submit'>Submit Expense</button>
            </form>
        </>
    )
}