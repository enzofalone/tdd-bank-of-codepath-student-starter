import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {

  const handleOnFormFieldChange = (change) => {
    props.setForm(prevState => ({ 
      ...prevState,
      [change.target.name] : change.target.value
    }));
  }

return (
  <div className="add-transaction">
    <h2>Add Transaction</h2>
    <AddTransactionForm 
      handleOnFormFieldChange={handleOnFormFieldChange} 
      handleOnSubmit={props.handleOnSubmit} 
      form={props.form} 
      isCreating={props.isCreating} />
  </div>
)
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type="text" name="description" value={props.form?.description || ""} onChange={(e) => { props.handleOnFormFieldChange(e) }} />
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" name="category" value={props.form?.category || ""} onChange={(e) => { props.handleOnFormFieldChange(e) }} />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input required type="number" name="amount" value={props.form?.amount || 0} onChange={(e) => { props.handleOnFormFieldChange(e) }} />
        </div>

        <button className="btn add-transaction" onClick={(e) => { props.handleOnSubmit() }} type="submit">
          Add
        </button>
      </div>
    </div>
  )
}
