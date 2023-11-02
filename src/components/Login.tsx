import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LOGIN_USER } from "../feature/authentication/services/Login";
import { useUser } from "../hooks/useUser";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const [t] = useTranslation("global");

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
      errors.email = `${t("form.email")} ${t("form.required")}`;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = `${t("form.invalidEmail")}`;
    }

    // Validate the password field
    if (!values.password) {
      errors.password = `${t("form.password")} ${t("form.required")}`;
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
      toast.success(`${t("toast.loginSuccess")}`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Clear any previous error messages
      setError(null);
    } catch (error) {
      // Handle login failure by displaying an error message
      setError(`${t("form.error")}`);
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
                placeholder={t("form.email")}
                className="bg-transparent outline-[#5792c9] border border-slate-300 p-2  text-[#5792c9] font-metrophobic w-full h-14"
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
                placeholder={t("form.password")}
                className="bg-transparent outline-[#5792c9] border border-slate-300 p-2  text-[#5792c9] font-metrophobic w-full h-14"
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
                className={`mt-12 bg-[#5792c9] text-white w-full h-14  font-metrophobic font-bold ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? `${t("form.logging")}...`
                  : `${t("form.login")}`}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Sign-up link */}
              <p className="text-[#5792c9] font-metrophobic">
                {t("form.descSign")}{" "}
                <span className="hover:cursor-pointer underline underline-offset-4">
                  <Link to="/register">{t("form.signup")}</Link>
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
