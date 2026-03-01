import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/layout/userLayout'
import HomePage from './pages/HomePage'
import Faqs from './pages/Faqs'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Lenis from 'lenis'
import ProductLayout from './components/layout/ProductLayout'
import DetailProduct from './components/products/DetailProduct'

// Smooth Scroll
// @ts-ignore
const lenis = new Lenis({
  autoRaf: true,
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path='faqs' element={<Faqs />} />
          <Route path='about-us' element={<AboutUs />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path="products/:id" element={<ProductLayout />} />
          <Route path="products/:id/details" element={<DetailProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App