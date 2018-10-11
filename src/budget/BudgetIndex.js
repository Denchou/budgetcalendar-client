import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'



class BudgetIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      assets: []
    }
  }

  async componentDidMount() {
    const { user } = this.props
    const response = await axios.get(`${apiUrl}/transactions`,
      { 'headers': { 'Authorization': 'Token token=' + user.token}
      })
    this.setState({transactions: response.data.transactions})
  }

  async deleteTransaction(event, transactionId) {
    event.preventDefault()

    const { user } = this.props
    const response = await axios.delete(`${apiUrl}/transactions/${transactionId}`,
      { 'headers': { 'Authorization': 'Token token=' + user.token}
      })

    this.setState({transactions: this.state.transactions.filter(transaction => transaction.id !== transactionId)})
  }

  render() {
    const transactionRows = this.state.transactions.map(transaction => {
      return (
        <tr key={transaction.id}>
          <td><Link to={`/budget/${transaction.id}/show`}>{transaction.name}</Link></td>
          <td>{transaction.is_income? 'Income' : 'Expense'}</td>
          <td><Link to={`/budget/${transaction.id}/edit`}>Edit</Link> | <a href="" onClick={(event) => this.deleteTransaction(event, transaction.id)}>Delete</a>
          </td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <h1>Budget</h1>
        <table className='table table-striped table-hover'>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {transactionRows}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default BudgetIndex
