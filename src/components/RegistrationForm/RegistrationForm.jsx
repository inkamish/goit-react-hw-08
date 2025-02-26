import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import styles from "./RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";

const RegistrationForm = () => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const dispatch = useDispatch();

  const error = useSelector(selectError);

  const validationSchema = Yup.object({
    name: Yup.string()
    .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      resetForm();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off" className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor={nameId}>Name</label>
          <Field className={styles.input} id={nameId} name="name" />
          <ErrorMessage className={styles.error} name="name" component="span" />
        </div>

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

        <div className={styles.formElement}>
          <label htmlFor={confirmPasswordId}>Confirm Password</label>
          <Field
            className={styles.input}
            id={confirmPasswordId}
            name="confirmPassword"
            type="password"
          />
          <ErrorMessage
            className={styles.error}
            name="confirmPassword"
            component="span"
          />
        </div>

        <button type="submit" className={styles.btn}>
          Login
        </button>

        {error && <p className={styles.error}>Error: {error}</p>}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
