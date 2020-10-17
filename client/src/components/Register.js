import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const res = await fetch("http://localhost:3300/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await res.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Successfully!");
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-3">Register</h1>
      <form onSubmit={onSubmitForm} className="form-group">
        <input
          className="form-control my-3"
          placeholder="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          placeholder="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          placeholder="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link className="btn btn-primary btn-block" to="/login">
        Login
      </Link>
    </Fragment>
  );
};

export default Register;
