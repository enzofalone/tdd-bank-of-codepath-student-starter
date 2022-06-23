import * as React from "react"
import { formatAmount, formatDate } from "../../utils/format"
import { useParams } from "react-router-dom";
import "./TransactionDetail.css"
import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = React.useState(false);
  const [transaction, setTransaction] = React.useState({});
  const [isLoading, setIsLoading] = React.useState();
  const [error, setError] = React.useState();

  const { transactionId } = useParams();

  console.log("transactionId:", transactionId)
  React.useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);

      await axios.get(`${API_BASE_URL}/bank/transactions/${transactionId}`)
        .then(res => {
          console.log(res);
          //set transaction to response
          setTransaction(res.data.transaction);
        })
        .catch(error => {
          setError(error);
          console.log(error);
        })
      setIsLoading(false);
      setHasFetched(true);
    }
    fetchTransactionById();
  }, [transactionId]);

  if ((!transaction) && (!isLoading) && (hasFetched)) {
    return (
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <h1>Not Found</h1>
      </div>
    )
  }

  return (
    <div className="transaction-detail">
      <TransactionCard transaction={transaction} transactionId={transactionId} />
    </div>
  )
}



export function TransactionCard({ transaction = {}, transactionId = null }) {
  
  return (
    <div className="transaction-card card">
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <p className="category">{transaction?.category}</p>
      </div>

      <div className="card-content">
        <p className="description">{transaction?.description}</p>
      </div>

      <div className="card-footer">
        <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction.amount)}</p>
        <p className="date">{formatDate(transaction.postedAt)}</p>
      </div>
    </div>
  )

}

