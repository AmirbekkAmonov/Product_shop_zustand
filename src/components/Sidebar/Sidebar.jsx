import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "@/styles/main.scss";
import useStore from "@/store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout, darkMode, toggleDarkMode, language, setLanguage } =
    useStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        {user ? (
          <div className="sidebar__content">
            <div className="sidebar__user">
              <img
                src={user.avatar || "default-avatar.png"}
                alt="User Avatar"
              />
              <p>{user.name}</p>
            </div>
            <Link to="/profile" onClick={onClose}>
              My Profile
            </Link>
            <Link to="/orders" onClick={onClose}>
              Order History
            </Link>
            <Link to="/favorite" onClick={onClose}>
              Favorites
            </Link>
            <Link to="/basket" onClick={onClose}>
              Cart
            </Link>

            <div className="sidebar__settings">
              <h4>Settings</h4>
              <div className="dark-mode-toggle" onClick={toggleDarkMode}>
                <span>{darkMode ? " ☀️  Light Mode" : "🌙 Dark Mode"}</span>
              </div>
              <div className="lang-dropdown">
                <span
                  className={language === "en" ? "active" : ""}
                  onClick={() => setLanguage("en")}
                >
                  🇬🇧 English
                </span>
                <span
                  className={language === "uz" ? "active" : ""}
                  onClick={() => setLanguage("uz")}
                >
                  🇺🇿 O'zbek
                </span>
                <span
                  className={language === "ru" ? "active" : ""}
                  onClick={() => setLanguage("ru")}
                >
                  🇷🇺 Русский
                </span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          </div>
        ) : (
          <p>Tizimga kirmagansiz</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
