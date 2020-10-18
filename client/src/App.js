import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodos";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (isAuth) => {
    setIsAuthenticated(isAuth);
  };

  async function isAuth() {
    const res = await fetch("http://localhost:3300/auth/is-verify", {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    });
    const isVerify = await res.json();
    if (isVerify === true) {
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <Router>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/dashboard"
                render={(props) =>
                  isAuthenticated ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={(props) =>
                  !isAuthenticated ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/login"
                render={(props) =>
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
            </Switch>
          </div>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
