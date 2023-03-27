import logo from '../images/header/logo.svg';
import {Link, useLocation} from 'react-router-dom';
import React from 'react';


function Header({userMail, onSignout}) {
  const location = useLocation();
  const [isToggleBurgerButton, setToggleBurgerButton] = React.useState(false);

  function handleToggleBurgerButton() {
    setToggleBurgerButton(!isToggleBurgerButton);
  }

  return (
    <header className={`header page__header ${isToggleBurgerButton ? 'header_opened' : ''}`}>
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      {location.pathname === '/' ?
      <>
        <button className='header__burger-button' onClick={handleToggleBurgerButton}>
          <span className='header__burger-span'></span>
          <span className='header__burger-span'></span>
          <span className='header__burger-span'></span>
        </button>
        <div className='header__container'>
          <span className='header__email'>{userMail}</span>
          <Link className='header__link' style={{color:'#A9A9A9'}} onClick={onSignout}>Выйти</Link>
        </div>
      </>
      : location.pathname === '/sign-in' ?
        <Link className='header__link' to="/sign-up">Регистрация</Link>
      : <Link className='header__link' to="/sign-in">Войти</Link>
      }
    </header>
  );
}

export default Header;
