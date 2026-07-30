import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore.js";
import SidebarSkeleton from "./SidebarSkeleton.jsx";

export default function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-full flex-col border-base-300 border-r lg:w-80">
      <div className="flex items-center gap-2 border-base-300 border-b px-5 py-4">
        <Users className="size-5" />
        <span className="font-bold">Danh sách</span>
      </div>

      <div className="flex items-center gap-2 border-base-300 border-b px-5 py-3">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            checked={showOnlineOnly}
            className="toggle toggle-primary toggle-xs"
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            type="checkbox"
          />
          <span className="text-base-content/60 text-xs">Đang hoạt động</span>
        </label>
        <span className="ml-auto text-base-content/40 text-xs">
          {onlineUsers.length - 1} online
        </span>
      </div>

      <div className="overflow-y-auto">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          return (
            <button
              className={`flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left transition-colors ${
                isSelected
                  ? "border-base-300 border-b bg-base-200"
                  : "border-base-200 border-b hover:bg-base-200/50"
              }`}
              key={user._id}
              onClick={() => setSelectedUser(user)}
              type="button"
            >
              <div className="relative shrink-0">
                <img
                  alt={user.fullName}
                  className="size-12 rounded-full object-cover"
                  src={user.profilePic || "/avatar.png"}
                />
                <span
                  className={`absolute right-0 bottom-0 size-3 rounded-full border-2 border-base-100 ${
                    onlineUsers.includes(user._id)
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{user.fullName}</p>
                <p className="truncate text-base-content/60 text-sm">
                  {user.email}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="flex flex-1 items-center justify-center p-4 text-base-content/40">
          Không có người dùng nào
        </div>
      )}
    </aside>
  );
}
