import { PrismaClient } from '@prisma/client';
import { updateTodo } from './controller/todoControllers';
import { router } from './routes/todoRoutes';

const prisma = new PrismaClient();

export default prisma;router.put('/:id', updateTodo);

