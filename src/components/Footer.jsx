import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container-wide">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">Nukitchens</h3>
            <p className="footer-tagline accent-text">Redefining Value</p>
            <p className="footer-desc">
              A family-owned kitchen design &amp; renovation company, creating
              exceptional spaces since 1956.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Navigate</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/portfolio" className="footer-link">Portfolio</Link>
            <Link to="/our-story" className="footer-link">Our Story</Link>
            <Link to="/showroom" className="footer-link">Showroom</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <span className="footer-link">Kitchen Design</span>
            <span className="footer-link">Cabinet Installation</span>
            <span className="footer-link">Complete Renovations</span>
            <span className="footer-link">Project Management</span>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Visit Our Showroom</h4>
            <p className="footer-address">132 Water Street<br />South Norwalk, CT 06854</p>
            <a href="tel:203-831-9000" className="footer-link">203-831-9000</a>
            <a href="mailto:info@nukitchens.com" className="footer-link">info@nukitchens.com</a>
            <div className="footer-hours">
              <span>Tue–Fri: 9am – 5pm</span>
              <span>Sat: 10am – 5pm</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nukitchens. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/nukitchens/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/NuKitchens/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.houzz.com/pro/nukitchens" target="_blank" rel="noopener noreferrer">Houzz</a>
            <a href="https://www.pinterest.com/nukitchensct/" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
