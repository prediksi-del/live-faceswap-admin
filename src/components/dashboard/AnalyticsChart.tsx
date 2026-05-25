import React from 'react';
import { BarChart3 } from 'lucide-react';

export const AnalyticsChart: React.FC = () => {
  const chartData = [35, 45, 20, 65, 80, 95, 70, 55, 90, 100, 40, 60];
  
  return (
    <div className="glass-panel border border-slate-900 p-6 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI API Call Traffic (24h)</h4>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Updated 1m ago</span>
      </div>

      <div className="h-32 flex items-end gap-2 pt-4 border-b border-slate-900 px-2">
        {chartData.map((val, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <div 
              style={{ height: `${val}%` }} 
              className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-md opacity-75 group-hover:opacity-100 transition-all duration-300 relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                {val}%
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-2 px-1">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:00</span>
      </div>
    </div>
  );
};
