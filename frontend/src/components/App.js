import React, {useEffect, useState} from "react";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import Api from "../utils/Api";
import avatar from '../images/profile-avatar.png';
import { CurrentUserContext } from "../contexts/CurrentuserContext";
import { CardsContext } from "../contexts/CardsContext";
import DeleteCardConfirm from './DeleteCardConfirm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddMestoPopup from './AddMestoPopup';
import { Route, Routes, useNavigate, useBeforeUnload } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import loginErrorImage from '../images/login-error.svg';
import loginSuccessImage from '../images/login-success.svg';
import Register from './Register';
import { register, authorize, checkToken } from '../utils/Authorization';
import InfoTooltip from './InfoTooltip';

const App = () => {

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({isPopupOpen: false});
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddMestoOpen, setAddMestoOpen] = useState(false);
  const [isSubmitConfirmPopupOpen, setSubmitConfirmPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [tooltipImage, setTooltipImage] = useState('');
  const [tooltipText, setTooltipText] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка..',
    description: 'Загрузка..',
    avatar: avatar,
  });

  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getCards()])
      .then(([userInfo, card]) => {
        setCurrentUser(userInfo)
        setCards(card);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        checkToken(jwt)
          .then((res) => {
            if (res) {
              setUserEmail(res.data.email);
              setLoggedIn(true);
              navigate('/', { replace: true });
            }
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  const handleRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        setTooltipImage(loginSuccessImage);
        setTooltipText('Вы успешно зарегистрировались!');
        navigate('/sign-in', {replace: true});
        setIsTooltipPopupOpen(true);
      })
      .catch((res) => {
        setTooltipImage(loginErrorImage);
        setTooltipText(res);
        setIsTooltipPopupOpen(true);  
      }
  )}

  const handleLogin = (email, password) => {
    authorize(email, password) 
      .then ((data) => {
        if(data.token) {
          setUserEmail(email);
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((res) => {
        setTooltipImage(loginErrorImage);
        setTooltipText(res);
        setIsTooltipPopupOpen(true);
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }

  function handleEditAvatarOpen () {
    setEditAvatarOpen(!isEditAvatarOpen);
  }

  function handleEditProfileOpen () {
    setEditProfileOpen(!isEditProfileOpen);
  }

  function handleAddMestoOpen () {
    setAddMestoOpen(!isAddMestoOpen);
  }

  function handleSubmitConfirmPopupOpen (card) {
    setSelectedCard({isPopupOpen: false, ...card})
    setSubmitConfirmPopupOpen(!isSubmitConfirmPopupOpen);
  }

  function handleCardClick (card) {
    setSelectedCard({ isPopupOpen: true, ...card});
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    const likePressed = isLiked ? Api.deleteLike(card._id) : Api.putLike(card._id);
    likePressed
      .then((gonnaBeLiked) => {
        setCards((state) => state.map((item) => (card._id === item._id ? gonnaBeLiked : item)))
      })
      .catch((error) => console.log(error))
  }

  function handleCardDelete (card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => card._id !== item._id))
        closeAllPopups()
      })
      .catch((error) => console.log(error))
  }

  function handleUpdateUser (name, about) {
    Api.patchUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((error) => console.log(error))
  }
  function handleUpdateAvatar (avatar) {
    Api.patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((error) => console.log(error))
  }

  function handleAddMesto (name, link) {
    Api.postCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
  }

  function closeAllPopups () {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddMestoOpen(false);
    setSubmitConfirmPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({ isPopupOpen: false });
  }

  function onCloseOverlay (event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header 
            onLogOut={handleLogout}
            userEmail={userEmail}
          />
          <Routes>
            <Route 
              path="sign-up"
              element={
                <Register 
                  onRegister={handleRegister}
                  loggedIn={loggedIn}
                />
              }
              loggedIn={loggedIn}
            />
            <Route 
              path="sign-in"
              element={
                <Login
                  onRegister={handleRegister}
                  loggedIn={loggedIn}
                  onLogin={handleLogin}
                />
              }
              loggedIn={loggedIn}
            />
            <Route
              path="*"
              element={
                <ProtectedRoute
                  onEditAvatar={handleEditAvatarOpen}
                  onEditProfile={handleEditProfileOpen}
                  onAddMesto={handleAddMestoOpen}
                  onConfirmPopup={handleSubmitConfirmPopupOpen}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                  element={Main}
                />
              }
            />
          </Routes>
          <Footer />
          <InfoTooltip
            isPopupOpen={isTooltipPopupOpen}
            onCloseOverlay={onCloseOverlay}
            onClose={closeAllPopups}
            image={tooltipImage}
            text={tooltipText}
          />
          <EditAvatarPopup
            isPopupOpen={isEditAvatarOpen}
            onCloseOverlay={onCloseOverlay}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isPopupOpen={isEditProfileOpen}
            onCloseOverlay={onCloseOverlay}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
          />
          <AddMestoPopup
            isPopupOpen={isAddMestoOpen}
            onCloseOverlay={onCloseOverlay}
            onAddMesto={handleAddMesto}
            onClose={closeAllPopups}
          />
          <DeleteCardConfirm
            card={selectedCard}
            isPopupOpen={isSubmitConfirmPopupOpen}
            onConfirm={handleCardDelete}
            onCloseOverlay={onCloseOverlay}
            onClose={closeAllPopups}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseOverlay={onCloseOverlay}
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App;