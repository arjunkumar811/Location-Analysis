"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/**
 * LayerControls component for toggling map layers
 * @param {Object} props - Component props
 * @param {Object} props.layers - Current active layers state
 * @param {Function} props.onToggleLayer - Callback when a layer is toggled
 * @param {number} props.selectedRadius - Currently selected radius in miles
 * @param {Function} props.onRadiusChange - Callback when radius is changed
 */
export default function LayerControls({
  layers,
  onToggleLayer,
  selectedRadius,
  onRadiusChange,
}: {
  layers: {
    transportation: boolean
    amenities: boolean
    competitors: boolean
    riskFactors: boolean
    radiusRings: boolean
  }
  onToggleLayer: (layer: string, enabled: boolean) => void
  selectedRadius: number
  onRadiusChange: (radius: number) => void
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <Card className="w-64 shadow-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-sm">Map Layers</h3>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {expanded && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="transportation" className="text-sm">
                  Transportation
                </Label>
                <Switch
                  id="transportation"
                  checked={layers.transportation}
                  onCheckedChange={(checked) => onToggleLayer("transportation", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="amenities" className="text-sm">
                  Amenities
                </Label>
                <Switch
                  id="amenities"
                  checked={layers.amenities}
                  onCheckedChange={(checked) => onToggleLayer("amenities", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="competitors" className="text-sm">
                  Competitors
                </Label>
                <Switch
                  id="competitors"
                  checked={layers.competitors}
                  onCheckedChange={(checked) => onToggleLayer("competitors", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="riskFactors" className="text-sm">
                  Risk Factors
                </Label>
                <Switch
                  id="riskFactors"
                  checked={layers.riskFactors}
                  onCheckedChange={(checked) => onToggleLayer("riskFactors", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="radiusRings" className="text-sm">
                  Radius Rings
                </Label>
                <Switch
                  id="radiusRings"
                  checked={layers.radiusRings}
                  onCheckedChange={(checked) => onToggleLayer("radiusRings", checked)}
                />
              </div>
            </div>

            {layers.radiusRings && (
              <div className="pt-2 border-t border-gray-200">
                <Label className="text-sm mb-2 block">Radius (miles)</Label>
                <RadioGroup
                  value={selectedRadius.toString()}
                  onValueChange={(value) => onRadiusChange(Number.parseInt(value))}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1" className="text-xs">
                      1
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3" className="text-xs">
                      3
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5" className="text-xs">
                      5
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
