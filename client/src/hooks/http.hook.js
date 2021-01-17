// асинхронные запросы на сервер. fetch
//грузится что-то либо нет
import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [ error, setError] = useState(null)

  const request =useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true)

    try {
      // принимает body к строке и поэтому на бэк [Object Object]
      if(body) {
        body = JSON.stringify(body)
        //явно указываем, что передаем по сети JSON
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {
        method, body, headers
      })
      const data = await response.json()

      if(!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так у клиента')
      }

      setLoading(false)

      return data
    } catch(e) {
      console.log('Catch', e.message)
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  //чистит ошибки
  //const clearError = () => setError(null)
  const clearError = useCallback( ()=> setError(null), [])
  return { loading, request, error, clearError}
}