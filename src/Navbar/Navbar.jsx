import axios from "axios";
import React from "react";
import Counter from "../Utilities/Counter.jsx";

const Navbar = ({ feed }) => {
  return (
    <div className="position-absolute fixed-bottom ml-2 mr-2 nav-bar bg-white  ">
      {/* {axios.defaults.baseURL} */}
      <div className="row h-100  d-flex justify-content-center align-items-center">
        <div className="col-2  position-relative">
          <div
            className="position-absolute"
            style={{ right: "15px", top: "-10px" }}
          >
            <div>
              <Counter number={feed.length}></Counter>
            </div>
          </div>

          <i className="fas fa-phone-alt"></i>
        </div>

        <div className="col-2">
          <i className="far fa-user"></i>
        </div>

        <div className="col-4 text-center main-button d-flex justify-content-center align-items-center">
          <div className="rounded-circle"></div>
          <div className="rounded-circle parent border-grey bg-white"></div>

          <i className="fas fa-th text-white"></i>
        </div>

        <div className="col-2">
          <i className="fas fa-cog"></i>
        </div>

        <div className="col-2">
          {" "}
          <i className="far fa-dot-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
