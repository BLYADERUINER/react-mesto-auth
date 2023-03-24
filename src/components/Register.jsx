function Register () {
  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form">
        <input className="register__input" type="email" />
        <input className="register__input" type="password" />
        <button className="register__button">Зарегистрироваться</button>
      </form>
      <a className="register__link" href=" ">Уже зарегистрированы? Войти</a>
    </div>
  )
}

export default Register;
