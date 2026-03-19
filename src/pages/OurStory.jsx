import { useParallaxImages } from '../hooks/useScrollAnimations';
import { Reveal, StaggerReveal, StaggerItem, PageTransition } from '../components/MotionElements';
import './OurStory.css';

const values = [
  { title: 'Honesty & Integrity', desc: 'We build our relationships on trust — with every client, every craftsman, every decision.' },
  { title: 'Collaborative Design', desc: 'Your kitchen is personal. We listen first, then design spaces that reflect your life.' },
  { title: 'Quality Craftsmanship', desc: 'From materials to installation, we hold every detail to the highest standard.' },
  { title: 'Family Values', desc: "Three generations of dedication. We treat your home the way we'd treat our own." },
];

export default function OurStory() {
  useParallaxImages();

  return (
    <PageTransition>
      <main className="story-page">
        {/* Hero */}
        <section className="page-hero">
          <img src="/images/story-hero.jpg" alt="Nukitchens workshop" className="page-hero-img" />
          <div className="page-hero-overlay" />
          <div className="page-hero-content">
            <span className="hero-label">Since 1956</span>
            <h1 className="hero-title">Our Story</h1>
          </div>
        </section>

        {/* Story 1 — text left, image right */}
        <section className="story-section">
          <div className="container-wide">
            <div className="story-row">
              <Reveal direction="left" className="story-text">
                <p className="section-subtitle">The Beginning</p>
                <h2 className="section-heading">A Legacy Built on Trust</h2>
                <p>
                  Our roots trace back to the early 1900s, when Philip Farran began renovating
                  brownstones in Brooklyn. He understood the value of hard work and the importance
                  of creating a home-life that families could cherish. He built his business on
                  trust, carefully selecting team members who shared his core values of honesty
                  and dedication.
                </p>
                <p>
                  That founding spirit — the belief that quality and integrity should never be
                  compromised — has been passed down through every generation of our family.
                </p>
              </Reveal>
              <Reveal direction="right" delay={0.15} className="story-image">
                <img src="/images/story-1.jpg" alt="Early days of the business" loading="lazy" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Parallax */}
        <section className="parallax-container story-parallax">
          <img src="/images/story-parallax.jpg" alt="Craftsmanship detail" className="parallax-img" loading="lazy" />
        </section>

        {/* Story 2 — image left, text right */}
        <section className="story-section">
          <div className="container-wide">
            <div className="story-row story-row--reverse">
              <Reveal direction="right" className="story-text">
                <p className="section-subtitle">The Next Chapter</p>
                <h2 className="section-heading">Family Craft, Modern Vision</h2>
                <p>
                  The tradition continued as Joseph Najmy's mother became a trained interior
                  designer and his father developed skills as a master furniture craftsman.
                  Together, they refined the art of creating beautiful, functional spaces.
                </p>
                <p>
                  Joseph established Nukitchens to carry that legacy forward — combining
                  old-world craftsmanship with modern design sensibility. Today, Nukitchens
                  stands as a one-stop resource for homeowners who demand the very best.
                </p>
              </Reveal>
              <Reveal direction="left" delay={0.15} className="story-image">
                <img src="/images/story-2.jpg" alt="Modern showroom" loading="lazy" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Founder Quote */}
        <Reveal>
          <section className="story-quote">
            <div className="container">
              <blockquote className="quote-block">
                <p className="quote-text accent-text">
                  "We've been a family business since 1956. We remain a family business. We
                  continue to embrace the values of honesty and integrity with our staff and
                  customers alike."
                </p>
                <cite className="quote-author">— Joseph Najmy, Founder</cite>
              </blockquote>
            </div>
          </section>
        </Reveal>

        {/* Values */}
        <section className="story-values">
          <div className="container">
            <Reveal>
              <p className="section-subtitle text-center">What Guides Us</p>
              <h2 className="section-heading text-center">Our Values</h2>
            </Reveal>
            <StaggerReveal className="values-grid">
              {values.map((v) => (
                <StaggerItem key={v.title}>
                  <div className="value-card">
                    <h3 className="value-title">{v.title}</h3>
                    <p className="value-desc">{v.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Philosophy */}
        <Reveal>
          <section className="story-philosophy">
            <div className="container">
              <div className="philosophy-inner">
                <p className="section-subtitle">Our Approach</p>
                <h2 className="section-heading">One Team. One Vision.</h2>
                <p>
                  At Nukitchens, we've eliminated the need for multiple contractors. Our
                  full-service team handles everything — from initial concept and design to
                  cabinet installation, countertops, and the final finishing touches. This
                  seamless approach means fewer headaches, tighter timelines, and a result
                  that exceeds your expectations.
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
    </PageTransition>
  );
}
