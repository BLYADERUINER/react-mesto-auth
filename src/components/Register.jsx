import { Link } from "react-router-dom";

function Register () {
  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <input className="register__input" type="email" placeholder="Email" />
        <input className="register__input" type="password" placeholder="Пароль" />
        <button className="register__button">Зарегистрироваться</button>
        <Link className="register__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}

export default Register;
