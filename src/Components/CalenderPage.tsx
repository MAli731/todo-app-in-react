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
    const [showListModal, setShowListModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
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
                <div className="card shadow border-0 p-3 ">

                    {/*Calender*/}

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
                            setShowListModal(true);
                            setSelectedTodo(null);
                        }}
                    />
                </div>
            </div>

            {/*Listview Modal */}

            {showListModal && (
                <div className="modal d-block"

                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: showDetailModal ? 'blur(5px)' : 'none'
                    }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{
                            opacity: showDetailModal ? 0.6 : 1,
                            pointerEvents: showDetailModal ? 'none' : 'auto'
                        }}>

                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Tasks for this Date : {selectedDate}</h5>
                                <button className="btn-close btn-close-white"
                                    onClick={() => setShowListModal(false)}>
                                </button>
                            </div>

                            <div className="modal-body  ">
                                {filteredTodos.length > 0 ? filteredTodos.map(todo => (
                                    <div key={todo.id}
                                        className="d-flex justify-content-between align-items-center mb-2 border p-2 rounded">

                                        <span
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedTodo(todo);
                                                setShowDetailModal(true);

                                            }}>
                                            {todo.title}
                                        </span>

                                        <button className="btn btn-sm btn-warning">

                                            {todo.status}
                                        </button>
                                    </div>
                                )) : <p className="text-center">No tasks</p>}
                            </div>

                        </div>
                    </div>
                </div>
            )}

      {/* Detailview modal separate */}

            {showDetailModal && selectedTodo && (
                <div className="modal d-block"

                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 1050,
                    }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content ">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Task Details</h5>
                                <button className="btn-close btn-close-white"
                                    onClick={() => setShowDetailModal(false)}>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="container border p-2 rounded">

                                    <p><strong>Title:</strong> {selectedTodo.title}</p>
                                    <p><strong>Description:</strong> {selectedTodo.desc}</p>
                                    <p><strong>Status:</strong> {selectedTodo.status}</p>
                                    <p><strong>Time:</strong> {selectedTodo.time}</p>
                                    <p><strong>Date:</strong> {selectedTodo.date}</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </>
    );
}