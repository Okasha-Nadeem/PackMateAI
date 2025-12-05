import React, { createContext, useContext, useState } from "react";

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState(null);

  const saveResults = (data) => {
    setResults(data);
  };

  return (
    <ResultsContext.Provider value={{ results, saveResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResults = () => useContext(ResultsContext);
