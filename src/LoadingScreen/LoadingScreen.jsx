import React, { useEffect, useState } from "react";
import { NineCellLoading } from "react-loadingg";
const LoadingScreen = () => {
  return (
    <React.Fragment>
      <div
        className="bg-white w-100 h-100 position-absolute"
        style={{ zIndex: "3001", left: 0 }}
      >
        <NineCellLoading></NineCellLoading>
      </div>
    </React.Fragment>
  );
};

export default LoadingScreen;
