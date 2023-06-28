import { useRef, useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";
import useValidation from "./useValidation";

const EditAvatarPopup = ({isPopupOpen, onUpdateAvatar, onClose, onCloseOverlay}) => {
  const [inputValid, setInputValid] = useState(false);
  const error = `popup__error ${!inputValid ? 'popup__error_visible' : ''}`;
  const avatar = useValidation();
  const avatarLink = useRef(null);

  useEffect(() => {
    if(!isPopupOpen) return
    return () => {
      avatar.setValue('');
      avatar.setInputValid(false);
      avatar.setInputInvalid('');
    }
  }, [isPopupOpen])

  useEffect(() => {
    if(avatar.inputValid) {
      setInputValid(true);
    } else {
      setInputValid(false)
    }
  }, [avatar.inputValid])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(avatarLink.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      textOnButton="Сохранить"
      name="editAvatar"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      buttonDisable={!inputValid}
      onSubmit={handleSubmit}
    >
      <input
        required
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_name_avatar-link"
        name="avatar-link"
        id="avatar-link"
        type="url"
        ref={avatarLink}
        onChange={avatar.handleInputChange}
        value={avatar.value}
      />
      <span className={error}>{avatar.inputInvalid}</span>    
    </PopupWithForm>  
  )
}

export default EditAvatarPopup;