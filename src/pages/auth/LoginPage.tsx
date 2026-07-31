import LoginForm from "../../components/auth/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <h1>Expand your mind, reading a book</h1>
      <LoginForm />
      <Link to="/register">Don’t have an account? </Link>
    </div>
  );
}
