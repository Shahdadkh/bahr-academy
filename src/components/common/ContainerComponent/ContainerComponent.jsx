import React from "react";

const ContainerComponent = ({ children }) => {
  return (
    <div className=" mx-auto max-w-[85rem] min-w-[17.5rem] px-1 sm:px-4 md:px-7 lg:px-10">
      {children}
    </div>
  );
};

export default ContainerComponent;
