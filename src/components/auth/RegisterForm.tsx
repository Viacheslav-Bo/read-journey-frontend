import { register } from "../../api/auth/register";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../validations/authSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import css from "./AuthForm.module.css";
import { Link } from "react-router-dom";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>,
  ) => {
    const cleanedValues = {
      ...values,
      email: values.email.trim().toLowerCase(),
    };
    try {
      const response = await register(cleanedValues);
      setAuth(response.data.accessToken, response.data.user);
      toast.success("Registration success!");
      navigate("/recommended");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <svg width="42" height="17">
        <use href="/sprite.svg#icon-logo" />
      </svg>

      <h1 className={css.title}>
        Expand your mind, reading <span className={css.subtitle}> a book</span>
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldsRegister}>
              <div className={css.fieldInline}>
                <label htmlFor="name">Name:</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Viacheslav Bobivnyk"
                />
              </div>
              <ErrorMessage name="name" component="div" className={css.error} />

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
                {isSubmitting ? "Wait..." : "Registration"}
              </button>
              <Link className={css.switchLink} to="/login">
                Already have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
