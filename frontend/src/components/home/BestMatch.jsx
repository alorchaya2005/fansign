import React from "react";
import Reveal from "../../utils/Reveal";
import { Link } from "react-router-dom";
import { TbCoins } from "react-icons/tb";
import Title from "../../utils/Title";
import { useServiceStore } from "../../store/useServiceStore";
import { useEffect } from "react";
import ShinySkeleton from "../skeleton/ShinySkeleton";
import FansignCard from "../card/FansignCard";

function BestMatch() {
  const {
    forYou,
    forYouServices: services,
    isGettingForYouServices,
  } = useServiceStore();

  useEffect(() => {
    forYou();
  }, [forYou]);

  return (
    <div className=" w-full pb-10 relative ">
      <div className=" container mx-auto px-5 md:px-10 lg:px-20 ">
        {/* title  */}
        <Title title="For You" />

        {/* services */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
          {isGettingForYouServices
            ? //  skeleton
              [...Array(4)].map((_, i) => (
                <div className=" w-full" key={i}>
                  <ShinySkeleton className="h-48 w-full" />
                  <ShinySkeleton className="h-5 mt-3 w-2/3" />
                  <div className=" flex items-center justify-between">
                    <ShinySkeleton className="h-5 mt-3 w-1/2" />
                    <ShinySkeleton className="h-5 mt-3 w-10" />
                  </div>
                  <ShinySkeleton className="h-5 mt-3 w-full" />
                </div>
              ))
            : services?.map((service) => (
                <FansignCard key={service?._id} fansign={service} />
              ))}
        </div>
        <div className=" flex items-center justify-center mt-3">
          <Link to="/browse">
            <div className=" px-5 py-1.5 bg-hedingColor rounded-lg border-border">
              Browse All
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BestMatch;
