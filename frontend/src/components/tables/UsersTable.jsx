import { CircleCheckBig, Trash2Icon, UserRoundPenIcon } from "lucide-react";
import { TbCoins } from "react-icons/tb";
import UserDeleteModal from "../modals/UserDeleteModal";
import UserEditModal from "../modals/UserEditModal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export function UsersTable() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Table Scrollable Content */}
      <div className="overflow-auto flex-1">
        <table className="w-full  text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase bg-subGry sticky top-0 w-full z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Purchase
              </th>
              <th scope="col" className="px-6 py-3">
                Credits
              </th>
              <th scope="col" className="px-6 py-3">
                Postition
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
              <th scope="col" className="px-6 flex items-end justify-end py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap "
              >
                123456789009876543212345
              </th>
              <td className="px-6 py-4">2</td>
              <td className="px-6 py-4">
                <div className=" flex items-center gap-2">
                  <span>38</span>
                  <TbCoins className=" text-coin size-4" />
                </div>
              </td>
              <td className="px-6 py-4">User</td>
              <td className="px-6 py-4">2-10-2025</td>
              <td className="px-6  flex items-end justify-end py-4">
                <div className=" flex items-center gap-1 ">
                  <div
                    onClick={() => document.getElementById("edit").showModal()}
                    className=" p-1 hover:bg-gry rounded-md"
                  >
                    <UserRoundPenIcon className=" size-4" />
                  </div>
                  <div
                    onClick={() =>
                      document.getElementById("delete").showModal()
                    }
                    className=" p-1 hover:bg-gry rounded-md"
                  >
                    <Trash2Icon className=" size-4 text-red-500" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Sticky Footer Control */}
      <div className="pt-2 flex items-center justify-between bg-subMain">
        <div></div>
        <div className="flex items-center gap-5">
          <div className="p-1 rounded-full bg-gry cursor-pointer">
            <IoIosArrowBack className="size-6 text-zinc-300" />
          </div>
          <div className="p-1 rounded-full bg-gry cursor-pointer">
            <IoIosArrowForward className="size-6 text-zinc-300" />
          </div>
        </div>
      </div>

      {/* modals  */}
      <UserEditModal />
      <UserDeleteModal />
    </div>
  );
}
