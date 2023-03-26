import logo from '../images/header/logo.svg';
import {Link, useLocation} from 'react-router-dom';


function Header({userMail, onSignout}) {
  const location = useLocation();

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      {location.pathname === '/' ?
        <div>
          <span className='header__email'>{userMail}</span>
          <Link className='header__link' style={{color:'#A9A9A9'}} onClick={onSignout}>Выйти</Link>
        </div>
      : location.pathname === '/sign-in' ?
        <Link className='header__link' to="/sign-up">Регистрация</Link>
      : <Link className='header__link' to="/sign-in">Войти</Link>
      }
    </header>
  );
}

export default Header;
