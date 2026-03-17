import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimations, useParallaxImages } from '../hooks/useScrollAnimations';
import './Home.css';

/* ---- Data ---- */
const heroSlides = [
  { layout: 'single', images: ['/images/hero-1.jpg'] },
  { layout: 'split',  images: ['/images/hero-2.jpg', '/images/hero-3.jpg', '/images/hero-4.jpg'] },
  { layout: 'trio',   images: ['/images/hero-5.jpg', '/images/hero-6.jpg', '/images/hero-7.jpg'] },
];

const services = [
  { title: 'Kitchen Design', desc: 'Collaborative consultations that transform your vision into a detailed plan, blending aesthetics with functionality.' },
  { title: 'Complete Renovations', desc: 'Full-service kitchen renovations from demolition to final walkthrough — one team, one seamless experience.' },
  { title: 'Cabinet Installation', desc: 'Expert installation and updates using premium cabinetry from leading manufacturers, tailored to your space.' },
];

const featured = [
  { name: 'Poggenpohl on the Water', img: '/images/project-1.jpg', cat: 'Modern' },
  { name: "Let's Gather Family Kitchen", img: '/images/project-2.jpg', cat: 'Traditional' },
  { name: 'English Oak', img: '/images/project-3.jpg', cat: 'Traditional' },
  { name: 'Black & White & Brass', img: '/images/project-4.jpg', cat: 'Modern' },
  { name: 'Elegant Rowayton Home', img: '/images/project-5.jpg', cat: 'Transitional' },
  { name: 'Dream Cape Kitchen', img: '/images/project-6.jpg', cat: 'Traditional' },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const prevSlide = useRef(0);
  const timerRef = useRef(null);

  useScrollAnimations();
  useParallaxImages();

  /* ---------- Hero slideshow ---------- */
  const advance = useCallback(() => {
    setActiveSlide((prev) => {
      prevSlide.current = prev;
      return (prev + 1) % heroSlides.length;
    });
  }, []);

  /* Auto-rotate every 5s */
  useEffect(() => {
    timerRef.current = setInterval(advance, 5000);
    return () => clearInterval(timerRef.current);
  }, [advance]);

  const goTo = (idx) => {
    if (idx === activeSlide) return;
    clearInterval(timerRef.current);
    prevSlide.current = activeSlide;
    setActiveSlide(idx);
    timerRef.current = setInterval(advance, 5000);
  };

  return (
    <main className="home">
      {/* ===== 1. HERO ===== */}
      <section className="hero">
        <div className="hero-slideshow">
          {heroSlides.map((slide, idx) => {
            const isActive = idx === activeSlide;
            return (
              <div
                key={idx}
                className={`hero-layout hero-layout--${slide.layout} ${isActive ? 'is-active' : 'is-hidden'}`}
              >
                {slide.images.map((src, i) => (
                  <div key={i} className="hero-cell">
                    <img
                      src={src}
                      alt={`Nukitchens showcase ${i + 1}`}
                      className="hero-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-label">Family-Owned Since 1956</span>
          <h1 className="hero-title">Exceptional Kitchens,<br />Crafted for Life</h1>
          <p className="hero-subtitle accent-text">Redefining Value in Every Detail</p>
          <Link to="/portfolio" className="btn btn-outline-light hero-cta">
            View Our Work
          </Link>
        </div>

        <div className="hero-dots">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="hero-scroll-indicator">
          <span />
        </div>
      </section>

      {/* ===== 2. DUO ===== */}
      <section className="section-duo">
        <div className="container-wide">
          <div className="duo-grid">
            <div className="duo-item reveal-left">
              <div className="duo-img-wrap">
                <img src="/images/duo-1.jpg" alt="Modern kitchen design" loading="lazy" />
              </div>
              <p className="duo-caption accent-text">Modern Sophistication</p>
            </div>
            <div className="duo-item reveal-right">
              <div className="duo-img-wrap">
                <img src="/images/duo-2.jpg" alt="Classic kitchen design" loading="lazy" />
              </div>
              <p className="duo-caption accent-text">Timeless Elegance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. INTRO TEXT ===== */}
      <section className="section-intro reveal">
        <div className="container">
          <p className="section-subtitle">Our Philosophy</p>
          <h2 className="section-heading">A Legacy of Craftsmanship</h2>
          <p className="intro-text">
            Nukitchens is a family-owned kitchen design and renovation company rooted in a
            tradition of exceptional craftsmanship. Since our founding in 1956, we've
            transformed hundreds of homes across Connecticut with designs that balance beauty,
            functionality, and lasting value. Every project begins with listening — and ends
            with a space that feels unmistakably yours.
          </p>
          <Link to="/our-story" className="btn btn-outline">Read Our Story</Link>
        </div>
      </section>

      {/* ===== 4. FULL-BLEED PARALLAX ===== */}
      <section className="parallax-container parallax-full">
        <img src="/images/parallax-1.jpg" alt="Kitchen panorama" className="parallax-img" loading="lazy" />
      </section>

      {/* ===== 5. TRIO ===== */}
      <section className="section-trio">
        <div className="container-wide">
          <div className="trio-grid" data-animate>
            <div className="trio-item">
              <div className="trio-img-wrap">
                <img src="/images/trio-1.jpg" alt="Custom cabinetry" loading="lazy" />
              </div>
              <p className="trio-caption">Custom Cabinetry</p>
            </div>
            <div className="trio-item">
              <div className="trio-img-wrap">
                <img src="/images/trio-2.jpg" alt="Stone countertops" loading="lazy" />
              </div>
              <p className="trio-caption">Stone &amp; Surface</p>
            </div>
            <div className="trio-item">
              <div className="trio-img-wrap">
                <img src="/images/trio-3.jpg" alt="Appliance integration" loading="lazy" />
              </div>
              <p className="trio-caption">Appliance Integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. SERVICES ===== */}
      <section className="section-services">
        <div className="container">
          <p className="section-subtitle text-center">What We Do</p>
          <h2 className="section-heading text-center">Our Services</h2>
          <div className="services-grid" data-animate>
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <span className="service-icon">&#10022;</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. FEATURED WORK ===== */}
      <section className="section-featured">
        <div className="container-wide">
          <p className="section-subtitle">Selected Projects</p>
          <h2 className="section-heading">Featured Work</h2>
          <div className="featured-grid" data-animate>
            {featured.map((p) => (
              <div key={p.name} className="featured-item">
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="featured-overlay">
                  <span className="featured-cat accent-text">{p.cat}</span>
                  <h3 className="featured-name">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
            <Link to="/portfolio" className="btn btn-outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ===== 8. TRUST STRIP ===== */}
      <section className="section-trust reveal">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-label">Family Owned</span>
              <span className="trust-detail">Since 1956</span>
            </div>
            <div className="trust-item">
              <span className="trust-label">Houzz</span>
              <span className="trust-detail">Best of Service</span>
            </div>
            <div className="trust-item">
              <span className="trust-label">Poggenpohl</span>
              <span className="trust-detail">Authorized Dealer</span>
            </div>
            <div className="trust-item">
              <span className="trust-label">Full Service</span>
              <span className="trust-detail">One-Stop Resource</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CTA ===== */}
      <section className="section-cta">
        <div className="cta-bg">
          <img src="/images/cta-bg.jpg" alt="" className="cta-bg-img" />
        </div>
        <div className="cta-overlay" />
        <div className="cta-content reveal">
          <p className="cta-label accent-text">Begin Your Journey</p>
          <h2 className="cta-heading">Let&rsquo;s Create Something Beautiful</h2>
          <Link to="/showroom" className="btn btn-outline-light">Visit Our Showroom</Link>
        </div>
      </section>

      {/* ===== 10. STATS ===== */}
      <section className="section-stats reveal">
        <div className="container">
          <div className="stats-grid" data-animate>
            <div className="stat-item">
              <span className="stat-number">65+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Kitchens Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
