import Layout from "../components/layout/Layout";
import SignBalanceCard from "../components/buyCredits/SignBalanceCard";
import BuyOptions from "../components/buyCredits/BuyOptions";
import BillingHistory from "../components/buyCredits/BillingHistory";

function BuyCredits() {
  return (
    <Layout>
      <div className=" w-full min-h-screen pb-10">
        <div className=" container mx-auto px-5 md:px-10 lg:px-20 pt-[1px]">
          <div className=" w-full min-h-64 bg-subMain mt-24 rounded-t-3xl p-5 ">
            <div className=" md:grid h-full grid-cols-2 gap-10">
              <SignBalanceCard />
              <BuyOptions />
            </div>
          </div>
          <div className=" mt-5">
            <BillingHistory />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BuyCredits;
