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

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const expenses = useExpenseStore((state) => state.expenses);

  // Calculate total amount per category
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
    <div className="max-w-sm mx-auto mt-6">
      <Pie data={data} options={options} />
    </div>
  );
}
