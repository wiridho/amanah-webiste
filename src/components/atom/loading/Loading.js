import React from "react";

const Loading = () => {
  return (
    <span
      className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    ></span>
  );
};

export default Loading;
