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
    <div className="flex justify-center items-center px-4 md:px-0  mx-4  bg-purple-900 md:w-[562px] min:h-[530px] rounded-xl md:mx-auto py-6">
      <div className="w-[379px]">
        <img
          src="/fao.webp"
          alt="logo"
          width={197}
          height={74}
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
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
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
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
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
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
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
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-600"
              />

              <Field
                as="select"
                name="role"
                className="bg-transparent outline-none border border-white p-2 rounded-lg text-white font-metrophobic w-full h-14"
              >
                <option value="charity">Charity</option>

                <option value="regular">Regular</option>
              </Field>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-12 bg-white text-purple-900 w-full h-14 rounded-lg font-metrophobic font-bold mb-3 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              <p className="text-white font-metrophobic">
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
