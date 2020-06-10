import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useFetch, useStateWithLocalStorage } from "./Components/helpers";
import dictionary from "./dictionary";
import HomePage from "./Components/Homepage/Homepage";
import QuestionPage from "./Components/QuestionPage/QuestionPage";
import ResultsPage from "./Components/ResultsPage/ResultsPage";
import "./App.css";

const App = () => {
  const getQuizList = dictionary.requests.getQuizList;
  const quizList = useFetch(getQuizList);

  const [userName, setUserName] = useStateWithLocalStorage("storedUserName");
  const [quizID, setQuizID] = useStateWithLocalStorage("storedQuizID");

  let theList = [];
  let url = "";

  let results = {
    correct: 0,
    total: 0,
  };

  const getUserName = (value) => {
    setUserName(value);
  };

  const getQuizID = (value) => {
    setQuizID(value);
  };

  const getUserAnswers = (value, questionsNumber) => {
    theList.length <= questionsNumber && theList.push(`answers[]=${value}`);
    updateURL(theList, questionsNumber);
  };

  const updateURL = (list, questionsNumber) => {
    let data = theList.length <= questionsNumber && theList.join("&");
    url = `https://printful.com/test-quiz.php?action=submit&quizId=${quizID}&${data}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { correct, total } = data;
        results = {
          correct: correct,
          total: total,
        };
      });
  };

  return (
    <div className="App">
      <Switch>
        <Route
          path="/homepage"
          render={() => (
            <HomePage
              userName={userName}
              quizList={quizList}
              onUserInput={getUserName}
              getQuizID={getQuizID}
            />
          )}
        />{" "}
        <Route exact path="/" render={() => <Redirect to="/homepage" />} />
        <Route
          path="/questions"
          render={() => (
            <QuestionPage
              quizID={quizID}
              getAnswers={getUserAnswers}
            />
          )}
        />
        <Route
          path="/results"
          render={() => (
            <ResultsPage userName={userName} results={results} />
          )}
        />{" "}
      </Switch>
    </div>
  );
};

export default App;
