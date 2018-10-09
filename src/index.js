import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

const appJsx = (
  <Router>
    <App />
  </Router>
)

ReactDOM.render(appJsx, document.getElementById('root'))
