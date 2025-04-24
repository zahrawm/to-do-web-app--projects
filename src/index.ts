import express from 'express';
import cors from 'cors';
import { getTodoById } from './controller/todoControllers';
import { router } from './routes/todoRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend');
});

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});// GET a single todo by ID


