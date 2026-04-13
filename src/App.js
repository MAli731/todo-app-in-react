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
        status: "Pending"
      },
    ];

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

// delete function
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const Status = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newStatus =
          todo.status === "Pending"
            ? "In-Progress"
            : todo.status === "In-Progress"
              ? "Completed"
              : "Completed";

        return { ...todo, status: newStatus };
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));  
  }
 
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              Status={Status}
            />
          } />

        <Route
          path="/home"
          element={
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              Status={Status}
            />
          }
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