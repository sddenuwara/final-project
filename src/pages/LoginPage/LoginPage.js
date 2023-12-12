import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NavButton from "../../components/Buttons/NavButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    await axios.post('https://monkfish-app-3ps63.ondigitalocean.app/api/login', { email, password })
      .then(response => {
        if (response && response.data && response.data.success) {
          const token = response.data.token;
          localStorage.setItem('jwt', token);
          navigate('/dashboard')
        }
      })
  }

  return (
      <main className="center" id="main">
          <h1>Please Enter Your Login Information Below</h1>
          <div className="login-form">
            <div className="row">
              <label htmlFor="email">Email Address</label>
              <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} id="email" />
            </div>
            <div className="row">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" onChange={(e)=>setPassword(e.target.value)} id="password" />
            </div>
            <div className="row">
              <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
            </div>
            <div className="btn-row">
              <NavButton to="/" text="Cancel" />
              <NavButton to="/signup" text="Signup" />
            </div>
          </div>
      </main>
  )
}

export default LoginPage;
