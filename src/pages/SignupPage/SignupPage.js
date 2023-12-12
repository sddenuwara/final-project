import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavButton from "../../components/Buttons/NavButton";
import axios from "axios";

const SignupPage = () => {  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async (e) => {
    e.preventDefault();

    await axios.post('https://monkfish-app-3ps63.ondigitalocean.app/api/signup', { email, password })
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
      <h1>Please Enter Your Email and Password</h1>
      <div className="signup-form">
        <div className="row">
          <label htmlFor="email">Enter Email Address</label>
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} id="email" />
        </div>
        <div className="row">
          <label htmlFor="password">Create Password</label>
          <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} id="password" />
        </div>
        <div className="row">
          <button type="submit" className="btn btn-primary" onClick={signup}>Signup</button>
        </div>
        <div className="btn-row">
          <NavButton to="/" text="Cancel" />
          <NavButton to="/login" text="Login" />
        </div>
      </div>
    </main>
  )
}    

export default SignupPage;
