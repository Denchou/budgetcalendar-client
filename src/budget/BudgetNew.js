import React from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import BudgetForm from './BudgetForm'

class BudgetEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {
        name: '',
        amount: 0,
        start_date: null,
        end_date: null,
        is_income: true,
        frequency: '',
      }
    }
  }

  handleChange = (event) => {
    const newTransaction = {...this.state.transaction, [event.target.name]: event.target.value}
    this.setState({transaction: newTransaction})
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const transactionParams = JSON.stringify({transaction: this.state.transaction})
    const response = await axios.post(`${apiUrl}/movies`, transactionParams)

    this.props.history.push(`/budget/${response.data.transaction.id}/show`)
  }

  render() {
    const { transaction } = this.state

    return (
      <React.Fragment>
        <BudgetForm
          action="create"
          movie={movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    )
  }
}

export default MovieEdit
