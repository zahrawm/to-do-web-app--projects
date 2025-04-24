
import prisma from '../prisma';

interface CreateTodoInput {
  title: string;
  description?: string;
}

interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export class TodoService {
  /**
   * Get all todos
   * @returns All todos ordered by creation date (newest first)
   */
  async getAllTodos() {
    return prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get a specific todo by ID
   * @param id The todo ID
   * @returns The todo if found, null otherwise
   */
  async getTodoById(id: string) {
    return prisma.todo.findUnique({
      where: { id }
    });
  }

  /**
   * Create a new todo
   * @param data Todo data (title and optional description)
   * @returns The created todo
   */
  async createTodo(data: CreateTodoInput) {
    return prisma.todo.create({
      data: {
        title: data.title,
        description: data.description || '',
        completed: false
      }
    });
  }

  /**
   * Update an existing todo
   * @param id The todo ID
   * @param data The data to update
   * @returns The updated todo
   */
  async updateTodo(id: string, data: UpdateTodoInput) {
    return prisma.todo.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.completed !== undefined && { completed: data.completed })
      }
    });
  }

  /**
   * Delete a todo
   * @param id The todo ID
   * @returns The deleted todo
   */
  async deleteTodo(id: string) {
    return prisma.todo.delete({
      where: { id }
    });
  }

  /**
   * Get all completed todos
   * @returns Completed todos ordered by creation date
   */
  async getCompletedTodos() {
    return prisma.todo.findMany({
      where: { completed: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Get all incomplete todos
   * @returns Incomplete todos ordered by creation date
   */
  async getIncompleteTodos() {
    return prisma.todo.findMany({
      where: { completed: false },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   
   * @param id The todo ID
   * @returns The updated todo
   */
  async markAsCompleted(id: string) {
    return prisma.todo.update({
      where: { id },
      data: { completed: true }
    });
  }

  /**
   * Mark a todo as incomplete
   * @param id The todo ID
   * @returns The updated todo
   */
  async markAsIncomplete(id: string) {
    return prisma.todo.update({
      where: { id },
      data: { completed: false }
    });
  }

  /**
   * Search todos by title or description
   * @param searchTerm The search term
   * @returns Todos matching the search term
   */
  async searchTodos(searchTerm: string) {
    return prisma.todo.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}

// Export a singleton instance
export const todoService = new TodoService();