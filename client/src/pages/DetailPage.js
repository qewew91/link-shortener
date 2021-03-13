import React, { useState, useCallback, useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { linkUrl } from '../_constants'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import {LinkCard} from '../components/LinkCard'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`${linkUrl}/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch {}
  }, [ request, linkId, token])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && link && <LinkCard link={link}/> }
    </>
  )
}
