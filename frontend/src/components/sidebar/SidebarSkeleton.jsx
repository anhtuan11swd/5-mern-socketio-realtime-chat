export default function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map((key) => (
        <div className="flex items-center gap-3" key={key}>
          <div className="size-12 animate-pulse rounded-full bg-base-300" />
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="h-4 w-3/5 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-2/5 animate-pulse rounded bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
