"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { useLocationData } from "@/hooks/useLocationData"
import LayerControls from "./LayerControls"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

/**
 * Mock MapContainer component that simulates a map without requiring react-map-gl
 * @param {Object} props - Component props
 * @param {[number, number]} props.coordinates - Map coordinates [longitude, latitude]
 * @param {Function} props.onLocationSelect - Callback when a location is selected
 */
export default function MapContainer({
  coordinates,
  onLocationSelect,
}: {
  coordinates: [number, number]
  onLocationSelect: (coords: [number, number], name: string) => void
}) {
  const [activeLayers, setActiveLayers] = useState({
    transportation: true,
    amenities: false,
    competitors: false,
    riskFactors: false,
    radiusRings: true,
  })
  const [selectedRadius, setSelectedRadius] = useState<number>(1) // miles
  const [popupInfo, setPopupInfo] = useState<{
    x: number
    y: number
    name: string
    longitude: number
    latitude: number
  } | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, error } = useLocationData(coordinates)

  const handleLayerToggle = (layer: string, enabled: boolean) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layer]: enabled,
    }))
  }

  const handleRadiusChange = (radius: number) => {
    setSelectedRadius(radius)
  }

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mapRef.current) return

      // Calculate relative position in the map container
      const rect = mapRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Convert to percentage
      const xPercent = x / rect.width
      const yPercent = y / rect.height

      // Simulate longitude/latitude based on click position
      // This is just a visual approximation for the mock
      const longitude = coordinates[0] + (xPercent - 0.5) * 0.1
      const latitude = coordinates[1] + (0.5 - yPercent) * 0.1

      // Determine if we clicked on a "feature"
      // For demo, we'll randomly decide if this is a property
      const isProperty = Math.random() > 0.7

      if (isProperty) {
        setPopupInfo({
          x,
          y,
          name: "Property " + Math.floor(Math.random() * 1000),
          longitude,
          latitude,
        })
      } else {
        onLocationSelect([longitude, latitude], "Custom Location")
        setPopupInfo(null)
      }
    },
    [coordinates, onLocationSelect],
  )

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-red-50 rounded-lg">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Map Data</h3>
          <p className="text-red-600 mb-4">{error.message || "Failed to load map data"}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[600px] relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="mt-2 text-sm text-gray-600">Loading map data...</p>
          </div>
        </div>
      )}

      {/* Mock Map */}
      <div
        ref={mapRef}
        className="h-full w-full bg-gray-100 relative overflow-hidden cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Base map grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-200 opacity-30" />
          ))}
        </div>

        {/* Main marker */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
        </div>

        {/* Radius ring */}
        {activeLayers.radiusRings && (
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 bg-blue-100 bg-opacity-20"
            style={{
              width: `${selectedRadius * 100}px`,
              height: `${selectedRadius * 100}px`,
            }}
          />
        )}

        {/* Transportation layer */}
        {activeLayers.transportation && (
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-amber-400" />
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-amber-400" />
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-amber-400" />
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-amber-400" />
          </div>
        )}

        {/* Amenities layer */}
        {activeLayers.amenities && (
          <>
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-500 rounded-full" />
            <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-green-500 rounded-full" />
            <div className="absolute top-1/4 left-3/4 w-4 h-4 bg-green-500 rounded-full" />
            <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-green-500 rounded-full" />
          </>
        )}

        {/* Competitors layer */}
        {activeLayers.competitors && (
          <>
            <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-indigo-500 rounded-full" />
            <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-indigo-500 rounded-full" />
          </>
        )}

        {/* Risk factors layer */}
        {activeLayers.riskFactors && (
          <>
            <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-red-400 bg-opacity-30" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-red-400 bg-opacity-30" />
          </>
        )}

        {/* Popup */}
        {popupInfo && (
          <div
            className="absolute bg-white p-3 rounded-lg shadow-lg z-10 w-48"
            style={{
              left: popupInfo.x,
              top: popupInfo.y,
              transform: "translate(-50%, -100%)",
              marginTop: "-10px",
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-white" />
            <h3 className="font-medium text-sm">{popupInfo.name}</h3>
            <p className="text-xs text-gray-500">
              {popupInfo.longitude.toFixed(4)}, {popupInfo.latitude.toFixed(4)}
            </p>
            <Button
              size="sm"
              className="mt-2 w-full"
              onClick={() => {
                onLocationSelect([popupInfo.longitude, popupInfo.latitude], popupInfo.name)
                setPopupInfo(null)
              }}
            >
              Analyze Location
            </Button>
          </div>
        )}

        {/* Map labels */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white bg-opacity-70 px-2 py-1 rounded">
          Longitude: {coordinates[0].toFixed(4)}, Latitude: {coordinates[1].toFixed(4)}
        </div>

        <div className="absolute top-2 left-2 text-sm font-medium bg-white bg-opacity-70 px-2 py-1 rounded">
          Mock Map View
        </div>
      </div>

      {/* Layer controls */}
      <div className="absolute top-4 right-4 z-10">
        <LayerControls
          layers={activeLayers}
          onToggleLayer={handleLayerToggle}
          selectedRadius={selectedRadius}
          onRadiusChange={handleRadiusChange}
        />
      </div>

      {/* Quick actions */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <Button variant="outline" size="sm">
            Reset View
          </Button>
        </div>
      </div>
    </div>
  )
}
