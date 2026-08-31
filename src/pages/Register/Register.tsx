import {
  useState,
} from "react";
import type { SubmitEvent } from "react";

import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { register } from "../../services/auth.service";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await register({
        name,
        email,
        password,
        isActive: true,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not create account."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loading message="Creating account..." />
    );
  }

  return (
    <section>
      <h1>Register</h1>

      {error && (
        <ErrorMessage message={error} />
      )}

      <form onSubmit={handleSubmit}>
        <Input
          id="firstName, lastName"
          name="firstName, lastName"
          label="First name and last name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />

        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        <Button type="submit">
          Create account
        </Button>
      </form>
    </section>
  );
}

export default Register;
