import { useState } from "react";

function useValidation () {
  const [value, setValue] = useState('');
  const [inputValid, setInputValid] = useState(false);
  const [inputInvalid, setInputInvalid] = useState('');

  const handleInputChange = (event) => {
    setValue(event.target.value);
    if(!event.target.validity.valid) {
      setInputValid(false);
      setInputInvalid(event.target.validationMessage);
    } else {
      setInputValid(true);
      setInputInvalid('');
    }
  }

  return {
    value,
    setValue,
    inputValid,
    setInputValid,
    inputInvalid,
    setInputInvalid,
    handleInputChange
  }
}

export default useValidation;