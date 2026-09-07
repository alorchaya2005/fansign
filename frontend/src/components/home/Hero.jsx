import { RiDiscordLine } from "react-icons/ri";
import { FaRegUser, FaTelegramPlane } from "react-icons/fa";
import Revoke from "../../utils/Revoke";
import { Link } from "react-router-dom";
import { IoCompassOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";

function Hero() {
  const { authUser } = useAuthStore();
  return (
    <div className=" w-full pt-1 h-screen py-10 md:pb-3 relative overflow-hidden  ">
      <div className=" container mx-auto px-5 md:px-10 lg:px-20 xl:px-32 flex  items-center justify-center h-full">
        <div className=" flex flex-col items-center">
          <Revoke delay={0}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-phonk leading-tight">
              Welcome
            </h1>
          </Revoke>
          <Revoke delay={0.1}>
            <h1 className=" text-5xl md:text-6xl lg:text-[80px] font-phonk leading-tight bg-gradient-to-l from-hedingColor via-[#cc7aba] to-hedingColor bg-clip-text text-transparent">
              To Sign
            </h1>
          </Revoke>
          <Revoke delay={0.2}>
            <p className=" font-oddliniRegular text-xl md:text-3xl tracking-wide text-zinc-300 mt-5">
              BECOME THE NAME SHE HOLDS
            </p>
          </Revoke>

          <div className=" flex items-center gap-5 mt-10">
            <Link to="">
              <div className=" cursor-pointer px-4 bg-gradient-to-l from-[#222222] via-[#1f1f1f] to-subMain py-2 rounded-lg border-2 border-subMain flex items-center justify-center gap-3">
                <RiDiscordLine className=" size-8" />
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
            <Link to={authUser ? "/browse" : "/register"}>
              <div className=" cursor-pointer px-4 bg-[#0e0e0e9d]  py-[7px] rounded-lg border-2 border-border flex items-center justify-center gap-3">
                {authUser ? (
                  <div>
                    <IoCompassOutline className=" size-7" />
                  </div>
                ) : (
                  <div>
                    <FaRegUser className=" size-5" />
                  </div>
                )}

                <div>
                  <h1 className=" text-[16px] font-oddliniRegular text-hedingColor leading-none drop-shadow-[0px_0px_3px_#d130af]">
                    {authUser ? "Browse" : "Sign Up"}
                  </h1>
                  {authUser ? (
                    <p className="flex items-center text-xs font-light capitalize tracking-wide font-oddliniRegular">
                      <span>Your fansign</span>
                    </p>
                  ) : (
                    <p className="flex items-center text-xs font-light capitalize tracking-wide font-oddliniRegular">
                      <span className=" hidden md:block "> Join</span>{" "}
                      <span> with us</span>
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
