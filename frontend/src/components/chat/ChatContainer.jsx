import { useEffect, useRef } from "react";
import { formatMessageTime } from "../../lib/utils.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import NoChatSelected from "./NoChatSelected.jsx";

export default function ChatContainer() {
  const { selectedUser, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) useChatStore.getState().getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    useChatStore.getState().subscribeToMessages();
    return () => useChatStore.getState().unsubscribeFromMessages();
  }, []);

  useEffect(() => {
    if (messages.length >= 0) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return <NoChatSelected />;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ChatHeader />

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
        {isMessagesLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="loading loading-spinner loading-md" />
          </div>
        ) : messages.length === 0 ? (
          <p className="py-10 text-center text-base-content/40">
            Chưa có tin nhắn. Hãy gửi lời chào đầu tiên!
          </p>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderId === authUser._id;
            return (
              <div
                className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
                key={msg._id}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full">
                    <img
                      alt="avatar"
                      src={
                        (isOwn
                          ? authUser.profilePic
                          : selectedUser.profilePic) || "/avatar.png"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-base-content/40 text-xs">
                    {formatMessageTime(msg.createdAt)}
                  </time>
                </div>
                <div
                  className={`chat-bubble ${isOwn ? "chat-bubble-primary" : ""}`}
                >
                  {msg.image && (
                    <img
                      alt="Hình ảnh"
                      className="max-w-60 rounded-lg"
                      src={msg.image}
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}
