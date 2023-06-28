import React, {useEffect, useState} from "react";
import useValidation from "./useValidation";

const Login = ({loggedIn, onLogin}) => {
  const [formValid, setFormValid] = useState(false);
  const inputError = `authentication-registration__input-error ${!formValid ? 'authentication-registration__error' : ''}`;
  const email = useValidation();
  const password = useValidation();


  useEffect (() => {
    if(loggedIn) return;
    email.setValue('');
    password.setValue('');
    return () => {
      email.setValue('');
      email.setInputInvalid('');
      password.setValue('');
      password.setInputInvalid('');
    }
  }, [loggedIn]);

  useEffect((event) => {
    if (loggedIn) return;
    if (email.inputValid && password.inputValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email.inputValid, password.inputValid, loggedIn])
  

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email.value, password.value);
  }

  return(
    <section className="authentication-registration page__authentication-registration">
      <h2 className="authentication-registration__title">Вход</h2>
      <form 
        className="authentication-registration__form"
        onSubmit={handleSubmit}
        action="#"
      >
        <input
          className="authentication-registration__input"
          type="email"
          name="authentication-registration-email"
          id="authentication-registration-email"
          value={email.value}
          onChange={email.handleInputChange}
          placeholder="email@mail.com"
          required
        />
        <span className={inputError}>
          {email.inputInvalid}
        </span>
        <input
          className="authentication-registration__input"
          type="password"
          name="authentication-registration-password"
          id="authentication-registration-password"
          value={password.value}
          onChange={password.handleInputChange}
          placeholder="Пароль"
          required
        />
        <span className={inputError}>
          {password.inputInvalid}
        </span>
        <button
          className={`authentication-registration__button 
          ${(!loggedIn && !formValid) ? 
          'authentication-registration__button_disabled' : ''}`}
        >
          Войти
        </button>
      </form>
    </section>
  )
}

export default Login;