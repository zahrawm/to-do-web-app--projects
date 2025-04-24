import { Request, Response } from 'express';
import prisma from '../prisma';


export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};


export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const todo = await prisma.todo.findUnique({
      where: { id: String(id) }
    });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({ message: 'Failed to fetch todo' });
  }
};


export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description = '' } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        completed: false
      }
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Failed to create todo' });
  }
};


export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const updatedTodo = await prisma.todo.update({
      where: { id: String(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed })
      }
    });
    
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Failed to update todo' });
  }
};


export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.todo.delete({
      where: { id: String(id) }
    });
    
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};