import React from 'react';
import img from "../assets/swetter@2x 1.png";

function Share() {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60vw"
            }}>
                <div className="card" style={{ background: "#DCDCDC" }}>
                    <div className="card-body">
                        <div className="row d-flex justify-content-between">
                            {/* Left Section for Image */}
                            <div className="col-md-5">
                                <img
                                    src={img}
                                    alt="Random Placeholder"
                                    className="img-fluid"
                                />
                            </div>

                            {/* Right Section for Form */}
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <form>
                                    <h5 style={{ color: "black" }} className="text-center mb-4">SHARE</h5>
                                    <h7 style={{ color: "black" }} className="text-center mb-4">Enter the address of the account you want to share the access with. </h7>
                                    <div className="form-group mt-4 mb-2">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailInput"
                                            placeholder="Enter your email"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2 mb-2" style={{ borderRadius: "20px", width: "100%" }}>
                                        Share
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Share;
