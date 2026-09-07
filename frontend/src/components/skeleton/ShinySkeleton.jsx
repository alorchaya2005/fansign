import React from "react";

const ShinySkeleton = ({ className }) => {
  return <div className={`animate-pulse bg-gry rounded-lg ${className}`}></div>;
};

export default ShinySkeleton;
