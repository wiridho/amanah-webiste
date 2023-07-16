import React from "react";

const Loading = ({ className }) => {
  return (
    <span
      className={`animate-spin inline-block  ${className} border-[3px] border-current border-t-transparent rounded-full`}
      role="status"
      aria-label="loading"
    ></span>
  );
};

export default Loading;
