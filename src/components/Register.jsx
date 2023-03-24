import { Link } from "react-router-dom";

function Register () {
  return (
    <div className="auth-reg">
      <h2 className="auth-reg__title">Регистрация</h2>
      <form className="auth-reg__form" id="register">
        <input className="auth-reg__input" type="email" placeholder="Email" />
        <input className="auth-reg__input" type="password" placeholder="Пароль" />
        <button className="button auth-reg__button">Зарегистрироваться</button>
        <Link className="auth-reg__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )
}

export default Register;
