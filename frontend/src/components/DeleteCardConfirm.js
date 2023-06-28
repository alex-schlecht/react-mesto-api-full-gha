import PopupWithForm from "./PopupWithForm";

const DeleteCardConfirm = ({
  card,
  isPopupOpen,
  onCloseOverlay,
  onConfirm,
  onClose
}) => {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirm(card);
  }

  return (
    <PopupWithForm 
      title="Вы уверены?"
      textOnButton="Да"
      name="submitConfirm"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
    />    
  )
}

export default DeleteCardConfirm;