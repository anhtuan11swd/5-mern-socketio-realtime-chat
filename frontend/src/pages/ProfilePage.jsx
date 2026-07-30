import { Camera, User as UserIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

export default function ProfilePage() {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      setPreview(base64);
      await updateProfile({ profilePic: base64 });
      setPreview(null);
    };
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="mb-8 text-center">
        <h1 className="font-bold text-3xl">Hồ sơ</h1>
        <p className="mt-1 text-base-content/60">Thông tin tài khoản của bạn</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="size-32 overflow-hidden rounded-full">
            <img
              alt="Avatar"
              className="size-full object-cover"
              src={preview || authUser.profilePic || "/avatar.png"}
            />
          </div>
          <label
            className="btn btn-outline btn-circle btn-sm absolute -right-1 -bottom-1"
            htmlFor="avatar-upload"
          >
            <Camera className="size-4" />
          </label>
          <input
            accept="image/*"
            hidden
            id="avatar-upload"
            onChange={handleImageUpload}
            ref={fileInputRef}
            type="file"
          />
        </div>

        <button
          className="btn btn-primary btn-sm"
          disabled={isUpdatingProfile}
          onClick={() => fileInputRef.current?.click()}
          type="button"
        >
          {isUpdatingProfile ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <Camera className="size-4" />
          )}
          {isUpdatingProfile ? "Đang tải..." : "Thay đổi ảnh"}
        </button>
      </div>

      <div className="mt-8 space-y-5">
        <div className="form-control">
          <label className="label" htmlFor="fullName">
            <span className="label-text">Họ tên</span>
          </label>
          <label className="input input-bordered flex w-full items-center gap-2">
            <UserIcon className="size-4 text-base-content/40" />
            <input
              className="grow"
              disabled
              id="fullName"
              type="text"
              value={authUser.fullName || ""}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <label className="input input-bordered flex w-full items-center gap-2">
            <UserIcon className="size-4 text-base-content/40" />
            <input
              className="grow"
              disabled
              id="email"
              type="email"
              value={authUser.email || ""}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="joined">
            <span className="label-text">Ngày tham gia</span>
          </label>
          <label className="input input-bordered flex w-full items-center gap-2">
            <UserIcon className="size-4 text-base-content/40" />
            <input
              className="grow"
              disabled
              id="joined"
              type="text"
              value={
                authUser.createdAt
                  ? new Date(authUser.createdAt).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}
