import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";  
import TodoForm from "./TodoForm";
import { motion, AnimatePresence } from "framer-motion";


type TodoFormData = {
    title: string;
    desc: string;
    category: string;
    status: "Pending";
    time: string;
};

type Todo = {
    id: number;
    title: string;
    desc: string;
    category: string;
    status: "Pending" | "In-Progress" | "Completed";
    date: string;
    time: string;

}
type Props = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    Status: (id: number) => void;
    addTodo: (todo: TodoFormData) => void;
    onClose?: () => void;
};

export default function TodoList({ todos, deleteTodo, Status, addTodo }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");
    const [asc, setAsc] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);


    const filteredTodos = todos
        .filter((todo: Todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === "All" || todo.category === category) &&
            (status === "All" || todo.status === status)

        )
        .sort((a: Todo, b: Todo) =>
            asc
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title)
        );

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-primary px-2 fixed-top">
                <span className="navbar-brand ms-2 d-flex align-items-center ">

                    To-Do List App</span>
                <div className="d-flex flex-wrap">
                    <button
                        className="btn btn-outline-success text-dark bg-white btn-sm mx-2"
                        onClick={() => setShowForm(prev => !prev)}
                    >
                        Create
                    </button>
                </div>
            </nav>
                        {/* animation for form modal */}
            <div className="container mt-4 ">
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="modal-box"
                                initial={{ scale: 0.8, y: -50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.8, y: -50, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <button
                                    onClick={() => setShowForm(false)}
                                    style={{
                                        position: "absolute",
                                        top: "40px",
                                        right: "15px",
                                        border: "none",
                                        background: "transparent",
                                        fontSize: "25px",
                                        cursor: "pointer",
                                        color: "red",
                                    }}
                                >
                                    ✖
                                </button>

                                <TodoForm
                                    addTodo={addTodo}
                                    onClose={() => setShowForm(false)}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                    {/* animation */}
                </AnimatePresence>
                <div className="todo-header shadow-sm p-3 mb-4 rounded">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3 flex-wrap">

                            {/* Category */}
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-semibold">Category:</span>
                                <Dropdown>
                                    <Dropdown.Toggle size="sm" variant={category !== "All" ? "primary" : "secondary"}>
                                        {category}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setCategory("All")}>All</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Health")}>Health</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Study")}>Study</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setCategory("Work")}>Work</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                                {/* status */}
                                
                            <div className="d-flex align-items-center gap-2">
                                <span className="fw-semibold">Status:</span>
                                <Dropdown>
                                    <Dropdown.Toggle size="sm" variant={status !== "All" ? "primary" : "secondary"}>
                                        {status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => setStatus("All")}>All</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setStatus("Pending")}>Pending</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setStatus("In-Progress")}>In-Progress</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setStatus("Completed")}>Completed</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </div>

                        <div className="text-center flex-grow-1">
                            <h4 className="m-0 fw-bold">📋 TodoList Dashboard</h4>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <Link to="/calendar" className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2">
                                <i className="fa-regular fa-calendar"></i>
                                History
                            </Link>

                            <button
                                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                                onClick={() => setAsc(!asc)}
                            >
                                {asc ? "Asc" : "Desc"}
                                {asc ? <FaArrowUp /> : <FaArrowDown />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <form className="d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="d-flex flex-column flex-sm-row border border-0 rounded p-2 gap-2 me-2"
                            type="search"
                            value={search}
                            style={{ width: "800px" }}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success " type="submit">
                            Search
                        </button>
                    </form> 
                </div>

                <div className="row mt-4">
                    {filteredTodos.length ? (
                        filteredTodos.map(todo => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={todo.id}>
                                <div className="card p-3 position-relative">

                                 
                                    <span
                                        className="text-danger position-absolute"
                                        style={{ top: 10, right: 15, cursor: "pointer" }}
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        ✖
                                    </span>
                                    <h5> <span
                                        style={{
                                            textDecoration: todo.status === "Completed" ? "line-through" : "none"
                                        }}>
                                        {todo.title}
                                    </span>

                                        {todo.status === "Completed" && (
                                            <>
                                                <i className="fa-solid fa-award text-success ms-4"></i>
                                                <span className="ms-2 text-success fs-6">Completed</span>
                                            </>
                                        )}
                                    </h5>
                                    <p className="card-text">{todo.desc}</p>
                                    <span className="p-3">Category :
                                        <span className="badge bg-primary ms-2 w-100">{todo.category}</span></span>
                                    <span className="p-3">Status :
                                        <span
                                            className={`badge ms-2 w-100 ${todo.status === "Completed"
                                                ? "bg-success"
                                                : todo.status === "Pending"
                                                    ? "bg-secondary"
                                                    : "bg-primary"
                                                }`}
                                        >
                                            {todo.status}
                                        </span>
                                    </span>
                                    <span className="fw-semibold">Mark as {
                                        todo.status === "Pending" ? "In-Progress" :
                                            todo.status === "In-Progress" ?
                                                "Completed" : "Completed"} :
                                        <input
                                            className="ms-2 flex-inline-block"
                                            type="checkbox"
                                            checked={todo.status === "Completed"}
                                            onChange={() => Status(todo.id)}
                                            disabled={todo.status === "Completed"}
                                        /> 
                                        </span>
                                    <p className="text-muted mt-2">Created on : {todo.date} at {todo.time}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h5 className="text-center text-danger">
                            No results found
                        </h5>
                    )}
                </div>
            </div>
        </>
    );
}




