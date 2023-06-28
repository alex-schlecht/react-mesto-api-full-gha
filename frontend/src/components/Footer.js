import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__description">© {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
};

export default Footer;