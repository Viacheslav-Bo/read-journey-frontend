import LoginForm from "../../components/Auth/LoginForm";
import css from "./AuthPage.module.css";

export default function LoginPage() {
  return (
    <>
      <div className={css.mainWrapper}>
        <div className={css.formWrapper}>
          <LoginForm />
        </div>
        <div className={css.phoneWrapper}>
          <img
            src="/phone.png"
            alt="Read Journey app preview"
            className={css.phoneMobile}
          />
          <img
            src="/phonedesc.png"
            alt="Read Journey app preview"
            className={css.phoneDesktop}
          />
        </div>
      </div>
    </>
  );
}
