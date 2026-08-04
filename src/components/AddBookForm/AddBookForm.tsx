import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./AddBookForm.module.css";

interface AddBookFormValues {
  title: string;
  author: string;
  totalPages: string;
}

const addBookSchema = Yup.object().shape({
  title: Yup.string().min(1, "Title is required").required("Title is required"),
  author: Yup.string()
    .min(1, "Author is required")
    .required("Author is required"),
  totalPages: Yup.number()
    .typeError("Enter a valid number")
    .min(1, "Must be at least 1")
    .max(25000, "Too many pages")
    .required("Number of pages is required"),
});

interface AddBookFormProps {
  onAdd: (values: {
    title: string;
    author: string;
    totalPages: number;
  }) => Promise<void>;
}

export default function AddBookForm({ onAdd }: AddBookFormProps) {
  const initialValues: AddBookFormValues = {
    title: "",
    author: "",
    totalPages: "",
  };

  const handleSubmit = async (
    values: AddBookFormValues,
    actions: FormikHelpers<AddBookFormValues>,
  ) => {
    await onAdd({
      title: values.title,
      author: values.author,
      totalPages: Number(values.totalPages),
    });
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <div className={css.panel}>
      <Formik
        initialValues={initialValues}
        validationSchema={addBookSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formContent}>
              <h3 className={css.formTitle}>Create your library:</h3>
              <div className={css.fieldInline}>
                <label htmlFor="title">Book title:</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter text"
                />
              </div>
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />

              <div className={css.fieldInline}>
                <label htmlFor="author">The author:</label>
                <Field
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Enter text"
                />
              </div>
              <ErrorMessage
                name="author"
                component="div"
                className={css.error}
              />

              <div className={css.fieldInline}>
                <label htmlFor="totalPages">Number of pages:</label>
                <Field
                  type="number"
                  name="totalPages"
                  id="totalPages"
                  placeholder="0"
                />
              </div>
              <ErrorMessage
                name="totalPages"
                component="div"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Add book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
