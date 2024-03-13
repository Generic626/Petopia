const requestHeader = (contentType) => {
  return {
    ...contentType,
    Authorization:
      "Bearer " +
      (localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluXzEyMyIsIm5hbWVpZCI6ImI2YmFkZTgyLTdiZDctNDZiYS1iZTc4LTFlZThhOTMyM2VkMyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTcwOTgyNDE5NCwiZXhwIjoxNzQxMzYwMTk0LCJpYXQiOjE3MDk4MjQxOTQsImlzcyI6InBldG9waWEiLCJhdWQiOiJwZXRvcGlhIn0.Kob1n-Ecep-Y7xUPiv9bVZGhd2I5sB1_qx9UJq9ppa8"),
  };
};

export { requestHeader };
