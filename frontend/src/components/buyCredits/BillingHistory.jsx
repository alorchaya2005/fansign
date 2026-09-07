import { Dot, Loader } from "lucide-react";
import React, { useEffect } from "react";
import BillingTable from "../tables/BillingTable";
import { useUserStore } from "../../store/useUserStore";

function BillingHistory() {
  const { getBillingHistory, isGettingBillingHistory, billingHistory } =
    useUserStore();
  useEffect(() => {
    getBillingHistory();
  }, []);
  return (
    <div className=" h-[70vh] w-full p-5 bg-subMain overflow-y-auto rounded-b-3xl">
      <div className=" flex items-center">
        <h1 className=" text-sm opacity-80">Billing History</h1>
        <Dot className=" opacity-80 mt-1 size-6 text-hedingColor" />
      </div>
      <div className=" mt-2 mb-4 w-full border-b border-border" />
      <div>
        {isGettingBillingHistory ? (
          <div className=" flex items-center justify-center">
            <Loader className=" animate-spin size-5 text-white mt-20" />
          </div>
        ) : billingHistory?.length === 0 ? (
          <div className=" flex items-center justify-center">
            <h1 className=" text-sm opacity-80 mt-20">
              No billing history yet
            </h1>
          </div>
        ) : (
          <BillingTable />
        )}
      </div>
    </div>
  );
}

export default BillingHistory;
