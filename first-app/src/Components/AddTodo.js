import React, { useState } from "react";

export const AddTodo = (props) => {
  const [heading, setheading] = useState("");
  const [desc, setdesc] = useState("");
  const additem = (e) => {
    e.preventDefault();
    if (!heading) {
      alert("Heading Can't be blank");
    } else if (!desc) {
      alert("Description Can't be blank");
    } else {
      props.addTodo(heading, desc);
      setheading("");
      setdesc("");
    }
  };
  return (
    <div className="container my-3">
      <h3>Add Todo in TodosList</h3>
      <form onSubmit={additem}>
        <div className="mb-3">
          <label htmlFor="heading" className="form-label">
            Heading
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => {
              setheading(e.target.value);
            }}
            className="form-control"
            id="heading"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
            className="form-control"
            id="desc"
          />
        </div>
        <button type="submit " className="btn btn-sm btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};
