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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface UpdateTaskModalProps {
  task: TodoModel;
}

export function UpdateTaskModal({ task }: UpdateTaskModalProps) {
  const { addTask } = useTask();
  const [t] = useTranslation("global");

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
    {}: any
  ) => {
    try {
      // Create the task and get the response
      const data = {
        name: values.name,
        status: values.status,
      };

      const updatedTask = await updateTask(task.id, data);
      console.log("tas", data.status);

      // Update the context with the updated task
      toast.success(
        `${data.status === "deleted" ? t("toast.delete") : t("toast.update")}`,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      addTask(updatedTask);
    } catch (error) {
      // Handle errors here
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const restoreTask = async (task: TodoModel) => {
    // Update the task's status to 'Incomplete' to restore it
    const data = { ...task, status: "incomplete" };
    const updatedTask = await updateTask(task.id, data);
    toast.success(`${t("toast.restored")}`, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    addTask(updatedTask);
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
              <DialogTitle>{t("update.title")}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2 mt-2">
              <div className="grid flex-1 gap-2">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("update.taskName")}
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
                    {t("update.taskStatus")}
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none"
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                    <option
                      hidden={initialValues.status === "deleted"}
                      value="deleted"
                    >
                      Delete
                    </option>
                  </Field>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-4 sm:justify-between">
              <DialogClose asChild>
                <button
                  type="button"
                  className="bg-gray-700 px-4 py-2 text-white rounded-md"
                >
                  {t("update.close")}
                </button>
              </DialogClose>
              <DialogClose asChild>
                <button
                  type="submit"
                  className="bg-green-400 px-4 py-2 text-white rounded-md"
                >
                  {t("update.title")}
                </button>
              </DialogClose>

              {initialValues.status === "deleted" && (
                <DialogClose asChild>
                  <button
                    onClick={() => restoreTask(task)}
                    className="bg-[#939581] px-4 py-2 text-white rounded-md"
                  >
                    {" "}
                    {t("update.restore")}
                  </button>
                </DialogClose>
              )}
            </DialogFooter>
          </Form>
        </DialogContent>
      )}
    </Formik>
  );
}
