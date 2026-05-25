import React from 'react';
import { Bell, Shield, Radio } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900/40 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-emerald-400" /> All Node GPU Systems Operational
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
        </button>
        
        <div className="h-6 w-px bg-slate-850"></div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-200">Admin AJM</p>
            <p className="text-[10px] text-slate-500 font-medium flex items-center gap-0.5">
              <Shield className="w-2.5 h-2.5 text-blue-400" /> Superroot
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
