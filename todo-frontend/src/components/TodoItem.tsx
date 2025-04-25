import React from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggleStatus }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 border-l-4 ${
        todo.completed ? 'border-green-500' : 'border-yellow-500'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Checkbox + Info */}
        <div className="flex flex-1 gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleStatus(todo.id, todo.completed)}
            className="mt-1 h-5 w-5 text-blue-600 cursor-pointer accent-blue-600"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p
                className={`text-sm mt-1 ${
                  todo.completed ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Created: {formatDate(todo.createdAt)}
              {todo.updatedAt && ` • Updated: ${formatDate(todo.updatedAt)}`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={`/todo/${todo.id}`}
            className="text-blue-600 hover:text-blue-800 transition"
            title="View"
          >
         
          </Link>
          <Link
            to={`/edit/${todo.id}`}
            className="text-yellow-600 hover:text-yellow-700 transition"
            title="Edit"
          >
            
          </Link>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-600 hover:text-red-700 transition"
            title="Delete"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;



const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);
