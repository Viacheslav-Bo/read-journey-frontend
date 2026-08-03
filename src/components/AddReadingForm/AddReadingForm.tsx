import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./AddReadingForm.module.css";

interface PageFormValues {
  page: string | number;
}

const pageSchema = Yup.object().shape({
  page: Yup.number()
    .typeError("Enter a valid page number")
    .min(1, "Page must be at least 1")
    .required("Page is required"),
});

interface AddReadingFormProps {
  mode: "start" | "stop";
  initialPage?: number | null;
  onSubmitPage: (page: number) => Promise<void>;
}

export default function AddReadingForm({
  mode,
  initialPage = 1,
  onSubmitPage,
}: AddReadingFormProps) {
  const initialValues: PageFormValues = {
    page: initialPage ? String(initialPage) : "",
  };

  const handleSubmit = async (
    values: PageFormValues,
    actions: FormikHelpers<PageFormValues>,
  ) => {
    await onSubmitPage(Number(values.page));
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <div className={css.panel}>
      <p className={css.label}>
        {mode === "start" ? "Start page:" : "Stop page:"}
      </p>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={pageSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.fieldInline}>
              <label htmlFor="page">Page number:</label>
              <Field type="number" name="page" id="page" placeholder="0" />
            </div>
            <ErrorMessage name="page" component="div" className={css.error} />
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {mode === "start" ? "To start" : "To stop"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
