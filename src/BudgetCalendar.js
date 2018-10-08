import React, { Component } from 'react'
import dateFns from 'date-fns'
import './BudgetCalendar.scss'

class BudgetCalendar extends Component {
  constructor () {
    super()

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    }
  }
  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    )
  }
}


export default BudgetCalendar
