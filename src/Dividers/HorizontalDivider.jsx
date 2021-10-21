import React from "react";

const HorizontalDivider = ({ text }) => {
  return (
    <div className="horizontal-divider">
      <h2
        className="w-100 text-center text-grey"
        style={{
          borderBottom: "2px dotted #efefee",
          lineHeight: "0.1em",
          margin: "10px 0 20px",
        }}
      >
        {text ? (
          <span style={{ background: "#fafaf9", padding: "0 10px" }}>
            {text}
          </span>
        ) : null}
      </h2>
    </div>
  );
};

export default HorizontalDivider;
