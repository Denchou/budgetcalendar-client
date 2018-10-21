import React from 'react'
import { Link } from 'react-router-dom'
import Budget from '../budget/Budget'
import Button from '@material-ui/core/Button'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Button component={Link} to="/sign-up">Sign Up</Button>
    <Button component={Link} to="/sign-in">Sign In</Button>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Button component={Link} to="/">Home</Button>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Budget Calendar</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
