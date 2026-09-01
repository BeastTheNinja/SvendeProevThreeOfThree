import { useEffect, useState } from "react";
import { useMatches, useNavigate } from "react-router";

import Button from "../Button/Button";
import styles from "./Navbar.module.scss";
import AccountIcon from "../../assets/BurgerNavIcon.svg";
import BackIcon from "../../assets/BackIcon.svg";
import { isLoggedIn, logout } from "../../services/auth.service";

function Navbar() {
  const navigate = useNavigate();
  const matches = useMatches();

  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const pageTitle =
    matches
      .map((match) => (match.handle as { title?: string } | undefined)?.title)
      .filter((title): title is string => Boolean(title))
      .at(-1) ?? '';

  useEffect(() => {
    async function checkLogin() {
      const authenticated = await isLoggedIn();
      setLoggedIn(authenticated);
    }

    checkLogin();

    const handleAuthChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setLoggedIn(customEvent.detail);
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  function handleLogout() {
    logout();

    window.dispatchEvent(
      new CustomEvent("auth-change", {
        detail: false,
      })
    );

    setLoggedIn(false);
    setIsOpen(false);
    navigate("/home");
  }

  function handleNavClick(path: string) {
    navigate(path);
    setIsOpen(false);
  }

  return (
    <nav className={styles.NavbarStyles}>
      <div className={styles.LeftSection}>
        <button
          type="button"
          className={styles.BackButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <img src={BackIcon} alt="Back Icon" />
        </button>
      </div>

      <div className={styles.TitleSection}>
        <h1>{pageTitle}</h1>
      </div>

      <div className={styles.RightSection}>
        <Button
          type="button"
          className={styles.AccountButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open navigation"
          aria-expanded={isOpen}
        >
          <img src={AccountIcon} alt="Menu Icon" />
        </Button>
      </div>

      {isOpen && (
        <div className={styles.Overlay}>
          <div className={styles.MenuContent}>
            <button
              type="button"
              className={styles.CloseButton}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <div className={styles.NavLinks}>
              <Button onClick={() => handleNavClick("/home")}>
                Home
              </Button>

              <Button onClick={() => handleNavClick("/search")}>
                Search
              </Button>

              {loggedIn && (
                <Button onClick={() => handleNavClick("/mySchedule")}>
                  My Schedule
                </Button>
              )}

              {!loggedIn && (
                <>
                  <Button onClick={() => handleNavClick("/login")}>
                    Log ind
                  </Button>

                  <Button onClick={() => handleNavClick("/register")}>
                    Opret bruger
                  </Button>
                </>
              )}

              {loggedIn && (
                <Button onClick={handleLogout}>
                  Log ud
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;