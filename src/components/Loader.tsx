import React from "react";

const Loader: React.FC<{ width?: number }> = ({ width }) => {
  return (
    <progress
      className={`progress progress-secondary w-${width || 10}`}
    ></progress>
  );
};

export default Loader;
