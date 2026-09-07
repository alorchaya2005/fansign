import { useAuthStore } from "../../store/useAuthStore";
import { Globe, UserRoundCheck } from "lucide-react";
import { TbCoins } from "react-icons/tb";
import Revoke from "../../utils/Revoke";

function SignBalanceCard() {
  const { authUser } = useAuthStore();
  return (
    <div className=" col-span-1 h-full w-full bg-gradient-to-l from-[#cc7aba] via-[#ca51b0] to-hedingColor rounded-3xl overflow-hidden">
      <div className=" w-full h-full rounded-3xl relative">
        <Globe className=" absolute top-5 right-5 text-subPrimary opacity-5 size-60" />

        <div className="absolute w-full h-3/4 rounded-t-3xl py-5 px-7">
          <div className=" w-full flex items-center justify-between">
            <span className=" text-sm font-oddliniRegular tracking-wide ">
              Sign Card
            </span>
            <div className=" w-10 h-10">
              <img
                src="/images/logo.webp"
                alt="Sign Card"
                className=" w-full h-full object-contain"
              />
            </div>
          </div>

          <div className=" mt-7">
            <Revoke delay={0.1}>
              <h1 className=" text-2xl font-medium capitalize tracking-wide font-oddliniMedium">
                {authUser?.username}
              </h1>
            </Revoke>
            <Revoke delay={0.2}>
              <h1 className=" text-2xl font-medium uppercase tracking-wide font-oddliniMedium">
                {authUser?._id}
              </h1>
            </Revoke>
          </div>
        </div>
        <div className=" absolute bottom-0 rounded-b-3xl flex items-center px-7 w-full h-1/4 bg-[#f34bcf] border-t border-border">
          <div className=" w-full flex items-center justify-between text-subPrimary">
            <div className=" flex items-center gap-2 ">
              <TbCoins className=" size-5" />
              <Revoke delay={0.2}>
                <span className=" font-medium ">{authUser?.balance}</span>
              </Revoke>
            </div>
            <div className=" flex items-center gap-2">
              <span>
                {new Intl.DateTimeFormat("en-US", {
                  month: "numeric",
                  year: "numeric",
                }).format(new Date(authUser?.createdAt))}
              </span>
              <UserRoundCheck className=" size-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignBalanceCard;
