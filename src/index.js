import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
