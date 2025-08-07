import { Todo } from '../utils/interface';


let todos: Todo[] = [];
let nextId = 1;


export const findAll = async (): Promise<Todo[]> => {
  return [...todos];
};


export const findById = async (id: number): Promise<Todo | undefined> => {
  return todos.find(todo => todo.id === id);
};

export const create = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
  const newTodo: Todo = {
    id: nextId++,
    ...todo
  };
  
  todos.push(newTodo);
  return newTodo;
};


export const update = async (id: number, updatedTodo: Todo): Promise<Todo | null> => {
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    return null;
  }
  
  todos[index] = updatedTodo;
  return updatedTodo;
};

export const remove = async (id: number): Promise<boolean> => {
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  
  return todos.length < initialLength;
};

 export  const  complete = async(id  : number): Promise<boolean> => {
  const todo = await findById(id);
  
  if (!todo) {
    return false;
  }
  
  todo.completed = !todo.completed;
  await update(id, todo);
  
  return true;
};