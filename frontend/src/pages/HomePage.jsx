import ChatContainer from "../components/chat/ChatContainer.jsx";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-[calc(100svh-57px)]">
      <div
        className={`w-full shrink-0 lg:w-80 ${
          selectedUser ? "hidden lg:flex" : "flex"
        }`}
      >
        <Sidebar />
      </div>
      <div
        className={`flex flex-1 flex-col ${
          selectedUser ? "flex" : "hidden lg:flex"
        }`}
      >
        <ChatContainer />
      </div>
    </div>
  );
}
