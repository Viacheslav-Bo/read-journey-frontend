import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import css from "./Header.module.css";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../api/auth/logout";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to log out");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      clearAuth();
      setIsMenuOpen(false);
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${css.navLink} ${css.navLinkActive}` : css.navLink;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ?
      `${css.mobileNavLink} ${css.mobileNavLinkActive}`
    : css.mobileNavLink;

  return (
    <main className="container">
      <header className={css.header}>
        <Link to="/recommended" className={css.logoLink}>
          <svg className={css.logo} width="32" height="14">
            <use href="/sprite.svg#icon-logo" />
          </svg>

          <span className={css.logoText}>READ JOURNEY</span>
        </Link>

        <nav className={css.nav}>
          <NavLink to="/recommended" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/library" className={navLinkClass}>
            My library
          </NavLink>
        </nav>

        <div className={css.rightGroup}>
          <div className={css.userBar}>
            <span className={css.userAvatar}>
              {user?.name.charAt(0).toUpperCase()}
            </span>
            <span className={css.userName}>{user?.name}</span>
          </div>

          <button
            type="button"
            className={css.logoutButton}
            onClick={handleLogout}
          >
            Log out
          </button>

          <button
            type="button"
            className={css.burgerButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-menu" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <>
          <div className={css.backdrop} onClick={closeMenu} />
          <div className={css.mobileMenu}>
            <button
              type="button"
              className={css.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg width="28" height="28">
                <use href="/sprite.svg#icon-close" />
              </svg>
            </button>

            <nav className={css.mobileNav}>
              <NavLink
                to="/recommended"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/library"
                className={mobileNavLinkClass}
                onClick={closeMenu}
              >
                My library
              </NavLink>
            </nav>

            <button
              type="button"
              className={css.mobileLogoutButton}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </main>
  );
}
