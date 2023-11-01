
import API_URLS from "@/config/api";
import { TodoModel } from "../models/todoModel";
// Function to fetch todos
export async function fetchTodos(): Promise<TodoModel[]> {
  try {
    const response = await fetch(API_URLS.TODO_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.status}`);
    }

    const todos: TodoModel[] = await response.json();
    return todos;
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error}`);
  }
}
