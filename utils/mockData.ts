/**
 * Generate mock location data for the map
 * @param {[number, number]} coordinates - Location coordinates [longitude, latitude]
 * @returns {Object} Mock location data
 */
export function mockLocationData(coordinates: [number, number]) {
  const [longitude, latitude] = coordinates

  // Generate mock parcels
  const parcels = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        properties: {
          id: 1,
          name: "Main Property",
          size: "250,000 sqft",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude + 0.01, latitude + 0.005],
        },
        properties: {
          id: 2,
          name: "Adjacent Property",
          size: "180,000 sqft",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude - 0.008, latitude - 0.003],
        },
        properties: {
          id: 3,
          name: "Nearby Property",
          size: "120,000 sqft",
        },
      },
    ],
  }

  // Generate mock transportation data
  const transportation = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [longitude - 0.02, latitude - 0.01],
            [longitude + 0.02, latitude + 0.01],
          ],
        },
        properties: {
          id: 1,
          name: "Main Highway",
          type: "highway",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [longitude - 0.015, latitude + 0.015],
            [longitude + 0.015, latitude - 0.015],
          ],
        },
        properties: {
          id: 2,
          name: "Secondary Road",
          type: "road",
        },
      },
    ],
  }

  // Generate mock amenities data
  const amenities = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude + 0.015, latitude + 0.01],
        },
        properties: {
          id: 1,
          name: "Shopping Center",
          type: "retail",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude - 0.012, latitude + 0.008],
        },
        properties: {
          id: 2,
          name: "School",
          type: "education",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude + 0.008, latitude - 0.012],
        },
        properties: {
          id: 3,
          name: "Transit Station",
          type: "transportation",
        },
      },
    ],
  }

  // Generate mock competitors data
  const competitors = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude + 0.02, latitude - 0.02],
        },
        properties: {
          id: 1,
          name: "Competitor A",
          size: "300,000 sqft",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude - 0.025, latitude + 0.015],
        },
        properties: {
          id: 2,
          name: "Competitor B",
          size: "220,000 sqft",
        },
      },
    ],
  }

  // Generate mock risk factors data
  const riskFactors = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [longitude - 0.02, latitude - 0.02],
              [longitude - 0.02, latitude - 0.01],
              [longitude - 0.01, latitude - 0.01],
              [longitude - 0.01, latitude - 0.02],
              [longitude - 0.02, latitude - 0.02],
            ],
          ],
        },
        properties: {
          id: 1,
          name: "Flood Zone",
          risk: "high",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [longitude + 0.01, latitude + 0.01],
              [longitude + 0.01, latitude + 0.02],
              [longitude + 0.02, latitude + 0.02],
              [longitude + 0.02, latitude + 0.01],
              [longitude + 0.01, latitude + 0.01],
            ],
          ],
        },
        properties: {
          id: 2,
          name: "Contamination Area",
          risk: "medium",
        },
      },
    ],
  }

  return {
    parcels,
    transportation,
    amenities,
    competitors,
    riskFactors,
  }
}

/**
 * Generate mock metrics data
 * @param {[number, number]} coordinates - Location coordinates [longitude, latitude]
 * @returns {Object} Mock metrics data
 */
export function mockMetricsData(coordinates: [number, number]) {
  // Use coordinates to generate slightly different data for different locations
  const [longitude, latitude] = coordinates
  const seed = (longitude * 10 + latitude * 10) % 10

  return {
    highway: {
      value: (1.2 + seed * 0.3).toFixed(1),
      status: seed < 3 ? "good" : seed < 7 ? "warning" : "bad",
    },
    income: {
      value: Math.floor(65000 + seed * 2000),
      status: seed > 5 ? "good" : seed > 2 ? "warning" : "bad",
    },
    flood: {
      value: Math.floor(10 + seed * 8),
      status: seed < 4 ? "good" : seed < 8 ? "warning" : "bad",
    },
    population: {
      value: Math.floor(12000 + seed * 1000),
      status: "neutral",
    },
    traffic: {
      value: Math.floor(15000 + seed * 2000),
      status: seed < 5 ? "good" : "warning",
    },
    crime: {
      value: Math.floor(20 + seed * 7),
      status: seed < 3 ? "good" : seed < 7 ? "warning" : "bad",
    },
    zoning: {
      value: seed < 5 ? "Industrial" : "Mixed-Use",
      status: "neutral",
    },
    airport: {
      value: (8.5 + seed * 0.5).toFixed(1),
      status: seed < 5 ? "good" : "warning",
    },
    environmental: {
      value: Math.floor(15 + seed * 8),
      status: seed < 4 ? "good" : seed < 8 ? "warning" : "bad",
    },
  }
}

/**
 * Generate mock benchmark data
 * @param {[number, number]} coordinates - Location coordinates [longitude, latitude]
 * @returns {Object} Mock benchmark data
 */
export function mockBenchmarkData(coordinates: [number, number]) {
  // Use coordinates to generate slightly different data for different locations
  const [longitude, latitude] = coordinates
  const seed = (longitude * 10 + latitude * 10) % 10

  return {
    benchmarks: [
      {
        name: "Rent per Sq Ft",
        value: `$${(12.5 + seed * 0.8).toFixed(2)}`,
        unit: "sq ft/yr",
        marketPercentile: Math.floor(60 + seed * 4),
        nationalPercentile: Math.floor(50 + seed * 5),
      },
      {
        name: "Vacancy Rate",
        value: `${(4 + seed * 0.5).toFixed(1)}%`,
        unit: "",
        marketPercentile: Math.floor(70 + seed * 3),
        nationalPercentile: Math.floor(65 + seed * 3.5),
      },
      {
        name: "Cap Rate",
        value: `${(5.2 + seed * 0.3).toFixed(2)}%`,
        unit: "",
        marketPercentile: Math.floor(55 + seed * 4.5),
        nationalPercentile: Math.floor(45 + seed * 5.5),
      },
      {
        name: "Traffic Count",
        value: Math.floor(15000 + seed * 2000).toLocaleString(),
        unit: "daily",
        marketPercentile: Math.floor(50 + seed * 5),
        nationalPercentile: Math.floor(40 + seed * 6),
      },
    ],
  }
}

/**
 * Generate mock risk data
 * @param {[number, number]} coordinates - Location coordinates [longitude, latitude]
 * @returns {Object} Mock risk data
 */
export function mockRiskData(coordinates: [number, number]) {
  // Use coordinates to generate slightly different data for different locations
  const [longitude, latitude] = coordinates
  const seed = (longitude * 10 + latitude * 10) % 10

  // Calculate overall score (0-100)
  const overallScore = Math.floor(70 + seed * 3)

  // Determine risk category
  let riskCategory
  if (overallScore >= 80) {
    riskCategory = "Low Risk"
  } else if (overallScore >= 60) {
    riskCategory = "Moderate Risk"
  } else {
    riskCategory = "High Risk"
  }

  return {
    overallScore,
    riskCategory,
    risks: [
      {
        name: "Flood Risk",
        value: Math.floor(20 + seed * 8),
        marketAverage: Math.floor(30 + seed * 2),
        category: seed < 3 ? "Low" : seed < 7 ? "Medium" : "High",
      },
      {
        name: "Crime Rate",
        value: Math.floor(25 + seed * 7),
        marketAverage: Math.floor(35 + seed * 3),
        category: seed < 4 ? "Low" : seed < 8 ? "Medium" : "High",
      },
      {
        name: "Environmental",
        value: Math.floor(15 + seed * 6),
        marketAverage: Math.floor(25 + seed * 2),
        category: seed < 5 ? "Low" : seed < 8 ? "Medium" : "High",
      },
      {
        name: "Traffic Congestion",
        value: Math.floor(30 + seed * 6),
        marketAverage: Math.floor(40 + seed * 2),
        category: seed < 4 ? "Low" : seed < 7 ? "Medium" : "High",
      },
      {
        name: "Market Volatility",
        value: Math.floor(25 + seed * 5),
        marketAverage: Math.floor(30 + seed * 3),
        category: seed < 5 ? "Low" : seed < 8 ? "Medium" : "High",
      },
    ],
  }
}
