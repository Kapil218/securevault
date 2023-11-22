/* eslint-disable react/prop-types */
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import axios from "axios";

import React from "react";
import "./article.css";
import { useRef, useState, useEffect } from "react";

const Support = ({ contract, setContract, address, setAddress }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [con, setCon] = useState(false);
  const containerRef = useRef();
  // const [address, setAddress] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, loadVal] = useState(false);
  const [loading2, loadVal2] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [tezos, setTezos] = useState(new TezosToolkit("https://ghostnet.smartpy.io"));
  // const [contract, setContract] = useState(null);
  const [file, setFile] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [images, setImages] = useState([]);
  const contractAddress = "KT1V9xzYrd2mF5vVtXWUi4An1GVkcTfyMo4T";
  const accessToken = "u9J1vbaNdHDn4MpUEdHDiizTxiRb3OYR0u-4nBSspueL0MvCFQPvo8THjCZEPv_a";
  const pinataJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYjRiY2QzMy04MTNhLTQ1ZjEtOGMxZS1iNjIzMmRiM2NkODEiLCJlbWFpbCI6ImFuc2hrYXVzaGlrOTUxOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNGFlOWY4Mjk4ZWQzYWJlMzJiMGIiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZDNhMmUyOTJlNTlhZWM5OWU3YThkMTQ3NWNkNmE0OGZlMmU3Y2ExYzg5ZTU1MGY5NDQwNjkxNzNiNWY0YmQ0IiwiaWF0IjoxNzAwNTcyMzEzfQ.MfCg7GLtD08Pba2QZYYZJUTh_BYPMBKbG5PQwvFK38E"; // Replace with your actual Pinata JWT token

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

      const ImageUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      loadVal(false);

      return ImageUrl;
    } catch (error) {
      alert("Unable to upload file to Pinata");

      console.log(error);
    }
  };
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
  const handleGetData = async (e) => {
    try {
      if (userAddress) {
        loadVal2(true);
        e.preventDefault();
        // const op = await contract.methods.display(userAddress).send();
        // await op.confirmation();
        const storage = await contract.storage();
        const imgs = storage.value.valueMap.get('"' + userAddress + '"');
        console.log(imgs);
        // console.log(storage);
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

        // setImages(imgs);

        loadVal2(false);
      }
    } catch (er) {
      console.log(er);
    }
  };
  const getInputAddress = async (e) => {
    e.preventDefault();
    setUserAddress(e.target.value);
  };
  const handleClick = (i) => {
    // Your click event handling logic goes here
    window.open(i, "_blank");
  };
  return (
    <div className="container" style={{ overflow: "auto" }}>
      {/* Search Bar */}
      {con && (
        <>
          <p className="d-flex justify-content-center flex-row-reverse">
            <button
              type="file"
              style={{ borderRadius: "16px", fontSize: "20px" }}
              className={`pl-5 pr-5  ml-5 btn btn-secondary ${loading ? "disabled" : ""}`}
              disabled={loading}
              onClick={uploadFile}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {loading ? "Loading..." : "Upload"}
            </button>
            <input
              type="file"
              className="btn btn-outline-info"
              style={{ borderRadius: "16px", width: "130px" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </p>
          <h5 className="text-center mb-3 mt-5">YOUR ACCOUNT</h5>
          <p className="text-center ">
            <span style={{ border: "1px solid white", padding: "5px", borderRadius: "10px" }}>
              {address}
            </span>
          </p>
        </>
      )}
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
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
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

      {!con && (
        <p className="d-flex justify-content-center flex-row-reverse ">
          <button
            type="button"
            style={{ borderRadius: "16px" }}
            className="btn btn-primary text-light font-weight-bold"
            onClick={setupConnection}
          >
            Connect to Wallet
          </button>
        </p>
      )}

      {/* Cards with Scroll Buttons */}

      {images && images.length && (
        <div>
          {images.map((i) => (
            <span key={i}>
              <img
                src={i}
                alt=""
                style={{ padding: "8px", height: "240px", width: "270px" }}
                onClick={() => handleClick(i)}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Support;
