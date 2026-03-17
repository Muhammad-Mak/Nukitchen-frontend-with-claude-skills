import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import OurStory from './pages/OurStory';
import Showroom from './pages/Showroom';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/showroom" element={<Showroom />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
