import React, { Component } from 'react'
import dateFns from 'date-fns'
import './BudgetCalendar.scss'

class BudgetCalendar extends Component {

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
