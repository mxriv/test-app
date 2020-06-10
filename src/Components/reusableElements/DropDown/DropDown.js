import React, { useState } from "react";
import "./DropDown.css";

const DropDown = ({ className, title, list, onItemClick, getQuizID }) => {
  const [listExpanded, setListExpanded] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");

  const renderQuizList = () => {
    if (list && list.length > 0) {
      return (
        
        <ul className={`drop-down__list`}>
          {list.map(({ id, title }) => (
            <li
              id={id}
              className="drop-down__item"
              key={id}
              onClick={() => {
                setQuiz(title, id)
                getQuizID(id);
                }}
            >
              {title}
            </li>
          ))}
        </ul>
      
      )
    }
  }

  const toggleDropDownList = () => {
    setListExpanded(!listExpanded);
  };

  const setQuiz = (title, id) => {
    setQuizId(id);
    setQuizTitle(title);
    setListExpanded(false);
  };

  return (
    <div className={`drop-down ${className}`}>
      <div>
        <div className="drop-down__title" onClick={toggleDropDownList}>
          {quizId ? `Selected quiz: ${quizTitle}` : title}
        </div>
      </div>
      {listExpanded && renderQuizList()}
    </div>
  );
};

export default DropDown;
