import { Todo } from '../utils/interface';


let todos: Todo[] = [];
let nextId = 1;


export const findAll = async (): Promise<Todo[]> => {
  return [...todos];
};

/**
 * Get todo by id
 * @param id Todo ID
 */
export const findById = async (id: number): Promise<Todo | undefined> => {
  return todos.find(todo => todo.id === id);
};

/**

 * @param todo Todo data without ID
 */
export const create = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const newTodo: Todo = {
    id: nextId++,
    ...todo
  };
  
  todos.push(newTodo);
  return newTodo;
};

/**
 * Update a todo
 * @param id Todo ID
 * @param updatedTodo Updated todo data
 */
export const update = async (id: number, updatedTodo: Todo): Promise<Todo | null> => {
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    return null;
  }
  
  todos[index] = updatedTodo;
  return updatedTodo;
};

/**
 * Delete a todo
 * @param id Todo ID
 */
export const remove = async (id: number): Promise<boolean> => {
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  
  return todos.length < initialLength;
};