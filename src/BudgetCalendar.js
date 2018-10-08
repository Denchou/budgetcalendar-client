import React, { Component } from 'react'
import dateFns from 'date-fns'
import './BudgetCalendar.scss'

class BudgetCalendar extends Component {
  constructor () {
    super()
    // this creates a state of this month and time
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    }
  }
  // method to select the next month using dateFns.addMonths
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }
  // method to select the previous month using dateFns.subMonths
lastMonth = () => {
  this.setState({
    currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
  })
}
// render the header for the calendar to navigate between months
renderHeader() {
  const dateFormat = 'MMMM YYYY'
  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={this.lastMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>
          {dateFns.format(this.state.currentMonth, dateFormat)}
        </span>
      </div>
      <div className="col col-end" onClick={this.nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  )
}

  renderDays() {}

  renderCells() {}

onDateClick = day => {}

nextMonth = () => {}

prevMonth = () => {}
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
