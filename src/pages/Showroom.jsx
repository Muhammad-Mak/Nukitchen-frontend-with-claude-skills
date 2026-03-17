import { useState } from 'react';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import './Showroom.css';

export default function Showroom() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useScrollAnimations();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="showroom-page">
      <section className="page-hero">
        <img src="/images/showroom-hero.jpg" alt="Nukitchens showroom" className="page-hero-img" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="hero-label">Come See Us</span>
          <h1 className="hero-title">Visit Our Showroom</h1>
        </div>
      </section>

      <section className="showroom-content">
        <div className="container-wide">
          <div className="showroom-grid">
            {/* Info */}
            <div className="showroom-info reveal-left">
              <p className="section-subtitle">Get In Touch</p>
              <h2 className="section-heading">We'd Love to Hear From You</h2>

              <div className="info-block">
                <h3 className="info-label">Address</h3>
                <p>132 Water Street<br />South Norwalk, CT 06854</p>
              </div>

              <div className="info-block">
                <h3 className="info-label">Phone</h3>
                <a href="tel:203-831-9000">203-831-9000</a>
              </div>

              <div className="info-block">
                <h3 className="info-label">Email</h3>
                <a href="mailto:info@nukitchens.com">info@nukitchens.com</a>
              </div>

              <div className="info-block">
                <h3 className="info-label">Showroom Hours</h3>
                <p>Tuesday – Friday: 9am – 5pm</p>
                <p>Saturday: 10am – 5pm</p>
                <p>Sunday – Monday: Closed</p>
              </div>

              <div className="showroom-map">
                <iframe
                  title="Nukitchens Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3014.123!2d-73.4178!3d41.0958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e81b2a4c0f4b0d%3A0x0!2s132+Water+St%2C+South+Norwalk%2C+CT+06854!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="showroom-form-wrap reveal-right">
              {submitted ? (
                <div className="form-success">
                  <h3>Thank You</h3>
                  <p>Your message has been received. A member of our team will be in touch shortly.</p>
                </div>
              ) : (
                <form className="showroom-form" onSubmit={handleSubmit}>
                  <h3 className="form-heading">Send Us a Message</h3>

                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="(203) 555-0000" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message
                      <span className="char-count">{form.message.length}/500</span>
                    </label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows="6" placeholder="Tell us about your project..." />
                  </div>

                  <button type="submit" className="btn btn-primary form-submit">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
