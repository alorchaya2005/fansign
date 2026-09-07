import { Loader, SquarePenIcon, X } from "lucide-react";
import { useAdminStore } from "../../store/useAdminStore";
import { useState } from "react";

function CreateCategoryModal() {
  const [name, setName] = useState("");
  const { createCategory, isCreatingCategory } = useAdminStore();
  return (
    <div>
      <dialog id="create_category" className="modal ">
        <div className="modal-box bg-gry max-w-md">
          <form method="dialog">
            <button className=" p-1 rounded-full hover:bg-subGry absolute top-2 right-2">
              <X className=" size-4" />
            </button>
          </form>
          <div className=" flex flex-col items-center ">
            <SquarePenIcon className=" size-10 text-zinc-500" />
            <h1 className=" text-zinc-400 mt-5">Creating New Category</h1>
            <div className=" w-full flex items-center gap-2 mt-3">
              <div className="  w-full">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=" text-sm w-full py-1.5  px-4 border border-border rounded-md outline-none focus:border-hedingColor bg-transparent"
                />
              </div>
              <button
                disabled={isCreatingCategory || name.length === ""}
                onClick={() => createCategory({ name })}
                className=" px-4 h-[35px] border border-border text-sm bg-subMain rounded-md"
              >
                {isCreatingCategory ? (
                  <Loader className=" animate-spin size-4 text-white" />
                ) : (
                  "Create"
                )}
              </button>
            </div>
            <button
              onClick={() => document.getElementById("create_category").close()}
              className=" mt-2 w-full h-7 text-sm bg-subGry rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default CreateCategoryModal;
