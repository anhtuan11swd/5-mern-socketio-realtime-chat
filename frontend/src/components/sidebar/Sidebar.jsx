import { Users } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore.js";
import SidebarSkeleton from "./SidebarSkeleton.jsx";

export default function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-full flex-col border-base-300 border-r lg:w-80">
      <div className="flex items-center gap-2 border-base-300 border-b px-5 py-4">
        <Users className="size-5" />
        <span className="font-bold">Danh sách</span>
      </div>

      <div className="overflow-y-auto">
        {users.map((user) => {
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
                <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-base-100 bg-green-500" />
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

      {users.length === 0 && (
        <div className="flex flex-1 items-center justify-center p-4 text-base-content/40">
          Không có người dùng nào
        </div>
      )}
    </aside>
  );
}
