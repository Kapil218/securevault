/////////////////////////////////////

/// FOR FUTURE IMPLEMENTATION
////////////////////////////////

// import React from 'react';
// import "./support.css"
// import { useRef, useState } from "react";
// const Support = () => {
//     const [scrollPosition, setScrollPosition] = useState(0);

//     const containerRef = useRef();

//     // Function to handle scrolling when the button is clicked
//     const handleScroll = (scrollAmount) => {
//         // Calculate the new scroll position
//         const newScrollPosition = scrollPosition + scrollAmount;

//         // Update the state with the new scroll position
//         setScrollPosition(newScrollPosition);

//         // Access the container element and set its scrollLeft property
//         containerRef.current.scrollLeft = newScrollPosition;
//     };
//     return (
//         <div className="container ">
//             {/* Search Bar */}
//             <h5 className='text-center mb-4'>Guest Viewer</h5>

//             <div className="row justify-content-center mb-5">
//                 <div className="col-md-6">
//                     <div className="input-group mb-3">
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search..."
//                             aria-label="Search"
//                             aria-describedby="basic-addon2"
//                         />
//                         <div className="input-group-append">
//                             <button className="btn btn-outline-secondary" type="button">
//                                 Search
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Cards with Scroll Buttons */}

//             <div className="card-container">
//                 <div
//                     ref={containerRef}
//                     style={{
//                         width: "100vw",
//                         overflowX: "scroll",
//                         scrollBehavior: "smooth",
//                     }}
//                 >

//                     <div className="card-box">
//                         {[1, 2, 3, 4, 5, 6].map((cardNumber) => (
//                             <div key={cardNumber} className="card" style={{ width: '400px', margin: '0.5rem' }}>
//                                 <div className="card-body text-center" style={{ color: "black" }}>
//                                     <h5 className="card-title text-light" >Card {cardNumber}</h5>
//                                     <p className="card-text  text-light">This is some card content.</p>
//                                     <p className='text-light'>Lorem ipsum d erw rer olor sit amet consectr erw etur dsfds fdsfds fdsf fadipisicing elit. Ipsa accusantium ab inventore molestiae officia ex laboriosam ea rfewr ew </p>
//                                     <br /> <button type="button" class="btn btn-info ">Info</button>

//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* <div className="action-btns">
//                     <button onClick={() => handleScroll(-200)}>Scroll Left</button>
//                     <button onClick={() => handleScroll(200)}>Scroll Right</button>
//                 </div> */}
//             </div>

//         </div>
//     );
// };

// export default Support;
