
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Button } from './components/Button';
import { CodeBlock } from './components/CodeBlock';
import { DEBLOAT_ITEMS, ESSENTIAL_APPS, QUICK_FIXES } from './constants';
import { geminiService } from './services/geminiService';
import { WindowsVersion } from './types';

// Real Windows 11 styled logo (flat square grid)
const Windows11Logo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <rect x="1" y="1" width="10.5" height="10.5" />
    <rect x="12.5" y="1" width="10.5" height="10.5" />
    <rect x="1" y="12.5" width="10.5" height="10.5" />
    <rect x="12.5" y="12.5" width="10.5" height="10.5" />
  </svg>
);

const Windows10Logo = ({ className }: { className?: string }) => (
  <i className={`fa-brands fa-windows ${className}`}></i>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('debloat');
  const [winVersion, setWinVersion] = useState<WindowsVersion>('win11');
  const [aiQuery, setAiQuery] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [storageAudit, setStorageAudit] = useState<string | null>(null);
  const [isStorageLoading, setIsStorageLoading] = useState(false);
  const [storageContext, setStorageContext] = useState('');

  const [problemQuery, setProblemQuery] = useState('');
  const [problemSolution, setProblemSolution] = useState<string | null>(null);
  const [isProblemLoading, setIsProblemLoading] = useState(false);

  const [analyzingItems, setAnalyzingItems] = useState<Record<string, boolean>>({});
  const [itemExplanations, setItemExplanations] = useState<Record<string, string>>({});

  const [showAbout, setShowAbout] = useState(false);

  const handleAiConsult = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    const advice = await geminiService.getOptimizationAdvice(aiQuery, winVersion);
    setAiAdvice(advice || "No advice found.");
    setIsAiLoading(false);
  };

  const handleStorageAudit = async () => {
    setIsStorageLoading(true);
    const audit = await geminiService.getStorageAudit(winVersion, storageContext);
    setStorageAudit(audit);
    setIsStorageLoading(false);
  };

  const handleTroubleshoot = async () => {
    if (!problemQuery.trim()) return;
    setIsProblemLoading(true);
    const solution = await geminiService.troubleshootProblem(problemQuery, winVersion);
    setProblemSolution(solution);
    setIsProblemLoading(false);
  };

  const handleAnalyzeItem = async (id: string, title: string, description: string) => {
    setAnalyzingItems(prev => ({ ...prev, [id]: true }));
    const explanation = await geminiService.explainBloatware(title, description, winVersion);
    setItemExplanations(prev => ({ ...prev, [id]: explanation }));
    setAnalyzingItems(prev => ({ ...prev, [id]: false }));
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 relative">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        
        {/* OS Selection with Proper Logos */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${winVersion === 'win11' ? 'bg-blue-500/10 text-blue-400' : 'bg-sky-500/10 text-sky-400'}`}>
              {winVersion === 'win11' ? <Windows11Logo className="w-8 h-8" /> : <Windows10Logo className="text-3xl" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">Targeting Windows {winVersion === 'win11' ? '11' : '10'}</h2>
              <p className="text-slate-400 text-sm">Logos and tweaks strictly categorized for your OS.</p>
            </div>
          </div>
          <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 w-full sm:w-auto">
            <button 
              onClick={() => setWinVersion('win10')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-2.5 rounded-lg transition-all ${winVersion === 'win10' ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/40' : 'text-slate-400 hover:text-white'}`}
            >
              <Windows10Logo className="text-lg" /> Windows 10
            </button>
            <button 
              onClick={() => setWinVersion('win11')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-6 py-2.5 rounded-lg transition-all ${winVersion === 'win11' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:text-white'}`}
            >
              <Windows11Logo className="w-4 h-4" /> Windows 11
            </button>
          </div>
        </div>

        {/* Dynamic Content Sections */}
        {activeTab === 'debloat' && (
          <section className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-amber-500 bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl">
                <i className="fa-solid fa-triangle-exclamation text-2xl flex-shrink-0"></i>
                <div className="text-sm">
                  <strong className="block mb-1">Information-First Architecture</strong>
                  WinBuster uses AI to explain why items are bloatware <strong>and why you might need them</strong> before you take any action.
                </div>
              </div>
              <div className="flex items-center space-x-3 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <i className="fa-solid fa-hard-drive text-2xl flex-shrink-0"></i>
                <div className="text-sm">
                  <strong className="block mb-1">Massive Storage Savings</strong>
                  Look for the <span className="text-emerald-400 font-bold">High Impact</span> items below to reclaim 20GB-50GB+ of storage space.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {DEBLOAT_ITEMS.filter(item => item.version === winVersion || item.version === 'both').map(item => (
                <div key={item.id} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/30 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">{item.title}</h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          item.impact === 'high' ? 'bg-red-500/20 text-red-400' : 
                          item.impact === 'medium' ? 'bg-amber-500/20 text-amber-400' : 
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {item.impact} Impact
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                    
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => handleAnalyzeItem(item.id, item.title, item.description)}
                      isLoading={analyzingItems[item.id]}
                      className="flex-shrink-0 bg-slate-900 border border-slate-700 hover:border-blue-500"
                    >
                      <i className="fa-solid fa-wand-magic-sparkles mr-2 text-blue-400"></i>
                      AI Decision Support
                    </Button>
                  </div>

                  {itemExplanations[item.id] && (
                    <div className="mb-6 p-5 bg-blue-600/5 border border-blue-500/20 rounded-xl animate-in slide-in-from-top-2">
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase mb-3 tracking-widest border-b border-blue-500/10 pb-2">
                        <i className="fa-solid fa-brain"></i> AI Deep Analysis: {item.title}
                      </div>
                      <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {itemExplanations[item.id]}
                      </div>
                    </div>
                  )}

                  {item.command && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Instructions (PowerShell):</span>
                        <div className="flex gap-2">
                           <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Administrator Mode Required</span>
                        </div>
                      </div>
                      <CodeBlock code={item.command} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'storage' && (
          <section className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex p-4 rounded-full bg-emerald-600/10 border border-emerald-500/20 mb-4">
                <i className="fa-solid fa-hard-drive text-4xl text-emerald-500"></i>
              </div>
              <h2 className="text-3xl font-bold mb-2">Storage Reclaimer</h2>
              <p className="text-slate-400">Deep, safe, and effective ways to get your gigabytes back. No fluff, just results.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl shadow-xl backdrop-blur-md">
                   <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <i className="fa-solid fa-magnifying-glass-chart text-emerald-400"></i>
                     Custom Storage Audit
                   </h3>
                   <p className="text-sm text-slate-400 mb-6">Tell the AI about your disk situation (e.g. "C: drive is red", "64GB SSD", "Game files taking too much space").</p>
                   <textarea 
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none min-h-[120px] mb-4 transition-all"
                    placeholder="Describe your storage problem..."
                    value={storageContext}
                    onChange={(e) => setStorageContext(e.target.value)}
                   />
                   <Button 
                    variant="primary" 
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/20"
                    onClick={handleStorageAudit}
                    isLoading={isStorageLoading}
                   >
                     <i className="fa-solid fa-wand-sparkles mr-2"></i>
                     Start AI Storage Audit
                   </Button>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl">
                  <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-bolt"></i>
                    Storage Pro Tip
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Always check the <strong>Delivery Optimization</strong> folder. Windows often caches updates long after they're installed. Cleaning this via "Disk Cleanup" or PowerShell can reclaim 5GB+ instantly.
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                {storageAudit ? (
                  <div className="bg-slate-800/40 border border-emerald-500/20 p-8 rounded-3xl animate-in fade-in zoom-in-95 h-full overflow-y-auto max-h-[600px] scrollbar-thin">
                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-slate-800/40 backdrop-blur-md py-2 z-10">
                      <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                        <i className="fa-solid fa-brain"></i> Brain-Thanking Advice
                      </span>
                      <button onClick={() => setStorageAudit(null)} className="text-slate-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-300">
                      {storageAudit.split('```').map((block, i) => (
                        i % 2 === 1 ? <CodeBlock key={i} code={block.replace('powershell\n', '').replace('bash\n', '').replace('cmd\n', '')} /> : <div key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\n/g, '<br/>') }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-12 text-center">
                    <i className="fa-solid fa-folder-open text-6xl mb-4 opacity-20"></i>
                    <p className="text-lg font-medium">Ready for your storage audit.</p>
                    <p className="text-sm">Run the AI audit to find massive amounts of space you didn't know you could save.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'troubleshoot' && (
          <section className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center">
              <div className="inline-flex p-5 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-6 shadow-xl">
                <i className="fa-solid fa-circle-question text-5xl text-blue-400"></i>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight">Problem Solver</h2>
              <p className="text-slate-400 text-lg">Describe exactly what is bothering you on your PC. Slow start? Broken menu? Strange error code?</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <i className="fa-solid fa-stethoscope text-[12rem] rotate-12"></i>
              </div>
              <div className="mb-6 relative z-10">
                <label className="block text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Describe Your Windows Headache</label>
                <textarea 
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-2xl p-6 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[180px] text-lg leading-relaxed shadow-inner"
                  placeholder="e.g., 'My taskbar is frozen after the latest update', or 'The Start menu search takes 10 seconds to respond', or 'Error code 0x80070005 when updating...'"
                  value={problemQuery}
                  onChange={(e) => setProblemQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleTroubleshoot())}
                ></textarea>
              </div>
              <Button 
                onClick={handleTroubleshoot}
                isLoading={isProblemLoading}
                className="w-full py-6 text-xl rounded-2xl shadow-2xl shadow-blue-900/40 bg-blue-600 hover:bg-blue-500 font-bold"
              >
                <i className="fa-solid fa-kit-medical mr-3"></i>
                Diagnose & Provide Fix
              </Button>
            </div>

            {problemSolution && (
              <div className="bg-slate-800/40 border border-blue-500/30 p-8 rounded-[2rem] animate-in zoom-in-95 duration-500 shadow-2xl relative group">
                <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-xl">
                      <i className="fa-solid fa-user-doctor text-2xl text-blue-400"></i>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-blue-400 uppercase tracking-widest">Expert Diagnosis Result</span>
                      <h3 className="text-xl font-bold text-white">Proposed Action Plan</h3>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setProblemSolution(null)} className="hover:bg-red-500/10 hover:text-red-400">
                    <i className="fa-solid fa-trash-can mr-2"></i> Dismiss
                  </Button>
                </div>
                
                <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
                  {problemSolution.split('```').map((block, i) => (
                    i % 2 === 1 ? <CodeBlock key={i} code={block.replace('powershell\n', '').replace('bash\n', '').replace('cmd\n', '').replace('registry\n', '')} /> : <div key={i} dangerouslySetInnerHTML={{ __html: block.replace(/\n/g, '<br/>') }} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'fixes' && (
          <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Critical System Fixes</h2>
              <p className="text-slate-400">Manual adjustments for a cleaner, faster Windows interface.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUICK_FIXES.map((fix, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800/60 transition-colors">
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-screwdriver-wrench text-blue-500 text-sm"></i>
                    {fix.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{fix.description}</p>
                  <div className="bg-blue-600/5 text-blue-400 p-3 rounded-lg text-sm mb-4 border border-blue-500/10 italic">
                    <strong>The Fix:</strong> {fix.solution}
                  </div>
                  {fix.code && <CodeBlock code={fix.code} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'apps' && (
          <section className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Open-Source Essentials</h2>
              <p className="text-slate-400">Better software for a better OS. No telemetry, no ads.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ESSENTIAL_APPS.map((app, idx) => (
                <div key={idx} className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl flex flex-col h-full hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 transition-all">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
                      <i className={`fa-solid ${app.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{app.name}</h3>
                      <span className="text-[10px] text-blue-400 uppercase font-bold tracking-widest bg-blue-400/10 px-2 py-0.5 rounded-md">{app.category}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm flex-grow mb-8 leading-relaxed">{app.description}</p>
                  <div className="space-y-3 mt-auto">
                    <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between">
                      <code className="text-xs text-emerald-400 font-mono truncate mr-2">{app.winget}</code>
                      <button 
                        className="text-slate-500 hover:text-white transition-colors p-1"
                        onClick={() => navigator.clipboard.writeText(app.winget)}
                        title="Copy winget command"
                      >
                        <i className="fa-solid fa-copy"></i>
                      </button>
                    </div>
                    <a 
                      href={app.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold transition-all text-white"
                    >
                      <i className="fa-solid fa-external-link text-xs"></i>
                      Visit Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'ai' && (
          <section className="max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="text-center mb-10">
              <div className="inline-block p-5 rounded-3xl bg-blue-600/10 mb-6 border border-blue-500/20">
                <i className="fa-solid fa-sparkles text-5xl text-blue-500"></i>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight">AI Optimization Strategy</h2>
              <p className="text-slate-400 text-lg">Describe your system specs or issues, and the AI will tell you exactly what is bloatware for your specific case.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <i className="fa-solid fa-microchip text-9xl"></i>
              </div>
              <div className="mb-6 relative z-10">
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">System Context</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-5 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[160px] text-lg leading-relaxed shadow-inner"
                  placeholder="e.g., 'I have a 64GB SSD and a slow CPU on Windows 11. How do I reclaim massive storage space?'"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAiConsult())}
                ></textarea>
              </div>
              <Button 
                onClick={handleAiConsult}
                isLoading={isAiLoading}
                className="w-full py-5 text-xl rounded-2xl shadow-lg shadow-blue-600/20"
              >
                <i className="fa-solid fa-bolt mr-3"></i>
                Build Custom Debloat Plan
              </Button>
            </div>

            {aiAdvice && (
              <div className="mt-10 bg-slate-800/40 border border-slate-700 p-8 rounded-3xl prose prose-invert max-w-none shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                  <div className="flex items-center space-x-3 text-blue-400">
                    <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
                    <span className="text-lg font-bold">Personalized Optimization Guide</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setAiAdvice(null)}>
                    <i className="fa-solid fa-trash-can mr-2"></i> Reset
                  </Button>
                </div>
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed space-y-4">
                  {aiAdvice.split('```').map((block, i) => (
                    i % 2 === 1 ? <CodeBlock key={i} code={block.replace('powershell\n', '').replace('bash\n', '').replace('txt\n', '')} /> : <div key={i}>{block}</div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowAbout(false)}></div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl relative z-10 max-w-lg w-full animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-600/20">
                <i className="fa-brands fa-windows text-white text-3xl"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold">WinBuster</h2>
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Version V1.26</span>
              </div>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong>WinBuster</strong> is an open-source companion designed to help you navigate the complexity of modern Windows systems. 
              </p>
              <div className="p-4 bg-blue-600/10 border-l-4 border-blue-500 rounded-r-xl">
                 <p className="text-xs font-bold text-blue-400 uppercase mb-2">Privacy Shield Guarantee</p>
                 <p className="text-sm">WinBuster <strong>Never sends something to microsoft servers</strong>. There are 0 fixes or features in this app that communicate with Microsoft. Your system data stays on your system.</p>
              </div>
              <p>
                Our mission is to empower users to reclaim their hardware by explaining exactly what pre-installed components do, why they might be considered "bloat", and how to safely optimize them without breaking core functionality.
              </p>
              <p className="text-sm text-slate-500 italic">
                Powered by Gemini AI for deep system analysis and real-time troubleshooting. Always remember: Knowledge is your best tool—Backup before you optimize!
              </p>
            </div>
            
            <Button 
              className="w-full mt-8" 
              onClick={() => setShowAbout(false)}
            >
              Got it, thanks!
            </Button>
          </div>
        </div>
      )}

      {/* Footer Status */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800 p-4 flex flex-col sm:flex-row justify-center items-center text-[10px] text-slate-500 gap-6 z-40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <span className="uppercase tracking-widest font-bold">WinBuster V1.26</span>
          </div>
          <button 
            onClick={() => setShowAbout(true)}
            className="text-slate-400 hover:text-blue-400 font-bold transition-colors uppercase tracking-[0.1em]"
          >
            About WinBuster
          </button>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-slate-700">|</span>
           <span className="flex items-center gap-1">
             {winVersion === 'win11' ? <Windows11Logo className="w-3 h-3 text-blue-400" /> : <Windows10Logo className="text-sky-400" />}
             Optimizing Windows {winVersion === 'win11' ? '11' : '10'} Profile
           </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-700">|</span>
          <i className="fa-solid fa-brain text-purple-400"></i>
          <span>AI Insight Enabled</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
