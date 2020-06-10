import React from "react";
import { Link } from "react-router-dom";
import dictionary from "../../dictionary";
import InputField from "../reusableElements/InputField/InputField";
import DropDown from "../reusableElements/DropDown/DropDown";
import Button from "../reusableElements/Button/Button";
import "./Homepage.css";

const HomePage = ({ onUserInput, getQuizID, userName, quizList }) => {
  return (
    <div className="homepage">
      <div className="homepage-section">
        <div className="form-header">
          <h2>{`${dictionary.header}!`}</h2>
        </div>
        <form className="homepage-form">
          <div className="form-element-group">
            <InputField
              type="text"
              value={userName}
              className="form-input"
              required
              placeholder="Please insert your name"
              onChange={(event) => onUserInput(event.target.value)}
            />
          </div>
          <div className="form-element-group select">
            <DropDown
              className={!userName ? "disabled" : null}
              title="Select quiz"
              list={quizList ? quizList : []}
              getQuizID={getQuizID}
            />
          </div>
          <div className="form-element-group">
            <br />
            <Link className="link" to="/questions">
              <Button label="START" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
