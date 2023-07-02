import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SignInForm.css";
// import { useLocation } from 'react-router';

function SignInForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [category, setCategory] = useState(location.state.userType);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassWord(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    if (category === "") {
      alert("Please Choose if you are an user or provider!")
      return
    }
    else if (category === "user") {
      try {
        const res = await fetch('http://localhost:3001/user-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          console.log("Login Successful")
          alert("Logged In As User")
          const data = await res.json();
          // Navigate to user dashboard
          navigate('/bookparking', { state: { userId: data[0]._id } })
        } else {
          alert("Log In Failed : Wrong Credentials")
          return
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
        alert("Something Went Wrong! Please Try Again")
      }
    }
    else {
      try {
        const res = await fetch('http://localhost:3001/provider-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          console.log("Login Successful")
          alert("Logged In As Provider")
          const data = await res.json();
          // Navigate to user dashboard
          navigate('/provideparking', { state: { providerId: data[0]._id } })
        } else {
          alert("Log In Failed : Wrong Credentials")
          return
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
        alert("Something Went Wrong! Please Try Again")
      }
    }
  }

  return (
    <div className="Authentication">
      <div className="appAside" />
      <div className="appForm">

        <div className="formCenter">
          <form className="formFields" onSubmit={handleSubmit}>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="formField">
              <button className="formFieldButton" type="submit">Sign In</button>{" "}
              <Link to="/" className="formFieldLink">
                Create an account
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
