import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Bookmark, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  Briefcase,
  Database
} from 'lucide-react';
import { CitizenUser } from '../types';

interface NavbarProps {
  activeTab: 'citizen' | 'ai-chat' | 'admin' | 'academic';
  setActiveTab: (tab: 'citizen' | 'ai-chat' | 'admin' | 'academic') => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  activeCitizen: CitizenUser | null;
  onOpenSignIn: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  onOpenBookmarks,
  activeCitizen,
  onOpenSignIn,
  onSignOut
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Tricolor Subtle Header Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('citizen')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center text-white shadow-xs">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">CivicConnect</span>
                <span className="text-[10px] uppercase font-black bg-blue-900 text-amber-300 px-1.5 py-0.5 rounded-sm tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">National Public Welfare Scheme Portal</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('citizen')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'citizen'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-800" />
              Citizen Directory
            </button>

            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ai-chat'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Scheme Advisor
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Admin Management
            </button>

            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'academic'
                  ? 'bg-blue-900 text-amber-300 shadow-xs ring-1 ring-blue-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-blue-700" />
              <span>DBMS Academic Lab</span>
            </button>
          </nav>

          {/* Right Action Tools: Bookmarks & Citizen Sign In Button */}
          <div className="flex items-center gap-2.5">
            {/* Bookmarks Pill */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="View Bookmarked Schemes"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Citizen Authentication / Sign In Action */}
            {activeCitizen ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenSignIn}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 transition-colors text-left"
                  title="Click to switch citizen profile or update details"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-amber-300 flex items-center justify-center font-bold text-xs">
                    {activeCitizen.occupation.charAt(0)}
                  </div>
                  <div className="leading-tight hidden sm:block">
                    <div className="text-xs font-bold text-blue-950 flex items-center gap-1">
                      <span>{activeCitizen.occupation}</span>
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {activeCitizen.state} • ₹{Math.round(activeCitizen.income / 1000)}k
                    </div>
                  </div>
                </button>

                <button
                  onClick={onSignOut}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Sign Out (View All Schemes)"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenSignIn}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Citizen Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-slate-100 overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveTab('citizen')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${activeTab === 'citizen' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}
          >
            Citizen
          </button>
          <button
            onClick={() => setActiveTab('ai-chat')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${activeTab === 'ai-chat' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}
          >
            AI Advisor
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${activeTab === 'admin' ? 'bg-emerald-900 text-white' : 'text-slate-600'}`}
          >
            Admin
          </button>
          <button
            onClick={() => setActiveTab('academic')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${activeTab === 'academic' ? 'bg-blue-900 text-amber-300' : 'text-slate-600'}`}
          >
            DBMS Lab
          </button>
        </div>
      </div>
    </header>
  );
};
