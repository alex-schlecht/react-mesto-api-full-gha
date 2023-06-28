import React, {useState, useEffect} from 'react';
import useValidation from './useValidation';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = ({loggedIn, onRegister}) => {
  const [formValid, setFormValid] = useState(false);
  const email = useValidation();
  const password = useValidation();
  const inputError = `authentication-registration__input-error 
  ${!formValid ? 'authentication-registration__error' : ''}`;

  useEffect(() => {
    if(loggedIn) return;
    email.setValue('');
    password.setValue('');
    return() => {
      email.setValue('');
      email.setInputInvalid('');
      password.setValue('');
      password.setInputInvalid('');
    }
  }, [loggedIn])

  useEffect((event) => {
    if(loggedIn) return;
    if(email.inputValid && password.inputValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email.inputValid, password.inputValid, loggedIn])

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email.value, password.value);
  }

  return (
    <section className="authentication-registration page__authentication-registration">
      <h2
        className="authentication-registration__title"
      >
        Регистрация
      </h2>
      <form
        className="authentication-registration__form"
        onSubmit={handleSubmit}
        action="#"
      >
        <input
          className="authentication-registration__input"
          type="email"
          placeholder="Email"
          value={email.value}
          onChange={email.handleInputChange}
          required
        />
        <span
          className={inputError}
        >
          {email.inputInvalid}
        </span>
        <input
          className="authentication-registration__input"
          type="password"
          minLength="2"
          maxLength="40"
          placeholder="Пароль"
          value={password.value}
          onChange={password.handleInputChange}
          required
        />
        <span
          className={inputError}
        >
          {password.inputInvalid}
        </span>
        <button
          className={`authentication-registration__button 
          ${(!loggedIn && !formValid)
          ? 'authentication-registration__button_disabled' : ''}`}
          disabled={!formValid}
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <NavLink
        className="authentication-registration__link" to="/sign-in"
      >
        Уже зарегистрированы? Войти
      </NavLink>
    </section>
  )
}

export default Register;