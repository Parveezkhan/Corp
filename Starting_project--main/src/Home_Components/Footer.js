import "../styles/Footer.css"; // Custom CSS for styling

import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>CorpAcademia </h1>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-socials">
          <a href="#" className="social-icon">FB</a>
          <a href="#" className="social-icon">TW</a>
          <a href="#" className="social-icon">IN</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Developed by CorpAcademia iTechnovations Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
