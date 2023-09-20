import { faker } from "@faker-js/faker";
import { Todo } from "../todos/todos.entity";
import UserService from "../users/user.service";
export class GeneratorService {
  async generateRandomTodos(): Promise<Todo> {
    const listUser = await UserService.list();
    const todo: Todo = {
      title: faker.lorem.sentence(),
      dueDate: faker.date.future(),
    };
    if (listUser.length > 0 && Math.random() < 0.25) {
      const randomUser = listUser[Math.floor(Math.random() * listUser.length)];
      todo.assignedTo = randomUser._id;
    }
    return todo;
  }
}
export default new GeneratorService();
