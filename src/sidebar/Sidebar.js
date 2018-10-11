import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.scss'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink to="/budgetcalendar"><button>View Calendar</button></NavLink>
    <NavLink to='/budget-new'><button>Add Income/Expense </button></NavLink>
    <NavLink to='/budget-index'><button>List Income/Expense</button></NavLink>
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
  <div className="side-bar">
    <div>
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </div>
  </div>
)

export default Sidebar
