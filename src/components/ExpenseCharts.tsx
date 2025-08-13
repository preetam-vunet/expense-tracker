import { Pie } from "react-chartjs-2";
import { useExpenseStore } from "../store/ExpenseStore";
import { categories } from "../types";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import type { TooltipItem } from "chart.js"; 

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const expenses = useExpenseStore((state) => state.expenses);

  const categoryAmounts = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryAmounts,
        backgroundColor: [
          "#f87171", // red
          "#fbbf24", // yellow
          "#60a5fa", // blue
          "#34d399", // green
          "#a78bfa", // purple
          "#f472b6", // pink
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<'pie'>) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ₹${value}`;
          },
        },
      },
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Expenses by Category
      </h2>
      <div className="w-full h-64 flex justify-center items-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
