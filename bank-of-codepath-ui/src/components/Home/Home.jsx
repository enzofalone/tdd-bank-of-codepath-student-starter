import axios from "axios"
import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import { API_BASE_URL } from "../../constants"
import "./Home.css"

export default function Home(props) {
  const handleOnCreateTransaction = async () => {
    props.setIsCreating(true);
    console.log(props.newTransactionForm);
    await axios.post(`${API_BASE_URL}/bank/transactions`, { transaction:props.newTransactionForm})
      .then((res) => {
        console.log(res);
        props.setTransactions((prevTrans) => [...prevTrans, res.data.transaction])
      }).catch((error) => {
        props.setError(error);
      }).finally(() => {

      });

    props.setNewTransactionForm(props.newTransactionFormInit);
    props.setIsCreating(false);
  }

  // run when mounted
  React.useEffect(() => {

    const fetchData = () => {
      props.setIsLoading(true)
      axios
        .get(`${API_BASE_URL}/bank/transactions`)
        .then((res) => {
          props.setTransactions(res.data.transactions)
        })
        .catch((error) => {
          props.setError(error)
        })

      axios
        .get(`${API_BASE_URL}/bank/transfers`)
        .then((res) => {
          props.setTransfers(res.data.transfers)
        })
        .catch((error) => {
          props.setError(error)
        })
        .finally(() => {
          props.setIsLoading(false);
        })
    }
    fetchData()

  }, [])


  // filter transactions
  let filteredTransactions = [];

  if (props.filterInputValue !== '') {
    filteredTransactions = props.transactions?.filter((transaction) => {
      return (transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase()))
    })
  } else {
    filteredTransactions = props.transactions;
  }

  if (props.error) {
    return <h2 className="error">{props.error}</h2>
  }

  return (
    <div className="home">
      <AddTransaction
        isCreating={props.isCreating}
        setIsCreating={props.setIsCreating}
        form={props.newTransactionForm}
        setForm={props.setNewTransactionForm}
        handleOnSubmit={handleOnCreateTransaction} />

      {props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} transfers={props.transfers}/>}
      {/* {getBankActivity()} */}
    </div>
  )
}
