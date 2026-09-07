import { Link } from "react-router-dom";
import Reveal from "../../utils/Reveal";
import { TbCoins } from "react-icons/tb";
import { useEffect } from "react";
import { useState } from "react";

function FansignCard({ fansign }) {
  const words = [
    "Exclusive",
    "Popular",
    "Prime",
    "Elite",
    "Chic",
    "Flash",
    "Fresh",
    "Bold",
    "Epic",
    "Vogue",
    "Sleek",
    "Lush",
    "Fame",
    "Glam",
    "Zesty",
    "Frost",
    "Luxe",
    "Buzz",
    "Jazz",
    "Snazzy",
    "Top Seller",
    "Featured",
    "50% Off",
    "Discount",
    "Trending",
  ];

  const [randomWord, setRandomWord] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
  }, []);
  return (
    <Link to={`/fansign/${fansign?._id}`}>
      <div
        className={` relative ${
          fansign?.featured && "drop-shadow-[0px_0px_10px_#d130af]"
        } w-full h-80 bg-[#161616] mb-5 md:mb-8 hover:bg-[#181818] transition-all duration-300 rounded-md border border-[#D3D3D310] p-3`}
      >
        {/* featured icon */}
        {fansign?.featured && (
          <div className=" absolute -top-5 left-1/2 -translate-x-1/2 px-3 h-6 bg-hedingColor flex items-center justify-center rounded-md mx-auto">
            <h2 className="text-sm font-semibold">{randomWord}</h2>
          </div>
        )}
        {/* featured icon end */}
        <div className=" h-3/5 bg-main rounded-md">
          <img
            src={fansign?.images}
            alt=""
            className=" w-full h-full object-cover rounded-md"
          />
        </div>

        <div className=" mt-3">
          <h1 className=" w-full font-oddliniBold tracking-wider text-xl truncate">
            {fansign?.name}
          </h1>

          <div className=" mt-1 mb-2 flex items-center justify-between">
            <Reveal>
              <h2 className=" text-base font-light">Starting from -</h2>
            </Reveal>
            <Reveal>
              <div className=" flex items-center gap-1">
                <TbCoins className=" w-5 h-5 text-coin" />
                <h2 className=" text-lg font-medium">{fansign?.price}</h2>
              </div>
            </Reveal>
          </div>
          <Link to={`/fansign/${fansign?._id}`}>
            <button className=" font-oddliniRegular w-full  border border-zinc-800 rounded-md px-5 py-1 bg-main ">
              More Details
            </button>
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default FansignCard;
