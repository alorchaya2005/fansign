import { Ban, CircleCheckBig } from "lucide-react";

function LatestOrdersTable() {
  return (
    <div className=" overflow-x-auto no-scrollbar">
      <table className="w-full  text-sm text-left rtl:text-right ">
        <thead className="text-xs uppercase bg-subGry">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tracking ID
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
          <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              123456789012345678901234
            </th>

            <td className="px-6 py-4">
              <CircleCheckBig />
            </td>

            <td className="px-6  flex items-end justify-end py-4">
              10-04-2025
            </td>
          </tr>
          <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              123456789012345678901234
            </th>

            <td className="px-6 py-4">
              <CircleCheckBig />
            </td>

            <td className="px-6  flex items-end justify-end py-4">
              10-04-2025
            </td>
          </tr>
          <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              123456789012345678901234
            </th>

            <td className="px-6 py-4">
              <CircleCheckBig />
            </td>

            <td className="px-6  flex items-end justify-end py-4">
              10-04-2025
            </td>
          </tr>
          <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              123456789012345678901234
            </th>

            <td className="px-6 py-4">
              <CircleCheckBig />
            </td>

            <td className="px-6  flex items-end justify-end py-4">
              10-04-2025
            </td>
          </tr>
          <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              123456789012345678901234
            </th>

            <td className="px-6 py-4">
              <CircleCheckBig />
            </td>

            <td className="px-6  flex items-end justify-end py-4">
              10-04-2025
            </td>
          </tr>
          <tr className="odd:bg-subMain  even:bg-gry  border-b  border-border">
            <th
              scope="row"
              className="px-6 py-4 font-medium  whitespace-nowrap "
            >
              123456789012345678901234
            </th>

            <td className="px-6 py-4">
              <CircleCheckBig />
            </td>

            <td className="px-6  flex items-end justify-end py-4">
              10-04-2025
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LatestOrdersTable;
