import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-[200px]" /> {/* Page title skeleton */}
      
      {/* Statistical cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[120px]" />
        ))}
      </div>
      
      {/* Recent activities and upcoming deadlines skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="h-[300px] col-span-4" />
        <Skeleton className="h-[300px] col-span-3" />
      </div>
      
      {/* Project progress and quick actions skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="h-[250px] col-span-4" />
        <Skeleton className="h-[250px] col-span-3" />
      </div>
      
      {/* Calendar skeleton */}
      <Skeleton className="h-[400px]" />
    </div>
  )
}