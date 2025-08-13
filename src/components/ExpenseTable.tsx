import { useState } from "react";
import { useExpenseStore } from "../store/ExpenseStore";
import { categories } from "../types"; 

export default function ExpenseTable() {
  const expenses = useExpenseStore((state) => state.expenses);
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      selectedCategory === "" || exp.category === selectedCategory;

    const matchesDate =
      (!startDate || new Date(exp.date) >= new Date(startDate)) &&
      (!endDate || new Date(exp.date) <= new Date(endDate));

    return matchesCategory && matchesDate;
  });

  if (expenses.length === 0)
    return <p className="text-center text-gray-500 mt-4">No Expenses Found.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="flex-1 overflow-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Title</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Amount</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Category</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Date</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-2 px-4">{exp.title}</td>
                  <td className="py-2 px-4">₹{exp.amount}</td>
                  <td className="py-2 px-4">{exp.category}</td>
                  <td className="py-2 px-4">{exp.date}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No matching expenses
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
