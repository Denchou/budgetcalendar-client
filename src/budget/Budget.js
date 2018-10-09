import React, { Component } from 'react'
import BudgetCalendar from '../calendar/BudgetCalendar'

const BudgetForm =(props) => {


  renderBudgetForm () {

    return (
      <React.Fragment>
        <h3>Budget Form</h3>
        <form className='Form-row'>
          <label><input type='text' name='name' value='name' id='name' />Name</label>
          <div>
            <label><input type='radio' name='isIncome' value='income' id='income' />Income</label>
            <label><input type='radio' name='isIncome' value='expense' id='expense'/>Expense</label>
          </div>
          <div>
            <span>$</span>
            <input type="number" min="0" step="0.01"
              data-number-to-fixed="2" data-number-stepfactor="100"
              className="currency" name='amount' id='amount'/>
            Amount
          </div>
          <fieldset>
            <legend>Select a frequency</legend>

            <div>
              <input type="radio" id="daily"
                name="frequency" value="daily"  />
              <label htmlFor="daily">daily</label>
            </div>

            <div>
              <input type="radio" id="weekly"
                name="frequency" value="weekly"  />
              <label htmlFor="weekly">weekly</label>
            </div>

            <div>
              <input type="radio" id="bi-weekly"
                name="frequency" value="bi-weekly" />
              <label htmlFor="bi-weekly">bi-weekly</label>
            </div>

            <div>
              <input type="radio" id="monthly"
                name="frequency" value="monthly" />
              <label htmlFor="monthly">monthly</label>
            </div>

            <div>
              <input type="radio" id="annually"
                name="frequency" value="anually" />
              <label htmlFor="anually">annually</label>
            </div>

          </fieldset>
          <fieldset>
            <input type='date' id='startDate' name='startDate' />Start Date
            <input type='date' id='endDate' name='endDate' />End Date
          </fieldset>
          <input type='submit' />
        </form>
      </React.Fragment>
    )
  }


export default BudgetForm
