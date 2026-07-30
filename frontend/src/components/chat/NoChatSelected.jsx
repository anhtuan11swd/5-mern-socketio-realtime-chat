import { MessageSquareText } from "lucide-react";

export default function NoChatSelected() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-base-200">
          <MessageSquareText className="size-12 text-base-content/40" />
        </div>
        <h2 className="mb-2 font-bold text-2xl">
          Chào mừng bạn đến với ChatApp
        </h2>
        <p className="text-base-content/60">
          Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu
        </p>
      </div>
    </div>
  );
}
