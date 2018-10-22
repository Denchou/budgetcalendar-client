import React, { Component } from 'react'
// imported dateFns from https://date-fns.org/
import dateFns from 'date-fns'
import './BudgetCalendar.scss'
import axios from 'axios'
import apiUrl from '../apiConfig'

class BudgetCalendar extends Component {
  constructor (props) {
    super(props)
    // this creates a state of this month and time
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      transactions: [],
      assets: [],
      value: '',
      stats: [],
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/transactions`,
      { 'headers': { 'Authorization': 'Token token=' + user.token}
      })

    this.setState({
      transactions: response.data.transactions
    })
    // sets initial value for today's date on calendar initial display
    this.onDateClick(dateFns.parse(new Date()))
  }

  calculateBudget = day => {
    let value = 0
    let multiplier = 1
    const transactions = this.state.transactions
    const statsRecord = []

    transactions.forEach((e) => {
      if (dateFns.compareDesc(day, e.start_date) === 1) {
        return value
      } else  {
        const endDate = (dateFns.compareDesc(day, e.end_date) === 1)? day : e.end_date

        switch (e.frequency) {
        case 'daily':
          multiplier = dateFns.differenceInDays(endDate, e.start_date) + 1
          break
        case 'weekly':
          multiplier = dateFns.differenceInWeeks(endDate, e.start_date) + 1
          break
        case 'bi-weekly':
          Math.floor(multiplier = dateFns.differenceInWeeks(endDate, e.start_date) / 2) + 1
          break
        case 'monthly':
          multiplier = dateFns.differenceInMonths(endDate, e.start_date) + 1
          break
        case 'annually':
          multiplier = dateFns.differenceInYears(endDate, e.start_date) + 1
          break
        default:
          multiplier = 1
        }
        const multiplied = multiplier * e.amount
        e.is_income? (value += multiplied) : (value -= multiplied)
        e.total = (multiplied).toFixed(2)
        statsRecord.push(e)
      }
    })
    this.setState({
      stats: statsRecord
    })
    return value.toFixed(2)
  }



  // render navigation header for the calendar
  renderHeader() {
    const dateFormat = 'MMMM YYYY'

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.lastYear}>
            first_page
          </div>
          <div className="icon" onClick={this.lastMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={this.nextMonth}>
            chevron_right
          </div>
          <div className="icon" onClick={this.nextYear}>
            last_page
          </div>
        </div>
      </div>
    )
  }
  // render named days of the week for the calendar
  renderDays() {
    const dateFormat = 'ddd'
    const days = []

    const startDate = dateFns.startOfWeek(this.state.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }
  // render individual cells for the calendar
  renderCells() {
    const { currentMonth, selectedDate } = this.state
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)
    // dateFormat is required for second parameter of dateFns.format()
    const dateFormat = 'D'
    // empty rows will be pushed with numerical days of the month and returned
    const rows = []
    // hoisted variables to assist with nested loop
    // days starts as empty array, gets pushed with numeric day of the week and
    // emptys out after every for loop
    let days = []
    // day increments and keeps its value beyond different weeks
    let day = startDate
    // hoised formattedDate to be reusable in nested loop for formated display
    let formattedDate = ''
    // While Loop will run while day is less than or equal to endDate of the month
    while (day <= endDate) {
      // nested For Loop will populate numeric day of the week
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate) ? 'selected' : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className={`${(this.state.value > 0)? 'bgood' : 'bbad'} bg`}>${this.state.value}</span>
          </div>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  renderStats() {
    const statsRows = this.state.stats.map(stat => {
      return (
        <tr key={stat.id}>
          <td>{stat.name}</td>
          <td>{stat.is_income? 'Income' : 'Expense'}</td>
          <td>${stat.amount}</td>
          <td>{stat.frequency}</td>
          <td>{stat.is_income? '$' : '-$'}{stat.total}</td>
        </tr>
      )
    })
    return (
      this.state.stats.length? (
        <React.Fragment>
          <h1 className='col-center'>Budget Statistics</h1>
          <table className='table table-striped table-hover'>
            <thead className="thead-dark">
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Type</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Frequency</th>
                <th scope="col">Total To Date</th>
              </tr>
            </thead>
            <tbody>
              {statsRows}
            </tbody>
          </table>
        </React.Fragment>
      ) : 'Please Create a Budget to View your Stats.'
    )
  }
  // method to set current date to the date clicked
  onDateClick = day => {
    const newValue = this.calculateBudget(day)
    this.setState({
      selectedDate: day,
      value: newValue
    })
  }
  // method to select the next month in the calendar header
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }
  // method to select the previous month in the calendar header
  lastMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }
  // method to select the next year in the calendar header
  nextYear = () => {
    this.setState({
      currentMonth: dateFns.addYears(this.state.currentMonth, 1)
    })
  }
  // method to select the previous year in the calendar header
  lastYear = () => {
    this.setState({
      currentMonth: dateFns.subYears(this.state.currentMonth, 1)
    })
  }
  // renders calendar
  render() {
    return (
      <div className="calendar container-flex">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        {this.renderStats()}
      </div>
    )
  }
}

export default BudgetCalendar
