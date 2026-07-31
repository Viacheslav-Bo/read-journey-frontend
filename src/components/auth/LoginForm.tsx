import { login } from "../../api/auth/login";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../validations/authSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <fieldset>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Password</label>
            <Field
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              id="password"
            />
            <ErrorMessage name="password" component="div" />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              aria-pressed={isPasswordVisible}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </button>
          </fieldset>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Wait..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
