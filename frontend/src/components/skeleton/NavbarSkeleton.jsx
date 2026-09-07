import React from "react";
import ShinySkeleton from "../skeleton/ShinySkeleton";
function NavbarSkeleton() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className=" container px-5 md:px-10 lg:px-20 mx-auto pt-2">
        <div className=" w-full flex items-center justify-between">
          <div className=" w-14 h-14">
            <img
              loading="lazy"
              decoding="async"
              src="/images/logo.webp"
              alt="logo"
              className=" w-full h-full object-contain"
            />
          </div>
          <div className=" flex items-center gap-5">
            <ShinySkeleton className="h-7 w-20" />
            <ShinySkeleton className="h-7 w-28" />
            <ShinySkeleton className="h-7 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;
