import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .required("Password is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password is too long")
    .required("Password is required"),
});
