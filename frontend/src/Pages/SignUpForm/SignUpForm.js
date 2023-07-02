import React, { useState } from "react";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { useLocation } from 'react-router';
import "./SignUpForm.css";

function SignUpForm(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [category, setCategory] = useState(location.state.userType);
  console.log(category)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassWord(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      name: e.currentTarget.name.value,
      username: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      phone: e.currentTarget.phoneNumber.value
    }

    if (e.currentTarget.password.value !== e.currentTarget.password2.value) {
      alert(`The passwords don't match`)
      return
    }

    if (category === "") {
      alert("Please Choose if you are an user or provider!")
      return
    }
    else if (category === "user") {
      try {
        const res = await fetch('http://localhost:3001/user-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          console.log("User Registered")
          alert("Registered Successfully")
          // Navigate to login page
          navigate('/signin', { state: { userType: location.state.userType } })
        } else {
          throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }
    else {
      try {
        const res = await fetch('http://localhost:3001/provider-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          console.log("Provider Registered")
          alert("Registered Successfully")
          // Navigate to Login page
          navigate('/signin', { state: { userType: location.state.userType } })
        } else {
          throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }
  }

  return (

    <div className="Authentication">
    <div className="appAside" />
    <div className="appForm">
    
    <div className="formCenter">
      <form onSubmit={handleSubmit} className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="formFieldInput"
            placeholder="Enter your full name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

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
          <label className="formFieldLabel" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            className="formFieldInput"
            placeholder="Re-Enter password"
            name="password2"
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="phoneNumber">
            Phone No.
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="formFieldInput"
            placeholder="Enter your 10 digit Number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        <div className="formField">
          <button className="formFieldButton" type="submit">Sign Up</button>{" "}
          <Link to="/signin" state={{ userType: location.state.userType }} className="formFieldLink">
            I'm already a member
          </Link>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}
export default SignUpForm;
