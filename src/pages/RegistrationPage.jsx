import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  return (
    <>
      <RegistrationForm />

      <p style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </>
  );
};

export default RegistrationPage;
