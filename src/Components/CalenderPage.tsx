import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { useState } from "react";

const getLocalDateString = (d: string) => {
    if (!d) return "";
    const date = new Date(d);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function CalendarPage({ todos, Status }: { todos: any[]; Status: (id: number) => void }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<any>(null);
    const filteredTodos = todos.filter(t => getLocalDateString(t.date) === selectedDate);

    return (
        <>

            {/* navbar */}
            <nav className="navbar navbar-dark bg-primary fixed-top shadow-sm">
                <div className="container-fluid">
                    <Link to="/home" className="btn btn-outline-light btn-sm">Back</Link>
                    <span className="navbar-brand mb-0 h1 mx-auto">To-Do Calendar</span>
                </div>
            </nav>

            <div className="container mt-2 pt-2">
                <div className="card shadow border-0 p-3">

                    {/* calender   */}

                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        height="70vh"
                        events={todos.map(todo => ({
                            title: todo.title,
                            date: getLocalDateString(todo.date),
                            className: todo.status.toLowerCase()
                        }))}
                        dateClick={(info) => {
                            setSelectedDate(info.dateStr);
                            setShowModal(true);
                            setSelectedTodo(null);
                        }}
                    />
                </div>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Tasks for {selectedDate}</h5>
                                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>

                            {/* Modal body  */}

                            <div className="modal-body">
                                {selectedTodo ? (
                                    <div>
                                        <h5>Title:<strong>{selectedTodo.title}</strong></h5>
                                        <p>Description :<strong>{selectedTodo.desc}</strong></p>
                                        <p>Status: <strong>{selectedTodo.status}</strong></p>
                                        <p>Date: {selectedTodo.date}</p>
                                        <p>Time: {selectedTodo.time}</p>
                                        <button className="btn btn-secondary w-100"
                                            onClick={() => setSelectedTodo(null)}>Back to List
                                        </button>
                                    </div>
                                ) : (

                                    <ul className="list-group">
                                        {filteredTodos.length > 0 ? filteredTodos.map(todo => (
                                            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span onClick={() => setSelectedTodo(todo)} style={{ cursor: 'pointer' }}>{todo.title}</span>

                                                <button
                                                    className={`btn btn-sm ${todo.status === 'Completed' ? 'btn-success' : 'btn-warning'}`}
                                                >
                                                    {todo.status}
                                                </button>
                                            </li>
                                        )) : <p className="text-center text-muted">No tasks for this day!</p>}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}