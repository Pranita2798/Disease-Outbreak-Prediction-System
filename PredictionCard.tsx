import React from 'react';
import { TrendingUp, Brain, MapPin, Clock } from 'lucide-react';

interface PredictionCardProps {
  disease: string;
  region: string;
  probability: number;
  timeframe: string;
  confidence: number;
  factors: string[];
}

export const PredictionCard: React.FC<PredictionCardProps> = ({
  disease,
  region,
  probability,
  timeframe,
  confidence,
  factors
}) => {
  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return 'text-red-600 bg-red-50';
    if (prob >= 50) return 'text-orange-600 bg-orange-50';
    if (prob >= 30) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getProgressColor = (prob: number) => {
    if (prob >= 70) return 'bg-red-500';
    if (prob >= 50) return 'bg-orange-500';
    if (prob >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{disease}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{region}</span>
          </div>
        </div>
        <div className={`px-3 py-2 rounded-lg text-center ${getProbabilityColor(probability)}`}>
          <div className="text-2xl font-bold">{probability}%</div>
          <div className="text-xs font-medium">Risk</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Outbreak Probability</span>
          <span className="font-medium">{probability}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(probability)}`}
            style={{ width: `${probability}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-xs text-gray-500">Timeframe</div>
            <div className="text-sm font-medium">{timeframe}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-xs text-gray-500">Confidence</div>
            <div className="text-sm font-medium">{confidence}%</div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Key Factors</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {factors.map((factor, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};