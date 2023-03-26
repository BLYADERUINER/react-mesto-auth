function Login() {
  return (
    <div className="auth-reg">
      <h2 className="auth-reg__title">Вход</h2>
      <form className="auth-reg__form" id="login">
        <input className="auth-reg__input" type="email" placeholder="Email" />
        <input className="auth-reg__input" type="password" placeholder="Пароль" />
        <button className="auth-reg__button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
