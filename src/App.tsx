/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CitizenPortal } from './components/CitizenPortal';
import { AIChatRAG } from './components/AIChatRAG';
import { AdminPortal } from './components/AdminPortal';
import { AcademicLab } from './components/AcademicLab';
import { SignInModal } from './components/SignInModal';
import { api } from './services/api';
import { Bookmark, CitizenUser } from './types';

// Default initial state: A signed-in Farmer by default so users immediately see farmer-related schemes
const INITIAL_CITIZEN: CitizenUser = {
  occupation: 'Farmer',
  name: 'Farmer Beneficiary',
  state: 'Tamil Nadu',
  income: 200000,
  gender: 'All'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'citizen' | 'ai-chat' | 'admin' | 'academic'>('citizen');
  const [activeCitizen, setActiveCitizen] = useState<CitizenUser | null>(INITIAL_CITIZEN);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const data = await api.getBookmarks();
      setBookmarks(data);
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
    }
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleToggleBookmark = async (schemeId: number) => {
    const existing = bookmarks.find(b => b.schemeId === schemeId);
    if (existing) {
      try {
        await api.removeBookmark(existing.bookmarkId);
        setBookmarks(prev => prev.filter(b => b.bookmarkId !== existing.bookmarkId));
        showToast('Removed scheme from bookmarks (DELETE DML in BOOKMARK table)', 'info');
      } catch (err) {
        console.error('Remove bookmark error:', err);
      }
    } else {
      try {
        const note = activeCitizen ? `Saved for ${activeCitizen.occupation}` : 'Saved by guest';
        const newB = await api.addBookmark(schemeId, note);
        setBookmarks(prev => [...prev, newB]);
        showToast('Scheme saved with ACID compliance in MySQL BOOKMARK table!', 'success');
      } catch (err) {
        console.error('Add bookmark error:', err);
      }
    }
  };

  const handleSignIn = (citizen: CitizenUser) => {
    setActiveCitizen(citizen);
    showToast(`Signed in as ${citizen.occupation} (${citizen.state}) — Personalized schemes loaded!`, 'success');
  };

  const handleSignOut = () => {
    setActiveCitizen(null);
    showToast('Signed out. Now viewing all 26 national welfare schemes.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg border border-slate-800 text-xs flex items-center gap-2 animate-fade-in">
          <span className={notification.type === 'success' ? 'text-emerald-400' : 'text-blue-400'}>●</span>
          {notification.message}
        </div>
      )}

      {/* Main Government Portal Header with Sign In */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setShowBookmarksModal(true)}
        activeCitizen={activeCitizen}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Dynamic View Body */}
      <main className="flex-1 pb-12">
        {activeTab === 'citizen' && (
          <CitizenPortal
            activeCitizen={activeCitizen}
            onOpenSignIn={() => setIsSignInOpen(true)}
            onSwitchToAIChat={() => setActiveTab('ai-chat')}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            showBookmarksModal={showBookmarksModal}
            setShowBookmarksModal={setShowBookmarksModal}
          />
        )}

        {activeTab === 'ai-chat' && (
          <AIChatRAG
            activeCitizen={activeCitizen}
            onOpenSignIn={() => setIsSignInOpen(true)}
            onViewScheme={(name) => {
              setActiveTab('citizen');
              showToast(`Redirected to view scheme: ${name}`, 'info');
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPortal />
        )}

        {activeTab === 'academic' && (
          <AcademicLab />
        )}
      </main>

      {/* Citizen Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        currentCitizen={activeCitizen}
        onSignIn={handleSignIn}
      />

      {/* Portal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">CivicConnect AI</span> — National Public Welfare Scheme Portal
            <div className="text-[11px] text-slate-500 mt-0.5">
              Providing direct access to central &amp; state subsidies, official gazette circulars, and AI assistance.
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-600 font-medium">
            <span>© {new Date().getFullYear()} CivicConnect AI</span>
            <span>•</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
