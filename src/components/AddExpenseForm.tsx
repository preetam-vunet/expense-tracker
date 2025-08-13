import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { Expense, Category } from '../types';
import { useExpenseStore } from '../store/ExpenseStore';
import { categories } from '../types';

export default function AddExpensesForm() {
  const addExpense = useExpenseStore((state) => state.addExpense);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [category, setCategory] = useState<Category>("");
  const [date, setDate] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const validate = () => {
    const newErrors = { title: "", amount: "", category: "", date: "" };

    if (!title.trim()) newErrors.title = "Title is required";
    else if (title.trim().length < 2) newErrors.title = "Title must be at least 2 characters";

    if (amount === null) newErrors.amount = "Amount is required";
    else if (amount <= 0) newErrors.amount = "Amount must be greater than 0";

    if (!category) newErrors.category = "Category is required";
    else if (!categories.includes(category)) newErrors.category = "Invalid category";

    if (!date) newErrors.date = "Date is required";
    else if (isNaN(new Date(date).getTime())) newErrors.date = "Invalid date";

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const newExpense: Expense = {
      id: uuid(),
      title: title.trim(),
      amount: amount!,
      category: category as Category,
      date
    };

    addExpense(newExpense);
    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setAmount(null);
    setCategory("");
    setDate("");
    setErrors({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <form
    onSubmit={handleExpenseSubmit}
    className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto flex flex-col gap-4"
    >
    <h2 className="text-xl font-semibold text-gray-700 mb-2">Add New Expense</h2>

    <div className="flex flex-col">
        <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.title ? "border-red-500" : "border-gray-300"
        }`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
    </div>

    <div className="flex flex-col">
        <input
        type="number"
        placeholder="Amount"
        value={amount ?? ""}
        onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : null)}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.amount ? "border-red-500" : "border-gray-300"
        }`}
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
    </div>

    <div className="flex flex-col">
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.category ? "border-red-500" : "border-gray-300"
        }`}
        >
        <option value="" disabled hidden>
            Select Category
        </option>
        {categories.map((cat) => (
            <option value={cat} key={cat}>
            {cat}
            </option>
        ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
    </div>

    <div className="flex flex-col">
        <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            errors.date ? "border-red-500" : "border-gray-300"
        }`}
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
    </div>

    <div className="flex gap-2">
        <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
        Submit Expense
        </button>
        <button
        type="button"
        onClick={clearForm}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
        >
        Clear
        </button>
    </div>
    </form>
  );
}
