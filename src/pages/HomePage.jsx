import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1> Welcome to Contact Book! </h1>
      <p>Store and manage your contacts securely and easily. </p>
      <Link to="/registration">Get started</Link>
    </div>
  );
};

export default HomePage;
