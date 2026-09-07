import React from "react";
import DashSidebar from "../../components/layout/DashSidebar";
import Layout from "../../components/layout/Layout";
import { AllOrdersTable } from "../../components/tables/AllOrdersTable";

function GetAllOrders() {
  return (
    <Layout>
      {/* Fixed Sidebar */}
      <DashSidebar />
      {/* Main content wrapper with padding to avoid overlap */}
      <div className="min-h-screen pl-16 md:pl-[270px] md:pr-4 pt-20 pb-6 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center px-4 md:px-0 gap-2 justify-between ">
          <div>
            <h1 className="mt-4 text-2xl leading-none font-oddliniMedium tracking-wider ">
              Orders
            </h1>
            <h1 className=" text-sm text-zinc-300 font-medium ">
              You can find and manage all orders here
            </h1>
          </div>
          {/* search input  */}
          <div className=" w-64">
            <input
              type="text"
              placeholder="Search by id or username"
              className=" w-full px-4 py-1.5 border border-border text-sm outline-none focus:border-hedingColor rounded-md bg-subMain"
            />
          </div>
        </div>

        {/* table  */}
        <div className="bg-subMain p-3 mt-4 rounded-md flex flex-col h-[76vh] overflow-y-auto">
          <AllOrdersTable />
        </div>
      </div>
    </Layout>
  );
}

export default GetAllOrders;
