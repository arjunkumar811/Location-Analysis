"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Download, Loader2 } from "lucide-react"

/**
 * PdfGenerator component for generating PDF reports
 * @param {Object} props - Component props
 * @param {[number, number]} props.coordinates - Location coordinates [longitude, latitude]
 * @param {string} props.locationName - Name of the location
 * @param {Object} props.metricsData - Metrics data for the location
 * @param {Object} props.riskData - Risk data for the location
 */
export default function PdfGenerator({
  coordinates,
  locationName,
  metricsData,
  riskData,
}: {
  coordinates: [number, number]
  locationName: string
  metricsData: any
  riskData: any
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleGeneratePdf = async () => {
    setIsGenerating(true)

    try {
      // In a real implementation, this would call a server action or API
      // to generate the PDF using a library like react-pdf
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate PDF download
      alert("PDF generated successfully! In a real implementation, this would download a PDF file.")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Location Report</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-sm font-medium mb-2">Report Details</h3>
          <p className="text-sm text-gray-500 mb-4">
            Generate a comprehensive PDF report for {locationName} with all metrics and risk analysis.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Location:</span>
              <span className="font-medium">{locationName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Coordinates:</span>
              <span className="font-medium">
                {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Report Type:</span>
              <span className="font-medium">Full Analysis</span>
            </div>
          </div>

          <Button className="w-full" onClick={handleGeneratePdf} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
