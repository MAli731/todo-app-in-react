import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";
import "react-datepicker/dist/react-datepicker.css";
import CalendarPage from "./Components/CalenderPage";
import DetailModal from "./Components/Modals/DetailModal";
import ListModal from "./Components/Modals/ListModal";
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
        time: new Date().toLocaleTimeString(),
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
  const [listModal, setListModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
const getLocalDateString = (d) => {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
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
          element={
            <>
              <CalendarPage
                todos={todos}
                Status={Status}
                setListModal={setListModal}
                setSelectedTodo={setSelectedTodo}
                setSelectedDate={setSelectedDate}
              />

              <ListModal
                listModal={listModal}
                detailModal={detailModal}
                filteredTodos={todos.filter(
                     t => getLocalDateString(t.date) === selectedDate
                )}
                selectedDate={selectedDate}
                setListModal={setListModal}
                setDetailModal={setDetailModal}
                setSelectedTodo={setSelectedTodo}
              />

              <DetailModal
                detailModal={detailModal}
                selectedTodo={selectedTodo}
                setDetailModal={setDetailModal}
              />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;