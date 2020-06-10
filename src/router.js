import React from "react";
import { Route, IndexRoute } from "react-router-dom";

import App from "./App";
import HomePage from "./Components/Homepage/Homepage";
import QuestionPage from "./Components/QuestionPage/QuestionPage";
import ResultsPage from "./Components/ResultsPage/ResultsPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/questionaire" component={QuestionPage} exact />
    <Route path="/results" component={ResultsPage} exact />
  </Route>
);
