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
        <div>
          <label><input type='radio' name='is_income' value={true} id='income' required onChange={handleChange} />Income</label>
          <label><input type='radio' name='is_income' value={false} id='expense' required onChange={handleChange} />Expense</label>
        </div>
        <div>
          <span>$</span>
          <input type="number" min="0" step="0.01" onChange={handleChange}
            data-number-to-fixed="2" data-number-stepfactor="100" value={transaction.amount}
            className="currency" name='amount' id='amount' required/>
          Amount
        </div>
        <fieldset>
          <legend>Select a frequency</legend>

          <div>
            <input type="radio" id="daily"
              name="frequency" value="daily" onChange={handleChange} required />
            <label htmlFor="daily">daily</label>
          </div>

          <div>
            <input type="radio" id="weekly"
              name="frequency" value="weekly" onChange={handleChange} required  />
            <label htmlFor="weekly">weekly</label>
          </div>

          <div>
            <input type="radio" id="bi-weekly"
              name="frequency" value="bi-weekly" onChange={handleChange} required />
            <label htmlFor="bi-weekly">bi-weekly</label>
          </div>

          <div>
            <input type="radio" id="monthly"
              name="frequency" value="monthly" onChange={handleChange} required/>
            <label htmlFor="monthly">monthly</label>
          </div>

          <div>
            <input type="radio" id="annually"
              name="frequency" value="anually" onChange={handleChange} required/>
            <label htmlFor="anually">annually</label>
          </div>

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
