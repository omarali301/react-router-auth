import React from "react";
import { Link } from "react-router-dom";
import "./SignupFrom.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { initializeLoginFramework } from "../LogManager";
import { Form } from "react-bootstrap";

const SignUpFrom = () => {
  initializeLoginFramework();
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChange = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = { ...user };
        newUserInfo.error = "";
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log(user);
      })
      .catch((error) => {
        const newUserInfo = { ...user };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
      });

    e.preventDefault();
  };
  return (
    <div style={{ height: "100vh",  backgroundColor: "#3aafa9" }}>
      <Form style={{ width : "400px"}}onSubmit={handleSubmit} className="container  p-5">
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>name</label>
          <input
            onBlur={handleChange}
            type="text"
            name="name"
            className="form-control"
            placeholder="name"
            required
          />

          <label>Email address</label>
          <input
            onBlur={handleChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            required
          />

          <label>Password</label>
          <input
            onBlur={handleChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <input className="btn btn-info btn-block" type="submit" />
        <p className="text-center" style={{ color: "tomato" }}>
          {user.error}
        </p>

        {user.success && (
          <p className="text-center" style={{ color: "white" }}>
            User Created Successfully Please Go to
            <Link to="/login">log in</Link>
          </p>
        )}
        <p className="forgot-password text-right">
          Already registered <Link to="/login">log in?</Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpFrom;
