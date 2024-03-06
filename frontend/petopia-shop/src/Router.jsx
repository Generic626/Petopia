import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserCartPage from "./pages/UserCartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import UploadPage from "./pages/UploadPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/product/:category" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/User-Cart" element={<UserCartPage />} />
      <Route path="/ProductDetail" element={<ProductDetailPage />} />
      <Route path="/upload" element={<UploadPage />} />

      <Route path="/test" element={<CheckoutPage />} />
    </Routes>
  );
};

export default Router;
