"use client"

import { useState, useEffect } from "react"
import { mockBenchmarkData } from "@/utils/mockData"

/**
 * Custom hook for fetching benchmark data
 * @param {[number, number]} coordinates - Location coordinates [longitude, latitude]
 * @returns {Object} Benchmark data, loading state, and error
 */
export function useBenchmarkData(coordinates: [number, number]) {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate mock data based on coordinates
        const benchmarkData = mockBenchmarkData(coordinates)
        setData(benchmarkData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch benchmark data"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [coordinates])

  return { data, isLoading, error }
}
