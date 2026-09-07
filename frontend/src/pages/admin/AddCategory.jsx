import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import DashSidebar from "../../components/layout/DashSidebar";
import { Blocks, Loader, Pencil, Trash } from "lucide-react";
import CreateCategoryModal from "../../components/modals/CreateCategoryModal";
import EditCategoryModal from "../../components/modals/EditCategoryModal";
import DeleteCategoryModal from "../../components/modals/DeleteCategoryModal";
import { useAdminStore } from "../../store/useAdminStore";

function AddCategory() {
  const { allCategories, getAllCategories, isGettingCategories } =
    useAdminStore();
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      {/* Fixed Sidebar */}
      <DashSidebar />

      {/* Main content wrapper with padding to avoid overlap */}
      <div className="min-h-screen pl-16 md:pl-[270px] md:pr-4 pt-20 pb-6 transition-all duration-300">
        {/* Header */}

        <div>
          <h1 className="mt-4 text-2xl leading-none font-oddliniMedium tracking-wider ">
            Categories
          </h1>
          <h1 className=" text-sm text-zinc-300 font-medium ">
            You can view and manage all categories
          </h1>
        </div>

        {/* all categories  */}
        <div className=" mt-4 h-[75vh] bg-subMain rounded-md p-6">
          <div className=" flex items-center justify-between">
            <div></div>

            <button
              onClick={() =>
                document.getElementById("create_category").showModal()
              }
              className=" px-4 h-8 border border-border text-sm bg-inputBg rounded-md"
            >
              Create
            </button>
          </div>
          {isGettingCategories ? (
            <div className=" flex items-center justify-center w-full h-full">
              <Loader className=" animate-spin size-5 text-white" />
            </div>
          ) : allCategories?.length === 0 ? (
            <div className=" flex items-center justify-center w-full h-full">
              <p className=" text-sm text-zinc-300">No categories found</p>
            </div>
          ) : (
            <div className=" mt-4 gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {allCategories?.map((category) => (
                <div
                  key={category?._id}
                  className=" relative group rounded-md bg-inputBg p-3 flex items-center justify-center flex-col"
                >
                  <Blocks className=" size-7 opacity-50" />
                  <h1 className=" mt-3 text-lg text-zinc-200 font-oddliniMedium">
                    {category?.name}
                  </h1>

                  <div className=" hidden group-hover:block absolute top-2 right-2">
                    <div className=" flex items-center gap-1">
                      <div
                        onClick={() =>
                          document
                            .getElementById(`edit_category${category?._id}`)
                            .showModal()
                        }
                        className=" p-1.5 rounded-full hover:bg-subMain"
                      >
                        <Pencil className=" size-4" />
                      </div>
                      <div
                        onClick={() =>
                          document
                            .getElementById(`delete_category${category?._id}`)
                            .showModal()
                        }
                        className=" p-1.5 rounded-full hover:bg-red-500/50"
                      >
                        <Trash className=" size-4" />
                      </div>
                    </div>
                  </div>
                  <EditCategoryModal category={category} />
                  <DeleteCategoryModal category={category} />
                </div>
              ))}

              {/* end */}
            </div>
          )}
        </div>
      </div>

      {/* modals  */}
      <CreateCategoryModal />
    </Layout>
  );
}

export default AddCategory;
