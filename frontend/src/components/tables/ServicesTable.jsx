import { FilePenLine, Trash2Icon } from "lucide-react";
import { TbCoins } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export function ServicesTable() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Table Scrollable Content */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase bg-subGry sticky top-0 w-full z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                Service ID
              </th>
              <th scope="col" className="px-3 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Starting From
              </th>
              <th scope="col" className="px-6 py-3">
                Sold
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 flex items-end justify-end py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-subMain even:bg-gry border-b border-border">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                123456789009876543212345
              </th>
              <td className="px-3 py-4 truncate">
                <p className="w-40 truncate">
                  Lorem ipsum dolor sit amet ss hfs faof jds jdfs dsdfjs
                </p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span>18</span>
                  <TbCoins className="text-coin size-4" />
                </div>
              </td>
              <td className="px-6 py-4">10</td>
              <td className="px-6 py-4">2-10-2025</td>
              <td className="px-6 flex items-end justify-end py-4">
                <div className="flex items-center gap-1">
                  <div
                    onClick={() => document.getElementById("edit").showModal()}
                    className="p-1 hover:bg-gry rounded-md"
                  >
                    <FilePenLine className="size-4" />
                  </div>
                  <div
                    onClick={() =>
                      document.getElementById("delete").showModal()
                    }
                    className="p-1 hover:bg-gry rounded-md"
                  >
                    <Trash2Icon className="size-4 text-red-500" />
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
    </div>
  );
}
