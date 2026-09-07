import { MousePointerClick } from "lucide-react";

const MakeClientToChat = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center px-5 md:p-16 bg-subMain">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-gry flex items-center
             justify-center "
            >
              <MousePointerClick className="w-8 h-8 text-hedingColor " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Make him a client!</h2>
        <p className="text-base-content/60">
          You need to make this user as your client to start chatting.
        </p>
      </div>
    </div>
  );
};

export default MakeClientToChat;
