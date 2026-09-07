import { useChatStore } from "../../../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../../skeleton/MessageSkeleton";
import { useAuthStore } from "../../../store/useAuthStore";
import { formatMessageTime } from "../../../lib/utils";
import { GoInbox } from "react-icons/go";
import Revoke from "../../../utils/Revoke";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-subMain">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className=" flex flex-col items-center gap-2">
              <GoInbox className=" size-10 text-zinc-400" />
              <h3 className=" text-sm text-zinc-200">No messages yet.</h3>
            </div>
          </div>
        )}
        {messages?.map((message) => (
          <div
            key={message?._id}
            className={`chat ${
              message?.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image">
              <div className="">
                <div className=" size-8 md:size-10 flex items-center justify-center rounded-full border border-border bg-subMain">
                  <p className=" profile-font text-3xl -ml-1 text-hedingColor">
                    S
                  </p>
                </div>
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble bg-gry flex flex-col">
              <Revoke>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && (
                  <p className=" text-zinc-100">{message.text}</p>
                )}
              </Revoke>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
