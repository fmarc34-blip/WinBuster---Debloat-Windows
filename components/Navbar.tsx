
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  aiEnabled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, aiEnabled }) => {
  const tabs = [
    { id: 'debloat', label: 'Debloat', icon: 'fa-scissors' },
    { id: 'storage', label: 'Storage', icon: 'fa-hard-drive' },
    { id: 'fixes', label: 'Needed Fixes', icon: 'fa-wrench' },
    { id: 'tldr', label: 'TL;DR', icon: 'fa-bolt-lightning' },
    { id: 'troubleshoot', label: 'Problem Solver', icon: 'fa-circle-question', ai: true },
    { id: 'apps', label: 'Essential Apps', icon: 'fa-cube' },
    { id: 'ai', label: 'AI Optimizer', icon: 'fa-robot', ai: true },
  ];

  const visibleTabs = tabs.filter(tab => !tab.ai || aiEnabled);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fa-brands fa-windows text-white text-xl"></i>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">WinBuster</span>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 overflow-x-auto no-scrollbar py-2">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-600/10 text-blue-400' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span className="text-sm font-medium hidden md:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
