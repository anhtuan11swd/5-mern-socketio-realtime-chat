import { LogOut, Menu, Settings, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { icon: Settings, label: "Cài đặt", to: "/settings" },
    { icon: User, label: "Hồ sơ", to: "/profile" },
  ];

  return (
    <nav className="border-base-300 border-b bg-base-100 px-4 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link className="flex items-center gap-2" to="/">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-lg text-primary-content">C</span>
          </div>
          <span className="font-bold text-xl">ChatApp</span>
        </Link>

        {authUser && (
          <>
            <div className="hidden items-center gap-3 sm:flex">
              {navLinks.map((link) => (
                <Link
                  className="btn btn-ghost btn-sm gap-2"
                  key={link.to}
                  to={link.to}
                >
                  <link.icon className="size-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <button
                className="btn btn-ghost btn-sm gap-2"
                onClick={logout}
                type="button"
              >
                <LogOut className="size-4" />
                <span>Đăng xuất</span>
              </button>
            </div>

            <button
              aria-label="Mở menu"
              className="btn btn-ghost btn-sm sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </>
        )}
      </div>

      {authUser && mobileOpen && (
        <div className="mt-3 flex flex-col gap-2 border-base-300 border-t pt-3 sm:hidden">
          {navLinks.map((link) => (
            <Link
              className="btn btn-ghost btn-sm justify-start gap-2"
              key={link.to}
              onClick={() => setMobileOpen(false)}
              to={link.to}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
          <button
            className="btn btn-ghost btn-sm justify-start gap-2"
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            type="button"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </div>
      )}
    </nav>
  );
}
