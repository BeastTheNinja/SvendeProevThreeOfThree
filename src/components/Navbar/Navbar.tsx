import Button from "../Button/Button";
import styles from "./Navbar.module.scss";
import AccountIcon from "../../assets/BurgerNavIcon.svg"
import BackIcon from "../../assets/BackIcon.svg"
import { useEffect } from "react";



import { useMatches, useNavigate } from "react-router";

import { useState } from "react";
import { isLoggedIn, logout } from "../../services/auth.service";



function Navbar() {
  const navigate = useNavigate();
  const matches = useMatches();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const pageTitle =
    matches
      .map((match) => (match.handle as { title?: string } | undefined)?.title)
      .filter((title): title is string => Boolean(title))
      .at(-1) ?? "Popular Classes";


  async function handleAccountClick() {
    const opening = !isAccountMenuOpen;
    setIsAccountMenuOpen(opening);
  }

  useEffect(() => {
    async function checkLogin() {
      const authenticated = await isLoggedIn();
      setLoggedIn(authenticated);
    }

    function handleAuthChange(event: Event) {
      const customEvent = event as CustomEvent<boolean>;
      setLoggedIn(customEvent.detail);
    }

    checkLogin();

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  async function handleLogout() {
    logout();

    window.dispatchEvent(
      new CustomEvent("auth-change", {
        detail: false,
      })
    );

    setLoggedIn(false);
    setIsAccountMenuOpen(false);
    navigate("/");
  }

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);


  return (
    <nav className={styles.NavbarStyles}>
      <div>
        <img src={BackIcon} alt="Back Icon" onClick={() => navigate(-1)} />
      </div>

      <div>
        <h1>{pageTitle}</h1>
      </div>

      <div className={styles.AccountMenu}>
        <Button
          type="button"
          className={styles.AccountButton}
          onClick={handleAccountClick}
          aria-label="Åbn kontomenu"
          aria-expanded={isAccountMenuOpen}
        >
          <img src={AccountIcon} alt="Account Icon" />
        </Button>

        {isAccountMenuOpen && (
          <div className={styles.AccountDropdown}>
            {!loggedIn ? (
              <>
                <Button onClick={() => navigate("/login")}>
                  Log ind
                </Button>

                <Button onClick={() => navigate("/register")}>
                  Opret bruger
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/profil")}>
                  Profil
                </Button>

                <Button onClick={handleLogout}>
                  Log ud
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
