import type React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js"
import { Radar as RadarComponent, PolarArea as PolarAreaComponent } from "react-chartjs-2"
import { cn } from "@/lib/utils"

// Register the controllers and elements
ChartJS.register(RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend)

type ChartProps = {
  children: React.ReactNode
}

export const Chart = ({ children }: ChartProps) => {
  return <>{children}</>
}

type ChartContainerProps = {
  children: React.ReactNode
  className?: string
}

export const ChartContainer = ({ children, className }: ChartContainerProps) => {
  return <div className={cn("relative w-full", className)}>{children}</div>
}

export const RadarChart = ({ data }: { data: ChartData<"radar", number[], string> }) => {
  const options: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""

            if (label) {
              label += ": "
            }
            if (context.parsed.r !== null) {
              label += new Intl.NumberFormat("en-US").format(context.parsed.r)
            }
            return label
          },
        },
      },
    },
  }
  return <RadarComponent data={data} options={options} />
}

export const PolarAreaChart = ({ data }: { data: ChartData<"polarArea", number[], string> }) => {
  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""

            if (label) {
              label += ": "
            }
            if (context.parsed.r !== null) {
              label += new Intl.NumberFormat("en-US").format(context.parsed.r)
            }
            return label
          },
        },
      },
    },
  }
  return <PolarAreaComponent data={data} options={options} />
}

type ChartLegendProps = {
  className?: string
}

export const ChartLegend = ({ className }: ChartLegendProps) => {
  return (
    <div
      className={cn(
        "absolute top-2 right-2 flex items-center space-x-2 rounded-md border bg-popover p-2 text-sm shadow-sm",
        className,
      )}
    >
      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
      <span>Current Location</span>
      <span className="h-2 w-2 rounded-full bg-gray-500"></span>
      <span>Submarket Average</span>
    </div>
  )
}

type ChartTooltipProps = {
  children: React.ReactNode
}

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <>{children}</>
}

type ChartTooltipContentProps = {
  className?: string
}

export const ChartTooltipContent = ({ className }: ChartTooltipContentProps) => {
  return <div className={cn("rounded-md border bg-popover p-4 text-sm shadow-sm", className)}></div>
}

type ChartTooltipItemProps = {
  label: string
  value: string
}

export const ChartTooltipItem = ({ label, value }: ChartTooltipItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}</span>
      <span>{value}</span>
    </div>
  )
}
