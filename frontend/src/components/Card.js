import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentuserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete, onConfirmPopup}) => {
  const {name, link, likes} = card;
  const currentUser = useContext(CurrentUserContext);
  const isOwned = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((card) => card._id === currentUser._id);

  function handleCardClick () {
    onCardClick(card);
  }

  function handleCardDelete() {
    onConfirmPopup(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  return (
    <div className="cards__item">
      {isOwned && (
        <button 
          className="cards__delete"
          type="button"
          onClick={handleCardDelete}
        />
      )}
      <img className="cards__image" onClick={handleCardClick} src={link} alt={name}/>
      <div className="cards__bar">
        <h3 className="cards__name">{name}</h3>
        <div className="cards__like-container">
          <button 
            className={`cards__like ${isLiked && 'cards__like_active'}`} 
            type="button" 
            onClick={handleCardLike}
          />
          <span className="cards__like-amount">{likes.length}</span>
        </div>  
      </div>
    </div>
  );
};
export default Card;