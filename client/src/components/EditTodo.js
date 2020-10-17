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
                className="btn btn-primary"
                data-toggle="modal"
                data-target={`#id${todo.id}`}>Edit</button>
            <div id={`id${todo.id}`} className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button"
                                onClick={() => setDescription(todo.description)}
                                className="close"
                                data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <input type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="form-control" />
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => updateTodo(todo.id)}
                            >Edit</button>
                            <button type="button"
                                className="btn btn-default"
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