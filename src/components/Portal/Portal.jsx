import React from "react";
import ReactDOM from "react-dom";

import CustomToastContainer from "./../Toast/ToastContainer";

const Portal = () => {
  return ReactDOM.createPortal(
    <>
      <CustomToastContainer />
    </>,
    document.getElementById("portal")
  );
};
export default Portal;
