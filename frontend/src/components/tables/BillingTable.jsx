import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import { MdOutlineCurrencyBitcoin } from "react-icons/md";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import { Ban, CircleCheckBig } from "lucide-react";
import { formatPostDate } from "../formatDate";

function BillingTable() {
  const { billingHistory } = useUserStore();
  const { authUser } = useAuthStore();
  return (
    <div className=" overflow-x-auto no-scrollbar">
      <table className="w-full  text-sm text-left rtl:text-right ">
        <thead className="text-xs uppercase bg-subGry">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tracking ID
            </th>
            <th scope="col" className="px-6 py-3">
              Credits
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 flex items-end justify-end py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody className=" ">
          {billingHistory?.map((bill) => (
            <tr
              key={bill?._id}
              className="odd:bg-subMain  even:bg-gry  border-b  border-border"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap "
              >
                {bill?._id}
              </th>
              <td className="px-6 py-4">{bill?.credits}</td>
              <td className="px-6 py-4">
                {bill?.paymentMethod === "stripe" ? (
                  <FaStripeS />
                ) : bill?.paymentMethod === "crypto" ? (
                  <MdOutlineCurrencyBitcoin />
                ) : bill?.paymentMethod === "paypal" ? (
                  <FaPaypal />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-6 py-4">
                {bill?.status === "completed" ? <CircleCheckBig /> : <Ban />}
              </td>
              <td className="px-6  flex items-end justify-end py-4">
                {formatPostDate(bill?.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillingTable;
