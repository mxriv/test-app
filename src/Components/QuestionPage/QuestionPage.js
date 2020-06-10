import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../helpers";
import dictionary from "../../dictionary";
import Button from "../reusableElements/Button/Button";
import "./QuestionPage.css";

function QuestionPage({ quizID, getAnswers }) {
  const url = `https://printful.com/test-quiz.php?action=questions&quizId=${quizID}`;
  const data = useFetch(url);
  let questionLength;
  const [selected, isSelected] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [index, setIndex] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  let quizLength;

  const getQuestionID = () => {
    if (data) {
      quizLength = data.length;
      return data[index].id;
    }
  };

  let answersUrl = `https://printful.com/test-quiz.php?action=answers&quizId=${quizID}&questionId=${
    data && getQuestionID()
  }`;

  const answers = useFetch(answersUrl);

  const renderAnswers = () => {
    if (data && answers) {
      questionLength = data && 100 / data.length;
      if (answers && answers.length) {
        return answers.map(({ title, id }) => (
          <div
            className={`answer-option ${selected && "disabled-option"} ${userAnswer === title && 'user-guess'}`}
            key={id}
            onClick={() => {
              isSelected(true);
              setUserAnswer(title);
              getAnswers(id, quizLength);
            }}
          >
            <div>{title}</div>
          </div>
        ));
      }
    }
  };

  const nextQuestionRenderer = () => {
    if (data) {
      index < data.length - 1 && setIndex(index + 1);
      setProgressBarWidth(progressBarWidth + questionLength);
      setQuestionNumber(questionNumber + 1);
      isSelected(false);
      setUserAnswer("");
    }
  };

  const buttonRenderer = () => {
    if (data) {
      return questionNumber !== data.length;
    }
  };

  const button = buttonRenderer() ? (
    <div className="button" onClick={() => nextQuestionRenderer()}>
      <div>{"NEXT"}</div>
    </div>
  ) : (
    <Link className="link" to="/results">
      <Button label="Finish quiz" />
    </Link>
  );

  return (
    <div className="question-page">
      <div className="question-section">
        <div className="question">
          <h3>
            {dictionary.question} {questionNumber}
          </h3>
          {data && data[index].title}
          <div className="selected-option">{`Selected answer: ${userAnswer}`}</div>
        </div>

        <div className="answer-options">{renderAnswers()}</div>

        <div className="progress-section">
          <div className="progress-bar">
            <div
              className="progress-bar-indicator "
              style={{ width: `${progressBarWidth}%` }}
            />
          </div>
          {button}
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
