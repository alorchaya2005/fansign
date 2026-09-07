import React from "react";
import DashSidebar from "../../components/layout/DashSidebar";
import Layout from "../../components/layout/Layout";
import { UsersTable } from "../../components/tables/UsersTable";

function Users() {
  return (
    <Layout>
      {/* Fixed Sidebar */}
      <DashSidebar />

      {/* Main content wrapper with padding to avoid overlap */}
      <div className="min-h-screen pl-16 md:pl-[270px] md:pr-4 pt-20 pb-6 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center px-4 md:px-0 gap-2 justify-between ">
          <div>
            <h1 className="mt-4 text-2xl leading-none font-oddliniMedium tracking-wider">
              Users
            </h1>
            <p className="text-sm text-zinc-300 font-medium">
              You can find and manage all user here
            </p>
          </div>

          {/* Search */}
          <div className="w-64">
            <input
              type="text"
              placeholder="Search by id or username"
              className="w-full px-4 py-1.5 border border-border text-sm outline-none focus:border-hedingColor rounded-md bg-subMain"
            />
          </div>
        </div>

        {/* table  */}
        <div className="bg-subMain p-3 mt-4 rounded-md flex flex-col h-[76vh] overflow-y-auto">
          <UsersTable />
        </div>
      </div>
    </Layout>
  );
}

export default Users;
