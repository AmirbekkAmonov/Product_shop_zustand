import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import "@/styles/main.scss"
import useBasket from '@/store/usebasket';
import useFavorite from '@/store/useFavorite';

function Header() {
    const { basket } = useBasket();
    const { favorites } = useFavorite();

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
      );
    
      useEffect(() => {
        if (darkMode) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
        localStorage.setItem("darkMode", darkMode);
      }, [darkMode]);

    return (
        <div className='header'>
            <div className='container'>
                <Link to={'/'} className='header__logo'> <img className='logo' src="shop.png" alt="" /> Shop </Link>
                <div className='header__links'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/add'}>Add</NavLink>
                    <NavLink to={'/favorite'}>
                        Favorites {favorites.length > 0 && <span>{favorites.length}</span>}
                    </NavLink>
                    <NavLink to={'/basket'}>
                        Cart {basket.length > 0 && <span>{basket.length}</span>}
                    </NavLink>
                </div>
                <div className='header__lag-dark'>
                    <div className="dark" onClick={() => setDarkMode(!darkMode)}>
                        <img src="dark.png" alt="Dark mode" />
                        <span className={darkMode ? "" : "active"}></span>
                        <img className='light' src="light.png" alt="Light mode" />
                    </div>
                    <div className="lang-dropdown">
                        <button className="lang-btn">
                            <span className="flag">🇬🇧</span>
                            <span className="selected-lang">English</span> ▼
                        </button>
                        <ul className="lang-list">
                            <li data-lang="en">🇬🇧 English</li>
                            <li data-lang="uz">🇺🇿 O'zbek</li>
                            <li data-lang="ru">🇷🇺 Русский</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header