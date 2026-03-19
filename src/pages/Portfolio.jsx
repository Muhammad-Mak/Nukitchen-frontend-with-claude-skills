import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal, PageTransition } from '../components/MotionElements';
import Lightbox from '../components/Lightbox';
import './Portfolio.css';

const allProjects = [
  { name: 'Poggenpohl on the Water', image: '/images/portfolio-1.jpg', category: 'Modern' },
  { name: "Let's Gather Family Kitchen", image: '/images/portfolio-2.jpg', category: 'Traditional' },
  { name: 'English Oak', image: '/images/portfolio-3.jpg', category: 'Traditional' },
  { name: 'Black & White & Brass All Over', image: '/images/portfolio-4.jpg', category: 'Modern' },
  { name: 'Natural, Elegant Rowayton Home', image: '/images/portfolio-5.jpg', category: 'Transitional' },
  { name: 'Blue & White Family Kitchen', image: '/images/portfolio-6.jpg', category: 'Traditional' },
  { name: 'Dream Cape Kitchen', image: '/images/portfolio-7.jpg', category: 'Traditional' },
  { name: 'Modern All-Black Kitchen', image: '/images/portfolio-8.jpg', category: 'Modern' },
  { name: 'Serene Modern Kitchen', image: '/images/portfolio-9.jpg', category: 'Modern' },
  { name: 'Poggenpohl Design Studio', image: '/images/portfolio-10.jpg', category: 'Modern' },
  { name: 'Timeless White Kitchen', image: '/images/portfolio-11.jpg', category: 'Transitional' },
  { name: 'Brooklyn Brownstone-Inspired', image: '/images/portfolio-12.jpg', category: 'Traditional' },
  { name: 'Walnut & White Traditional', image: '/images/portfolio-13.jpg', category: 'Traditional' },
  { name: "Chef's Kitchen", image: '/images/portfolio-14.jpg', category: 'Modern' },
  { name: 'Industrial Black Kitchen', image: '/images/portfolio-15.jpg', category: 'Modern' },
  { name: 'White Brass and Marble', image: '/images/portfolio-16.jpg', category: 'Transitional' },
  { name: 'Walnut Contemporary Kitchen', image: '/images/portfolio-17.jpg', category: 'Modern' },
  { name: 'Bright and Cozy 1763 Kitchen', image: '/images/portfolio-18.jpg', category: 'Traditional' },
];

const categories = ['All', 'Modern', 'Traditional', 'Transitional'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visible = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter);

  const openLightbox = useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navLightbox = useCallback((idx) => setLightboxIndex(idx), []);

  return (
    <PageTransition>
      <main className="portfolio-page">
        <section className="page-hero">
          <img src="/images/portfolio-hero.jpg" alt="Nukitchens portfolio" className="page-hero-img" />
          <div className="page-hero-overlay" />
          <div className="page-hero-content">
            <span className="hero-label">Our Work</span>
            <h1 className="hero-title">Portfolio</h1>
          </div>
        </section>

        <section className="portfolio-content">
          <div className="container-wide">
            <Reveal>
              <div className="portfolio-filters">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </Reveal>

            <motion.div className="portfolio-grid" layout>
              <AnimatePresence mode="popLayout">
                {visible.map((p, idx) => (
                  <motion.div
                    key={p.name}
                    className="portfolio-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => openLightbox(idx)}
                  >
                    <div className="portfolio-card-img">
                      <img src={p.image} alt={p.name} loading="lazy" />
                      <div className="portfolio-card-overlay">
                        <span className="portfolio-card-cat accent-text">{p.category}</span>
                        <h3 className="portfolio-card-name">{p.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <Lightbox
          images={visible}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      </main>
    </PageTransition>
  );
}
