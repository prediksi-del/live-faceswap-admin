import React from 'react';
import { LayoutDashboard, Users, Settings, LogOut, Sliders } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'Kelola User', icon: Users },
    { id: 'settings', name: 'Pengaturan API', icon: Settings },
  ];

  return (
    <aside className="w-64 glass-card border-r border-slate-900 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
            <Sliders className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-sm tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            AJM PANEL
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  currentTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg glow-blue'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all">
        <LogOut className="w-4 h-4" />
        Keluar Sesi
      </button>
    </aside>
  );
};
