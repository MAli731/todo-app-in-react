import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";


type Todo = {
    id: number;
    title: string;
    desc: string;
    category: string;
    status: "Pending" | "In-Progress" | "Completed";
    date: string;
}
type Props = {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    Status: (id: number) => void;
}

export default function TodoList({ todos, deleteTodo, Status }: Props) {

    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("All");
    const [status, setStatus] = useState<string>("All");
    const [asc, setAsc] = useState<boolean>(true);


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
            <nav className="navbar navbar-dark bg-primary px-2">
                <span className="navbar-brand ms-2 d-flex align-items-center ">

                    To-Do List App</span>
                <div className="d-flex flex-wrap">

                    <Link className="nav-link d-inline text-white mx-2" to="/create">Create</Link>
                </div>
            </nav>
            <div className="container mt-4">
                <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">
                    <span className="fs-5 fw-semibold">Category:</span>
                    <Dropdown>
                        <Dropdown.Toggle variant={category !== "All" ? "primary" : "secondary"}>
                            {category}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setCategory("All")}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory("Health")}>Health</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory("Study")}>Study</Dropdown.Item>
                            <Dropdown.Item onClick={() => setCategory("Work")}>Work</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span className="fs-5 fw-semibold">Status:</span>
                    <Dropdown>

                        <Dropdown.Toggle variant={status !== "All" ? "primary" : "secondary"}>
                            {status}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setStatus("All")}>All</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStatus("Pending")}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStatus("In-Progress")}>In-Progress</Dropdown.Item>
                            <Dropdown.Item onClick={() => setStatus("Completed")}>Completed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <form className="d-flex flex-grow-1 me-2 search-form-custom" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="d-flex flex-column flex-sm-row border border-0 rounded p-2 flex-grow-1 gap-2 me-2"
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>

                    </form>

                    <button className="btn btn-light  w-sm-auto" onClick={() => setAsc(!asc)}>
                        {asc ? "Sort Ascending" : "Sort Descending"} {asc ? <FaArrowUp /> : <FaArrowDown />}
                    </button>
                </div>
                <h3 className="text-center">To-Do List</h3>
                <div className="row mt-4">
                    {filteredTodos.length ? (
                        filteredTodos.map(todo => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={todo.id}>
                                <div className="card p-3 position-relative">

                                    {/* Delete */}
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
                                        /> </span>

                                    <p className="text-muted mt-2">Created on : {todo.date}</p>
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




