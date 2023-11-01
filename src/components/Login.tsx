import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LOGIN_USER } from "../feature/authentication/services/Login";
import { useUser } from "../hooks/useUser";

const Login: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is not available, then redirect to "/login"
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const { login } = useAuth();
  // Initialize the useUser hook to manage user-related data
  // const { addUser } = useUser();
  // Initialize a state variable to manage error messages
  const [error, setError] = useState<string | null>(null);

  // Define the initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Define a function to validate form input fields
  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    // Validate the email field
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Validate the password field
    if (!values.password) {
      errors.password = "Password Required";
    }

    return errors;
  };

  // Define the form submission handler
  const onSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Call the login function to authenticate the user
      const user = await LOGIN_USER(values);

      // Disable the submit button to prevent multiple submissions
      setSubmitting(false);
      // Add the authenticated user to the user context

      login(user);
      // Redirect to a specific route upon successful login
      navigate("/");
      // Clear any previous error messages
      setError(null);
    } catch (error) {
      // Handle login failure by displaying an error message
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 md:px-0  w-full h-screen py-4">
      <div className="w-full md:w-[562px] p-6 bg-white h-auto">
        <img
          src="/fao.webp"
          alt="logo"
          width={100}
          height={100}
          className="mx-auto mb-11"
        />

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Email input field */}
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="bg-transparent outline-blue-500 border border-slate-300 p-2  text-blue-500 font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-rose-600"
              />

              {/* Password input field */}
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="bg-transparent outline-blue-500 border border-slate-300 p-2  text-blue-500 font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-600"
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-12 bg-blue-500 text-white w-full h-14  font-metrophobic font-bold ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Sign-up link */}
              <p className="text-blue-500 font-metrophobic">
                Don't have an account?{" "}
                <span className="hover:cursor-pointer underline underline-offset-4">
                  <Link to="/register">Sign-up</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
