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

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAdress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
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
        firstname,
        lastname,
        address,
        zipcode: Number(zipcode),
        city,
        email,
        password,
        hasNewsletter: false,
        hasNotification: false,
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
          id="firstName"
          name="firstName"
          label="First name"
          type="text"
          value={firstname}
          onChange={(event) =>
            setFirstName(event.target.value)
          }
          required
        />

        <Input
          id="lastName"
          name="lastName"
          label="Last name"
          type="text"
          value={lastname}
          onChange={(event) =>
            setLastName(event.target.value)
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
          id="adress"
          name="adress"
          label="Adress"
          type="text"
          value={address}
          onChange={(event) =>
            setAdress(event.target.value)
          }
          required
        />
        <Input
          id="zipcode"
          name="zipcode"
          label="Zipcode"
          type="text"
          value={zipcode}
          onChange={(event) =>
            setZipcode(event.target.value)
          }
          required
        />
        <Input
          id="city"
          name="city"
          label="City"
          type="text"
          value={city}
          onChange={(event) =>
            setCity(event.target.value)
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
