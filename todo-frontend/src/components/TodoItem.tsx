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
    return date.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${todo.completed ? 'border-green-500' : 'border-yellow-500'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => onToggleStatus(todo.id, todo.completed)}
            className="mt-1 h-5 w-5 text-blue-600 cursor-pointer"
          />
          <div>
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            <div className="mt-2 text-xs text-gray-500">
              Created: {formatDate(todo.createdAt)}
              {todo.updatedAt && ` • Updated: ${formatDate(todo.updatedAt)}`}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/todo/${todo.id}`} className="text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link to={`/edit/${todo.id}`} className="text-yellow-600 hover:text-yellow-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </Link>
          <button 
            onClick={() => onDelete(todo.id)} 
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;