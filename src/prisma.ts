import { PrismaClient } from '@prisma/client';
import { updateTodo } from './controllers/todo.Controllers';
import { router } from './routes/todo.routes';

const prisma = new PrismaClient();

export default prisma;router.put('/:id', updateTodo);

