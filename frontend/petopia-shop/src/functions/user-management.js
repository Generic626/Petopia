const getUser = () => {
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  const contact = sessionStorage.getItem("contact");
  const address = sessionStorage.getItem("address");
  const role = sessionStorage.getItem("role");

  return { id, username, contact, address, role };
};

const setUser = (id, username, contact, address, role) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("contact", contact);
  sessionStorage.setItem("address", address);
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
