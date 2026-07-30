import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore.js";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="flex items-center gap-3 border-base-300 border-b px-5 py-3">
      <img
        alt={selectedUser.fullName}
        className="size-10 rounded-full object-cover"
        src={selectedUser.profilePic || "/avatar.png"}
      />
      <div className="flex-1">
        <p className="font-medium">{selectedUser.fullName}</p>
        <p className="text-base-content/60 text-sm">Đang hoạt động</p>
      </div>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => setSelectedUser(null)}
        type="button"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
