const ImagePopup = ({card, onClose, onCloseOverlay}) => {
  const {link, name} = card;
  
  return (
    <div className={`popup popup_surround ${card.isPopupOpen && 'popup_opened'}`} onClick={onCloseOverlay} id="full-size-image-popup">
      <figure className="popup__full-size-image">
        <button className="popup__close" onClick={onClose} type="button"/>
        <img className="popup__image" src={link} alt={name}/>
        <figcaption className="popup__image-name">{name}</figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;