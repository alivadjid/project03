// показывает конкретную ссылку и статистику по ней
import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Loader} from "../components/Loader";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const [link, setLink] = useState(null)
  const [request, loading ]= useHttp()
  //получить ссылку используя хук
  const linkId = useParams().id

  const getLink = useCallback( async () => {
    try{
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch(e){

    }
  }, [token, linkId, request])

  useEffect( () => {
    getLink()
  }, [getLink])

  if(loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && link && <LinkCard />}
    </>
  )
}