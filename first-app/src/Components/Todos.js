import React from "react";
import { Todo } from "./todo";

export const Todos = (props) => {
  let stl = {
    color: "red",
  };
  return (
    <div className="container ">
      <h1 className="text-center">Todos List</h1>
      {/* {props.todos} */}

      {props.todos.length === 0 ? (
        <h3 className="text-center " style={stl}>
          "No Todos in list"
        </h3>
      ) : (
        props.todos.map((todo) => {
          return (
            <>
              <Todo
                todo={todo}
                key={todo.sno}
                onDelete={props.onDelete}
                onDone={props.onDone}
              />
              <hr />
            </>
          );
        })
      )}
    </div>
  );
};
