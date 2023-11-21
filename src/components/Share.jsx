import React from 'react';
import img from "../assets/swetter@2x 1.png";

function Share() {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "80vw"
            }}>
                <div >
                    <div className="card-body">
                        <div className="row d-flex justify-content-between" >

                            {/* Left Section for Image */}

                            <div className="col-md-4" style={{ background: "#DCDCDC", opacity: 0.9, borderRadius: "20px" }} >
                                <img
                                    src={img}
                                    alt="Random Placeholder"
                                    className="img-fluid"
                                />
                            </div>

                            <div className="col-md-5 d-flex align-items-center justify-content-center" style={{ borderTop: "0.2px solid #DCDCDC", borderBottom: "0.2px solid #DCDCDC" }} >
                                <form >
                                    <h5 className="text-center mb-4">SHARE</h5>
                                    <h7 className="text-center mb-4">Enter the address of the account you want to share the access with. </h7>
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
                            {/* Right Section for Form */}

                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Share;
