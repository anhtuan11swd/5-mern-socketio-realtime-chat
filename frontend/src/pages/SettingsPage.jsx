import { Check } from "lucide-react";
import { THEMES } from "../constants/themes.js";
import { useThemeStore } from "../store/useThemeStore.js";

export default function SettingsPage() {
  const { theme: activeTheme, setTheme } = useThemeStore();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h1 className="font-bold text-3xl">Cài đặt</h1>
        <p className="mt-1 text-base-content/60">Chọn chủ đề giao diện</p>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {THEMES.map((t) => {
          const isActive = activeTheme === t;
          return (
            <button
              className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                isActive
                  ? "border-primary shadow-md"
                  : "border-base-200 hover:border-base-300"
              }`}
              key={t}
              onClick={() => setTheme(t)}
              type="button"
            >
              <div
                className="flex h-16 w-full items-center justify-center rounded-lg"
                data-theme={t}
              >
                <div className="flex gap-1.5">
                  <div className="size-4 rounded-full bg-primary" />
                  <div className="size-4 rounded-full bg-secondary" />
                  <div className="size-4 rounded-full bg-accent" />
                </div>
              </div>
              <span className="text-sm capitalize">{t}</span>
              {isActive && <Check className="size-4 text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
