import React from 'react'
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';

export default function TodoForm({ addTodo }) {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        title: "",
        desc: "",
        category: "",
        status: "Pending",
    });

    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.title) {
            newErrors.title = "Title is required";
        }

        if (!formData.desc) {
            newErrors.desc = "Description is required";
        }

        if (!formData.category) {
            newErrors.category = "Category is required";
        }

        setErrors(newErrors);

      
        if (Object.keys(newErrors).length === 0) {
            addTodo(formData);

            setFormData({
                title: "",
                desc: "",
                category: "",
                status: "Pending",
            });

            navigate("/home");
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <div className="container-fluid px-4 ">
                    <div className="collapse navbar-collapse text-start" id="navbarNav">
                        <ul className="navbar-nav  mb-lg-0">
                            <li className="nav-item " >
                                <a className="nav-link active mx-4" href="/home"> <FaChevronLeft /> Go Back to home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='todo-form-container'>

                <form onSubmit={handleSubmit}>
                    <h1>Create Todo Item</h1>

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            maxLength={50}
                            value={formData.title}
                            onChange={handleChange}
                            className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        />
                        <p>{formData.title.length}/50 characters</p>
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            name="desc"
                            maxLength={600}
                            value={formData.desc}
                            onChange={handleChange}
                            className={`form-control ${errors.desc ? "is-invalid" : ""}`}
                        />
                        <p>{formData.desc.length}/600 characters</p>
                        {errors.desc && <div className="invalid-feedback">{errors.desc}</div>}
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`form-control ${errors.category ? "is-invalid" : ""}`}
                        >
                            <option value="">Select Category<i class="fa-solid fa-angle-down"></i></option>
                            <option value="Study">Study</option>
                            <option value="Work">Work</option>
                            <option value="Health">Health</option>
                        </select>

                        {errors.category && (
                            <div className="invalid-feedback">{errors.category}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}