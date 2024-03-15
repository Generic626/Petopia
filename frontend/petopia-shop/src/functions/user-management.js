const getUser = () => {
  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");

  // if current user is admin
  if (role == "admin") {
    return { id, username, email, token, role };
  }
  // if current user is customer
  else {
    const contact = sessionStorage.getItem("contact");
    const address = sessionStorage.getItem("address");

    return { id, username, email, contact, address, token, role };
  }
};

const setUser = (id, username, email, contact, address, token, role) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("contact", contact);
  sessionStorage.setItem("address", address);
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("role", role);
};

const setAdmin = (id, username, email, token, role) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("role", role);
};

const signOutUser = () => {
  sessionStorage.clear();
  window.location.href = "/";
  // window.location.reload();
};

const updateUser = (email, contact, address) => {
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("contact", contact);
  sessionStorage.setItem("address", address);
};

export { getUser, setUser, setAdmin, signOutUser, updateUser };
