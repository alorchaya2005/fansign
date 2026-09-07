import { Link, useLocation } from "react-router-dom";
import { IoCompassOutline } from "react-icons/io5";
import Button from "../../utils/Button";
import { useAuthStore } from "../../store/useAuthStore";
import { TbCoins } from "react-icons/tb";
import { motion } from "framer-motion";
import {
  Loader,
  MessageCircleMore,
  PanelsTopLeft,
  ShoppingBag,
  ShoppingCartIcon,
  X,
} from "lucide-react";
import NavbarSkeleton from "../skeleton/NavbarSkeleton";
import { useEffect, useState } from "react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { authUser, logout, isLoggingOut, isCheckingAuth } = useAuthStore();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isCheckingAuth && !authUser) {
    return <NavbarSkeleton />;
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      className={`${
        pathname === "/" && isScrolled
          ? "bg-subMain transition-all duration-500 border-b border-border shadow-xl"
          : "border-b border-transparent"
      }  fixed top-0 left-0 w-full z-50 text-white  font-oddlini-regular  ${
        pathname !== "/" && "bg-subMain border-b border-zinc-800 shadow-xl"
      }
    `}
    >
      <div
        className={`${
          pathname !== "/" && pathname !== "/browse"
            ? " pl-5 lg:pl-8 pr-4"
            : "container  mx-auto px-5 md:px-10 lg:px-20"
        }  pt-2`}
      >
        <div className=" w-full flex items-center justify-between">
          <Link to="/">
            <div className=" w-14 h-14">
              <img
                loading="lazy"
                decoding="async"
                src="/images/logo.webp"
                alt="logo"
                className=" w-full h-full object-contain"
              />
            </div>
          </Link>
          <div className=" flex items-center gap-5">
            <Link to="/browse">
              <div className=" flex items-center gap-1">
                <IoCompassOutline className=" w-5 h-5" />
                <span className=" hover:text-zinc-200 hover:underline">
                  Browse
                </span>
              </div>
            </Link>
            {authUser ? (
              <>
                <div className=" px-5 py-1 bg-gry rounded-lg flex items-center gap-2">
                  <div>
                    <TbCoins className=" w-5 h-5 text-coin" />
                  </div>
                  <span className=" text-sm font-semibold">
                    {authUser?.balance}
                  </span>
                  <span className=" hidden md:block">Credits</span>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className=" w-9 h-9 rounded-full border border-border/50 flex items-center justify-center bg-gry"
                  >
                    <p className="profile-font text-center text-2xl -ml-[2px] mt-[2px] text-blue-500">
                      S
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-subMain rounded-box z-1 w-[204px] p-2 shadow-sm mt-3 border border-border/10"
                  >
                    {authUser?.isAdmin && (
                      <>
                        <li className=" mb-1">
                          <Link to="/dashboard">
                            <div className=" flex items-center gap-2">
                              <PanelsTopLeft className=" w-5 h-5 text-zinc-300" />
                              <a className=" text-sm">Dashboard</a>
                            </div>
                          </Link>
                        </li>
                        <li className=" mb-1">
                          <Link to="/all-orders">
                            <div className=" flex items-center gap-2">
                              <ShoppingBag className=" w-5 h-5 text-zinc-300" />
                              <a className=" text-sm">All Orders</a>
                            </div>
                          </Link>
                        </li>
                      </>
                    )}
                    {!authUser?.isAdmin && (
                      <>
                        <li className=" mb-1">
                          <Link to="/my-orders">
                            <div className=" flex items-center gap-2">
                              <ShoppingCartIcon className=" w-5 h-5 text-zinc-300" />
                              <a className=" text-sm">My Orders</a>
                            </div>
                          </Link>
                        </li>
                      </>
                    )}
                    <li className=" mb-1">
                      <Link to="/buy-credits">
                        <div className=" flex items-center gap-2">
                          <TbCoins className=" w-5 h-5 text-zinc-300" />
                          <a className=" text-sm">Buy Credits</a>
                        </div>
                      </Link>
                    </li>
                    <li className=" mb-1">
                      {authUser?.isAdmin ? (
                        <Link to="/chats">
                          <div className=" flex items-center gap-2">
                            <MessageCircleMore className=" w-5 h-5 text-zinc-300" />
                            <a className=" text-sm">Chat</a>
                          </div>
                        </Link>
                      ) : (
                        <Link to="/support">
                          <div className=" flex items-center gap-2">
                            <MessageCircleMore className=" w-5 h-5 text-zinc-300" />
                            <a className=" text-sm">Support</a>
                          </div>
                        </Link>
                      )}
                    </li>
                    <li>
                      <button onClick={logout}>
                        <div className=" flex items-center gap-2">
                          {isLoggingOut ? (
                            <Loader className=" size-5 animate-spin" />
                          ) : (
                            <X className=" w-5 h-5 text-zinc-300" />
                          )}
                          <a className=" text-sm">Logout</a>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button children="Login" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
