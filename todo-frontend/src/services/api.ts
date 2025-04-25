import axios from 'axios';
import { Todo, TodoFormData } from '../types/Todo';

const API_URL =  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const TodoService = {
  
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

 
  getTodoById: async (id: number): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },


  createTodo: async (todoData: TodoFormData): Promise<Todo> => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },


  updateTodo: async (id: number, todoData: Partial<TodoFormData>): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },


  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },


  toggleTodoStatus: async (id: number, completed: boolean): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, { completed });
    return response.data;
  }
};