import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  let newForm = props.form;

  const handleOnFormFieldChange = (change) => {
    
    
    let name = change.target.name;
    let value = change.target.value;
    console.log(change.target.value);
    switch (name) {
      case "description":
        newForm.description = value; 
        break;
      case "category":
        newForm.category = value;
        break;
      case "amount":
        newForm.amount = value;
        break;
    }

    props.setForm(newForm);
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange} handleOnSubmit={props.handleOnSubmit} form={props.form} isCreating={props.isCreating}/>
    </div>
  )
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description" onChange={(e) => {props.handleOnFormFieldChange(e)}} />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category" onChange={(e) => {props.handleOnFormFieldChange(e)}} />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount" onChange={(e) => {props.handleOnFormFieldChange(e)}} />
        </div>

        <button className="btn add-transaction" onClick={(e) => {props.handleOnSubmit()}} type="submit">
          Add
        </button>
      </div>
    </div>
  )
}
