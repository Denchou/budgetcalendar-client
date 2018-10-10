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
        start_date: '01/01/2001',
        end_date: '01/01/2010',
        is_income: true,
        frequency: '',
      }
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/transactions/${this.props.match.params.id}`,
      { 'headers': { 'Authorization': 'Token token=' + user.token}
      })
    this.setState({transaction: response.data.transaction})
  }

  handleChange = (event) => {
    const editedTransaction = {...this.state.transaction, [event.target.name]: event.target.value}

    this.setState({transaction: editedTransaction})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user } = this.props
    const transactionParams = JSON.stringify({transaction: this.state.transaction})
    await axios.put(`${apiUrl}/transactions/${this.props.match.params.id}`, transactionParams, {
      'headers': {
        'Authorization': `Token token=${user.token}`,
        'Content-Type': 'application/json', }
    })

    this.props.history.push(`/budget/${this.state.transaction.id}/show`)
  }

  render() {
    const { transaction } = this.state

    return (
      <React.Fragment>
        <BudgetForm
          action="edit"
          transaction={transaction}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    )
  }
}

export default withRouter(BudgetEdit)
