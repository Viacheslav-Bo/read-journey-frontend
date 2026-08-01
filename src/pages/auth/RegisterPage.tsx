import RegisterForm from "../../components/auth/RegisterForm";
import css from "./AuthPage.module.css";

export default function RegisterPage() {
  return (
    <main className="container">
      <div className={css.mainWrapper}>
        <div className={css.formWrapper}>
          <RegisterForm />
        </div>
        <div className={css.phoneWrapper}>
          <img
            src="/phone.png"
            alt="Read Journey app preview"
            className={css.phone}
          />
        </div>
      </div>
    </main>
  );
}
