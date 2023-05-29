import React from "react";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default Account;
