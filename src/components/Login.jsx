import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EcomContext } from "./EcomStore";
import NavBar from "./NavBar";

function Login() {
  const { state, setState } = useContext(EcomContext);
  const navigate = useNavigate();

  const refSignInps = useRef({
    email: null,
    password: null,
  });

  const signIn = (e) => {
    e.preventDefault();
    let email = refSignInps.current.email.value;
    let password = refSignInps.current.password.value;
    if (email === "user@gmail.com" && password === "12345") {
      alert("Sign in successfully");
      navigate("/");
      let user = {
        email,
        password,
      };
      setState({ ...state, user });
    } else {
      alert("Enter right credentials");
    }
  };

  return (
    <>
      <NavBar />
      <div className="signupin mx-auto card p-4 my-4 border-0">
        <h4 className="card-title">Log In</h4>
        <form
          className="mt-2"
          onSubmit={(e) => {
            signIn(e);
          }}
        >
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              ref={(ele) => (refSignInps.current.email = ele)}
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              ref={(ele) => (refSignInps.current.password = ele)}
              type="password"
              className="form-control"
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Log In
          </button>
        </form>
        <p className="my-2">
          Email: user@gmail.com <br /> Password: 12345
        </p>
      </div>
    </>
  );
}

export default Login;
