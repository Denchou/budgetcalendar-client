import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.scss'

const authenticatedOptions = (
  <React.Fragment>
    <div className='col col-center'>
      <NavLink to="/budgetcalendar">View Calendar</NavLink> |
      <NavLink to='/budget-new'> Add Income/Expense</NavLink> |
      <NavLink to='/budget-index'>List Income/Expense</NavLink>
    </div>
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
  <div className="side-bar container">
    <div className='row'>
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </div>
  </div>
)

export default Sidebar
