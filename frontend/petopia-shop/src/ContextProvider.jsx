import React, { useState } from "react";
import { ErrorContext } from "./context/error-context";
import { SuccessContext } from "./context/success-context";

const ContextProvider = (props) => {
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <SuccessContext.Provider value={{ success, setSuccess }}>
        {props.children}
      </SuccessContext.Provider>
    </ErrorContext.Provider>
  );
};

export default ContextProvider;
