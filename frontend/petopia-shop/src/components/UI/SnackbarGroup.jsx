import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { SuccessContext } from "../../context/success-context";
import { ErrorContext } from "../../context/error-context";
import { WarningContext } from "../../context/warning-context";

const SnackbarGroup = () => {
  const { success, setSuccess } = useContext(SuccessContext);
  const { error, setError } = useContext(ErrorContext);
  const { warning, setWarning } = useContext(WarningContext);

  return (
    <>
      {/* Snackbar for warning */}
      {warning.map((warningText, index) => {
        return (
          <Snackbar
            key={index}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={warning.length > 0}
            autoHideDuration={6000}
            onClose={() => {
              setWarning((prev) => {
                return prev.filter((item) => item != warningText);
              });
            }}
          >
            <Alert
              onClose={() => {
                setWarning((prev) => {
                  return prev.filter((item) => item != warningText);
                });
              }}
              severity="warning"
              sx={{ width: "100%" }}
            >
              {warningText}
            </Alert>
          </Snackbar>
        );
      })}

      {/* Snackbar for error */}
      {error.map((errorText, index) => {
        return (
          <Snackbar
            key={index}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={error.length > 0}
            autoHideDuration={6000}
            onClose={() => {
              setError((prev) => {
                return prev.filter((item) => item != errorText);
              });
            }}
          >
            <Alert
              onClose={() => {
                setError((prev) => {
                  return prev.filter((item) => item != errorText);
                });
              }}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorText}
            </Alert>
          </Snackbar>
        );
      })}

      {/* Snackbar for success */}
      {success.map((successText, index) => {
        return (
          <Snackbar
            key={index}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={success.length > 0}
            autoHideDuration={6000}
            onClose={() => {
              setSuccess((prev) => {
                return prev.filter((item) => item != successText);
              });
            }}
          >
            <Alert
              onClose={() => {
                setSuccess((prev) => {
                  return prev.filter((item) => item != successText);
                });
              }}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successText}
            </Alert>
          </Snackbar>
        );
      })}
    </>
  );
};

export default SnackbarGroup;
