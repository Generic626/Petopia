import { useContext } from "react";
import { WarningContext } from "../context/warning-context";
import { ErrorContext } from "../context/error-context";
import { SuccessContext } from "../context/success-context";

function useSnackbar() {
  const { success, setSuccess } = useContext(SuccessContext);
  const { error, setError } = useContext(ErrorContext);
  const { warning, setWarning } = useContext(WarningContext);

  return { success, setSuccess, error, setError, warning, setWarning };
}

export default useSnackbar;
