import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Users, 
  Calendar,
  BarChart3,
  Shield,
  Bell,
  Download,
  RefreshCw
} from 'lucide-react';

interface OutbreakData {
  id: string;
  disease: string;
  location: string;
  cases: number;
  deaths: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
}

interface PredictionData {
  disease: string;
  probability: number;
  timeframe: string;
  region: string;
  confidence: number;
}

function App() {
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [alertCount, setAlertCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Sample outbreak data
  const outbreakData: OutbreakData[] = [
    {
      id: '1',
      disease: 'Influenza A',
      location: 'Southeast Asia',
      cases: 15420,
      deaths: 234,
      riskLevel: 'medium',
      lastUpdated: '2 hours ago',
      coordinates: { lat: 13.7563, lng: 100.5018 }
    },
    {
      id: '2',
      disease: 'COVID-19',
      location: 'Western Europe',
      cases: 8750,
      deaths: 89,
      riskLevel: 'low',
      lastUpdated: '1 hour ago',
      coordinates: { lat: 52.5200, lng: 13.4050 }
    },
    {
      id: '3',
      disease: 'Dengue Fever',
      location: 'South America',
      cases: 23100,
      deaths: 445,
      riskLevel: 'high',
      lastUpdated: '30 minutes ago',
      coordinates: { lat: -14.2350, lng: -51.9253 }
    },
    {
      id: '4',
      disease: 'Ebola',
      location: 'West Africa',
      cases: 1240,
      deaths: 678,
      riskLevel: 'critical',
      lastUpdated: '15 minutes ago',
      coordinates: { lat: 9.0820, lng: 8.6753 }
    }
  ];

  // Sample prediction data
  const predictions: PredictionData[] = [
    {
      disease: 'Influenza A',
      probability: 78,
      timeframe: 'Next 30 days',
      region: 'North America',
      confidence: 85
    },
    {
      disease: 'Malaria',
      probability: 65,
      timeframe: 'Next 60 days',
      region: 'Sub-Saharan Africa',
      confidence: 72
    },
    {
      disease: 'Zika Virus',
      probability: 45,
      timeframe: 'Next 90 days',
      region: 'Central America',
      confidence: 68
    }
  ];

  const diseases = ['all', 'COVID-19', 'Influenza A', 'Dengue Fever', 'Ebola', 'Malaria'];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <Shield className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const totalCases = outbreakData.reduce((sum, outbreak) => sum + outbreak.cases, 0);
  const totalDeaths = outbreakData.reduce((sum, outbreak) => sum + outbreak.deaths, 0);
  const highRiskOutbreaks = outbreakData.filter(outbreak => 
    outbreak.riskLevel === 'high' || outbreak.riskLevel === 'critical'
  ).length;

  useEffect(() => {
    setAlertCount(highRiskOutbreaks);
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [highRiskOutbreaks]);

  const refreshData = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Disease Outbreak Prediction System</h1>
                <p className="text-sm text-gray-500">Real-time monitoring & predictive analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={refreshData}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                {alertCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {alertCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Outbreaks</p>
                <p className="text-3xl font-bold text-gray-900">{outbreakData.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-3xl font-bold text-gray-900">{totalCases.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fatalities</p>
                <p className="text-3xl font-bold text-gray-900">{totalDeaths.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-3xl font-bold text-gray-900">{highRiskOutbreaks}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Outbreaks */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Current Outbreaks</h2>
                <div className="flex items-center space-x-2">
                  <select 
                    value={selectedDisease}
                    onChange={(e) => setSelectedDisease(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {diseases.map(disease => (
                      <option key={disease} value={disease}>
                        {disease === 'all' ? 'All Diseases' : disease}
                      </option>
                    ))}
                  </select>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {outbreakData
                  .filter(outbreak => selectedDisease === 'all' || outbreak.disease === selectedDisease)
                  .map((outbreak) => (
                    <div key={outbreak.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{outbreak.disease}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(outbreak.riskLevel)}`}>
                              <div className="flex items-center space-x-1">
                                {getRiskIcon(outbreak.riskLevel)}
                                <span className="capitalize">{outbreak.riskLevel} Risk</span>
                              </div>
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{outbreak.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{outbreak.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div>
                              <span className="text-gray-500">Cases: </span>
                              <span className="font-semibold text-gray-900">{outbreak.cases.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Deaths: </span>
                              <span className="font-semibold text-gray-900">{outbreak.deaths.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Predictions */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Outbreak Predictions</h2>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-500">AI-Powered</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{prediction.disease}</h3>
                        <p className="text-sm text-gray-600">{prediction.region}</p>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{prediction.probability}%</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Outbreak Probability</span>
                        <span className="text-gray-700">{prediction.probability}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${prediction.probability}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-gray-500">Timeframe: </span>
                          <span className="text-gray-900">{prediction.timeframe}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Confidence: </span>
                          <span className="text-gray-900">{prediction.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global Map Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Global Outbreak Map</h2>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-500">Interactive View</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Global Map</h3>
                  <p className="text-gray-600 mb-4">
                    View real-time outbreak locations, severity levels, and spread patterns across the globe.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                      <span className="text-gray-600">Low Risk</span>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                      <span className="text-gray-600">Medium Risk</span>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
                      <span className="text-gray-600">High Risk</span>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                      <span className="text-gray-600">Critical</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;