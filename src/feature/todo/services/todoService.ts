import API_URLS from "@/config/api";
import { TodoModel } from "../models/todoModel";

// Common function for making HTTP requests
async function makeRequest(url: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response;
}

// Function to fetch todos
export async function fetchTodos(): Promise<TodoModel[]> {
  try {
    const response = await makeRequest(API_URLS.TODO_API_URL);
    const todos: TodoModel[] = await response.json();
    return todos;
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${error}`);
  }
}

// Function to create a task
export async function createTask(taskData: TodoModel): Promise<TodoModel> {
  try {
    const data = {
        ...taskData,
        status: "incomplete"
    }
    const response = await makeRequest(API_URLS.TODO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const createdTask: TodoModel = await response.json();
    console.log('created', createdTask);
    
    return createdTask;
  } catch (error) {
    throw new Error(`Failed to create a task: ${error}`);
  }
}

// Function to update a task
export async function updateTask(id:string,taskData: TodoModel): Promise<TodoModel> {
  try {
    const response = await makeRequest(`${API_URLS.TODO_API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    const createdTask: TodoModel = await response.json();
    console.log('created', createdTask);
    
    return createdTask;
  } catch (error) {
    throw new Error(`Failed to create a task: ${error}`);
  }
}

// Function to Delete a task
export async function deleteTask(id:string): Promise<TodoModel> {
  try {
   
    const response = await makeRequest(`${API_URLS.TODO_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deleteTask: TodoModel = await response.json();
    console.log('delete', deleteTask);
    
    return deleteTask;
  } catch (error) {
    throw new Error(`Failed to delete a task: ${error}`);
  }
}