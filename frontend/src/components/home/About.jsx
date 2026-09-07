import React from "react";
import { RiDiscordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function About() {
  const firstSet = [
    "https://i.redd.it/4y3ssc3mlzh51.jpg",
    "https://cdn2.lemmecheck.com/lmccom/uploads/2013/04/pinkpanties.jpg",
    "https://64.media.tumblr.com/tumblr_lfctrwmRAw1qgoenyo1_250.jpg",
    
    "https://live.staticflickr.com/4118/4781396781_5a42bd08d2_z.jpg",
    
    "https://i.dailymail.co.uk/i/pix/2014/11/29/2396B15200000578-2853986-image-52_1417264550473.jpg",
    "https://i.imgur.com/A8Pl3w0.png",

  ];
  return (
    <div className=" py-20 w-full container px-5 mx-auto">
      <div className=" flex items-center justify-center">
        <div className=" relative w-full max-w-2xl lg:max-w-4xl p-5 bg-subMain/70 rounded-lg">
          <div className=" w-full h-80">
            <div className=" flex items-center gap-5 w-full overflow-hidden">
              <div className="flex items-center gap-5 animate-infinite-scroll">
                {[...firstSet, ...firstSet].map((item, index) => (
                  <div
                    key={index}
                    className=" size-14 lg:size-20 rounded-md border-[7px] border-gry overflow-hidden"
                  >
                    <img
                      src={item}
                      alt={item}
                      className=" w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex items-center gap-5 w-full overflow-hidden mt-5">
              <div className="flex items-center gap-5 animate-infinite-scroll-right">
                {[...firstSet, ...firstSet].map((item, index) => (
                  <div
                    key={index}
                    className=" size-14 lg:size-20 rounded-md border-[7px] border-gry overflow-hidden"
                  >
                    <img
                      src={item}
                      alt={item}
                      className=" w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" absolute inset-0 flex items-center justify-center bg-subMain/70 rounded-lg">
            <div className=" flex items-center flex-col">
              <div className="size-24 p-5 mt-12 rounded-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#252525] via-[#0f0f0f] to-main">
                <img src="/images/logo.webp" alt="logo" />
              </div>
              <div className=" mt-5 w-2/3">
                <p className=" font-oddliniRegular text-sm text-zinc-300 text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  uo nemo voluptates
                  veniam hic quibusdam, quia minus dolor voluptate, natus
                  voluptatum vero tenetur deleniti vitae ullam?
                </p>
              </div>
              <Link to="" className=" mt-3">
                <div className=" cursor-pointer px-4 bg-gradient-to-l from-[#222222] via-[#1f1f1f] to-subMain py-2 rounded-lg border-2 border-subMain flex items-center justify-center gap-3">
                  <div>
                    <RiDiscordLine className=" size-8" />
                  </div>
                  <div>
                    <h1 className=" text-[16px] font-oddliniRegular text-hedingColor leading-none drop-shadow-[0px_0px_3px_#d130af]">
                      Discord
                    </h1>
                    <p className=" flex items-center text-xs font-light capitalize tracking-wide font-oddliniRegular">
                      <span className=" hidden md:block "> Join the</span>{" "}
                      <span>community</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
