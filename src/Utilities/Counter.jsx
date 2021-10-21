import React from "react";

const Counter = ({ number }) => {
  return (
    <div
      className=" text-center bg-orange text-white"
      style={{
        borderRadius: "25px",
        width: "fit-content",
        height: "fit-content",
        minHeight: "20px",
        minWidth: "20px",
        padding: "3px ",
      }}
    >
      {number}
    </div>
  );
};

export default Counter;
