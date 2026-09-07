import { useEffect, useState } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { Users } from "lucide-react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const SideBarForUser = () => {
  const {
    getAdminAccForUser,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    getAdminAccForUser();
  }, [getAdminAccForUser]);

  if (isUsersLoading) return <div>Loading...</div>;

  return (
    <aside
      className={` z-40  h-full bg-subMain ${
        showSidebar ? "w-36" : "w-14"
      }  lg:w-72 border-r border-border flex flex-col  transition-all duration-200`}
    >
      <div className="border-b border-border w-full p-[18px] relative">
        {/* expand icon  */}
        <div className=" block lg:hidden absolute top-1/2 -translate-y-1/2 -right-2">
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className=" bg-gry rounded-md px-1 py-1.5"
          >
            {showSidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
        {/* expand icon end */}
        <div className="flex items-center lg:justify-normal justify-center gap-2">
          <Users className="size-5 md:size-6" />
          <span
            className={`"font-medium ${
              showSidebar ? "block" : "hidden"
            }  lg:block transition-all duration-300`}
          >
            Contacts
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex flex-col items-start">
        {users?.map((user) => (
          <button
            key={user?._id}
            onClick={() => {
              setSelectedUser(user);
              setShowSidebar(false);
            }}
            className={`
              w-full p-3 flex items-center gap-3
               transition-colors
              ${selectedUser?._id === user?._id ? "bg-gry " : "hover:bg-gry"}
            `}
          >
            <div className={`relative ${showSidebar ? "" : "mx-auto"} lg:mx-0`}>
              <div className="">
                <div className=" size-8 md:size-10 flex items-center justify-center rounded-full border border-border bg-subMain">
                  <p className=" profile-font text-2xl md:text-3xl -ml-1 text-hedingColor">
                    S
                  </p>
                </div>
              </div>
            </div>

            {/* User info - only visible on larger screens */}
            <div
              className={`${
                showSidebar ? "block" : "hidden"
              }  lg:block text-left min-w-0`}
            >
              <div className="font-medium md:text-base text-sm truncate capitalize">
                {user?.username}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
export default SideBarForUser;
