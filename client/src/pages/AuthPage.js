import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {loginUrl, registerUrl} from '../_constants'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request(registerUrl, 'POST', { ...form })
      message(data.message)
    } catch {}
  }

  const loginHandler = async () => {
    try {
      const data = await request(loginUrl, 'POST', { ...form })
      console.log(data.token, data.userId)
      auth.login(data.token, data.userId)
    } catch {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link Shortener</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  type="text"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.email}
                />
                  <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  type="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
