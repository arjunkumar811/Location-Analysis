"use client"

import { useBenchmarkData } from "@/hooks/useBenchmarkData"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

/**
 * BenchmarkPanel component for comparing location metrics against submarket averages
 * @param {Object} props - Component props
 * @param {[number, number]} props.coordinates - Location coordinates [longitude, latitude]
 */
export default function BenchmarkPanel({ coordinates }: { coordinates: [number, number] }) {
  const { data, isLoading, error } = useBenchmarkData(coordinates)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 text-sm">{error.message || "Failed to load benchmark data"}</p>
      </div>
    )
  }

  if (!data || !data.benchmarks || data.benchmarks.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-sm">No benchmark data available for this location.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {data.benchmarks.map((benchmark) => (
            <div key={benchmark.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{benchmark.name}</span>
                <span className="text-sm font-medium">
                  {benchmark.value}
                  {benchmark.unit && <span className="text-xs ml-1">{benchmark.unit}</span>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16">Submarket</span>
                <Progress value={benchmark.marketPercentile} className="h-2" />
                <span className="text-xs text-gray-500 w-12 text-right">{benchmark.marketPercentile}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16">National</span>
                <Progress value={benchmark.nationalPercentile} className="h-2" />
                <span className="text-xs text-gray-500 w-12 text-right">{benchmark.nationalPercentile}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
