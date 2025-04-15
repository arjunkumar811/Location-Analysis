"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useMetricsData } from "@/hooks/useMetricsData"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

// Define the metrics to display
const METRIC_CARDS = [
  { id: "highway", label: "Nearest Highway", api: "OpenRouteService", unit: "miles" },
  { id: "income", label: "Median Income", api: "Census ACS", unit: "USD" },
  { id: "flood", label: "Flood Risk", api: "FEMA NFHL", unit: "score" },
  { id: "population", label: "Population (1mi)", api: "Census ACS", unit: "people" },
  { id: "traffic", label: "Traffic Volume", api: "DOT", unit: "vehicles/day" },
  { id: "crime", label: "Crime Index", api: "Local Data", unit: "score" },
  { id: "zoning", label: "Zoning", api: "Local Gov", unit: "" },
  { id: "airport", label: "Nearest Airport", api: "OpenRouteService", unit: "miles" },
  { id: "environmental", label: "Environmental Risk", api: "EPA", unit: "score" },
]

/**
 * MetricCard component for displaying a single metric
 */
function MetricCard({
  label,
  value,
  unit,
  api,
  status,
}: {
  label: string
  value: string | number
  unit: string
  api: string
  status: "good" | "warning" | "bad" | "neutral"
}) {
  const getStatusIcon = () => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "bad":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getStatusClass = () => {
    switch (status) {
      case "good":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-amber-50 border-amber-200"
      case "bad":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <Card className={`border ${getStatusClass()}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm">{label}</h3>
            <p className="text-xs text-gray-500">Source: {api}</p>
          </div>
          {getStatusIcon()}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-semibold">
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * MetricGrid component for displaying a grid of metrics
 * @param {Object} props - Component props
 * @param {[number, number]} props.coordinates - Location coordinates [longitude, latitude]
 */
export default function MetricGrid({ coordinates }: { coordinates: [number, number] }) {
  const { data, isLoading, error } = useMetricsData(coordinates)

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Metrics</h3>
        <p className="text-red-600">{error.message || "Failed to load metrics data"}</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Key Location Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {METRIC_CARDS.map((metric) => (
          <div key={metric.id}>
            {isLoading ? (
              <Card>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16 mb-4" />
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ) : (
              <MetricCard
                label={metric.label}
                value={data?.[metric.id]?.value || "N/A"}
                unit={metric.unit}
                api={metric.api}
                status={data?.[metric.id]?.status || "neutral"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
