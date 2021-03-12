import React from 'react'
 import {useState} from 'react/cjs/react.production.min'

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
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
                />
                  <label htmlFor="email">First Name</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  type="password"
                  className="yellow-input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">First Name</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4">Login</button>
            <button className="btn grey lighten-1 black-text">Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}
