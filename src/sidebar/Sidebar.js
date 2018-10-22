import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import './Sidebar.scss'

const style = {
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 38,
  padding: '0 30px',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  marginLeft: '2px',
  marginRight: '2px'
}

const authenticatedOptions = (
  <React.Fragment>
    <div className='col col-center'>
      <Button style={style} component={NavLink} to="/budgetcalendar">View Calendar</Button>
      <Button style={style} component={NavLink} to="/budget-new">Add Income/Expense</Button>
      <Button style={style} component={NavLink} to="/budget-index">List all Income/Expense</Button>
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
