import { Request, Response } from 'express';
import * as TodoService from '../services/todo.services';
import { Todo } from '../utils/interface';



export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await TodoService.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
};


export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const todo = await TodoService.findById(id);
    
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todo' });
  }
};


export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    
    const newTodo: Omit<Todo, 'id'> = {
      title,
      description: description || '',
      completed: completed || false,
      createdAt: new Date()
    };
    
    const todo = await TodoService.create(newTodo);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};


export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    
    const existingTodo = await TodoService.findById(id);
    
    if (!existingTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    
    const updatedTodo: Todo = {
      id,
      title: title !== undefined ? title : existingTodo.title,
      description: description !== undefined ? description : existingTodo.description,
      completed: completed !== undefined ? completed : existingTodo.completed,
      createdAt: existingTodo.createdAt,
      updatedAt: new Date()
    };
    
    const todo = await TodoService.update(id, updatedTodo);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};


export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await TodoService.remove(id);
    
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};