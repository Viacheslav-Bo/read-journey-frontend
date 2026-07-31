import RegisterForm from "../../components/auth/RegisterForm";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div>
      <h1>Expand your mind, reading a book</h1>
      <RegisterForm />
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}
