import LocationAnalysisTab from "@/components/LocationTab/LocationAnalysisTab"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Industrial Real Estate Analysis</h1>
        <LocationAnalysisTab
          initialCoordinates={[-74.006, 40.7128]} // New York City coordinates
        />
      </div>
    </main>
  )
}
