import React from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import BudgetForm from './BudgetForm'
import { withRouter } from 'react-router'

class BudgetEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {
        name: '',
        amount: 0,
        start_date: 'YYYY-MM-DD',
        end_date: 'YYYY-MM-DD',
        is_income: true,
        frequency: 'daily',
      }
    }
  }

  handleChange = (event) => {
    const newTransaction = {...this.state.transaction, [event.target.name]: event.target.value}
    this.setState({transaction: newTransaction})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user } = this.props
    const transactionParams = JSON.stringify({transaction: this.state.transaction})
    const response = await axios.post(`${apiUrl}/transactions`, transactionParams, {
      'headers': {
        'Authorization': `Token token=${user.token}`,
        'Content-Type': 'application/json', }
    })


    this.props.history.push(`/budget/${response.data.transaction.id}/show`)
  }

  render() {
    const { transaction } = this.state

    return (
      <React.Fragment>
        <BudgetForm
          action="create"
          transaction={transaction}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(BudgetEdit)
