import React, { useState } from "react";
import TodoContext from "./TodoContext";

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos(prev => [...prev, { ...newTodo, id: Date.now() }]);
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, updatedTodo) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
