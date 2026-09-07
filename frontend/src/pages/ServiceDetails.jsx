import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
  ChevronsRightLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Loader,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import Title from "../utils/Title";
import { TbCoins } from "react-icons/tb";
import FansignCard from "../components/card/FansignCard";
import { Link, useParams } from "react-router-dom";
import { useServiceStore } from "../store/useServiceStore";
import ShinySkeleton from "../components/skeleton/ShinySkeleton";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useSwipeable } from "react-swipeable";
import { useUserStore } from "../store/useUserStore";

function ServiceDetails() {
  const { serviceId } = useParams();

  //fetching service
  const { getSingleService, singleService, isGettingSingleService } =
    useServiceStore();
  useEffect(() => {
    getSingleService(serviceId);
  }, [serviceId]);

  const { authUser } = useAuthStore();
  const { placeOrder, isPlacingOrder } = useUserStore();

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

  // image gallery

  const images = singleService?.images || [];

  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0); // for progress bar
  const intervalRef = useRef(null);
  const thumbRefs = useRef([]);
  thumbRefs.current = images.map(
    (_, i) => thumbRefs.current[i] ?? React.createRef()
  );

  // Scroll thumbnail into view
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const node = thumbRefs.current[current]?.current;
      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [current]);

  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const nextImage = () => {
    if (images.length > 0) {
      setCurrent((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }
  };
  const selectImage = useCallback((index) => {
    setCurrent(index);
  }, []);

  const startAutoplay = () => {
    if (!intervalRef.current && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 9000);
    }
  };

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (images?.length > 0 && current >= images?.length) {
      setCurrent(0); // reset to valid index if out of bounds
    }
  }, [images?.length]);

  //autoplay progress bar
  useEffect(() => {
    // ✅ Skip if fullscreen is not active or only one image
    if (!isFullscreen || images.length <= 1) return;

    let start = performance.now();
    let rafId = null;

    const animateProgress = (now) => {
      const elapsed = now - start;
      const progressPercent = (elapsed / 9000) * 100;

      if (progressPercent >= 100) {
        nextImage(); // move to next image
        start = performance.now(); // reset timer
        setProgress(0); // reset progress bar
      } else {
        setProgress(progressPercent); // update progress bar
      }

      rafId = requestAnimationFrame(animateProgress);
    };

    rafId = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(rafId);
  }, [isFullscreen, images.length, current]); // dependencies

  //keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, nextImage, prevImage]);

  //mobile gesture for image swipe
  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const [usernameOption, setUsernameOption] = useState("default");
  const [customUsernameInput, setCustomUsernameInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [selectedDropdownOption, setSelectedDropdownOption] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]); // checkbox add-ons
  const [selectedCustomFields, setSelectedCustomFields] = useState([]); // radio/dropdown/text
  const [calculatedAmount, setCalculatedAmount] = useState(
    singleService?.price || 0
  );

  // Handle dropdown selection
  const handleDropdownSelect = (option) => {
    setSelectedDropdownOption(option);
  };

  // Handle checkbox add-ons
  const handleExtraToggle = (fieldLabel, optionValue, isChecked) => {
    setSelectedExtras((prev) => {
      let updated = [...prev];
      const existingIndex = updated.findIndex(
        (item) => item.label === fieldLabel
      );

      if (existingIndex === -1 && isChecked) {
        updated.push({ label: fieldLabel, options: [optionValue] });
      } else if (existingIndex !== -1) {
        if (isChecked) {
          updated[existingIndex].options.push(optionValue);
        } else {
          updated[existingIndex].options = updated[
            existingIndex
          ].options.filter((opt) => opt !== optionValue);
          if (updated[existingIndex].options.length === 0) {
            updated.splice(existingIndex, 1);
          }
        }
      }

      return updated;
    });
  };

  // Handle radio/dropdown field change
  const handleCustomFieldChange = (fieldLabel, selectedValue) => {
    setSelectedCustomFields((prev) => {
      const filtered = prev.filter((f) => f.label !== fieldLabel);
      return [...filtered, { label: fieldLabel, options: [selectedValue] }];
    });
  };

  // Auto recalculate amount
  useEffect(() => {
    let total = singleService?.price || 0;

    singleService?.customFields?.forEach((field) => {
      if (field.fieldType === "checkbox") {
        selectedExtras.forEach((addon) => {
          if (addon.label === field.label) {
            field.options.forEach((opt) => {
              if (addon.options.includes(opt.value)) {
                total += opt.extraPrice;
              }
            });
          }
        });
      }

      if (["radio", "dropdown"].includes(field.fieldType)) {
        const selected = selectedCustomFields.find(
          (f) => f.label === field.label
        );
        if (selected) {
          const match = field.options.find(
            (opt) => opt.value === selected.options[0]
          );
          if (match) total += match.extraPrice;
        }
      }
    });

    setCalculatedAmount(total);
  }, [selectedExtras, selectedCustomFields, singleService]);

  const validateForm = () => {
    // validate balance
    if (calculatedAmount > authUser?.balance) {
      toast.error("Insufficient balance");
      return false;
    }

    // Validate username
    if (!usernameOption) {
      toast.error("Please select a username option");
      return false;
    }

    if (usernameOption === "custom" && !customUsernameInput.trim()) {
      toast.error("Please enter a custom username");
      return false;
    }

    // Validate required custom fields
    for (const field of singleService?.customFields || []) {
      if (field.required) {
        if (["radio", "dropdown", "text"].includes(field.fieldType)) {
          const found = selectedCustomFields.find(
            (f) => f.label === field.label
          );
          if (!found || !found.options[0]) {
            toast.error(`Please fill in required field: "${field.label}"`);
            return false;
          }
        }

        if (field.fieldType === "checkbox") {
          const found = selectedExtras.find((f) => f.label === field.label);
          if (!found || found.options.length === 0) {
            toast.error(
              `Please select at least one option for "${field.label}"`
            );
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const finalUsername =
      usernameOption === "default"
        ? authUser?.username
        : customUsernameInput.trim();

    const orderPayload = {
      serviceId,
      amount: calculatedAmount,
      username: finalUsername,
      notes: notesInput,
      selection: selectedDropdownOption,
      addOns: [...selectedExtras, ...selectedCustomFields],
    };

    // Send to server
    placeOrder(orderPayload);
  };

  return (
    <Layout>
      <div className=" w-full min-h-screen pb-10">
        <div className=" container mx-auto px-3 md:px-10 lg:px-20 pt-[1px]">
          <div className=" mt-20 w-full min-h-screen bg-subMain rounded-md p-5">
            {/* service details  */}
            <div className=" lg:grid grid-cols-12 gap-10">
              {/* image gallery */}

              {isGettingSingleService ? (
                <div className=" col-span-5 ">
                  <div className=" p-2 bg-gry rounded-md h-96 border border-border/10 animate-pulse"></div>
                  <div className=" grid grid-cols-3 gap-3 mt-4 ">
                    <div className=" p-1 bg-gry rounded-md border border-border/10 h-32 animate-pulse"></div>
                    <div className=" p-1 bg-gry rounded-md border border-border/10 h-32 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                images?.length > 0 && (
                  <div
                    className="col-span-5"
                    onMouseEnter={stopAutoplay}
                    onMouseLeave={startAutoplay}
                  >
                    {/* Main Image */}
                    <div className="relative p-2 bg-gry rounded-md border border-border overflow-hidden w-full h-60 sm:h-72 md:h-80 lg:h-96">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={current}
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.2 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0"
                        >
                          <img
                            src={images[current]}
                            onClick={openFullscreen}
                            alt="gallery"
                            className="w-full h-full object-cover rounded-md cursor-pointer"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Buttons */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-subGry/70 hover:bg-subGry p-2 rounded-full shadow"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-subGry/70 hover:bg-subGry p-2 rounded-full shadow"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {/* Mobile (scrollable row) */}
                    <div className="mt-1 block lg:hidden overflow-x-auto py-2">
                      <div className="flex gap-3 w-max">
                        {images.map((img, index) => (
                          <div
                            key={img + "-mobile"}
                            ref={thumbRefs.current[index]} // 🔥 Add this line
                            onClick={() => selectImage(index)}
                            className={`min-w-[80px] h-20 rounded-md border cursor-pointer transition-all duration-200 ${
                              index === current
                                ? "border-hedingColor ring-2 ring-hedingColor"
                                : "border-border"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`thumb-${index}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Desktop (grid) */}
                    <div className="mt-4 hidden lg:grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3">
                      {images.map((img, index) => (
                        <div
                          key={img + "-desktop"}
                          onClick={() => selectImage(index)}
                          className={`p-1 rounded-md border h-32 cursor-pointer transition-all duration-200 ${
                            index === current
                              ? "border-hedingColor ring-2 ring-hedingColor"
                              : "border-border"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`thumb-${index}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* full screen image gallery  */}
              <AnimatePresence>
                {isFullscreen && (
                  <motion.div
                    {...handlers}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 flex flex-col justify-center items-center px-4"
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-5 right-5 text-white hover:text-gray-300 z-40"
                    >
                      <X className="w-8 h-8" />
                    </button>

                    {/* Main Image Area */}
                    <div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center">
                      <motion.img
                        key={images[current]}
                        src={images[current]}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-contain"
                      />

                      {/* Prev/Next Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gry/50 hover:bg-gry/70 p-2 rounded-full"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gry/50 hover:bg-gry/70 p-2 rounded-full"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md h-[4px] mt-2 bg-white/20 rounded overflow-hidden">
                      <div
                        className="bg-white h-full transition-all duration-100 linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Bottom Thumbnails */}
                    <div className="w-full max-w-5xl mt-3 px-4">
                      <div className="flex gap-4 justify-center overflow-x-auto py-2">
                        {images.map((img, index) => (
                          <div
                            key={img}
                            onClick={() => selectImage(index)}
                            className={`w-20 h-14 rounded-md cursor-pointer transition-all duration-200 ${
                              current === index
                                ? "ring-2 ring-hedingColor"
                                : "opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`thumb-${index}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* full screen image gallery end */}

              {/* image gallery end */}

              {/* nested details  */}
              <div className=" col-span-7">
                {isGettingSingleService ? (
                  <ShinySkeleton className={"w-64 h-6"} />
                ) : (
                  <h1 className=" mt-3 md:mt-0 text-3xl font-oddliniBold tracking-wide">
                    {singleService?.name}
                  </h1>
                )}
                {isGettingSingleService ? (
                  <ShinySkeleton className={"w-1/2 h-2 mt-2"} />
                ) : (
                  <div className=" flex items-center gap-2">
                    <p className=" text-sm text-zinc-300 uppercase">
                      delivered within {singleService?.deliveryTime} day
                    </p>
                    <ChevronsRightLeft className=" size-4 text-zinc-300" />
                    <p className=" text-sm text-zinc-300 uppercase">
                      {singleService?.revisions} revesion allowed
                    </p>
                  </div>
                )}

                {isGettingSingleService ? (
                  <ShinySkeleton className={"w-full h-10 mt-5"} />
                ) : (
                  <p className=" text-base text-zinc-200 my-4">
                    {singleService?.description}
                  </p>
                )}

                {isGettingSingleService ? (
                  <>
                    <ShinySkeleton className={"w-32 h-6 mt-5"} />
                    <ShinySkeleton className={"w-1/2 h-10 mt-3"} />
                    <ShinySkeleton className={"w-32 h-6 mt-5"} />
                    <ShinySkeleton className={"w-1/2 h-10 mt-3"} />
                    <ShinySkeleton className={"w-32 h-6 mt-5"} />
                    <ShinySkeleton className={"w-1/2 h-10 mt-3"} />
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Username Toggle */}
                    <h3 className="text-sm text-zinc-300 font-medium">
                      Name to use for this fansign:
                    </h3>
                    <div className="flex-col md:flex-row flex md:items-center gap-2 md:gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="username"
                          checked={usernameOption === "default"}
                          onChange={() => setUsernameOption("default")}
                        />
                        {authUser ? (
                          <span>
                            Use my Sign username ({authUser?.username})
                          </span>
                        ) : (
                          <Link to="/login">Login to use your username</Link>
                        )}
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="username"
                          checked={usernameOption === "custom"}
                          onChange={() => setUsernameOption("custom")}
                        />
                        <span>Custom Username</span>
                      </label>
                    </div>

                    {usernameOption === "custom" && (
                      <input
                        type="text"
                        placeholder="Enter custom username"
                        value={customUsernameInput}
                        onChange={(e) => setCustomUsernameInput(e.target.value)}
                        className="mt-2 px-3 py-2 rounded-md bg-gry border border-border w-full text-sm text-white"
                      />
                    )}

                    {/* Notes Field */}
                    {singleService?.details === "notes" && (
                      <div className="my-4">
                        <h3 className="text-sm text-zinc-300 font-medium">
                          Notes:
                        </h3>
                        <textarea
                          name="notes"
                          maxLength="300"
                          value={notesInput}
                          onChange={(e) => setNotesInput(e.target.value)}
                          className="bg-gry rounded-md w-full p-2 text-sm outline-none resize-none focus:border-hedingColor border border-transparent"
                        />
                      </div>
                    )}

                    {/* Dropdown Selection */}
                    {singleService?.details === "selection" && (
                      <div ref={wrapperRef} className="relative w-full">
                        <h3 className="text-sm text-zinc-300 font-medium mb-2">
                          Select:
                        </h3>
                        <button
                          onClick={toggleDropdown}
                          type="button"
                          className="flex justify-between items-center w-full px-4 h-10 text-sm rounded-md bg-gry text-white hover:bg-opacity-80 transition duration-200"
                        >
                          <span>
                            {selectedDropdownOption || "Select option..."}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.ul
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={dropdownVariants}
                              className="absolute z-10 mt-2 w-full bg-gry dark:bg-gray-800 rounded-lg shadow-lg border border-border overflow-hidden"
                            >
                              {singleService?.selection.map((item) => (
                                <li
                                  key={item._id}
                                  onClick={() =>
                                    handleDropdownSelect(item.option)
                                  }
                                  className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-subGry transition ${
                                    selectedDropdownOption === item.option
                                      ? "bg-subGry font-semibold"
                                      : ""
                                  }`}
                                >
                                  <span>{item.option}</span>
                                  {selectedDropdownOption === item.option && (
                                    <Check className="w-4 h-4 text-hedingColor" />
                                  )}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Custom Fields */}
                    {singleService?.customFields?.length > 0 &&
                      singleService.customFields.map((field) => (
                        <div key={field._id} className="my-4">
                          <h3 className="text-sm text-zinc-300 font-medium">
                            {field.label} {field.required && "*"}
                          </h3>

                          {/* Radio */}
                          {field.fieldType === "radio" && (
                            <div className="flex flex-col gap-1 mt-1">
                              {field.options.map((option) => (
                                <label
                                  key={option._id}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="radio"
                                    name={field.label}
                                    value={option.value}
                                    onChange={() =>
                                      handleCustomFieldChange(
                                        field.label,
                                        option.value
                                      )
                                    }
                                    className="accent-pink-500"
                                  />
                                  <span>
                                    {option.value} (+{option.extraPrice}{" "}
                                    credits)
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Checkbox */}
                          {field.fieldType === "checkbox" && (
                            <div className="flex flex-col gap-1 mt-1">
                              {field.options.map((option) => (
                                <label
                                  key={option._id}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    name={field.label}
                                    value={option.value}
                                    onChange={(e) =>
                                      handleExtraToggle(
                                        field.label,
                                        option.value,
                                        e.target.checked
                                      )
                                    }
                                    className="accent-pink-500"
                                  />
                                  <span>
                                    {option.value} (+{option.extraPrice}{" "}
                                    credits)
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Dropdown */}
                          {field.fieldType === "dropdown" && (
                            <select
                              name={field.label}
                              className="border bg-gry mt-1 rounded-md px-2 h-10 text-sm text-white border-border outline-none w-full"
                              onChange={(e) =>
                                handleCustomFieldChange(
                                  field.label,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select...</option>
                              {field.options.map((option) => (
                                <option key={option._id} value={option.value}>
                                  {option.value} (+{option.extraPrice} credits)
                                </option>
                              ))}
                            </select>
                          )}

                          {/* Text Area FieldType */}
                          {field.fieldType === "text" && (
                            <textarea
                              maxLength="300"
                              onChange={(e) =>
                                handleCustomFieldChange(
                                  field.label,
                                  e.target.value
                                )
                              }
                              className="bg-gry mt-1 rounded-md w-full p-2 text-sm outline-none resize-none focus:border-hedingColor border border-transparent"
                            />
                          )}
                        </div>
                      ))}

                    {!authUser && (
                      <Link to="/login">
                        <p className=" text-sm mb-1 text-center font-bold hover:underline">
                          Login to Buy
                        </p>
                      </Link>
                    )}

                    {/* Buy Button */}
                    <div className="w-full">
                      <button
                        disabled={isPlacingOrder || !authUser}
                        type="submit"
                        className={`${
                          !authUser ? "cursor-not-allowed" : " cursor-pointer"
                        } flex items-center justify-center gap-2 w-full h-10 text-lg bg-hedingColor hover:bg-hedingColor/80 transition rounded-md border border-border`}
                      >
                        {isPlacingOrder ? (
                          <Loader className=" animate-spin size-4 text-white" />
                        ) : (
                          <div className=" flex items-center justify-center gap-2">
                            <p className="font-medium">Buy Now</p>
                            <div className="flex items-center gap-1">
                              (<span>{calculatedAmount}</span>
                              <TbCoins className="size-5 text-coin" />)
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
              {/* nested details end */}
            </div>
            {/* service details end */}
            <div className=" my-10">
              <Title title={"Related Fansign"} />
            </div>
            <div className=" mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <FansignCard />
              <FansignCard />
              <FansignCard />
              <FansignCard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ServiceDetails;
