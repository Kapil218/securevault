import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/securevault-logo-design-blockchain-based-778006610_clipdrop-background-removal 1.png";

function Navbar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark  "
        style={{ background: "#222831", opacity: "0.9" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              alt="Logo"
              src={logoImage}
              width="30"
              height="40"
              className="d-inline-block align-top"
            />
            SECUREVAULT
          </a>

          {/* Navbar toggle button for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* Your navigation buttons */}
              <li className="nav-item">
                <Link to="/" className="mx-1 btn btn-outline-info">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/article" className="mx-1 btn btn-info">
                  Services
                </Link>
              </li>
              {/*For  Future Implementataion  */}
              {/* <li className="nav-item">
                <Link to="/support" className="mx-1 btn btn-outline-info" data-mdb-ripple-color="dark">
                  Support
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/share" className="mx-1 btn btn-info" data-mdb-ripple-color="dark">
                  Share
                </Link>
              </li>
              {/*For  Future Implementataion  */}
              {/* <li className="nav-item">
                <Link to="/sign" className="mx-1 btn btn-info" data-mdb-ripple-color="dark">
                  Sign
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
