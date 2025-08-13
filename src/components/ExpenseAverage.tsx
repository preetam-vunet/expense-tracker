import { useExpenseStore } from "../store/ExpenseStore";

export default function ExpenseAverage() {
  const expenses = useExpenseStore((state) => state.expenses);
  const currentDate = new Date();
  const currentMonthDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const totalExpense = expenses.reduce((sum, c) => sum + c.amount, 0);
  const average = totalExpense / currentMonthDays;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 w-full max-w-xs mx-auto border">
      <div className="text-lg font-semibold text-gray-800">
        ₹{average.toFixed(2)}
      </div>
      <div className="text-sm text-gray-500">Average This Month</div>

      <div className="text-lg font-semibold text-gray-800">
        ₹{totalExpense.toLocaleString("en-IN")}
      </div>
      <div className="text-sm text-gray-500">Total Expenses This Month</div>
    </div>
  );
}
