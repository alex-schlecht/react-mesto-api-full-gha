import React, { useEffect } from 'react';

const PopupWithForm = ({title, textOnButton, name, isPopupOpen, onSubmit, onClose, onCloseOverlay, children, buttonDisable }) => {

  useEffect(() => {
    if (!isPopupOpen) return;

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };

  }, [isPopupOpen]);

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
  
  return (
    <div className={`popup ${isPopupOpen ? 'popup_opened' : ''}`} id={`${name}-popup`} onClick={onCloseOverlay}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button"/>
        <h2 className="popup__title">{title}</h2>
        <form 
          className={`popup__form popup__form_${name}`}
          name={`edit${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className={`popup__button ${buttonDisable ? 'popup__button_disabled' : ''}`} type="submit" disabled={buttonDisable}>{textOnButton || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;