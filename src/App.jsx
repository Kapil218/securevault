import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Article from './components/Article';
import Support from './components/Support';
import Share from './components/Share';
import Form from './components/FormComponent';
function App() {
  return (
    <Router >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share" element={<Share />} />
        <Route path="/support" element={<Support />} />
        <Route path="/article" element={<Article />} />
        <Route path="/sign" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;

// /* eslint-disable react/prop-types */
// import { TezosToolkit } from "@taquito/taquito";
// import { BeaconWallet } from "@taquito/beacon-wallet";
// import { useEffect, useState } from "react";
// import Add from "./Add";
// import { NetworkType } from "@airgap/beacon-dapp";
// // add funcction

// function App() {
//   const [address, setAddress] = useState(null);
//   const [wallet, setWallet] = useState(null);
//   // eslint-disable-next-line no-unused-vars
//   const [tezos, setTezos] = useState(new TezosToolkit("https://ghostnet.smartpy.io"));
//   const [contract, setContract] = useState(null);
//   const contractAddress = "KT1NHqPx3RMgzcVeTQhXCdvLnUtTR9h4Wfyx";

//   const setupWallet = async () => {
//     try {
//       await wallet.requestPermissions({
//         network: {
//           type: NetworkType.GHOSTNET,
//           rpcUrl: "https://ghostnet.smartpy.io",
//         },
//       });
//       // gets user's address
//       let userAddress = await wallet.getPKH();
//       setAddress(userAddress);
//       let cc = await tezos.wallet.at(contractAddress);
//       setContract(cc);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getDetails = async () => {
//     console.log("contract", contract);
//     console.log("wallet", wallet);
//     console.log("address", address);
//     console.log(typeof address);
//   };

//   useEffect(() => {
//     const options = {
//       name: "Dapp",
//       preferredNetwork: NetworkType.GHOSTNET,
//       disableDefaultEvents: false,
//     };
//     console.log("Setting up Wallet..");
//     const wallet = new BeaconWallet(options);
//     tezos.setWalletProvider(wallet);
//     setWallet(wallet);
//   }, []);
//   return (
//     <>
//       <button onClick={getDetails}> Get details</button>
//       <h1>Test Site for GDrive 3.0</h1>
//       <button onClick={setupWallet}>Connect to wallet</button>
//       <div>
//         <h4>Address: {address}</h4>
//       </div>
//       <h3>Operations </h3>
//       <div className="operation1" style={{ background: "#87CEEB", color: "black" }}>
//         <h4>Add Value(assets) Operration </h4>
//         <p>Desc : Add assests on IPFS</p>
//         <Add address={address} contract={contract} tezos={tezos} />
//       </div>
//     </>
//   );
// }

// export default App;
