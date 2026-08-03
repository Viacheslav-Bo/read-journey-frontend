import { login } from "../../api/auth/login";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../validations/authSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import css from "./AuthForm.module.css";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>,
  ) => {
    const cleanedValues = {
      ...values,
      email: values.email.trim().toLowerCase(),
    };
    try {
      const response = await login(cleanedValues);
      setAuth(response.data.accessToken, response.data.user);
      toast.success("Login success!");
      navigate("/recommended");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <div className={css.logo}>
        <svg width="42" height="17" aria-hidden="true">
          <use href="/sprite.svg#icon-logo" />
        </svg>

        <span className={css.logoText}>READ JOURNEY</span>
      </div>

      <h1 className={css.title}>
        Expand your mind, reading <span className={css.subtitle}> a book</span>
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldsLogin}>
              <div className={css.fieldInline}>
                <label htmlFor="email">Email:</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your@email.com"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />

              <div className={css.fieldInline}>
                <label htmlFor="password">Password:</label>
                <Field
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Yourpasswordhere"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                  aria-pressed={isPasswordVisible}
                  className={css.eyeButton}
                >
                  <svg className={css.eyeIcon} width="18" height="18">
                    <use
                      href={`/sprite.svg#${isPasswordVisible ? "icon-eye-off" : "icon-eye"}`}
                    />
                  </svg>
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.formButtons}>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wait..." : "Login"}
              </button>
              <Link className={css.switchLink} to="/register">
                Don’t have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
