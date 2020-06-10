import React from "react";
import { Link } from "react-router-dom";
import Button from "../reusableElements/Button/Button";
import dictionary from "../../dictionary";
import "./ResultsPage.css";

function ResultsPage({ userName, results }) {
  const { correct, total } = results;
  const user = userName;
  return (
    <div className="results-page">
      <div className="results-section">
        <h2>Thanks, {user}!</h2>
        <p>
          {`You have responded correctly to ${correct} out of
            ${total} questions.`}
        </p>
        <Link className="link" to="/homepage">
          <Button label={dictionary.tryAgain} />
        </Link>
      </div>
    </div>
  );
}

export default ResultsPage;
