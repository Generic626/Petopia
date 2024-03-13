const getUser = () => {
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  const contact = sessionStorage.getItem("contact");
  const address = sessionStorage.getItem("address");
  const token = localStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  return { id, username, contact, address, token, role };
};

const getAdmin = () => {
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  const token = localStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  return { id, username, token, role };
};

const setUser = (id, username, contact, address, token, role) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("contact", contact);
  sessionStorage.setItem("address", address);
  localStorage.setItem("token", token);
  sessionStorage.setItem("role", role);
};

const setAdmin = (id, username, token, role) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);
  localStorage.setItem("token", token);
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
