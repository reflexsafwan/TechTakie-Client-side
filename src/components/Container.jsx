import React from "react";


const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1440px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
