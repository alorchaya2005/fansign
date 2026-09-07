import React from "react";
import Title from "../../utils/Title";
import Reveal from "../../utils/Reveal";
import { IoDiamondSharp } from "react-icons/io5";

function AddOns() {
  return (
    <div className=" w-full pb-10 md:pb-20">
      <div className=" container mx-auto px-5 md:px-20 lg:px-96">
        <Title title="Add - Ons" />
        <div className=" mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-3 gap-5">
          {/* nsfw  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-lg title-font uppercase text-center">
                  Nsfw
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl title-font uppercase text-center mt-3">
                  + $8.00
                </h1>
              </Reveal>
            </div>
          </div>
          {/* knife  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-lg uppercase text-center title-font">
                  knife
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl title-font uppercase text-center mt-3">
                  + $4.00
                </h1>
              </Reveal>
            </div>
          </div>
          {/* thigh highs  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-lg title-font uppercase text-center">
                  thigh highs
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl title-font uppercase text-center mt-3">
                  + $6.00
                </h1>
              </Reveal>
            </div>
          </div>
          {/* gif  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-lg title-font uppercase text-center">
                  gif
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl title-font uppercase text-center mt-3">
                  + $2.00
                </h1>
              </Reveal>
            </div>
          </div>
          {/* custom  */}
          <div className="relative w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center md:col-span-1 col-span-2">
            <IoDiamondSharp className=" absolute left-0 right-0 mx-auto w-10 h-10 -top-2 text-subSecondary" />
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-lg title-font uppercase text-center">
                  custom
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl title-font uppercase text-center mt-3">
                  + $10.00
                </h1>
              </Reveal>
            </div>
          </div>
          {/* plushie  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center md:col-span-1 col-span-2">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-lg title-font uppercase text-center">
                  plushie
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl title-font uppercase text-center mt-3">
                  + $9.00
                </h1>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOns;
