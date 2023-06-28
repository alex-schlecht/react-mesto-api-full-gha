import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import useValidation from "./useValidation";

const AddMestoPopup = ({
  isPopupOpen,
  onAddMesto,
  onCloseOverlay,
  onClose
}) => {
  const [inputValid, setInputValid] = useState(false);
  const error = `popup__error ${!inputValid ? 'popup__error_visible' : ''}`;
  const name = useValidation();
  const imageLink = useValidation();


  useEffect(() => {
    if(!isPopupOpen) return;
    return () => {
      name.setValue('');
      name.setInputValid(false);
      name.setInputInvalid('');
      imageLink.setValue('');
      imageLink.setInputValid(false);
      imageLink.setInputInvalid('');
    }
  }, [isPopupOpen])

  useEffect(() => {
    if(name.inputValid && imageLink.inputValid) {
      setInputValid(true);
    } else {
      setInputValid(false)
    }
  }, [name.inputValid, imageLink.inputValid])

  function handleSubmit(event) {
    event.preventDefault();
    onAddMesto(name.value, imageLink.value);
  }
  return (
    <PopupWithForm
      title="Новое место"
      textOnButton="Сохранить"
      name="createCard"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      buttonDisable={!inputValid}
      onSubmit={handleSubmit}
    >
      <input
        required
        className="popup__input popup__input_card-name"
        name="card-name"
        id="card-name"
        placeholder="Название места"
        type="text"
        minLength="2"
        maxLength="30"
        onChange={name.handleInputChange}
        value={name.value}
      />
      <span className={error}>{name.inputInvalid}</span>
      <input
        required
        className="popup__input popup__input_card-link"
        name="image-link"
        id="image-link"
        placeholder="Ссылка на картинку"
        type="url"
        onChange={imageLink.handleInputChange}
        value={imageLink.value}
      />
      <span className={error}>{imageLink.inputInvalid}</span>
    </PopupWithForm>
  )
}

export default AddMestoPopup;