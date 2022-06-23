import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  //useState hooks
  const [isLoading, setIsLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [transfers, setTransfers] = React.useState([]);
  const [error, setError] = React.useState();
  const [isCreating, setIsCreating] = React.useState(false);
  const [filterInputValue, setFilterInputValue] = React.useState('');
  const [newTransactionForm, setNewTransactionForm] = React.useState({category: '',
                                                                    description: '', 
                                                                    amount: 0});

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  transactions={transactions}
                  setTransactions={setTransactions}
                  transfers={transfers}
                  setTransfers={setTransfers}
                  error={error}
                  setError={setError}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  filterInputValue={filterInputValue} 
                  isCreating={isCreating}
                  setIsCreating={setIsCreating}
                  newTransactionForm={newTransactionForm}
                  setNewTransactionForm={setNewTransactionForm}
                  />} />
            <Route
              path="transactions/:transactionId"
              component={
                <TransactionDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
