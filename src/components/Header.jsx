import logo from '../images/header/logo.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
    </header>
  );
}

export default Header;
