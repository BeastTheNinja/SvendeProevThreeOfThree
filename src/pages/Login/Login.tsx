import {
  useState,
} from "react";
import type { FormEvent } from "react";

import { useNavigate, useLocation } from "react-router";

import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { login } from "../../services/auth.service";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo ?? "/home";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login({
        username: userName,
        password,
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
    <section>
      <h1>Login</h1>

      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          name="username"
          label="Username"
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <input type="submit" value="login" />

      </form>
    </section>
  );
}

export default Login;
