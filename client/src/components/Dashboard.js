import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const res = await fetch("http://localhost:3300/dashboard", {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      });
      const dashboard = await res.json();

      setName(dashboard.name);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(console.error());
    }
  }
  useEffect(() => {
    getName();
  }, []);
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  return (
    <Fragment>
      <h1>{name}</h1>
      <button
        className="btn btn-warning my-3"
        onClick={(e) => {
          logout(e);
        }}
      >
        Logout
      </button>
      <InputTodo />
      <ListTodo />
    </Fragment>
  );
};

export default Dashboard;
