import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
    <div className='footer'>
      <div className='container'>
        <div className="footer__container">
          <div className="footer__contact">
            <b>Contact Information</b>
            <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
            <p>Telefon: <a href="tel:+998901234567">+998 90 123 45 67</a></p>
            <div className="footer__social">
              <Link to="#"><i className="fab fa-instagram"></i></Link>
              <Link to="#"><i className="fab fa-telegram"></i></Link>
              <Link to="#"><i className="fab fa-facebook"></i></Link>
            </div>
          </div>
          <div className="footer__links">
            <b>Main Pages</b>
            <Link to="/">Home</Link>
            <Link to="/favorite">Liked Products</Link>
            <Link to="/basket">Cart</Link>
            <Link to="/add">Add/Edit Product</Link>
          </div>

          <div className="footer__useful-links">
            <b>Useful Links</b>
            <Link to="/faq">F.A.Q</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <p className="footer__copyright">© 2025, Your Project. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer