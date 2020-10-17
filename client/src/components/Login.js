import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const res = await fetch("http://localhost:3300/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login successfully!");
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Login</h1>
      <form className="form-group" onSubmit={onSubmitForm}>
        <input
          type="email"
          className="form-control my-3"
          name="email"
          value={email}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="email"
        />
        <input
          type="password"
          className="form-control my-3"
          name="password"
          value={password}
          onChange={(e) => {
            onChange(e);
          }}
          placeholder="password"
        />
        <button className="btn btn-success btn-block my-3">Login</button>
      </form>
      <Link className="btn btn-primary btn-block" to="/register">
        Register
      </Link>
    </Fragment>
  );
};

export default Login;
