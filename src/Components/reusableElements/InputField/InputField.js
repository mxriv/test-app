import React from "react";
import "./InputField.css";

const InputField = ({
  label,
  type,
  className,
  placeholder,
  id,
  isRequred,
  value,
  onChange,
}) => {
  return (
    <div className={`input__element ${className}`}>
      {label && (
        <label className="input__label" for="input">
          {label}
        </label>
      )}
      <input
        className="input"
        type={type}
        id={id}
        required={isRequred}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
