import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";

function App() {

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const addTodo = (newTodo) => {
    const updatedTodos = [
      ...todos,
      {
        id: Date.now(),
        ...newTodo,
        date: new Date().toLocaleString(),
      },
    ];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };


  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<TodoList todos={todos} deleteTodo={deleteTodo} />}
        />

        <Route
          path="/home"
          element={<TodoList todos={todos} deleteTodo={deleteTodo} />}
        />


        <Route
          path="/create"
          element={<TodoForm addTodo={addTodo} />}
        />

      </Routes>
    </Router>
  );
}

export default App;