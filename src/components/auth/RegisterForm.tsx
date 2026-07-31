import { register } from "../../api/auth/register";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../validations/authSchema";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <fieldset>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" />

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
            {isSubmitting ? "Wait..." : "Registration"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
