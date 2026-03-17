import { useState, useEffect } from 'react';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
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
  const [visible, setVisible] = useState(allProjects);
  const [fading, setFading] = useState(false);

  useScrollAnimations();

  useEffect(() => {
    setFading(true);
    const t = setTimeout(() => {
      setVisible(
        activeFilter === 'All'
          ? allProjects
          : allProjects.filter((p) => p.category === activeFilter)
      );
      setFading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [activeFilter]);

  return (
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
          <div className="portfolio-filters reveal">
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

          <div className={`portfolio-grid ${fading ? 'fading' : ''}`}>
            {visible.map((p) => (
              <div key={p.name} className="portfolio-card">
                <div className="portfolio-card-img">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-card-cat accent-text">{p.category}</span>
                    <h3 className="portfolio-card-name">{p.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
