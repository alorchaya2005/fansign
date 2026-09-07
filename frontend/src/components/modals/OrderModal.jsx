import {
  CircleCheckBig,
  CircleDotDashed,
  Eye,
  FileBox,
  FileInput,
  FileSearch,
  HandCoins,
  SquarePenIcon,
  UserRound,
  UserRoundSearch,
  X,
} from "lucide-react";
import { TbCoins } from "react-icons/tb";
import MarkOrderCompleteModal from "./MarkOrderCompleteModal";

function OrderModal({ position, order }) {
  return (
    <div>
      <dialog id={`view_order_${order?._id}`} className="modal ">
        <div className="modal-box bg-gry max-w-2xl">
          <form method="dialog">
            <button className=" p-1 rounded-full hover:bg-subGry absolute top-2 right-2">
              <X className=" size-4" />
            </button>
          </form>
          <div className=" grid grid-cols-12 gap-2">
            {/* order details section */}
            <div className=" col-span-6">
              <div className=" flex md:items-center gap-2">
                <div>
                  <FileBox className=" size-4 md:size-5" />
                </div>
                <p className=" text-zinc-300 mt-1 text-xs md:text-sm break-all">
                  <span className=" font-medium text-white break-all">
                    Order ID :
                  </span>{" "}
                  {order?._id}
                </p>
              </div>
              <div className=" flex md:items-center gap-2 mt-1">
                <div>
                  <UserRoundSearch className=" size-4 md:size-5" />
                </div>
                <p className=" text-zinc-300 mt-1 text-xs md:text-sm break-all">
                  <span className=" font-medium text-white">User ID :</span>{" "}
                  {order?.userId?._id}
                </p>
              </div>
              <div className=" flex md:items-center gap-2 mt-1">
                <div>
                  <UserRound className=" size-4 md:size-5" />
                </div>
                <p className=" text-zinc-300 mt-1 text-xs md:text-sm">
                  <span className=" font-medium text-white">Username :</span>{" "}
                  {order?.username}
                </p>
              </div>
              <div className=" flex items-center gap-2 mt-1">
                <div>
                  <HandCoins className=" size-4 md:size-5" />
                </div>
                <div className=" text-zinc-300 mt-1 flex gap-1 text-xs md:text-sm">
                  <span className=" font-medium text-white">Cost :</span>
                  <div className=" flex items-center gap-1">
                    <p>{order?.amount}</p>
                    <TbCoins className=" size-4 text-coin" />
                  </div>
                </div>
              </div>
              <div className=" flex items-center gap-2 mt-1.5">
                <div>
                  <CircleDotDashed className=" size-4 md:size-5" />
                </div>
                <div className=" text-zinc-300 mt-1 flex gap-1 text-xs md:text-sm">
                  <span className=" font-medium text-white">Status :</span>
                  {!order?.status && (
                    <div className=" px-2 py-1 w-max bg-coin/20 rounded-md text-xs">
                      <p className=" font-light text-white">Pending</p>
                    </div>
                  )}
                  {order?.status && (
                    <CircleCheckBig className=" size-4 md:size-5" />
                  )}
                </div>
              </div>
            </div>
            {/* order details section end  */}

            {/* which service user ordered section */}
            <div className=" col-span-6 pl-2  border-l border-border">
              <div className=" flex md:items-center gap-2">
                <div>
                  <FileSearch className=" size-4 md:size-5" />
                </div>
                <p className=" text-zinc-300 mt-1 text-xs md:text-sm break-all">
                  <span className=" font-medium text-white">Service ID :</span>{" "}
                  {order?.serviceId._id}
                </p>
              </div>
              <div className=" flex items-center gap-2 mt-1">
                <div>
                  <FileInput className=" size-4 md:size-5" />
                </div>
                <div className=" flex items-center justify-between w-full">
                  <p className=" w-40 md:w-56 truncate text-zinc-300 text-xs md:text-sm">
                    <span className=" font-medium text-white">Name :</span>{" "}
                    {order?.serviceId.name}
                  </p>

                  <a
                    href={`/fansign/${order?.serviceId._id}`}
                    className="p-1 hover:bg-subMain rounded-md"
                  >
                    <Eye className="size-4" />
                  </a>
                </div>
              </div>
              <div className=" my-4 border-b border-border" />

              {/* order status  */}
              <div className={`${position === "myOrder" && "hidden"}`}>
                <h3 className=" text-xs 2xl:text-sm font-medium text-zinc-300">
                  Change Status
                </h3>
                <div className="w-full flex items-center justify-between gap-1 mt-1">
                  {order?.status ? (
                    <p>Order already completed</p>
                  ) : (
                    <>
                      <p className=" text-sm">Mark order as completed</p>
                      <div
                        onClick={() =>
                          document
                            .getElementById(`mark_${order?._id}`)
                            .showModal()
                        }
                        className=" p-1.5 hover:bg-subMain rounded-full"
                      >
                        <CircleCheckBig className=" size-4 md:size-5" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                className={`${
                  position === "allOrders" && "hidden"
                } w-full flex items-center justify-center`}
              >
                <p className=" text-2xl text-zinc-400 profile-font">
                  Good to go
                </p>
              </div>
              {/* order status end */}
            </div>
            {/* which service user ordered section end */}

            <div className=" col-span-12 border-b border-border mb-2" />

            {/* notes  */}
            <div className=" col-span-12">
              <h3 className=" text-xs md:text-sm font-medium text-zinc-300">
                Notes
              </h3>

              <div className=" mt-1 rounded-md bg-subMain p-2 border border-border">
                <p className=" text-sm text-zinc-200">
                  {order?.notes || "N/A"}
                </p>
              </div>
            </div>
            {/* notes end */}

            {/* selection  */}
            <div className=" col-span-12">
              <h3 className=" text-xs md:text-sm font-medium text-zinc-300">
                Selected option
              </h3>

              <div className=" mt-1 rounded-md bg-subMain p-2 border border-border">
                <p className=" text-sm text-zinc-200">
                  {order?.selection || "N/A"}
                </p>
              </div>
            </div>
            {/* selection end */}

            {/* add ons  */}
            <div className=" col-span-12">
              <h3 className=" text-xs md:text-sm font-medium text-zinc-300">
                Add ons
              </h3>
              <div className=" mt-1 rounded-md bg-subMain p-2 border border-border">
                {order?.addOns?.map((addOn, index) => (
                  <div key={index} className=" mt-1">
                    <h3 className=" text-xs md:text-base">
                      {index + 1}. {addOn.label}
                    </h3>
                    <div className=" pl-5">
                      {addOn?.options?.map((option) => (
                        <li
                          key={option?._id}
                          className=" text-xs md:text-sm text-zinc-300"
                        >
                          {option}
                        </li>
                      ))}
                    </div>
                  </div>
                ))}

                {order?.addOns?.length === 0 && (
                  <p className=" text-sm text-zinc-200">N/A</p>
                )}
              </div>
            </div>
            {/* add ons end */}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* modals  */}
      <MarkOrderCompleteModal orderId={order?._id} />
    </div>
  );
}

export default OrderModal;
