export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateMortalityRate = (deaths: number, cases: number): number => {
  if (cases === 0) return 0;
  return Math.round((deaths / cases) * 100 * 100) / 100; // Round to 2 decimal places
};

export const getRiskLevel = (cases: number, deaths: number): 'low' | 'medium' | 'high' | 'critical' => {
  const mortalityRate = calculateMortalityRate(deaths, cases);
  
  if (mortalityRate > 10 || cases > 50000) return 'critical';
  if (mortalityRate > 5 || cases > 20000) return 'high';
  if (mortalityRate > 2 || cases > 5000) return 'medium';
  return 'low';
};

export const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const sortByRisk = (data: any[]): any[] => {
  const riskOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  return [...data].sort((a, b) => riskOrder[b.riskLevel] - riskOrder[a.riskLevel]);
};

export const filterByTimeframe = (data: any[], hours: number): any[] => {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - hours);
  
  return data.filter(item => {
    const itemDate = new Date(item.lastUpdated || item.timestamp);
    return itemDate >= cutoff;
  });
};