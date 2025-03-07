import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '@/styles/main.scss';
import useStore from '@/store/useStore';
import LoginModal from "../Login/LoginModal";
import Sidebar from '../Sidebar/Sidebar';

function Header() {
    const { basket, favorites, darkMode, toggleDarkMode, language, setLanguage,user, logout} = useStore();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        setIsSidebarOpen(false); 
        navigate('/'); 
    };

    return (
        <div className='header'>
            <div className='container'>
                <Link to={'/'} className='header__logo'>
                    <img className='logo' src="shop.png" alt="" /> Shop
                </Link>
                <div className='header__links'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/favorite'}>
                        Favorites {favorites.length > 0 && <span>{favorites.length}</span>}
                    </NavLink>
                    <NavLink to={'/basket'}>
                        Cart {basket.length > 0 && <span>{basket.length}</span>}
                    </NavLink>
                    {user && <NavLink to="/add">Add</NavLink>}
                </div>
                <div className='header__lag-dark'>
                    <div className="dark" onClick={toggleDarkMode}>
                        <img src="dark.png" alt="Dark mode" />
                        <span className={darkMode ? "" : "active"}></span>
                        <img className='light' src="light.png" alt="Light mode" />
                    </div>
                    <div className="lang-dropdown">
                        <button className="lang-btn">
                            <span className="flag">{language === 'en' ? '🇬🇧' : language === 'uz' ? '🇺🇿' : '🇷🇺'}</span>
                            <span className="selected-lang">
                                {language === 'en' ? 'English' : language === 'uz' ? "O'zbek" : 'Русский'}
                            </span> ▼
                        </button>
                        <ul className="lang-list">
                            <li onClick={() => setLanguage('en')}>🇬🇧 English</li>
                            <li onClick={() => setLanguage('uz')}>🇺🇿 O'zbek</li>
                            <li onClick={() => setLanguage('ru')}>🇷🇺 Русский</li>
                        </ul>
                    </div>
                    {user ? (
                        <div className="header__user">
                            <img 
                            src={user.avatar || "user.png"} 
                            alt="User Avatar" 
                            className="header__avatar" 
                            onClick={() => setIsSidebarOpen(true)} 
                        />
                        </div>
                    ) : (
                        <button className="header__login" onClick={() => setIsLoginOpen(true)}>Login</button>
                    )}
                </div>
            </div>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} user={user} logout={handleLogout} />
        </div>
    );
}

export default Header;
