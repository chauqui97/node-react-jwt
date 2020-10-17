import React, { Fragment } from 'react';
import './App.css';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodo />
      </div>
    </Fragment>
  );
}

export default App;
