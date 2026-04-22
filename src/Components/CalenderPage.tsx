import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";

type Props = {
  todos: any[];
  Status: (id: number) => void;
  setListModal: (value: boolean) => void;
  setSelectedTodo: (value: any) => void;
  setSelectedDate: (value: string) => void;
};

const getLocalDateString = (d: string) => {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
};

export default function CalendarPage({
  todos,
  Status,
  setListModal,
  setSelectedTodo,
  setSelectedDate
}: Props) {

  return (
    <>
      <nav className="navbar navbar-dark bg-primary fixed-top shadow-sm">
        <div className="container-fluid">
          <Link to="/home" className="btn btn-outline-light btn-sm">
            Back
          </Link>
          <span className="navbar-brand mx-auto">
            To-Do Calendar
          </span>
        </div>
      </nav>

      <div className="container mt-2 pt-2">
        <div className="card shadow border-0 p-3">

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="70vh"

            events={
                todos
              .filter(todo => todo.date)
              .map(todo => ({
                title: todo.title,
                className: todo.status?.toLowerCase() || "",
                date: (todo.date || "").split("T")[0]
              }))}

            dateClick={(info) => {
              setSelectedDate(info.dateStr);
              setListModal(true);
              setSelectedTodo(null);
            }}
          />

        </div>
      </div>
    </>
  );
}