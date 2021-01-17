import React from 'react'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import { useAuth} from "./hooks/auth.hook";
import 'materialize-css'

function App() {
  const routes = useRoutes(false)
  //проверка localstorage
  const { token, login, logout, userId } = useAuth()

  return (

    <div className="container">
      <Router>
        {routes}
      </Router>

    </div>
  )
}

export default App;
