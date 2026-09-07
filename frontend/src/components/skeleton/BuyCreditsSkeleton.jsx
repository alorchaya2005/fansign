import React from "react";
import ShinySkeleton from "./ShinySkeleton";

function BuyCreditsSkeleton() {
  return (
    <div className=" w-full h-screen">
      <div className=" container mx-auto px-5 md:px-10 lg:px-20 pt-[1px]">
        <div className=" w-full min-h-64 bg-subMain mt-24 rounded-3xl p-5 ">
          <div className=" md:grid h-full grid-cols-2 gap-10">
            <div>
              <ShinySkeleton className={"h-64 col-span-1"} />
            </div>
            <div className=" flex flex-col items-center justify-center">
              <ShinySkeleton className={"h-10 w-1/2 "} />
              <ShinySkeleton className={"h-10 w-1/3 mt-5"} />
              <ShinySkeleton className={"h-10 w-2/5 mt-5"} />
              <ShinySkeleton className={"h-10 w-1/2 mt-5"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCreditsSkeleton;
