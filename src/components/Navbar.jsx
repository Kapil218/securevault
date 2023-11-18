import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoImage from '../assets/securevault-logo-design-blockchain-based-778006610_clipdrop-background-removal 1.png';

function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-dark " style={{ padding: "0px" }}>
        <div className="container-fluid ml-0 mr-0">
          <a className="navbar-brand me-2" href="/">
            <img
              className="d-inline-block align-text-top"
              height="40"
              alt="Logo"
              loading="lazy"
              src={logoImage}
            />
          </a>
          <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="navbar-brand text-white">
                SECUREVAULT
              </Link>
            </li>
          </ul>
          <button
            className={`d-block d-md-none navbar-toggler ${expanded ? '' : 'collapsed'} bg-white`}
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={expanded}
            onClick={handleNavbarToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className='d-flex align-items-center justify-content-end' id="navbarNav">
            <div className={` collapse  navbar-collapse ${expanded ? 'show' : ''} `}>
              <Link to="/" className="mx-1 btn btn-primary">
                Home
              </Link>
              <Link to="/article" className="mx-1 btn btn-outline-secondary">
                Article
              </Link>
              <Link to="/support" className="mx-1 btn btn-outline-primary" data-mdb-ripple-color="dark">
                Support
              </Link>
              <Link to="/share" className="mx-1 btn btn-outline-warning" data-mdb-ripple-color="dark">
                Share
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
