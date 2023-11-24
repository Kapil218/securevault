import "vite/modulepreload-polyfill";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Article from "./components/Article";
// import Support from "./components/Support";
import Share from "./components/Share";
// import Form from "./components/FormComponent";
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
          {/* <Route path="/support" element={<Support />} /> */}
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
          {/* <Route path="/sign" element={<Form />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
