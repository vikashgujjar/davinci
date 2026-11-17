import type { Peak } from "@/lib/pointcloud";
import { GlowDefs, PointCloud } from "./primitives";

/** Point-cloud terrain anchored to the bottom of its (positioned) parent. */
export function PointCloudBackdrop({ id, seed = 5, peaks, className = "" }: { id: string; seed?: number; peaks?: Peak[]; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_35%)] ${className}`}>
      <svg className="h-full w-full" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice">
        <GlowDefs id={id} />
        <PointCloud id={id} w={1200} h={420} cols={64} rows={20} seed={seed} peaks={peaks} relief={0.45} />
      </svg>
    </div>
  );
}
