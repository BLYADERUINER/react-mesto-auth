import logo from '../images/header/logo.svg';
import {Link, useLocation} from 'react-router-dom';


function Header() {
  const location = useLocation();

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      {
      location.pathname === '/sign-in' ?
        <Link className='header__link' to="/sign-up">Регистрация</Link>
      : <Link className='header__link' to="/sign-in">Войти</Link>
      }
    </header>
  );
}

export default Header;
