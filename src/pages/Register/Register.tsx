import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import useForm from "../../hooks/useForm";
import { register } from "../../services/auth.service";
import styles from "./Register.module.scss";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();

  const { values, errors, handleChange, validateForm } = useForm<RegisterValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: ({ name, email, password }) => {
      const validationErrors: Partial<Record<keyof RegisterValues, string>> = {};

      if (!name.trim()) {
        validationErrors.name = "Name is required.";
      } else if (name.trim().length < 2) {
        validationErrors.name = "Name must be at least 2 characters.";
      }

      if (!email.trim()) {
        validationErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        validationErrors.email = "Please enter a valid email address.";
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
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        description: "No description yet",
        isActive: true,
        imageId: 1,
      });

      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading message="Creating account..." />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create account</h1>

        {error && (
          <div className={styles.serverError}>
            <ErrorMessage message={error} />
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              Full name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              className={styles.input}
            />
            {errors.name && (
              <p className={styles.error} role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.error} role="alert">
                {errors.email}
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

          <Button type="submit" className={styles.submitButton}>
            Create account
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Register;
