import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
const getContract = async () => {
  const contractAddress = "KT1R4hQbGubCHpsHZxiKxuhY4eYPwxnHcaZ7";
  const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");
  const contract = await Tezos.contract.at(contractAddress);
  const storage = await contract.storage();
  console.log(storage.result);
};
console.log("Setting up Wallet..");
getContract();
const options = {
  name: "Dapp",
};
const getWallet = async () => {
  const wallet = new BeaconWallet(options);
  await wallet.requestPermissions();
};
getWallet();
