/* eslint-disable react/prop-types */
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import axios from "axios";
import React from "react";
import "./support.css";
import { useRef, useState, useEffect } from "react";
import { withTheme } from "styled-components";

const Support = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [con, setCon] = useState(false);
  const containerRef = useRef();
  const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [tezos, setTezos] = useState(new TezosToolkit("https://ghostnet.smartpy.io"));
  const [contract, setContract] = useState(null);
  const [file, setFile] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [images, setImages] = useState([]);
  const contractAddress = "KT19EYm7a6neGABTLHU1xfznhRybFcVmw4U8";
  const accessToken = "u9J1vbaNdHDn4MpUEdHDiizTxiRb3OYR0u-4nBSspueL0MvCFQPvo8THjCZEPv_a";
  const pinataJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYjRiY2QzMy04MTNhLTQ1ZjEtOGMxZS1iNjIzMmRiM2NkODEiLCJlbWFpbCI6ImFuc2hrYXVzaGlrOTUxOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNGFlOWY4Mjk4ZWQzYWJlMzJiMGIiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZDNhMmUyOTJlNTlhZWM5OWU3YThkMTQ3NWNkNmE0OGZlMmU3Y2ExYzg5ZTU1MGY5NDQwNjkxNzNiNWY0YmQ0IiwiaWF0IjoxNzAwNTcyMzEzfQ.MfCg7GLtD08Pba2QZYYZJUTh_BYPMBKbG5PQwvFK38E"; // Replace with your actual Pinata JWT token

  useEffect(() => {
    const options = {
      name: "Dapp",
      preferredNetwork: NetworkType.GHOSTNET,
      disableDefaultEvents: false,
    };
    console.log("Setting up Wallet..");
    const wallet = new BeaconWallet(options);
    tezos.setWalletProvider(wallet);
    setWallet(wallet);
  }, []);

  // Function to handle scrolling when the button is clicked
  const handleScroll = (scrollAmount) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;

    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition);

    // Access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition;
  };
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

  const pinFileToIPFS = async () => {
    try {
      let data = new FormData();
      data.append("file", file);
      data.append("pinataOptions", '{"cidVersion": 0}');
      //   data.append("pinataMetadata", '{"name": "pinnie"}');

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        headers: {
          Authorization: `Bearer ${pinataJwt}`,
        },
      });
      //   console.log(res.data);
      //   console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
      const ImageUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      alert("Image uploaded successfully");
      setFile(null);

      return ImageUrl;
    } catch (error) {
      alert("Unable to upload file to Pinata");

      console.log(error);
    }
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    if (file) {
      console.log("got file", file);
      try {
        const ImgURL = await pinFileToIPFS();
        console.log(ImgURL);
        const op = await contract.methods.add(ImgURL, address).send();
        await op.confirmation();
        console.log("Transaction Successfull");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select a file!");
    }
  };
  const handleGetData = async (e) => {
    try {
      e.preventDefault();
      // const op = await contract.methods.display(userAddress).send();
      // await op.confirmation();
      const storage = await contract.storage();
      const imgs = storage.value[userAddress];
      // setImages(imgs);
      console.log(userAddress);
      console.log(storage.value.valueMap.get(userAddress));
    } catch (er) {
      console.log(er);
    }
  };
  const getInputAddress = async (e) => {
    e.preventDefault();
    setUserAddress(e.target.value);
    // console.log(userAddress);
  };
  return (
    <div className="container">
      {/* Search Bar */}
      {!con && (
        <p className="d-flex flex-row-reverse ">
          <button
            type="button"
            style={{ borderRadius: "16px" }}
            className="btn btn-outline-light"
            onClick={setupConnection}
          >
            <h5>Connect to Wallet</h5>
          </button>
        </p>
      )}
      {con && (
        <>
          <h5 className="text-center mb-3 mt-5">YOUR ACCOUNT</h5>
          <h5 className="text-center ">
            <span style={{ border: "1px solid white", padding: "5px", borderRadius: "10px" }}>
              {address}
            </span>
          </h5>
          <p className="d-flex flex-row-reverse">
            <input
              type="file"
              className="file-upload"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button
              type="file"
              style={{ borderRadius: "16px" }}
              className="btn btn-outline-light"
              onClick={uploadFile}
            >
              <h5>Upload</h5>
            </button>
          </p>
        </>
      )}
      <div className="row justify-content-center mb-5">
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
              <button className="btn btn-outline-secondary" type="button" onClick={handleGetData}>
                Get Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards with Scroll Buttons */}
      {images.length && (
        <div className="card-container">
          {images.map((i, idx) => (
            <div key={idx} className="card">
              <img src={i} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Support;
