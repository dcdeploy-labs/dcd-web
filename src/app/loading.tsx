export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
        <p className="text-[14px] font-bold text-text-muted animate-pulse">Loading DCDeploy...</p>
      </div>
    </div>
  );
}
