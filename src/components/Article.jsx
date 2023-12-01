/* eslint-disable react/prop-types */
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import axios from "axios";

import React from "react";
import "./article.css";
import { useState, useEffect } from "react";

const Support = ({ contract, setContract, address, setAddress }) => {
  const [imagesAvl, setImageAvl] = useState(false);
  const [con, setCon] = useState(false); //connection
  const [wallet, setWallet] = useState(null);
  const [loading, loadVal] = useState(false);
  const [loading2, loadVal2] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tezos, setTezos] = useState(new TezosToolkit("https://ghostnet.smartpy.io"));

  const [file, setFile] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [images, setImages] = useState([]);
  const contractAddress = "KT1V9xzYrd2mF5vVtXWUi4An1GVkcTfyMo4T";
  const pinataJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYjRiY2QzMy04MTNhLTQ1ZjEtOGMxZS1iNjIzMmRiM2NkODEiLCJlbWFpbCI6ImFuc2hrYXVzaGlrOTUxOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNGFlOWY4Mjk4ZWQzYWJlMzJiMGIiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZDNhMmUyOTJlNTlhZWM5OWU3YThkMTQ3NWNkNmE0OGZlMmU3Y2ExYzg5ZTU1MGY5NDQwNjkxNzNiNWY0YmQ0IiwiaWF0IjoxNzAwNTcyMzEzfQ.MfCg7GLtD08Pba2QZYYZJUTh_BYPMBKbG5PQwvFK38E"; // Replace with your actual Pinata JWT token
  //   setting up wallet credentials
  useEffect(() => {
    const options = {
      name: "SECUREVAULT",
      preferredNetwork: NetworkType.GHOSTNET,
      disableDefaultEvents: false,
    };
    console.log("Setting up Wallet..");
    const wallet = new BeaconWallet(options);
    tezos.setWalletProvider(wallet);
    setWallet(wallet);
  }, []);
  // to Setup Connection
  const setupConnection = async (e) => {
    e.preventDefault();
    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.smartpy.io",
        },
      });
      // gets user's address
      let userAddress = await wallet.getPKH();
      setAddress(userAddress);
      let cc = await tezos.wallet.at(contractAddress);
      setContract(cc);
      setCon(true);
    } catch (error) {
      console.log(error);
    }
  };
  // pinning file to IPFS
  const pinFileToIPFS = async () => {
    try {
      let data = new FormData();
      data.append("file", file);
      data.append("pinataOptions", '{"cidVersion": 0}');

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        headers: {
          Authorization: `Bearer ${pinataJwt}`,
        },
      });

      const ImageUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      loadVal(false);

      return ImageUrl;
    } catch (error) {
      alert("Unable to upload file to Pinata");

      console.log(error);
    }
  };
  // copy address to clipboard
  const copyAddress = (e) => {
    navigator.clipboard.writeText(address);

    alert("Id copied ready to paste ");
  };

  // Uploading File
  const uploadFile = async (e) => {
    loadVal(true);
    e.preventDefault();
    if (file) {
      console.log("got file", file);
      try {
        const ImgURL = await pinFileToIPFS();
        const op = await contract.methods.add(ImgURL, address).send();
        await op.confirmation();
        alert("Uploaded successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a file!");
      loadVal(false);
    }
  };
  // handling fetching  of  images
  const handleGetData = async (e) => {
    try {
      setImages([]);
      setImageAvl(true);
      if (userAddress) {
        loadVal2(true);
        e.preventDefault();

        const storage = await contract.storage();
        const imgs = storage.value.valueMap.get('"' + userAddress + '"');

        if (imgs) setImages(imgs);

        const accessibleaddress = storage.accessList.valueMap.get('"' + userAddress + '"');

        if (accessibleaddress) {
          console.log("got other addressses ", accessibleaddress);
          accessibleaddress.map((ad) => {
            const newImages = storage.value.valueMap.get('"' + ad + '"');
            console.log(newImages);
            if (newImages) setImages((ig) => [...ig, ...newImages]);
            console.log(images);
          });
        }

        setImageAvl(false);
        loadVal2(false);
      }
    } catch (er) {
      console.log(er);
    }
  };
  // handling wallet addresss input field
  const getInputAddress = async (e) => {
    e.preventDefault();
    setUserAddress(e.target.value);
  };
  // open images in new Tab
  const handleClick = (i) => {
    window.open(i, "_blank");
  };
  // entire jsx
  return (
    <div className="container" style={{ overflow: "auto" }}>
      {/* when wallet is  connected   */}
      {con && (
        <>
          <p className="d-flex justify-content-center flex-row-reverse">
            <button
              type="file"
              style={{ fontSize: "20px", display: "flex", alignItems: "center" }}
              className={`pl-5 pr-5  ml-5 btn btn-secondary ${loading ? "disabled" : ""} `}
              disabled={loading}
              onClick={uploadFile}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-s mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {loading ? "Loading..." : "Upload"}
            </button>
            <input
              type="file"
              className="btn btn-outline-info"
              style={{ width: "130px" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </p>
          <h5 className="text-center mb-3 mt-5">YOUR ACCOUNT</h5>
          <p className="text-center ">
            <button className="btn btn-secondary" onClick={copyAddress}>
              Copy Your wallet Address
            </button>
          </p>
        </>
      )}
      {/* when wallet is  connected   */}

      {/* when wallet is  not  connected   */}
      {!con && (
        <div>
          <div className="d-flex justify-content-center flex-row-reverse ">
            <button
              type="button"
              style={{ borderRadius: "16px" }}
              className="btn btn-primary text-light font-weight-bold"
              onClick={setupConnection}
            >
              Connect to Wallet
            </button>
          </div>
        </div>
      )}
      {/* when wallet is  not  connected   */}

      <div className="row justify-content-center " style={{ margin: "3rem 0" }}>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Wallet address "
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={getInputAddress}
            />
            <div className="input-group-append">
              <button
                disabled={loading2}
                className=" btn btn-info"
                type="button"
                onClick={handleGetData}
                style={{ display: "flex", alignItems: "center" }}
              >
                {loading2 && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {loading2 ? "Loading..." : "  Get Data"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WHEN IMAGES NOT AVAILABLE TO DISPLAY */}
      {imagesAvl && (
        <div className="d-flex justify-content-center">
          <div
            style={{ width: "3rem", height: "3rem" }}
            className=" mt-5 spinner-border"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* WHEN IMAGES NOT AVAILABLE TO DISPLAY */}

      {/* WHEN IMAGES ARE AVAILABLE TO DISPLAY */}

      {images && images.length != 0 && (
        <div className="row">
          {images.map((i) => (
            <div className="card m-3 bg-dark" style={{ width: "21rem" }}>
              <img
                src={i}
                alt="Loading................."
                style={{ background: "#222831", height: "21rem", objectFit: "cover" }}
              />
              <button onClick={() => handleClick(i)} className="btn btn-info p-0">
                <i style={{ fontSize: "1.5rem" }} className="bi bi-eye-fill "></i>
              </button>
            </div>
          ))}
        </div>
      )}
      {/* WHEN IMAGES ARE AVAILABLE TO DISPLAY */}
    </div>
  );
};

export default Support;
