import React from "react";

const InfoTooltip = ({isPopupOpen, onClose, onCloseOverlay, image, text}) => {
  return (
    <div
      className={`popup popup__tooltip ${isPopupOpen && 'popup_opened'}`}
      role="dialog"
      onClick={onCloseOverlay}
    >
      <div
        className="popup__container popup__container_type_tooltip"
        role="document"
      >
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-image"
          src={image}
          alt={text}
        />
        <span
          className="popup__tooltip-text"
        >
          {text}
        </span>
      </div>
    </div>
  )
}

export default InfoTooltip;