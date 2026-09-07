import Layout from "../components/layout/Layout";
import Title from "../utils/Title";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Search, Loader } from "lucide-react";
import FansignCard from "../components/card/FansignCard";
import { useServiceStore } from "../store/useServiceStore";
import { useAdminStore } from "../store/useAdminStore";
import debounce from "lodash.debounce";
import ShinySkeleton from "../components/skeleton/ShinySkeleton";
import { LuInbox } from "react-icons/lu";

function Browse() {
  const { allServices, isGettingServices, searchServices } = useServiceStore();
  const { getAllCategories, allCategories } = useAdminStore();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  // Debounced search
  const debouncedSearch = useRef(
    debounce((category, search) => {
      searchServices({ category, search });
    }, 500)
  ).current;

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    debouncedSearch(selectedCategory, searchText);
    return () => debouncedSearch.cancel();
  }, [selectedCategory, searchText]);

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setIsOpen(false);
  };

  const handleSuggestionClick = (value) => {
    setSearchText(value);
    setDropdownOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (category) => {
    setSelected(category);
    setIsOpen(false);
  };

  const recommendedKeywords = [
    "boobs",
    "ass",
    "thigh",
    "legs",
    "milf",
    "teen",
    "big tits",
  ];

  const animationVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!dropdownOpen || filteredKeywords.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredKeywords.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredKeywords.length - 1
      );
    }

    if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filteredKeywords[highlightedIndex]);
    }
  };

  const filteredKeywords = recommendedKeywords.filter((word) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout>
      <div className=" w-full min-h-screen pb-10">
        <div className=" container mx-auto px-5 md:px-10 lg:px-20 pt-[1px]">
          <div className=" mt-20 w-full min-h-screen bg-subMain rounded-md p-5">
            <div className="grid grid-cols-5 grid-rows-4 gap-4  h-64 ">
              {/* Left Large Section */}
              <div className="col-span-3 row-span-4">
                <div className="w-full h-full bg-gry border border-border rounded-md overflow-hidden">
                  <img
                    src="https://img.freepik.com/free-psd/k-pop-banner-template-illustrated_23-2148644314.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Top Box */}
              <div className="col-span-2 row-span-2 col-start-4">
                <div className="w-full h-full bg-gry rounded-md border border-border overflow-hidden">
                  <img
                    src="https://raketcontent.com/large_5_20240624_020815_0004_d4797cd3be.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Bottom Box */}
              <div className="col-span-2 row-span-2 col-start-4 row-start-3">
                <div className="w-full h-full bg-gry border border-border rounded-md overflow-hidden">
                  <img
                    src="https://raketcontent.com/1/7_20240624_020815_0006_320e72d6de.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className=" mt-10">
              <Title title={"Browse"} />
              <p className=" text-center text-zinc-400">
                Have a look at the marketplace
              </p>
            </div>
            {/* browse  */}
            <div className=" mt-5">
              <div className=" flex items-center gap-4">
                {/* select category   */}
                <div ref={wrapperRef} className="relative w-full max-w-sm ">
                  {/* Select Button */}
                  <button
                    onClick={toggleDropdown}
                    className="flex justify-between items-center w-full px-4 h-10 text-sm rounded-lg bg-gry text-white hover:bg-opacity-80 transition duration-200"
                  >
                    <span className="flex items-center gap-2">
                      {selectedCategory ? (
                        <>{selectedCategory}</>
                      ) : (
                        <span className="text-gray-300">
                          Select category...
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown List */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute z-10 mt-2 w-full bg-gry dark:bg-gray-800 rounded-lg shadow-lg border border-border overflow-hidden"
                      >
                        <li
                          onClick={() => handleCategorySelect("")}
                          className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-subGry transition
                           
                            ${
                              selectedCategory === ""
                                ? "bg-subGry  font-semibold"
                                : ""
                            } 
                             
                          `}
                        >
                          <span>All</span>
                        </li>
                        {allCategories?.map((category) => (
                          <li
                            key={category?._id}
                            onClick={() => handleCategorySelect(category?.name)}
                            className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-subGry transition ${
                              selectedCategory === category?.name
                                ? "bg-subGry  font-semibold"
                                : ""
                            }`}
                          >
                            <span>{category?.name}</span>
                            {selectedCategory === category?.name && (
                              <Check className="w-4 h-4 text-hedingColor" />
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                {/* select category end  */}

                {/* search input */}
                <div ref={dropdownRef} className="relative w-full">
                  {/* Input */}
                  <div className="w-full relative rounded-lg">
                    <input
                      type="text"
                      ref={inputRef}
                      placeholder="Search for service"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                        setDropdownOpen(true);
                        setHighlightedIndex(-1);
                      }}
                      onFocus={() => {
                        setDropdownOpen(true);
                      }}
                      onKeyDown={handleKeyDown}
                      className="w-full outline-none bg-gry rounded-lg px-8 h-10 text-sm text-zinc-300 capitalize"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-zinc-300" />
                  </div>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && filteredKeywords.length > 0 && (
                      <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={animationVariants}
                        className="absolute z-10 mt-1 w-full bg-gry  rounded-lg shadow-lg border border-border  overflow-hidden "
                      >
                        {filteredKeywords.map((word, index) => (
                          <li
                            key={word}
                            onClick={() => handleSuggestionClick(word)}
                            className={`px-4 py-2 text-sm cursor-pointer capitalize transition ${
                              highlightedIndex === index
                                ? "bg-subGry  text-zinc-200 "
                                : "text-zinc-200  hover:bg-subGry "
                            } `}
                          >
                            {word}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                {/* search input end */}
              </div>

              {/* fansigns  */}
              {isGettingServices ? (
                <div className=" h-[70vh]  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <ShinySkeleton key={i} className="h-80 w-full" />
                  ))}
                </div>
              ) : (
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                  {allServices?.map((service) => (
                    <FansignCard key={service._id} fansign={service} />
                  ))}
                </div>
              )}
              {allServices?.length === 0 && !isGettingServices && (
                <div className=" w-full h-[40vh] flex flex-col items-center justify-center">
                  <LuInbox className=" mb-2 size-7 text-zinc-400" />
                  <h1 className=" text-zinc-400">No fansign found</h1>
                </div>
              )}

              {/* fansigns end */}
            </div>
            {/* browse end */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Browse;
