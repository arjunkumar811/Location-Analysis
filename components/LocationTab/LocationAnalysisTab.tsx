"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import MetricGrid from "./MetricGrid"
import RiskRadar from "./RiskRadar"
import BenchmarkPanel from "./BenchmarkPanel"
import { Button } from "@/components/ui/button"
import { FileText, Layers } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import the MapContainer to reduce initial bundle size
const MapContainer = dynamic(() => import("./MapContainer"), {
  loading: () => (
    <div className="h-[600px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  ),
  ssr: false, // Disable server-side rendering for Mapbox
})

/**
 * LocationAnalysisTab component for analyzing industrial real estate locations
 * @param {Object} props - Component props
 * @param {[number, number]} props.initialCoordinates - Initial map coordinates [longitude, latitude]
 */
export default function LocationAnalysisTab({
  initialCoordinates,
}: {
  initialCoordinates: [number, number]
}) {
  const [coordinates, setCoordinates] = useState<[number, number]>(initialCoordinates)
  const [selectedLocation, setSelectedLocation] = useState<string>("Current Selection")
  const [activeTab, setActiveTab] = useState<string>("map")

  const handleLocationSelect = (coords: [number, number], name: string) => {
    setCoordinates(coords)
    setSelectedLocation(name || "Selected Location")
  }

  const generatePdfReport = () => {
    // This would connect to the PDF generation service
    console.log("Generating PDF report for", selectedLocation)
    alert("PDF Report generation started. This would download a report in a real implementation.")
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{selectedLocation}</h2>
          <p className="text-gray-500 text-sm">
            Coordinates: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={generatePdfReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" size="sm" onClick={() => setActiveTab("map")}>
            <Layers className="mr-2 h-4 w-4" />
            View Map
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <MapContainer coordinates={coordinates} onLocationSelect={handleLocationSelect} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <MetricGrid coordinates={coordinates} />
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Benchmark Comparison</h3>
                <BenchmarkPanel coordinates={coordinates} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Risk Analysis</h3>
              <RiskRadar coordinates={coordinates} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
