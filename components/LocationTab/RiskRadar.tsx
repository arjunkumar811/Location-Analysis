"use client"

import { useRiskData } from "@/hooks/useRiskData"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  PolarAreaChart,
  RadarChart,
} from "@/components/ui/chart"

/**
 * RiskRadar component for visualizing risk factors
 * @param {Object} props - Component props
 * @param {[number, number]} props.coordinates - Location coordinates [longitude, latitude]
 */
export default function RiskRadar({ coordinates }: { coordinates: [number, number] }) {
  const { data, isLoading, error } = useRiskData(coordinates)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 text-sm">{error.message || "Failed to load risk data"}</p>
      </div>
    )
  }

  if (!data || !data.risks || data.risks.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-sm">No risk data available for this location.</p>
      </div>
    )
  }

  // Format data for radar chart
  const radarData = {
    labels: data.risks.map((risk) => risk.name),
    datasets: [
      {
        label: "Current Location",
        data: data.risks.map((risk) => risk.value),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
      {
        label: "Submarket Average",
        data: data.risks.map((risk) => risk.marketAverage),
        backgroundColor: "rgba(107, 114, 128, 0.2)",
        borderColor: "rgba(107, 114, 128, 1)",
        borderWidth: 2,
      },
    ],
  }

  // Format data for polar area chart
  const polarData = {
    labels: data.risks.map((risk) => risk.name),
    datasets: [
      {
        label: "Risk Score",
        data: data.risks.map((risk) => risk.value),
        backgroundColor: [
          "rgba(239, 68, 68, 0.5)",
          "rgba(245, 158, 11, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(59, 130, 246, 0.5)",
          "rgba(139, 92, 246, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
        <p className="text-sm text-gray-600">
          Overall Risk Score: <span className="font-medium">{data.overallScore}/100</span> ({data.riskCategory})
        </p>
      </div>

      <Tabs defaultValue="radar">
        <TabsList className="mb-4">
          <TabsTrigger value="radar">Radar View</TabsTrigger>
          <TabsTrigger value="polar">Polar Area</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="radar">
          <Card>
            <CardContent className="p-4">
              <div className="h-80">
                <ChartContainer>
                  <Chart>
                    <RadarChart data={radarData} />
                  </Chart>
                  <ChartLegend />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="polar">
          <Card>
            <CardContent className="p-4">
              <div className="h-80">
                <ChartContainer>
                  <Chart>
                    <PolarAreaChart data={polarData} />
                  </Chart>
                  <ChartLegend />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Risk Factor</th>
                      <th className="text-center py-2 font-medium">Score</th>
                      <th className="text-center py-2 font-medium">Market Avg</th>
                      <th className="text-center py-2 font-medium">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.risks.map((risk) => (
                      <tr key={risk.name} className="border-b">
                        <td className="py-2">{risk.name}</td>
                        <td className="text-center py-2">{risk.value}</td>
                        <td className="text-center py-2">{risk.marketAverage}</td>
                        <td className="text-center py-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              risk.category === "High"
                                ? "bg-red-100 text-red-800"
                                : risk.category === "Medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {risk.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
