import React from "react";
import { Loader, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { MdOutlineCurrencyBitcoin } from "react-icons/md";
import { FaStripeS } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

function BuyOptions() {
  const [credits, setCredits] = useState({
    name: "Sign Credits",
    amount: 10,
  });

  const [stripeLoading, setStripeLoading] = useState(false);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51RkoGIHCLlwEhtFgEBwlmsTAFc5aR0gygn0v0bhQR7Ek7VNmS3zFyaHia07eQdciGHUVYTnYffGA6AoP3VVCHu2u00tHVA4DQ6"
    );

    setStripeLoading(true);

    try {
      console.log("credits", credits);

      const res = await axiosInstance.post("/payment/create-checkout-session", {
        name: credits.name,
        amount: credits.amount,
      });
      console.log(res.data);

      const session = await res.data;

      if (!session?.id) {
        return;
      }
      setStripeLoading(false);
      stripe.redirectToCheckout({
        sessionId: session?.id,
      });
    } catch (error) {
      console.log("Error in makePayment stripe", error);
      setStripeLoading(false);
      toast.error(error.message);
    }
  };

  const validate = () => {
    if (!credits.amount) return toast.error("Amount is required");
    if (credits.amount < 5) return toast.error("Minimum purchase is 5 credit");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validate();

    if (success === true) {
      makePayment();
    }
  };

  return (
    <div className=" h-full w-full border-l border-border">
      <div className=" w-full h-full flex flex-col items-center justify-center ">
        <h1 className=" text-3xl font-bold ">Buy Credits</h1>
        {/* input  */}
        <div className=" flex items-center gap-2 mt-2">
          <div
            onClick={() =>
              setCredits({ ...credits, amount: credits.amount - 1 })
            }
            className=" p-[1px] hover:bg-gry/30 cursor-pointer"
          >
            <Minus />
          </div>
          <div className=" w-14 bg-gry rounded-md">
            <input
              type="text"
              value={credits.amount}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setCredits({ ...credits, amount: value });
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()
              }
              className=" w-full px-2 py-1 text-center outline-none bg-transparent"
            />
          </div>
          <div
            onClick={() =>
              setCredits({ ...credits, amount: credits.amount + 1 })
            }
            className=" p-[1px] hover:bg-gry/30 cursor-pointer"
          >
            <Plus />
          </div>
        </div>

        {/* quick select  */}
        <h4 className=" mt-3 leading-3 text-sm font-light">Quick Select</h4>
        <div className=" grid grid-cols-3 gap-3 mt-1">
          {[20, 50, 100].map((amount, i) => (
            <div
              key={i}
              className=" p-[1px] hover:bg-secondary/20 cursor-pointer border-b border-border/20"
            >
              <button
                className=" w-full px-2 py-1 text-center outline-none bg-transparent"
                onClick={() => setCredits({ ...credits, amount: amount })}
              >
                {amount}
              </button>
            </div>
          ))}
        </div>

        {/* total  */}
        <div className="  flex items-center mt-2 gap-2">
          <h1 className=" text-lg font-medium ">Total: </h1>
          <h1 className=" text-lg  tracking-wide title-font ">
            {" "}
            ${credits.amount}
          </h1>
        </div>

        {/* devider  */}
        <div className=" flex items-center gap-2 my-1">
          <div className=" w-20 border-b border-border/20" />
          <span className=" text-sm font-light">Pay With</span>
          <div className=" w-20 border-b border-border/20" />
        </div>

        {/* pay with  */}
        <div className=" flex items-center gap-2 mt-2">
          <div
            className="lg:tooltip lg:tooltip-left lg:tooltip-accent"
            data-tip="Crypto 50+"
          >
            <div className=" w-10 h-8 rounded-md bg-gry hover:bg-gry/80 cursor-pointer flex items-center justify-center">
              <MdOutlineCurrencyBitcoin className=" text-white size-6" />
            </div>
          </div>
          <div
            className="lg:tooltip lg:tooltip-right lg:tooltip-accent"
            data-tip="Stripe"
          >
            <div
              onClick={handleSubmit}
              className=" w-10 h-8 rounded-md bg-gry hover:bg-gry/80 cursor-pointer flex items-center justify-center"
            >
              {stripeLoading ? (
                <Loader className=" size-5 animate-spin text-white" />
              ) : (
                <FaStripeS className=" text-white size-5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyOptions;
