import { SquarePenIcon, X } from "lucide-react";
import { TbCoins } from "react-icons/tb";

function UserEditModal() {
  return (
    <div>
      <dialog id="edit" className="modal ">
        <div className="modal-box bg-gry max-w-md">
          <form method="dialog">
            <button className=" p-1 rounded-full hover:bg-subGry absolute top-2 right-2">
              <X className=" size-4" />
            </button>
          </form>
          <div className=" flex flex-col items-center ">
            <SquarePenIcon className=" size-10 text-zinc-500" />
            <h1 className=" text-zinc-400 mt-5">Editing: musk66</h1>
            <div className=" w-full flex items-center gap-2 mt-3">
              <div className=" relative w-full">
                <div className=" absolute left-2.5 top-1/2 -translate-y-1/2">
                  <TbCoins className=" size-4 text-coin" />
                </div>
                <input
                  type="text"
                  placeholder="Current Balance: 38 "
                  className=" text-sm w-full py-1.5 pl-8 pr-4 border border-border rounded-md outline-none focus:border-hedingColor bg-transparent"
                />
              </div>
              <button className=" px-4 h-[35px] border border-border text-sm bg-subMain rounded-md">
                Save
              </button>
            </div>
            <button
              onClick={() => document.getElementById("edit").close()}
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

export default UserEditModal;
