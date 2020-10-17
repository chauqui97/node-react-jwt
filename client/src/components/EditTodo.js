import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    const updateTodo = async id => {
        try {
            const body = {description};
            await fetch(`http://localhost:3300/todos/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            window.location("/");
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <button type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target={`#id${todo.id}`}>Edit</button>
            <div id={`id${todo.id}`} class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button type="button"
                                onClick={() => setDescription(todo.description)}
                                class="close"
                                data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <input type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="form-control" />
                        </div>
                        <div class="modal-footer">
                            <button type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => updateTodo(todo.id)}
                            >Edit</button>
                            <button type="button"
                                class="btn btn-default"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;