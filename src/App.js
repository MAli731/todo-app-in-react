import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";
import "react-datepicker/dist/react-datepicker.css";
import CalendarPage from "./Components/CalenderPage";

function App() {

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  // addTodo function 

  const addTodo = (newTodo) => {
    const updatedTodos = [
      ...todos,
      {
        id: Date.now(),
        ...newTodo,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",

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

  // status change function
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
  };

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
              addTodo={addTodo}
            />
          }
        />

        <Route
          path="/home"
          element={
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              Status={Status}
              addTodo={addTodo}
            />
          }
        />


        <Route
          path="/create"
          element={
            <TodoForm
              addTodo={addTodo}
              onClose={() => window.history.back()}
            />
          }
        />
        <Route
          path="/calendar"
          element={<CalendarPage
            todos={todos} />}
          Status={Status}
        />
      </Routes>
    </Router>
  );
}

export default App;