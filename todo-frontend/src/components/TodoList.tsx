import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TodoService } from '../services/api';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await TodoService.getAllTodos();
        setTodos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleToggleStatus = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await TodoService.toggleTodoStatus(id, !completed);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <Link to="/add" className="btn btn-primary">
          Add New Todo
        </Link>
      </div>
      
      {todos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No todos found. Create one now!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {todos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onDelete={handleDelete} 
              onToggleStatus={handleToggleStatus} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;