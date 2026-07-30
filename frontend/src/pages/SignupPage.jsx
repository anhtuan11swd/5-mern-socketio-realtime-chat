import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User as UserIcon,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { signupSchema } from "../lib/validations.js";
import { useAuthStore } from "../store/useAuthStore.js";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const firstError =
        result.error.issues[0]?.message || "Dữ liệu không hợp lệ";
      toast.error(firstError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await signup(formData);
    if (result.success) navigate("/login");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-bold text-3xl">Tạo tài khoản</h1>
            <p className="mt-2 text-base-content/60">
              Đăng ký để bắt đầu trò chuyện
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="fullName">
                <span className="label-text">Họ tên</span>
              </label>
              <label className="input input-bordered flex w-full items-center gap-2">
                <UserIcon className="size-4 text-base-content/40" />
                <input
                  className="grow"
                  disabled={isSigningUp}
                  id="fullName"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Nguyễn Văn A"
                  type="text"
                  value={formData.fullName}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex w-full items-center gap-2">
                <Mail className="size-4 text-base-content/40" />
                <input
                  className="grow"
                  disabled={isSigningUp}
                  id="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  type="email"
                  value={formData.email}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Mật khẩu</span>
              </label>
              <label className="input input-bordered flex w-full items-center gap-2">
                <Lock className="size-4 text-base-content/40" />
                <input
                  className="grow"
                  disabled={isSigningUp}
                  id="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                />
                <button
                  className="btn btn-ghost btn-sm"
                  disabled={isSigningUp}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </label>
            </div>

            <button
              className="btn btn-primary w-full"
              disabled={isSigningUp}
              type="submit"
            >
              {isSigningUp ? (
                <span className="loading loading-spinner" />
              ) : (
                <UserPlus className="size-4" />
              )}
              Đăng ký
            </button>
          </form>

          <p className="mt-6 text-center text-base-content/60">
            Đã có tài khoản?{" "}
            <Link
              className={`link link-primary ${isSigningUp ? "pointer-events-none no-underline opacity-50" : ""}`}
              to="/login"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>

      <AuthImagePattern />
    </div>
  );
}
