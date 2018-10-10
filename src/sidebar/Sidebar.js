import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/budgetcalendar">View Calendar</Link>
    <Link to='/budget-new'>Add Transaction</Link>
    <Link to='/budget-index'>List Transactions</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
  </React.Fragment>
)

const Sidebar = ({ user }) => (
  <header className="side-bar">
    <nav>
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Sidebar
