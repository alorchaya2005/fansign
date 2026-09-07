import {
  CircleCheckBig,
  Eye,
  FilePenLine,
  Loader,
  MessageCircleMore,
  Trash2Icon,
} from "lucide-react";
import { TbCoins } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import OrderModal from "../modals/OrderModal";
import { useUserStore } from "../../store/useUserStore";
import { useEffect } from "react";
import { formatPostDate } from "../formatDate";

export function MyOrderTable() {
  const { getMyOrders, isGettingMyOrders, myOrders } = useUserStore();
  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Table Scrollable Content */}
      <div className="overflow-auto flex-1 relative">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase bg-subGry sticky top-0 w-full z-10">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-3 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Cost
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 flex items-end justify-end py-3">
                Action
              </th>
            </tr>
          </thead>
          {isGettingMyOrders ? (
            <div className=" absolute inset-0 flex items-center justify-center">
              <Loader className="animate-spin size-6 text-zinc-300" />
            </div>
          ) : (
            <tbody>
              {myOrders?.map((order) => (
                <>
                  <tr
                    key={order?._id}
                    className="odd:bg-subMain even:bg-gry border-b border-border"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {order?._id}
                    </th>
                    <td className="px-3 py-4 truncate">
                      <p className="w-40 truncate">{order?.username}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{order?.amount}</span>
                        <TbCoins className="text-coin size-4" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {!order?.status && (
                        <div className=" px-2 py-1 w-max bg-coin/10 rounded-md text-xs">
                          <p className=" font-light">Pending</p>
                        </div>
                      )}
                      {order?.status && <CircleCheckBig className=" size-5" />}
                    </td>
                    <td className="px-6 py-4">
                      {formatPostDate(order?.createdAt)}
                    </td>
                    <td className="px-6 flex items-end justify-end py-4">
                      <div className="flex items-center gap-1">
                        <div
                          onClick={() =>
                            document
                              .getElementById(`view_order_${order?._id}`)
                              .showModal()
                          }
                          className="p-1 hover:bg-gry rounded-md"
                        >
                          <Eye className="size-4" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* modal  */}
                  <OrderModal order={order} position={"myOrder"} />
                </>
              ))}
            </tbody>
          )}
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
