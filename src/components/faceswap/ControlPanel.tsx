import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';

interface ControlPanelProps {
  intensity: number;
  setIntensity: (val: number) => void;
  isLoading: boolean;
  onExecute: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ intensity, setIntensity, isLoading, onExecute }) => {
  return (
    <div className="w-full glass-card border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <Sliders className="w-4 h-4 text-purple-400" />
        <h3 className="text-sm font-semibold text-slate-300">AI Control Parameters</h3>
      </div>
      
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>AI Fusion Intensity (Kecocokan Wajah)</span>
          <span>{intensity}%</span>
        </div>
        <input 
          type="range" min="0" max="100" value={intensity} 
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      <button 
        onClick={onExecute}
        disabled={isLoading}
        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 glow-pulse"
      >
        <Sparkles className="w-4 h-4" />
        {isLoading ? 'Processing via Edge GPU...' : 'Transformasikan Tampilan'}
      </button>
    </div>
  );
};
