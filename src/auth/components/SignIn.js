import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
})

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      token: '',
    }
  }

  clearUser = () => this.setState({
    email: '',
    password: '',
  })

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signIn = event => {
    event.preventDefault()

    const { email, password } = this.state
    const { flash, history, setUser } = this.props

    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => {
        this.clearUser()
        flash(messages.signInSuccess, 'flash-success')
      })
      .then(() => history.push('/'))
      .catch(() => {
        this.clearUser()
        flash(messages.signInFailure, 'flash-error')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <form className='auth-form' onSubmit={this.signIn}>
        <h3>Sign In</h3>
        <TextField
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          variant='outlined'
          margin='dense'
          onChange={this.handleChange}
        />
        <TextField
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          variant='outlined'
          margin='dense'
          onChange={this.handleChange}
        />
        <Button variant='contained' color='primary' type="submit">Sign In</Button>
      </form>
    )
  }
}


export default withRouter(SignIn)
