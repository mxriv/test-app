import React, { useState } from "react";
import "./Button.css";

const Button = ({ className, label, onclick }) => {
  return (
    <div className={`button`} onClick={onclick}>
      <span className="button__label">{label}</span>
    </div>
  );
};

export default Button;
