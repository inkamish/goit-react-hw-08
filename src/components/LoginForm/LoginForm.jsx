import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import styles from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { selectIsLoading, selectError } from "../../redux/auth/selectors";

const LoginForm = () => {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const userData = await dispatch(login(values)).unwrap();

      if (userData.token) {
        resetForm();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off" className={styles.form}>
          <div className={styles.formElement}>
            <label htmlFor={emailId}>Email</label>
            <Field
              className={styles.input}
              id={emailId}
              name="email"
              type="email"
            />
            <ErrorMessage
              className={styles.error}
              name="email"
              component="span"
            />
          </div>

          <div className={styles.formElement}>
            <label htmlFor={passwordId}>Password</label>
            <Field
              className={styles.input}
              id={passwordId}
              name="password"
              type="password"
            />
            <ErrorMessage
              className={styles.error}
              name="password"
              component="span"
            />
          </div>

          <button type="submit" className={styles.btn} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && <p className={styles.error}>Error: {error}</p>}
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
