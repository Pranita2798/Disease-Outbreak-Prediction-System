import React from 'react';
import { MapPin, Calendar, AlertTriangle, Shield, Users, Activity } from 'lucide-react';

interface DiseaseCardProps {
  disease: string;
  location: string;
  cases: number;
  deaths: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({
  disease,
  location,
  cases,
  deaths,
  riskLevel,
  lastUpdated,
  trend
}) => {
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{disease}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{location}</span>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getRiskColor(riskLevel)}`}>
          <div className="flex items-center space-x-1">
            {getRiskIcon(riskLevel)}
            <span className="capitalize">{riskLevel} Risk</span>
          </div>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Cases</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{cases.toLocaleString()}</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Activity className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Deaths</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{deaths.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Updated {lastUpdated}</span>
        </div>
        <div className={`text-sm font-medium ${getTrendColor(trend)}`}>
          {trend === 'up' && '↗ Rising'}
          {trend === 'down' && '↘ Declining'}
          {trend === 'stable' && '→ Stable'}
        </div>
      </div>
    </div>
  );
};