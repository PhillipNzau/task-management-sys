import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTodos } from "@/feature/todo/services/todoService"; // Import createTask and updateTask
import { TodoModel } from "@/feature/todo/models/todoModel";

interface TaskContextType {
  tasks: TodoModel[];
  addTask: (task: TodoModel) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TodoModel[]>([]);

  useEffect(() => {
    fetchTodos()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        // Handle the error as needed
        console.log("Error", error);
      });
  }, []);

  const addTask = (task: TodoModel) => {
    // Check if the task with the same ID already exists and update it
    const taskIndex = tasks.findIndex((t) => t.id === task.id);

    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = task;
      setTasks(updatedTasks);
    } else {
      // If the task doesn't exist, add it to the tasks list
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
