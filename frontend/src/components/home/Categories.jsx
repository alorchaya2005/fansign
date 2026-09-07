import React, { useEffect } from "react";
import Title from "../../utils/Title";
import { IoDiamondSharp } from "react-icons/io5";
import Reveal from "../../utils/Reveal";
import { useAdminStore } from "../../store/useAdminStore";

function Categories() {
  const { getAllCategories, allCategories } = useAdminStore();
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className=" w-full pt-10 pb-20">
      <div className=" container mx-auto px-5 md:px10 lg:px-20">
        <Title title="Categories" />
        <div className=" grid grid-cols-2 md:grid-cols-5 gap-5 mt-14">
          {/* things */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  thing
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  fansign
                </h1>
              </Reveal>
            </div>
          </div>

          {/* body  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  body
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  fansign
                </h1>
              </Reveal>
            </div>
          </div>

          {/* custom */}
          <div className=" relative w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center md:col-span-1 col-span-2">
            <IoDiamondSharp className=" absolute left-0 right-0 mx-auto w-10 h-10 -top-2 text-subSecondary" />
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center text-subSecondary">
                  custom
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  fansign
                </h1>
              </Reveal>
            </div>
          </div>

          {/* ass  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  ass
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  fansign
                </h1>
              </Reveal>
            </div>
          </div>

          {/* tit  */}
          <div className=" w-full h-40 bg-subPrimary/50 rounded-sm flex items-center justify-center">
            <div className=" flex flex-col items-center">
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  tit
                </h1>
              </Reveal>
              <Reveal>
                <h1 className=" text-2xl font-medium uppercase text-center">
                  fansign
                </h1>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
