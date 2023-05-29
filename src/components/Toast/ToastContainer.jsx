import React from "react";
import { ToastContainer } from "react-toastify";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable={true}
      pauseOnHover={true}
      progress
      bodyClassName={() => "font-iran text-sm flex my-auto"}
    />
  );
};

export default CustomToastContainer;
