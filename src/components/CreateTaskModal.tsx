import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { createTask } from "@/feature/todo/services/todoService";

export function CreateTaskModal() {
  //   const [error, setError] = useState<string | null>(null);
  // Define an initial form values object
  const initialValues = {
    name: "", // You can add more fields if needed
  };

  // Define a function to validate form input fields
  const validate = (values: { name: string }) => {
    const errors: { name?: string } = {};

    // Validate the email field
    if (!values.name) {
      errors.name = "Task Name Required";
    }

    return errors;
  };

  // A function to handle the form submission
  const handleSubmit = async (values: { name: string }, { resetForm }: any) => {
    try {
      const data = {
        ...values,
        status: "incomplete",
      };
      const task = await createTask(data);

      console.log("well", task);
    } catch (error) {}

    // Reset the form after submission
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
              <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                {/* Task Name Input */}
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
              </div>
            </div>
            <DialogFooter className="sm:justify-between ">
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
                  className="bg-green-400 px-4 py-2 text-white rounded-md "
                >
                  Create Task
                </button>
              </DialogClose>
            </DialogFooter>
          </Form>
        </DialogContent>
      )}
    </Formik>
  );
}
