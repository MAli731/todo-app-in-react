import { FaChevronLeft } from 'react-icons/fa';
import { useState } from "react";
import { data } from 'react-router-dom';

type TodoFormData = {
    title: string;
    desc: string;
    category: string;
    status: "Pending";
    time : string;
};

type Props = {
    addTodo: (todo: TodoFormData) => void;
    onClose: () => void;
};

type Errors = {
    title?: string;
    desc?: string;
    category?: string;
}

export default function TodoForm({ addTodo , onClose }: Props) {
    const [formData, setFormData] = useState<TodoFormData>({
    title: "",
    desc: "",
    category: "",
    status: "Pending",
    time: ""
});

    const [errors, setErrors] = useState<Errors>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
   

    // Submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors: Errors = {};

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
                time: ""
            });
              onClose?.(); 
          
        }
    };

    return (
        <>           
            <div className='todo-form-container'>
                <form onSubmit={handleSubmit}>
                    <h4>Create Todo Item</h4>
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
                            <option value="">Select Category</option>
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