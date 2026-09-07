import React from "react";

function Button({ children }) {
  return (
    <button className="shadow-[3px_3px_0px_0px_#A53860] hover:shadow-[2px_2px_0px_0px_#A53860] transition-all rounded-md px-5 py-1 bg-buttonColor hover:bg-buttonColor/90">
      {children}
    </button>
  );
}

export default Button;
