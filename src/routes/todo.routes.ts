import express from 'express';
import * as TodoController from '../controllers/todo.controllers';

const router = express.Router();

router.get('/', TodoController.getAllTodos);


router.get('/:id', TodoController.getTodoById);


router.post('/', TodoController.createTodo);


router.put('/:id', TodoController.updateTodo);

router.delete('/:id', TodoController.deleteTodo);

export default router;