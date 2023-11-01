import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SIGNUP_USER } from "../feature/authentication/services/Login";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "regular",
  };

  const validate = (values: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: string;
  }) => {
    const errors: {
      email?: string;
      password?: string;
      first_name?: string;
      last_name?: string;
      role?: string;
    } = {};

    if (!values.first_name) {
      errors.first_name = "first name Required";
    }

    if (!values.last_name) {
      errors.last_name = "second name Required";
    }

    if (!values.role) {
      errors.role = "role Required";
    }

    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password Required";
    }

    return errors;
  };

  const onSubmit = async (
    values: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      role: string;
    },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Call the login function to authenticate the user
      const user = await SIGNUP_USER(values);
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
      setError("signup failed. Please check your credentials.");
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
            <Form className="flex flex-col gap-2">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className="bg-transparent outline-blue-500 border border-slate-300 p-2  text-blue-500 font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-rose-600"
              />

              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="bg-transparent outline-blue-500 border border-slate-300 p-2  text-blue-500 font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-rose-600"
              />

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

              <Field
                as="select"
                name="role"
                className="bg-transparent outline-blue-500 border border-slate-300 p-2  text-blue-500 font-metrophobic w-full h-14"
              >
                <option value="admin">Admin</option>

                <option value="regular">Regular</option>
              </Field>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 bg-blue-500 text-white w-full h-14  font-metrophobic font-bold ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              <p className="text-blue-500 font-metrophobic">
                Already have an account?{" "}
                <span className="hover:cursor-pointer underline underline-offset-4">
                  <Link to="/login">login</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
