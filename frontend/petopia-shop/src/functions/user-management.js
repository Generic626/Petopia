const getUser = () => {
  const role = sessionStorage.getItem("role");

  return { role };
};

const setUser = (role) => {
  sessionStorage.setItem("role", role);
};

const signOutUser = () => {
  sessionStorage.removeItem("role");
  window.location.reload();
};

const updateName = (role) => {};

const retrieveAuthHeader = () => {
  return "";
};

export { getUser, signOutUser, setUser, retrieveAuthHeader, updateName };
