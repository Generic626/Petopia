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
import PrivateRoutes from "./utils/PrivateRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/product/:category" element={<ProductPage />} />
      <Route
        path="/product-detail/:productId"
        element={<ProductDetailPage />}
      />

      <Route element={<PrivateRoutes />}>
        <Route path="/user-cart" element={<UserCartPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
