import { MessageCircleWarning, X } from "lucide-react";

function UserDeleteModal() {
  const handleDelete = () => {
    console.log("deleted");
    document.getElementById("delete").close();
  };
  return (
    <div>
      <dialog id="delete" className="modal ">
        <div className="modal-box bg-gry max-w-md">
          <form method="dialog">
            <button className=" p-1 rounded-full hover:bg-subGry absolute top-2 right-2">
              <X className=" size-4" />
            </button>
          </form>
          <div className=" flex flex-col items-center ">
            <MessageCircleWarning className=" size-10 text-red-500" />
            <h3 className="font-bold text-lg mt-5">Are you sure?</h3>
            <p className=" text-zinc-300">You want to delete this user</p>
            <div className=" mt-3 w-full flex items-center gap-2">
              <button
                onClick={handleDelete}
                className=" w-full h-7 text-sm bg-red-500 rounded-md"
              >
                Yes
              </button>
              <form method="dialog" className=" w-full h-7">
                <button
                  className=" w-full h-7 text-sm bg-subMain rounded-md"
                  onClick={() => document.getElementById("delete").close()}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default UserDeleteModal;
