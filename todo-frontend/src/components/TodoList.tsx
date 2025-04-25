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
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const handleToggleStatus = async (id: number, completed: boolean) => {
    try {
      const updated = await TodoService.toggleTodoStatus(id, !completed);
      setTodos(prev => prev.map(todo => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError('Failed to update todo status');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 Todo List</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          + Add Todo
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-gray-500 animate-pulse">Loading todos...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && todos.length === 0 && (
        <div className="bg-white border rounded-lg p-6 text-center shadow-sm">
          <p className="text-gray-500">No todos found. Create one now!</p>
        </div>
      )}

      {/* Todo List */}
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
    </div>
  );
};

export default TodoList;
