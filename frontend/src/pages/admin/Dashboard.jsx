import React from "react";
import DashSidebar from "../../components/layout/DashSidebar";
import Layout from "../../components/layout/Layout";
import RevenueChart from "../../components/admin/RevenueChart";
import { Link } from "react-router-dom";
import LatestOrdersTable from "../../components/tables/LatestOrdersTable";

function Dashboard() {
  return (
    <Layout>
      {/* Fixed Sidebar */}
      <DashSidebar />

      {/* Main content wrapper with padding to avoid overlap */}
      <div className="min-h-screen pl-16 md:pl-[270px] md:pr-4 pt-16 pb-6 transition-all duration-300">
        <div className="">
          {/* upper section  */}
          <div className="grid grid-cols-5 grid-rows-4 gap-4 mt-4">
            <div className="col-span-3 row-span-4">
              <div className=" p-2 bg-subMain rounded-md">
                <h5 className=" pl-4 pt-3">Revenue</h5>
                <RevenueChart />
              </div>
            </div>
            <div className="row-span-2 col-start-4">
              <div className=" w-full h-full p-2 bg-subMain rounded-md flex flex-col items-center justify-center">
                <h4 className=" font-medium text-zinc-300">Total Users</h4>
                <h4 className=" font-oddliniBold text-4xl mt-2">30</h4>
              </div>
            </div>
            <div className="row-span-2 col-start-5">
              <div className=" w-full h-full p-2 bg-subMain rounded-md flex flex-col items-center justify-center">
                <h4 className=" font-medium text-zinc-300">Revenue</h4>
                <h4 className=" font-oddliniBold text-4xl mt-2">$3000</h4>
              </div>
            </div>
            <div className="row-span-2 col-start-4 row-start-3">
              <div className=" w-full h-full p-2 bg-subMain rounded-md flex flex-col items-center justify-center">
                <h4 className=" font-medium text-zinc-300">Services</h4>
                <h4 className=" font-oddliniBold text-4xl mt-2">14</h4>
              </div>
            </div>
            <div className="row-span-2 col-start-5 row-start-3">
              <div className=" w-full h-full p-2 bg-subMain rounded-md flex flex-col items-center justify-center">
                <h4 className=" font-medium text-zinc-300">Pending Orders</h4>
                <h4 className=" font-oddliniBold text-4xl mt-2">3</h4>
              </div>
            </div>
          </div>
          {/* lower section  */}

          <div className="grid grid-cols-5 grid-rows-5 gap-4 mt-4">
            <div className="col-span-2 row-span-5">
              <div className=" bg-subMain p-2 rounded-md  overflow-y-auto h-96">
                <h3 className=" pl-4 pt-3">New Messages</h3>
                <div className=" px-4 mt-2">
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" whitespace-nowrap font-oddliniRegular text-xs text-zinc-300">
                          Just Now
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" font-oddliniRegular text-xs text-zinc-300">
                          1min
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" font-oddliniRegular text-xs text-zinc-300">
                          1h
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" font-oddliniRegular text-xs text-zinc-300">
                          1h
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" font-oddliniRegular text-xs text-zinc-300">
                          1h
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" font-oddliniRegular text-xs text-zinc-300">
                          1h
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className=" flex items-center justify-between gap-2 px-2 py-1 hover:bg-gry rounded-md mb-2">
                      <div className=" flex items-center gap-2 w-full">
                        <div className=" max-w-10 max-h-10 w-full h-10 rounded-full p-1 flex items-center justify-center bg-main border border-border ">
                          <p className=" uppercase profile-font mr-1">r</p>
                        </div>
                        <div className=" w-full">
                          <h5 className=" font-oddliniRegular text-sm capitalize">
                            ronaldo
                          </h5>
                          <p className=" w-40 truncate font-oddliniRegular text-xs text-zinc-300">
                            Lorem de ipsum is my hart and soul
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className=" font-oddliniRegular text-xs text-zinc-300">
                          1h
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-span-3 row-span-5 col-start-3 ">
              <div className=" bg-subMain p-2 rounded-md h-96 overflow-y-auto">
                <h3 className=" pl-4 pt-3">Latest Orders</h3>
                <div className=" px-4 mt-2">
                  <LatestOrdersTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
