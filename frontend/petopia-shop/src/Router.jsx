import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserCartPage from "./pages/UserCartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UploadPage from "./pages/UploadPage";
import OrderPage from "./pages/OrderPage";

import AdminLoginPage from "./pages/AdminLoginPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/product/:category" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/user-cart" element={<UserCartPage />} />
      <Route path="/product-detail" element={<ProductDetailPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
      <Route path="/test" element={<CheckoutPage />} />
    </Routes>
  );
};

export default Router;
