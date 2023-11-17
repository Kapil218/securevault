/* eslint-disable react/prop-types */

import { useState } from "react";
import axios from "axios";

const Add = ({ tezos, address, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const retriveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      console.log("got file");
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://tomato-effective-coyote-251.mypinata.cloud",
          data: formData,
          headers: {
            pinata_api_key: `
              a220ab80cc548ab49bd1`,
            pinata_secret_api_key: `
              d922e1420a72725a99306e145e01e2d3a2f6efb22adad82a96d5b496ac14221e
  
              `,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `tomato-effective-coyote-251.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        alert("Successfully Image Uploaded");
        setFileName("No file selected");
        setFile(null);
        console.log(ImgHash);
      } catch (e) {
        alert("Unable to upload file to Pinata");
      }
    }
  };
  const handleAdd = async () => {
    try {
      const op = await contract.methods.add("sdsds", address).send();
      await op.confirmation();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">
          Select Image <br></br>
        </label>
        <input disabled={!address} type="file" onChange={retriveFile} id="file-upload"></input>
        <button type="submit">Upload</button>
        <button onClick={handleAdd}> Add</button>
      </form>
    </>
  );
};
export default Add;
