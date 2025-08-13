import AddExpensesForm from './components/AddExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import ExpenseChart from './components/ExpenseCharts'
import ExpenseAverage from './components/ExpenseAverage'
import './App.css'

export default function App() {
  return (
    <div className="p-6 h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        
        <div className="space-y-6 overflow-y-auto">
          <AddExpensesForm />
          <ExpenseChart />
          <ExpenseAverage />
        </div>

        <div className="col-span-2 flex flex-col h-full">
          <ExpenseTable />
        </div>
        
      </div>
    </div>
  )
}
