import Api from '../../src/utils/Api';
import React from 'react';
import { useEffect } from 'react';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentuserContext';
import { CardsContext } from '../contexts/CardsContext';


const Main = ({
  onEditProfile,
  onAddMesto,
  onEditAvatar,
  onCardClick,
  onConfirmPopup,
  onCardLike,
  onCardDelete
}) => {

  const [ currentUser, setCurrentUser ] = useContext(CurrentUserContext);
  const [ cards, setCards ] = useContext(CardsContext);

  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getCards()])
      .then(([userInfo, card]) => {
        setCurrentUser(userInfo)
        setCards(card.cards);
      })
      .catch((error) => console.log(error));
  // eslint-disable-next-line    
  }, []);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка профиля"/>
          <button className="profile__edit-avatar" onClick={onEditAvatar} type="button" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit" onClick={onEditProfile} type="button" value="Редактировать"/>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-card" onClick={onAddMesto} type="button" value="Создать"/>
      </section>
      <section className="cards content__cards">
        <ul className="cards__items">
          {cards?.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onConfirmPopup={onConfirmPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />  
          ))}
        </ul>  
      </section>
    </main>
  );
};

export default Main;