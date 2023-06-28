import { useState, useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm";
import useValidation from "./useValidation";
import { CurrentUserContext } from "../contexts/CurrentuserContext";

const EditProfilePopup = ({isPopupOpen, onUpdateUser, onClose, onCloseOverlay}) => {
  const [inputValid, setInputValid] = useState(false);
  const error = `popup__error ${!inputValid ? 'popup__error_visible' : ''}`;
  const currentUser = useContext(CurrentUserContext);
  const name = useValidation();
  const description = useValidation();

  useEffect(() => {
    if(!isPopupOpen) return;
    name.setValue(currentUser.name);
    name.setInputValid(true);
    description.setValue(currentUser.about);
    description.setInputValid(true);
    return () => {
      name.setValue('');
      name.setInputInvalid('');
      description.setValue('');
      description.setInputInvalid('');
    }

  }, [isPopupOpen])

  useEffect(() => {
    if(name.inputValid && description.inputValid) {
      setInputValid(true);
    } else {
      setInputValid(false)
    }
  }, [name.inputValid, description.inputValid])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(name.value, description.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      textOnButton="Сохранить"
      name="editProfile"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      buttonDisable={!inputValid}
      onSubmit={handleSubmit}

    >
      <input
        required
        className="popup__input popup__input_name"
        name="name"
        id="name"
        type="text"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={name.value}
        onChange={name.handleInputChange}
      />
      <span className={error}>{name.inputInvalid}</span>
      <input
        required
        className="popup__input popup__input_description"
        name="description"
        id="description"
        type="text"
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        value={description.value}
        onChange={description.handleInputChange}
      />
      <span className={error}>{description.inputInvalid}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;