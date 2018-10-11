import React, { Component } from 'react'
import BudgetCalendar from '../calendar/BudgetCalendar'

const BudgetForm =(props) => {
  const { action, transaction, handleChange, handleSubmit } = props
  const formattedAction = action.charAt(0).toUpperCase() + action.slice(1)
  return (
    <React.Fragment>
      <h3>{formattedAction} Budget</h3>
      <form className='Form-row' onSubmit={handleSubmit} >
        <label htmlFor='name'>Name</label><input required type='text' name='name' value={transaction.name} onChange={handleChange} placeholder='name' />
        <select className='custom-select' required name='is_income' value={transaction.is_income} onChange={handleChange}>
          <option name='is_income' value=''>Select Type</option>
          <option name='is_income' value={true} id='income' >Income</option>
          <option name='is_income' value={false} id='expense' >Expense</option>
        </select>
        <div>
          <span>$</span>
          <input type="number" min="0" step="0.01" max='999999' onChange={handleChange}
            title='currency' placeholder="0.00" value={transaction.amount}
            className="currency" name='amount' id='amount' required/>
          Amount in Dollars
        </div>
        <fieldset>
          <select className='custom-select' required name='frequency' value={transaction.frequency} onChange={handleChange}>
            <option value=''>Select Frequenct</option>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='bi-weekly'>Bi-weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='annually'>Annually</option>
          </select>

        </fieldset>
        <fieldset>
          <input required type='date' id='startDate'
            name='start_date' max={transaction.end_date}
            value={transaction.start_date} onChange={handleChange} />Start Date
          <input required type='date' id='endDate'
            name='end_date' min={transaction.start_date}
            value={transaction.end_date} onChange={handleChange} />End Date
        </fieldset>
        <input type='submit' value='Submit'/>
      </form>
    </React.Fragment>
  )
}



export default BudgetForm
