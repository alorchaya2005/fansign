import React from "react";
import ChatContainer from "../../components/admin/chat/ChatContainer";
import DashSidebar from "../../components/layout/DashSidebar";
import Layout from "../../components/layout/Layout";
import Sidebar from "../../components/admin/chat/Sidebar";
import { useChatStore } from "../../store/useChatStore";
import NoChatSelected from "../../components/admin/chat/NoChatSelected";
import { useAuthStore } from "../../store/useAuthStore";
import SideBarForUser from "../../components/admin/chat/SideBarForUser";
import NotOurClientPage from "../../components/admin/chat/NotOurClientPage";
import MakeClientToChat from "../../components/admin/chat/MakeClientToChat";

function Chats() {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  return (
    <Layout>
      {/* Fixed Sidebar */}
      <DashSidebar />
      {/* Main content wrapper with padding to avoid overlap */}
      <div className=" overflow-hidden h-screen flex pl-16 md:pl-[270px] md:pr-4 pt-16 transition-all duration-300 ">
        {authUser?.role === "user" && !authUser?.isAdmin && (
          <NotOurClientPage />
        )}
        {authUser?.isAdmin && <Sidebar />}
        {authUser?.role === "client" && <SideBarForUser />}
        {(authUser?.role === "client" || authUser?.isAdmin) &&
          !selectedUser && <NoChatSelected />}
        {(authUser?.role === "client" || authUser?.isAdmin) &&
          selectedUser &&
          selectedUser?.role !== "user" && <ChatContainer />}
        {selectedUser?.role === "user" && <MakeClientToChat />}
      </div>
    </Layout>
  );
}

export default Chats;
