import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      <h1 className="my-3">{name}</h1>
      <button
        className="btn btn-warning"
        onClick={(e) => {
          logout(e);
        }}
      >
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
