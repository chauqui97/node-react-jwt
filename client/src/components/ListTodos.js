import React, { useState, useEffect, Fragment } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    async function deleteTodo(id) {
        try {
            await fetch(`http://localhost:3300/todos/${id}`,
                {
                    method: "DELETE"
                }
            );
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    async function getTodos() {
        const res = await fetch("http://localhost:3300/todos");
        const todos = await res.json();
        setTodos(todos);
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo
                                        todo={todo}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodo;