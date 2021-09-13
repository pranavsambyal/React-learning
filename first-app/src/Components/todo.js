import React from "react";


export const Todo = ({ todo, onDelete, onDone }) => {
  return (
    <div className=" my-3 card">
      <div className="card-body">
        <h4 className="card-title">{todo.heading}</h4>
        <p className="card-text">{todo.disc}</p>
        <div class="d-grid  gap-2 d-md-block">
          <button
            className="btn  btn-success "
            onClick={() => {
              onDone(todo);
            }}
          >
            Done
          </button>
          <button
            className="btn  btn-danger "
            onClick={() => {
              onDelete(todo);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
