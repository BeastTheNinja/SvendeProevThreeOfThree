import { Link } from "react-router";

function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <h2>Page not found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
