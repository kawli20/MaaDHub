import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white/[0.04]",
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden glass-card">
      <div className="relative aspect-[3/4] bg-[#07090e]">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.04] animate-pulse" />
        <div className="absolute top-3 left-3">
          <div className="h-6 w-20 rounded-full bg-white/[0.08]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2.5">
          <div className="h-5 w-3/4 rounded-lg bg-white/[0.08]" />
          <div className="flex items-center justify-between gap-2 bg-white/[0.03] p-1.5 px-2.5 rounded-lg">
            <div className="h-3 w-12 rounded bg-white/[0.06]" />
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-24 rounded bg-white/[0.06]" />
              <div className="h-4 w-4 rounded bg-white/[0.06]" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 bg-white/[0.03] p-1.5 px-2.5 rounded-lg">
            <div className="h-3 w-12 rounded bg-white/[0.06]" />
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-24 rounded bg-white/[0.06]" />
              <div className="h-4 w-4 rounded bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-12 rounded-2xl bg-white/[0.04]" />
        <div className="h-12 w-28 rounded-2xl bg-white/[0.04]" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 rounded-full", className)} />;
}

export function SkeletonNav() {
  return (
    <div className="h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9 rounded" />
        <Skeleton className="w-24 h-6 rounded" />
      </div>
      <div className="hidden md:flex items-center gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="w-16 h-8 rounded-full" />
        ))}
      </div>
      <Skeleton className="w-6 h-6 rounded-lg md:hidden" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <Skeleton className="h-10 w-64 mx-auto rounded-full" />
        <Skeleton className="h-16 w-full max-w-lg mx-auto rounded-lg" />
        <Skeleton className="h-16 w-3/4 max-w-md mx-auto rounded-lg" />
        <Skeleton className="h-6 w-full max-w-sm mx-auto rounded" />
        <Skeleton className="h-12 w-40 mx-auto rounded-full" />
      </div>
    </div>
  );
}
