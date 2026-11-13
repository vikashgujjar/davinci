export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-white" role="status" aria-label="Loading">
      <div className="h-px w-48 overflow-hidden bg-deep/10">
        <div className="h-full w-1/3 animate-[marquee_1.2s_linear_infinite] bg-electric" />
      </div>
    </div>
  );
}
