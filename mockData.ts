export interface OutbreakData {
  id: string;
  disease: string;
  location: string;
  cases: number;
  deaths: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
  trend: 'up' | 'down' | 'stable';
}

export interface PredictionData {
  disease: string;
  probability: number;
  timeframe: string;
  region: string;
  confidence: number;
  factors: string[];
}

export interface AlertData {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location?: string;
  isNew?: boolean;
}

export const mockOutbreakData: OutbreakData[] = [
  {
    id: '1',
    disease: 'Influenza A',
    location: 'Southeast Asia',
    cases: 15420,
    deaths: 234,
    riskLevel: 'medium',
    lastUpdated: '2 hours ago',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    trend: 'up'
  },
  {
    id: '2',
    disease: 'COVID-19',
    location: 'Western Europe',
    cases: 8750,
    deaths: 89,
    riskLevel: 'low',
    lastUpdated: '1 hour ago',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    trend: 'stable'
  },
  {
    id: '3',
    disease: 'Dengue Fever',
    location: 'South America',
    cases: 23100,
    deaths: 445,
    riskLevel: 'high',
    lastUpdated: '30 minutes ago',
    coordinates: { lat: -14.2350, lng: -51.9253 },
    trend: 'up'
  },
  {
    id: '4',
    disease: 'Ebola',
    location: 'West Africa',
    cases: 1240,
    deaths: 678,
    riskLevel: 'critical',
    lastUpdated: '15 minutes ago',
    coordinates: { lat: 9.0820, lng: 8.6753 },
    trend: 'down'
  },
  {
    id: '5',
    disease: 'Malaria',
    location: 'Sub-Saharan Africa',
    cases: 45600,
    deaths: 1230,
    riskLevel: 'high',
    lastUpdated: '3 hours ago',
    coordinates: { lat: -8.7832, lng: 34.5085 },
    trend: 'stable'
  }
];

export const mockPredictionData: PredictionData[] = [
  {
    disease: 'Influenza A',
    probability: 78,
    timeframe: 'Next 30 days',
    region: 'North America',
    confidence: 85,
    factors: ['Seasonal patterns', 'Population density', 'Climate conditions']
  },
  {
    disease: 'Malaria',
    probability: 65,
    timeframe: 'Next 60 days',
    region: 'Sub-Saharan Africa',
    confidence: 72,
    factors: ['Rainfall patterns', 'Temperature increase', 'Vector population']
  },
  {
    disease: 'Zika Virus',
    probability: 45,
    timeframe: 'Next 90 days',
    region: 'Central America',
    confidence: 68,
    factors: ['Mosquito activity', 'Travel patterns', 'Vaccination coverage']
  },
  {
    disease: 'Cholera',
    probability: 82,
    timeframe: 'Next 45 days',
    region: 'South Asia',
    confidence: 79,
    factors: ['Water contamination', 'Monsoon season', 'Sanitation issues']
  }
];

export const mockAlertData: AlertData[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Ebola Outbreak Escalation',
    message: 'Death toll has increased by 15% in the last 24 hours in West Africa region.',
    timestamp: '2 minutes ago',
    location: 'West Africa',
    isNew: true
  },
  {
    id: '2',
    type: 'high',
    title: 'Dengue Fever Spread',
    message: 'New cases reported in 3 additional provinces. Enhanced monitoring activated.',
    timestamp: '15 minutes ago',
    location: 'South America',
    isNew: true
  },
  {
    id: '3',
    type: 'medium',
    title: 'Influenza A Mutation',
    message: 'Potential strain mutation detected. Requires vaccine effectiveness review.',
    timestamp: '1 hour ago',
    location: 'Southeast Asia',
    isNew: false
  },
  {
    id: '4',
    type: 'info',
    title: 'COVID-19 Trend Update',
    message: 'Cases remain stable across Western Europe with slight decline in ICU admissions.',
    timestamp: '2 hours ago',
    location: 'Western Europe',
    isNew: false
  }
];