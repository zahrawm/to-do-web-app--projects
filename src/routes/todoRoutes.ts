

import express from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getCompletedTodos,
  getIncompleteTodos,
  markAsCompleted,
  markAsIncomplete,
  searchTodos
} from '../controller/todoControllers';

export const router = express.Router();


router.get('/', getAllTodos);


router.get('/completed', getCompletedTodos);


router.get('/incomplete', getIncompleteTodos);


router.get('/search', searchTodos);


router.get('/:id', getTodoById);


router.post('/', createTodo);


router.put('/:id', updateTodo);
router.patch('/:id', updateTodo);

router.patch('/:id/complete', markAsCompleted);
router.patch('/:id/incomplete', markAsIncomplete);


router.delete('/:id', deleteTodo);

export default router;