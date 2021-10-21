import React from "react";

const VerticalDivider = ({ text }) => {
  return (
    <div className=" h-100 vertical-divider">
      <h2
        className=" text-center text-grey"
        style={{
          borderBottom: "2px dotted #efefee",
          lineHeight: "0.1em",
          //   margin: "10px 0 20px",
        }}
      >
        {/* <span style={{ background: "#fafaf9", padding: "0 10px" }}>{text}</span> */}
      </h2>
    </div>
  );
};

export default VerticalDivider;
