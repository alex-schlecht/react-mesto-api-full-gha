import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const Menu = ({onLogOut, userEmail}) => {
  return (
    <>
      <Routes>
        <Route
          path="/sign-up"
          exact
          element={
            <Link 
              className='header__link' 
              to="/sign-in"
              replace={true}
            >
              Войти
            </Link>
          }
        />
        <Route
          exact
          path="/sign-in"
          element={
            <Link
              className='header__link'
              to="/sign-up"
              replace={true}
            >
              Регистрация
            </Link>  
          }
        />
        <Route
          exact
          path="/"
          element={
            <div>
              <span
                className='header__email'
              >
                {userEmail}
              </span>
              <button
                className='header__menu-button'
                onClick={onLogOut}
              >
                Выход
              </button>
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default Menu;