function addToCart(product) {
  let cart = readFromCart();

  const existingIndex = cart.findIndex(
    (item) => item.productId == product.productId
  );

  //  check for exisiting item in cart
  if (existingIndex > -1) {
    cart[existingIndex].orderedQuantity += product.orderedQuantity;
  } else {
    cart = [...cart, product];
  }

  // store the cart back to session storage
  storeCart(cart);
}

function updateCart(product) {
  let cart = readFromCart();

  const existingIndex = cart.findIndex(
    (item) => item.productId == product.productId
  );

  //  check for exisiting item in cart
  if (existingIndex > -1) {
    cart[existingIndex].orderedQuantity = product.orderedQuantity;
  } else {
    cart = [...cart, product];
  }

  // store the cart back to session storage
  storeCart(cart);
}

function removeFromCart(product) {
  let cart = readFromCart();

  cart = cart.filter((item) => item.productId != product.productId);

  // store the cart back to session storage
  storeCart(cart);
}

function readFromCart() {
  let cartString = sessionStorage.getItem("cart");
  let cart = [];
  // if there is a cart string in session storage
  if (cartString != null) {
    cart = JSON.parse(cartString);
  }
  return cart;
}

function resetCart() {
  storeCart([]);
}

function storeCart(cart) {
  // store the cart back to session storage
  const newCartString = JSON.stringify(cart);
  sessionStorage.setItem("cart", newCartString);
}

export { addToCart, removeFromCart, updateCart, readFromCart, resetCart };
