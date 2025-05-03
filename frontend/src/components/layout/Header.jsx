import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const isAuthenticated = localStorage.getItem('access') !== null ? true : false;

    const { t, i18n } = useTranslation();


  return (
    <>
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary bg-dark text-white" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">{t('Home')}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/products">{t('Products')}</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart">{t('Cart')} <span className="badge text-bg-secondary">{totalItems}</span></NavLink>
                    </li>
                     
                    <li className="nav-item">
                        <select className="form-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="hi">Hindi</option>
                            {/* Add more languages here */}
                        </select>
                    </li>
                </ul>
                
                 {isAuthenticated && (
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <NavLink to="/logout" className="nav-link">{t('Logout')}</NavLink>
                        </li>
                    </ul> )}
                 
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header