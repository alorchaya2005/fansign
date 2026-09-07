import React, { useEffect, useState } from "react";
import Title from "../../utils/Title";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { FaSquare } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Reveal from "../../utils/Reveal";
import axios from "axios";

function Vouch() {
  const [vouch, setVouch] = useState([]);
  useEffect(() => {
    async function getVouces() {
      const res = await axios.get("https://myvouch.es/api/vouches/sign");
      const data = await res.data.data;
      setVouch(data);
      console.log(data);
      return data;
    }
    getVouces();
  }, []);

  return (
    <div className=" w-full py-10">
      <div className=" container mx-auto px-5 md:px-10 lg:px-20">
        <Title title="Vouch From Our Customners" />
        <div className=" mt-14">
          <InfiniteMovingCards items={vouch} />
          <InfiniteMovingCards items={vouch} direction="right" />
        </div>

        <div className=" flex items-center justify-center mt-14">
          <div className=" flex flex-col items-center">
            <Reveal>
              <h1 className=" text-sm font-light text-center">
                <span className=" text-subSecondary title-font">1.</span> Choose
                Service, fill out the sign form
              </h1>
            </Reveal>
            <Reveal>
              <h1 className=" text-sm font-light text-center">
                <span className=" text-subSecondary title-font">2.</span> Pay &
                get your custom sign delivered privately
              </h1>
            </Reveal>
          </div>
        </div>
        <div className=" mt-3">
          <div className=" flex items-center justify-center">
            <div className=" w-1/4 h-[2px] rounded-full bg-secondary" />
            <GoDotFill className=" text-secondary" />
            <FaSquare className=" text-secondary rotate-45" />
            <GoDotFill className=" text-secondary" />
            <div className=" w-1/4 h-[2px] bg-secondary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vouch;
