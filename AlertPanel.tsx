import React from 'react';
import { AlertTriangle, Bell, Shield, Activity, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location?: string;
  isNew?: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  onDismiss,
  isOpen,
  onClose
}) => {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'medium': return <Shield className="w-5 h-5 text-yellow-600" />;
      case 'info': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertTextColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-800';
      case 'high': return 'text-orange-800';
      case 'medium': return 'text-yellow-800';
      case 'info': return 'text-blue-800';
      default: return 'text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">System Alerts</h2>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              {alerts.length} Active
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {alerts.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active alerts</p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)} relative`}
                >
                  {alert.isNew && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${getAlertTextColor(alert.type)}`}>
                          {alert.title}
                        </h3>
                        <button
                          onClick={() => onDismiss(alert.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className={`text-sm ${getAlertTextColor(alert.type)} mb-2`}>
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{alert.timestamp}</span>
                        {alert.location && (
                          <span className="bg-white px-2 py-1 rounded">
                            📍 {alert.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};