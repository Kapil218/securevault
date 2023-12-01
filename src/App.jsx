import "vite/modulepreload-polyfill";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Article from "./components/Article";
import Share from "./components/Share";

function App() {
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null);
  return (
    <Router>
      <Navbar />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6rem",
          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/share"
            element={
              <Share
                contract={contract}
                setContract={setContract}
                address={address}
                setAddress={setAddress}
              />
            }
          />

          <Route
            path="/article"
            element={
              <Article
                contract={contract}
                setContract={setContract}
                address={address}
                setAddress={setAddress}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
