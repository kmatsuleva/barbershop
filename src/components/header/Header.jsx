import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../../constants/constants";
import Logo from "../logo/Logo";
import ButtonLink from "../button-link/ButtonLink";
import AuthLinks from "./auth-links/AuthLinks";
import styles from "./Header.module.css";

export default function Header() {
  // states
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // hooks
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // handlers
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => {
    if (window.innerWidth < 1200) {
      setIsMenuOpen(false);
    }
  };

  // styles
  const buttonClass = isMenuOpen ? styles["show"] : "";
  const mobileButtonClass = isMenuOpen ? styles["open"] : "";

  return (
    <header className={styles["header"]}>
      <Logo />
      <nav className={`${styles["nav"]} ${isMenuOpen ? styles["show"] : ""}`}>
        <ul className={`${styles["nav-list"]} ${buttonClass}`}>
          {NAVIGATION.map((page) => (
            <li key={page.url} className={styles["nav-item"]}>
              <Link to={page.url} onClick={closeMenu}>
                {page.title}
              </Link>
            </li>
          ))}
          {isMenuOpen && (
            <>
              <AuthLinks onLinkClick={closeMenu} />
              {/* <li className={styles["nav-item"]}>
                <Link to="/booking" onClick={closeMenu}>
                  Book now
                </Link>
              </li> */}
            </>
          )}
        </ul>
      </nav>

      <ul className={styles["user-actions"]}>
        <AuthLinks onLinkClick={closeMenu} />
        {/* <ButtonLink
          url="booking"
          size="xs"
          text="Book now"
          className={styles["mt-0"]}
          btnStyle="circle"
        /> */}
      </ul>

      <div className={styles["mobile-menu"]}>
        <button
          className={`${styles["menu-button"]} ${mobileButtonClass}`}
          onClick={toggleMenu}
        >
          <span className={styles["menu-icon"]}></span>
        </button>
      </div>
    </header>
  );
}
