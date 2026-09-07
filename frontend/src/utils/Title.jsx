import React from "react";

function Title({ title }) {
  return (
    <div className=" flex items-center justify-center">
      <div className=" flex items-center gap-3">
        <div className=" w-10 h-1 bg-secondary" />
        <h1 className=" text-4xl font-bold text-center">{title}</h1>
        <div className=" w-10 h-1 bg-secondary" />
      </div>
    </div>
  );
}

export default Title;
