import { cn } from "../../lib/utils";
import { useEffect, useState, useRef } from "react";
import Rating from "../../utils/Rating";
import { FaDiscord } from "react-icons/fa6";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative h-52  w-[250px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-700 bg-subMain px-8 py-6 md:w-[350px]  "
            key={idx}
          >
            <div
              aria-hidden="true"
              className="user-select-none pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
            ></div>
            <div className=" w-full flex items-center justify-between">
              <div className=" flex items-center gap-2 rounded-full overflow-hidden w-max bg-main/50 pr-5 shadow-md">
                <div className=" w-10 h-10">
                  <img
                    src={item?.discord_avatar}
                    alt={item?.discord_name}
                    className=" w-full h-full object-cover"
                  />
                </div>
                <span className="relative z-20 text-sm leading-[1.6] font-normal text-gray-100">
                  {item.discord_name}
                </span>
              </div>
              <div>
                <FaDiscord className=" size-5 opacity-50" />
              </div>
            </div>
            <div className="relative z-20 mt-6 flex flex-row items-center">
              <span className="flex flex-col gap-1">
                <div className=" flex items-center gap-1">
                  <Rating value={item?.stars} />
                </div>
                <span className="text-sm leading-[1.6] font-normal text-gray-300">
                  {item.content}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
