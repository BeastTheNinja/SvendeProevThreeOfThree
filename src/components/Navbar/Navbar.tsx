import { useNavigate } from "react-router";

import Button from "../Button/Button";

import { logout } from "../../services/auth.service";

function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();

      navigate("/login");
    } catch {
      console.error("Logout failed");
    }
  }

  return (
    <nav>
      <h1>React Starter</h1>

      <div>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
