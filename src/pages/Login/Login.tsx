import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import useForm from "../../hooks/useForm";
import { login } from "../../services/auth.service";
import styles from "./Login.module.scss";

type LoginValues = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo =
    (location.state as { returnTo?: string } | null)?.returnTo ?? "/home";

  const { values, errors, handleChange, validateForm } = useForm<LoginValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: ({ username, password }) => {
      const validationErrors: Partial<Record<keyof LoginValues, string>> = {};

      if (!username.trim()) {
        validationErrors.username = "Username is required.";
      }

      if (!password) {
        validationErrors.password = "Password is required.";
      } else if (password.length < 6) {
        validationErrors.password = "Password must be at least 6 characters.";
      }

      return validationErrors;
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login({
        username: values.username,
        password: values.password,
      });

      window.dispatchEvent(new CustomEvent("auth-change", { detail: true }));
      navigate(returnTo, { replace: true });
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading message="Logging in..." />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>

        {error && (
          <div className={styles.serverError}>
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              aria-invalid={Boolean(errors.username)}
              className={styles.input}
            />
            {errors.username && (
              <p className={styles.error} role="alert">
                {errors.username}
              </p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.error} role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
