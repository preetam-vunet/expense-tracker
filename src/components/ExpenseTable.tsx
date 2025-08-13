import { useExpenseStore } from "../store/ExpenseStore";

export default function ExpenseTable() {

    const expenses = useExpenseStore((state) => state.expenses)
    const deleteExpense = useExpenseStore((state) => state.deleteExpense)

    if (expenses.length === 0) return <p>No Expenses Found.</p>

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
                            <td>
                                <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                            </td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}