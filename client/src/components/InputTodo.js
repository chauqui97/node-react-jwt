import React, { Fragment, useState } from 'react';
const InputTodo = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        try {
            const body = { description };
            await fetch("http://localhost:3300/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location("/");
        } catch (error) {
            console.error(e.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center my-5">Input Todo</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    placeholder="Add todo"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;