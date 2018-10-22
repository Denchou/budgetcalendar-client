import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, changePassword } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
    }
  }

  clearUser = () => this.setState({
    oldPassword: '',
    newPassword: '',
  })

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  changePassword = event => {
    event.preventDefault()

    const { oldPassword, newPassword } = this.state
    const { flash, history, user } = this.props

    changePassword(this.state, user)
      .then(handleErrors)
      .then(() => {
        this.clearUser()
        flash(messages.changePasswordSuccess, 'flash-success')
      })
      .then(() => history.push('/'))
      .catch(() => {
        this.clearUser()
        flash(messages.changePasswordFailure, 'flash-error')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form className='auth-form' onSubmit={this.changePassword}>
        <h3>Change Password</h3>

        <TextField
          required
          name="oldPassword"
          value={oldPassword}
          type="password"
          placeholder="Old Password"
          onChange={this.handleChange}
          variant='outlined'
          margin='dense'
        />
        <TextField
          required
          name="newPassword"
          value={newPassword}
          type="password"
          placeholder="New Password"
          onChange={this.handleChange}
          variant='outlined'
          margin='dense'
        />
        <Button variant='contained' color='secondary' type="submit">Change Password</Button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)
