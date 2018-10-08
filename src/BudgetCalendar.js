import React, { Component } from 'react'
import './BudgetCalendar.scss'
import Calendar from 'react-calendar'

class BudgetCalendar extends Component {
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div className='container budget-calendar'>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    )
  }
}

export default BudgetCalendar
