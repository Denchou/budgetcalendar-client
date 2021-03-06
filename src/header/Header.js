import React from 'react'
import { Link } from 'react-router-dom'
import Budget from '../budget/Budget'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import './Header.scss'

const style = {
  borderRadius: 3,
  border: 0,
  color: 'darkblue',
  height: 38,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  marginLeft: '2px',
  marginRight: '2px'
}

const authenticatedOptions = (
  <React.Fragment>
    <Button style={style} component={Link} to="/change-password">Change Password</Button>
    <Button style={style} component={Link} to="/sign-out">Sign Out</Button>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Button style={style} component={Link} to="/sign-up">Sign Up</Button>
    <Button style={style} component={Link} to="/sign-in">Sign In</Button>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Button style={style} variant='outlined' component={Link} to="/">Home</Button>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>calendar_today BUDGET CALENDAR</h1>
    <nav>
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default withStyles(style)(Header)
