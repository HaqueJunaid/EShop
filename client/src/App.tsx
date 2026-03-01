import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLayout from './components/layout/userLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import Faqs from './pages/Faqs.tsx'
import AboutUs from './pages/AboutUs.tsx'
import ContactUs from './pages/ContactUs.tsx'
import Lenis from 'lenis'
import ProductLayout from './components/layout/ProductLayout.tsx'
import DetailProduct from './components/products/DetailProduct.tsx'

// Smooth Scroll
// @ts-ignore
const lenis = new Lenis({
  autoRaf: true,
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<HomePage />} />
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