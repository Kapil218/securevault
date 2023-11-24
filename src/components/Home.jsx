import React from "react";
import { Link } from "react-router-dom";
import secureVaultLogo from "../assets/homeimage-removebg-preview.png";

function Home() {
  return (
    <div
      style={{ height: "70vh" }}
      className="d-flex justify-content-center align-items-center  container  "
    >
      <div className="row  rounded-5 justify-content-between" style={{ borderRadius: "20px" }}>
        <div className="col-8">
          <div className="card-body">
            <h2 className="card-title">EMPOWERING BLOCKCHAIN </h2>
            <h2 className="card-title">STORAGE </h2>
            <p className="card-text my-4">Storing the blockchain world, one block at a Time</p>
            <Link
              to="/article"
              className="mx-1 mt-5 btn btn-outline-warning"
              data-mdb-ripple-color="dark"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="col-4 text-white text-center">
          <img src={secureVaultLogo} alt="Logo" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Home;
