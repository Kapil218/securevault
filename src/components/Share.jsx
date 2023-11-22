import React, { useState } from "react";
import img from "../assets/swetter@2x 1.png";

function Share({ contract, setContract, address, setAddress }) {
  const [userAddress, setUserAddress] = useState(null);
  const handleShare = async (e) => {
    e.preventDefault();
    try {
      //   console.log(contract);
      const op = await contract.methods.allowAccess(userAddress, address).send();
      await op.confirmation();
      alert("Shared successfully");
    } catch (er) {
      console.log(er);
    }
  };
  const getInputAddress = async (e) => {
    e.preventDefault();
    setUserAddress(e.target.value);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80vw",
        }}
      >
        <div>
          <div className="card-body">
            <div className="row d-flex justify-content-between">
              {/* Left Section for Image */}

              <div
                className="col-md-4"
                style={{ background: "#DCDCDC", opacity: 0.9, borderRadius: "20px" }}
              >
                <img src={img} alt="Random Placeholder" className="img-fluid" />
              </div>

              <div
                className="col-md-5 d-flex align-items-center justify-content-center"
                style={{ borderTop: "0.2px solid #DCDCDC", borderBottom: "0.2px solid #DCDCDC" }}
              >
                <form>
                  <h5 className="text-center mb-4">SHARE</h5>
                  <h7 className="text-center mb-4">
                    Enter the address of the account you want to share the access with.{" "}
                  </h7>
                  <div className="form-group mt-4 mb-2">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      placeholder="Enter user address"
                      style={{ width: "100%" }}
                      onChange={getInputAddress}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-2 mb-2"
                    style={{ borderRadius: "20px", width: "100%" }}
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </form>
              </div>
              {/* Right Section for Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Share;
