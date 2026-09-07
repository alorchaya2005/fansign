import { LuLock } from "react-icons/lu";
import { Link } from "react-router-dom";

function NotOurClientPage() {
  return (
    <div className=" h-screen w-full bg-subMain flex flex-col px-5 items-center justify-center">
      <LuLock className=" size-10 text-zinc-200" />
      <h1 className=" text-xl mt-4 text-zinc-200 text-center">
        This feature is only available for our clients
      </h1>
      <h3 className=" text-lg text-zinc-400 text-center mt-3">
        You must need to purchase any of our fansign to become our happy client.
      </h3>
      <Link
        to="/browse"
        className=" mt-5 text-zinc-200 hover:text-zinc-300 underline"
      >
        Browse
      </Link>
    </div>
  );
}

export default NotOurClientPage;
