import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { createTask } from "@/feature/todo/services/todoService";
import { useTask } from "@/feature/todo/context/TaskContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export function CreateTaskModal() {
  const [t] = useTranslation("global");

  const { addTask } = useTask();

  const initialValues = {
    name: "",
  };

  const validate = (values: { name: string }) => {
    const errors: { name?: string } = {};

    if (!values.name) {
      errors.name = "Task Name Required";
    }

    return errors;
  };

  const handleSubmit = async (values: { name: string }, { resetForm }: any) => {
    try {
      const data = {
        ...values,
        status: "incomplete",
      };

      // Create the task and get the response
      const task = await createTask(data);

      // Update the context with the newly created task
      addTask(task);
      toast.success(`${t("toast.create")}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
              <DialogTitle>{t("tabs.create")}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("table.taskName")}
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
              </div>
            </div>
            <DialogFooter className=" gap-4 sm:justify-between">
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
                  {t("tabs.create")}
                </button>
              </DialogClose>
            </DialogFooter>
          </Form>
        </DialogContent>
      )}
    </Formik>
  );
}
