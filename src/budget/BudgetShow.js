import React from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router'

class BudgetIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {}
    }
  }

  async componentDidMount() {
    const { user } = this.props
    console.log(this, 'is this.props')
    const response = await axios.get(`${apiUrl}/transactions/${this.props.match.params.id}`,
      { 'headers': { 'Authorization': 'Token token=' + user.token}
      })
    this.setState({transaction: response.data.transaction})
    console.log(response.data.transaction, 'is show data')
  }

  render() {
    const { transaction } = this.state

    return (
      <React.Fragment>
        <h3>Name: {transaction.name}</h3>
        <p>Type: {transaction.is_income? 'Income' : 'Expense'} </p>
        <p>Amount: {transaction.amount}</p>
        <p>Frequency: {transaction.frequency}</p>
        <p>Start Date: {transaction.start_date}</p>
        <p>End Date: {transaction.end_date}</p>
      </React.Fragment>
    )
  }
}

export default withRouter(BudgetIndex)
