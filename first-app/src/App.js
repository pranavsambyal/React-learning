import "./App.css";
import Navbar from "./Components/Header";
import { Todos } from "./Components/Todos";
import { Footer } from "./Components/Footer";
import { AddTodo } from "./Components/AddTodo";
import { About } from "./Components/About";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem("todoslist") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todoslist"));
  }
  const onDelete = (todo) => {
    console.log("onDelete Called indside ", todo);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todoslist", JSON.stringify(todos));
  };
  const onDone = (todo) => {
    console.log("onDone Called", todo);
    setTodos(todos.filter((e) => {}));
  };
  const addTodo = (heading, desc) => {
    let sno = 1;
    try {
      sno = todos.at(-1).sno + 1;
    } catch (err) {
      sno = 1;
    }
    const newtodo = {
      sno: sno,
      heading: heading,
      desc: desc,
    };
    console.log(
      "Adding new todo to todos,Sno",
      newtodo.sno,
      ",Heading=",
      newtodo.heading,
      ",Desc=",
      newtodo.desc
    );
    setTodos([...todos, newtodo]);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todoslist", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <Router>
        <Navbar title="My Todos List" search={true} />
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return (
                <>
                  <AddTodo addTodo={addTodo} />
                  <Todos todos={todos} onDelete={onDelete} onDone={onDone} />
                </>
              );
            }}
          ></Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
