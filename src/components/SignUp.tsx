import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SIGNUP_USER } from "../feature/authentication/services/Login";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SignUp: React.FC = () => {
  const [t] = useTranslation("global");

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
      errors.first_name = `${t("form.first")} ${t("form.required")}`;
    }

    if (!values.last_name) {
      errors.last_name = `${t("form.last")} ${t("form.required")}`;
    }

    if (!values.role) {
      errors.role = `${t("form.role")} ${t("form.required")}`;
    }

    if (!values.email) {
      errors.email = `${t("form.email")} ${t("form.required")}`;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = `${t("form.invalidEmail")}`;
    }

    if (!values.password) {
      errors.password = `${t("form.password")} ${t("form.required")}`;
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

      toast.success(`${t("toast.signupSuccess")}`, {
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
      setError(`${t("form.errorSignup")}`);
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
            <Form className="flex flex-col gap-2">
              <Field
                type="text"
                name="first_name"
                placeholder={t("form.first")}
                className="bg-transparent outline-[#5792c9] border border-slate-300 p-2  text-[#5792c9] font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-rose-600"
              />

              <Field
                type="text"
                name="last_name"
                placeholder={t("form.last")}
                className="bg-transparent outline-[#5792c9] border border-slate-300 p-2  text-[#5792c9] font-metrophobic w-full h-14"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-rose-600"
              />

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

              <Field
                as="select"
                name="role"
                className="bg-transparent outline-[#5792c9] border border-slate-300 p-2  text-[#5792c9] font-metrophobic w-full h-14"
              >
                <option value="admin">Admin</option>

                <option value="regular">Regular</option>
              </Field>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 bg-[#5792c9] text-white w-full h-14  font-metrophobic font-bold ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? `${t("form.signing")}...`
                  : `${t("form.signup")}`}
              </button>

              {/* Display error message if there is one */}
              {error && <p className="text-red-500">{error}</p>}

              <p className="text-[#5792c9] font-metrophobic">
                {t("form.descLog")}{" "}
                <span className="hover:cursor-pointer underline underline-offset-4">
                  <Link to="/login">{t("form.login")}</Link>
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
