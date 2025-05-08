import React, { useContext, useState } from 'react';
import TodoContext from '../context/TodoContext';
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const DisplayTodo = () => {
  const { todos, editTodo, deleteTodo } = useContext(TodoContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', priority: 'All' });
  const [filterPriority, setFilterPriority] = useState('All'); // New filter state

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(todos[index]);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditData({ title: '', description: '', priority: 'All' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    editTodo(todos[editIndex].id, editData);
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const filteredTodos = filterPriority === 'All'
    ? todos
    : todos.filter(todo => todo.priority === filterPriority);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', marginTop: '2rem' }}>
      {/* Priority Filter Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="filter">Filter by Priority: </label>
        <select
          id="filter"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Complete">Complete</option>
          <option value="Pending">Pending</option>
          <option value="ToDo">ToDo</option>
        </select>
      </div>

      {filteredTodos.length === 0 ? (
        <p>No todos available.</p>
      ) : (
        filteredTodos.map((todo, index) => (
          <div
            key={todo.id}
            className='Display-todo'
          >
            {editIndex === index ? (
              <>
                <input
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
                <input
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <select name="priority" value={editData.priority} onChange={handleChange}>
                  <option value="Complete">Complete</option>
                  <option value="Pending">Pending</option>
                  <option value="ToDo">ToDo</option>
                </select>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FaCheck style={{ cursor: 'pointer' }} onClick={handleSave} />
                  <FaTimes style={{ cursor: 'pointer' }} onClick={handleCancel} />
                </div>
              </>
            ) : (
              <>
                <div className='Todo-Data'>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <p><strong>Priority:</strong> {todo.priority}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEditClick(index)} />
                  <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(todo.id)} />
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayTodo;
