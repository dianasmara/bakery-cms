import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import Logo from '../assets/image/logo.png';
import './Header.css';

const Header = () => {
    const { settings } = useSiteData();
    const { outletName } = settings;

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src={Logo} alt={`${outletName} Logo`} className="logo-image" />
                    <span className="outlet-name">{outletName}</span>
                </Link>

                <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>

                <div className={`header-right ${isMenuOpen ? 'open' : ''}`}>
                    <div className="nav-links">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                            onClick={() => setIsMenuOpen(false)}
                            end
                        >
                            Beranda
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Produk
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
