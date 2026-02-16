import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';
import Logo from '../assets/image/logo.png';
import './Header.css';

const Header = () => {
    const { settings } = useSiteData();
    const { outletName } = settings;

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src={Logo} alt={`${outletName} Logo`} className="logo-image" />
                    <span className="outlet-name">{outletName}</span>
                </Link>
                <div className="header-right">
                    <div className="nav-links">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                            end
                        >
                            Beranda
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
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
