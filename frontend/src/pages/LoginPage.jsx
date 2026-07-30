import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { loginSchema } from "../lib/validations.js";
import { useAuthStore } from "../store/useAuthStore.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const result = loginSchema.safeParse(formData);
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
    const result = await login(formData);
    if (result.success) navigate("/");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-bold text-3xl">Đăng nhập</h1>
            <p className="mt-2 text-base-content/60">Chào mừng bạn trở lại</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex w-full items-center gap-2">
                <Mail className="size-4 text-base-content/40" />
                <input
                  className="grow"
                  disabled={isLoggingIn}
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
                  disabled={isLoggingIn}
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
                  disabled={isLoggingIn}
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
              disabled={isLoggingIn}
              type="submit"
            >
              {isLoggingIn ? (
                <span className="loading loading-spinner" />
              ) : (
                <LogIn className="size-4" />
              )}
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-base-content/60">
            Chưa có tài khoản?{" "}
            <Link
              className={`link link-primary ${isLoggingIn ? "pointer-events-none no-underline opacity-50" : ""}`}
              to="/signup"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>

      <AuthImagePattern />
    </div>
  );
}
