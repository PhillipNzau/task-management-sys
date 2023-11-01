import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { updateTask } from "@/feature/todo/services/todoService"; // Assuming TaskStatus is an enum
import { useTask } from "@/feature/todo/context/TaskContext";
import { TodoModel } from "@/feature/todo/models/todoModel";

interface UpdateTaskModalProps {
  task: TodoModel;
}

export function UpdateTaskModal({ task }: UpdateTaskModalProps) {
  const { addTask } = useTask();

  const initialValues = {
    name: task.name,
    status: task.status,
  };

  const validate = (values: { name: string; status: string }) => {
    const errors: { name?: string; status?: string } = {};

    if (!values.name) {
      errors.name = "Task Name Required";
    }

    return errors;
  };

  const handleSubmit = async (
    values: { name: string; status: string },
    { resetForm }: any
  ) => {
    try {
      // Create the task and get the response
      const data = {
        name: values.name,
        status: values.status,
      };

      const updatedTask = await updateTask(task.id, data);

      // Update the context with the updated task
      addTask(updatedTask);
    } catch (error) {
      // Handle errors here
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {() => (
        <DialogContent className="sm:max-w-md">
          <Form>
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-rose-600"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Task Status
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                    <option value="deleted">Delete</option>
                  </Field>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <DialogClose asChild>
                <button
                  type="button"
                  className="bg-gray-700 px-4 py-2 text-white rounded-md"
                >
                  Close
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-green-400 px-4 py-2 text-white rounded-md"
                >
                  Update Task
                </button>
              </DialogClose>
            </DialogFooter>
          </Form>
        </DialogContent>
      )}
    </Formik>
  );
}
