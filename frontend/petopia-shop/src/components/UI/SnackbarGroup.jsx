import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { SuccessContext } from "../../context/success-context";
import { ErrorContext } from "../../context/error-context";

const SnackbarGroup = () => {
  const { success, setSuccess } = useContext(SuccessContext);
  const { error, setError } = useContext(ErrorContext);

  return (
    <>
      {/* Snackbar for error */}
      {error.map((errorText) => {
        return (
          <Snackbar
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
      {success.map((successText) => {
        return (
          <Snackbar
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
