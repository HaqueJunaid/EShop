import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from "./utils/ScrollToTop.tsx"; // Path to your helper file
import UserLayout from './components/layout/userLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import Faqs from './pages/Faqs.tsx'
import AboutUs from './pages/AboutUs.tsx'
import ContactUs from './pages/ContactUs.tsx'
import ProductLayout from './components/layout/ProductLayout.tsx'
import DetailProduct from './components/products/DetailProduct.tsx'
import CartPage from './pages/CartPage.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import OrderDetail from './components/profile/OrderDetail.tsx'
import WishListPage from './pages/WishListPage.tsx'
import NotFound from './pages/NotFound.tsx'
import React from 'react';
import Dashboard from './pages/Admin/Dashboard.tsx';
import Products from './pages/Admin/Products.tsx';
import Insights from './pages/Admin/Insights.tsx';
import Orders from './pages/Admin/Orders.tsx';
import Users from "./pages/Admin/Users.tsx"

// Admin Related Components
const AdminLayout = React.lazy(() => import('./components/layout/AdminLayout.tsx'));

// Future Use for conditionla import
// const Home = lazy(() => import("./pages/Home"));
// const Settings = lazy(() => import("./pages/Settings")); 

const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes >
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route element={<UserLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='wishlist' element={<WishListPage />} />
          <Route path='faqs' element={<Faqs />} />
          <Route path="profile" element={<Profile />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path="products/:id" element={<ProductLayout />} />
          <Route path="products/:id/details" element={<DetailProduct />} />
          <Route path="orders/:id" element={<OrderDetail />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/insights" element={<Insights />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App