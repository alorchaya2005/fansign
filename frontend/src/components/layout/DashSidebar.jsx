import {
  ChartBarStacked,
  KeyRound,
  MailWarning,
  MessageCircleMore,
  PackagePlus,
  SquareMousePointer,
  User,
  UserRoundPen,
} from "lucide-react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ShoppingBag, FileText } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

function DashSidebar() {
  const { authUser } = useAuthStore();

  return (
    <div className="fixed top-0 left-0 z-40 h-screen w-16 md:w-64 bg-subMain pt-6 border-r border-border transition-all duration-300">
      <div className="mt-14 w-full px-2 md:px-6">
        {/* Admin Section */}
        {authUser?.isAdmin && (
          <Section label="Admin">
            <SidebarLink
              to="/dashboard"
              icon={<MdOutlineSpaceDashboard className=" size-6 md:size-5" />}
              text="Dashboard"
            />
            <SidebarLink
              to="/users"
              icon={<User className="md:size-5" />}
              text="Users"
            />
            <SidebarLink
              to="/chats"
              icon={<MessageCircleMore className="md:size-5" />}
              text="Chats"
            />
          </Section>
        )}

        {/* Tools */}
        <Section label="Tools">
          {!authUser?.isAdmin && (
            <SidebarLink
              to="/support"
              icon={<MessageCircleMore className="md:size-5" />}
              text="Support"
            />
          )}
          {authUser?.isAdmin && (
            <>
              <SidebarLink
                to="/upload"
                icon={<PackagePlus className="md:size-5" />}
                text="Create Service"
              />
              <SidebarLink
                to="/categories"
                icon={<ChartBarStacked className="md:size-5" />}
                text="Add Category"
              />
            </>
          )}
        </Section>

        {/* Logs */}
        <Section label="Logs">
          {authUser?.isAdmin && (
            <SidebarLink
              to="/services"
              icon={<SquareMousePointer className="md:size-5" />}
              text="Services"
            />
          )}
          {authUser?.isAdmin && (
            <SidebarLink
              to="/all-orders"
              icon={<ShoppingBag className="md:size-5" />}
              text="All Orders"
            />
          )}
          <SidebarLink
            to="/buy-credits"
            icon={<FileText className="md:size-5" />}
            text="Billings"
          />
          <SidebarLink
            to="/orders"
            icon={<ShoppingBag className="md:size-5" />}
            text="My Orders"
          />
        </Section>

        {/* Settings */}
        <Section label="Settings">
          <SidebarLink
            to="/profile"
            icon={<UserRoundPen className="md:size-5" />}
            text="Profile"
          />
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="w-full mb-5">
      <h4 className="text-zinc-400 text-xs mb-1 font-medium hidden md:block">
        {label}
      </h4>
      {children}
    </div>
  );
}

function SidebarLink({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full rounded-md py-1.5 px-3 mb-1 flex items-center gap-2 transition-all duration-200 ${
          isActive
            ? "bg-main text-white font-semibold"
            : "text-dryGray hover:bg-gry"
        }`
      }
    >
      <span className="">{icon}</span>
      <span className="hidden md:block">{text}</span>
    </NavLink>
  );
}

export default DashSidebar;
