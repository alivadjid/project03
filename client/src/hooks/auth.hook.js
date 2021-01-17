import {useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  // сохранение токена
  const [token, setToken] = useState(null)
  const[userId, setUserId]  = useState(null)

  const login = useCallback( (jwtToken, id)=> {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId, token
    }))
  }, [])
  const logout = useCallback( () => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  // когда приложение грузится. Приложение чтобы смотрел в localstorage
  useEffect( () => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if(data && data.token) {
      login(data.token, data.userId)
    }

  }, [login])

  return { login, logout, token, userId }
}