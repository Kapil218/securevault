import React from 'react';
import { Link } from 'react-router-dom';
import secureVaultLogo from '../assets/homeimage-removebg-preview.png';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 container p-5 ">
      <div className="row no-gutters  rounded-5 justify-content-between  p-5" style={{ borderRadius: "20px" }}>
        <div className="col-7">
          <div className="card-body">
            <h2 className="card-title">EMPOWERING LEGAL </h2>
            <h2 className="card-title">SECURITY </h2>
            <p className="card-text my-4">
              Securing the legal world, one block at a Time
            </p>
            <Link to="/" className="mx-1 mt-5 btn btn-outline-warning" data-mdb-ripple-color="dark">
              Get Started
            </Link>
          </div>
        </div>
        <div className="col-4 text-white text-center" >
          <img
            src={secureVaultLogo}
            alt="Logo"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
