import React, { useState, useContext } from "react";
import TodoContext from "../context/TodoContext";
import "./Todo.css";

const Todo = () => {
  const { addTodo } = useContext(TodoContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "ToDo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(formData); // Save to global context
    console.log(formData);
    setFormData({ title: "", description: "", priority: "ToDo" }); // Reset form
  };

  return (
    <div className="Container">
      <div >
      <form className="Form-div" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Descriptions</label>
        <input
          id="description"
          name="description"
          type="text"
          placeholder="Descriptions"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="priority">Task Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Complete">Complete</option>
          <option value="Pending">Pending</option>
          <option value="ToDo">ToDo</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Todo;
