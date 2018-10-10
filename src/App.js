import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import BudgetCalendar from './calendar/BudgetCalendar'
import BudgetForm from './budget/Budget'
import Sidebar from './sidebar/Sidebar'
import BudgetIndex from './budget/BudgetIndex'
import BudgetShow from './budget/BudgetShow'
import BudgetNew from './budget/BudgetNew'
import BudgetEdit from './budget/BudgetEdit'


class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </main>
        <Sidebar user={user} />
        <div>
          <AuthenticatedRoute user={user} path='/budgetcalendar' render={() => (
            <BudgetCalendar user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/budget-index' render={() => (
            <BudgetIndex user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/budget/:id/show' render={() => (
            <BudgetShow user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/budget-new' render={() => (
            <BudgetNew user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/budget/:id/edit' render={() => (
            <BudgetEdit user={user} />
          )} />
        </div>
      </React.Fragment>
    )
  }
}

export default App
