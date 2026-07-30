import { Grid3X3 } from "lucide-react";

export default function AuthImagePattern() {
  return (
    <div className="hidden items-center justify-center bg-base-200 p-12 lg:flex">
      <div className="max-w-md text-center">
        <Grid3X3 className="mx-auto h-48 w-48 text-primary/30" />
        <h2 className="mt-8 font-bold text-2xl">Chat với bạn bè</h2>
        <p className="mt-2 text-base-content/60">
          Kết nối và trò chuyện mọi lúc, mọi nơi
        </p>
      </div>
    </div>
  );
}
