import React, { useState } from "react";
import { ErrorContext } from "./context/error-context";
import { SuccessContext } from "./context/success-context";
import { WarningContext } from "./context/warning-context";

const ContextProvider = (props) => {
  const [warning, setWarning] = useState([]);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  return (
    <WarningContext.Provider value={{ warning, setWarning }}>
      <ErrorContext.Provider value={{ error, setError }}>
        <SuccessContext.Provider value={{ success, setSuccess }}>
          {props.children}
        </SuccessContext.Provider>
      </ErrorContext.Provider>
    </WarningContext.Provider>
  );
};

export default ContextProvider;
