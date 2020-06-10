import React, { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return data;
};

export const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

export const getQuizList = async () => {
  let data;
  const response = await fetch(
    "https://printful.com/test-quiz.php?action=quizzes"
  );
  const json = await response.json();
  data = json;
  return data;
};

export default useFetch;
