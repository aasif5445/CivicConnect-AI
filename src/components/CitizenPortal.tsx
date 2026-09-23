import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  Sprout, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Calendar,
  X,
  Star,
  Download,
  LogIn,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { GovernmentScheme, Category, Bookmark as BookmarkType, CitizenUser } from '../types';

interface CitizenPortalProps {
  activeCitizen: CitizenUser | null;
  onOpenSignIn: () => void;
  onSwitchToAIChat: () => void;
  bookmarks: BookmarkType[];
  onToggleBookmark: (schemeId: number) => void;
  showBookmarksModal: boolean;
  setShowBookmarksModal: (show: boolean) => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  activeCitizen,
  onOpenSignIn,
  onSwitchToAIChat,
  bookmarks,
  onToggleBookmark,
  showBookmarksModal,
  setShowBookmarksModal
}) => {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByOccupationOnly, setFilterByOccupationOnly] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  // Feedback Modal state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedCategory, searchTerm, activeCitizen, filterByOccupationOnly]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [schemesRes, catsRes] = await Promise.all([
        api.getSchemes({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          search: searchTerm || undefined,
          occupation: (activeCitizen && filterByOccupationOnly) ? activeCitizen.occupation : undefined
        }),
        api.getCategories()
      ]);
      setSchemes(schemesRes.schemes);
      setCategories(catsRes);
    } catch (err) {
      console.error('Error fetching citizen data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (name: string) => {
    if (name.includes('Agriculture')) return <Sprout className="w-4 h-4 text-emerald-600" />;
    if (name.includes('Healthcare')) return <HeartPulse className="w-4 h-4 text-rose-600" />;
    if (name.includes('Education')) return <GraduationCap className="w-4 h-4 text-blue-600" />;
    if (name.includes('Business') || name.includes('MSME')) return <Briefcase className="w-4 h-4 text-amber-600" />;
    return <Users className="w-4 h-4 text-purple-600" />;
  };

  const isBookmarked = (schemeId: number) => {
    return bookmarks.some(b => b.schemeId === schemeId);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.submitFeedback({
        rating,
        comments: feedbackComments,
        userName: activeCitizen ? activeCitizen.name : 'Guest Citizen',
        userOccupation: activeCitizen ? activeCitizen.occupation : 'General Citizen'
      });
      setFeedbackSubmitted(true);
      setTimeout(() => {
        setFeedbackSubmitted(false);
        setShowFeedbackModal(false);
        setFeedbackComments('');
      }, 1500);
    } catch (err) {
      console.error('Feedback submit error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Citizen Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Citizen Service Portal</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">
              {activeCitizen ? `Authenticated: ${activeCitizen.occupation}` : 'Public Access Mode'}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {activeCitizen 
              ? `${activeCitizen.occupation} Welfare Schemes & Subsidies`
              : 'Explore Government Schemes & Subsidies'
            }
          </h1>

          {activeCitizen ? (
            <p className="text-slate-600 text-sm mt-1">
              Showing tailored central and state programs for <strong className="text-blue-900">{activeCitizen.occupation}</strong> beneficiaries in <strong className="text-blue-900">{activeCitizen.state}</strong> (Annual income up to <strong className="text-blue-900">₹{activeCitizen.income.toLocaleString('en-IN')}</strong>).
            </p>
          ) : (
            <p className="text-slate-600 text-sm mt-1">
              Browse all 26 central and state schemes. <strong>Sign in</strong> with your occupation (e.g. Farmer, Student, MSME) to view personalized eligibility filters.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {activeCitizen ? (
            <button
              onClick={onOpenSignIn}
              className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-semibold border border-blue-200 transition-colors flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Switch Profile</span>
            </button>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In for Targeted Schemes</span>
            </button>
          )}

          <button
            onClick={onSwitchToAIChat}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>Ask AI Advisor</span>
          </button>

          <button
            onClick={() => setShowFeedbackModal(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Submit Citizen Feedback (FEEDBACK Relational Entity)"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Feedback
          </button>
        </div>
      </div>

      {/* Profile Filter Notice Bar (when signed in) */}
      {activeCitizen && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 mb-6 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-medium">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              Currently displaying <strong>{activeCitizen.occupation}</strong> schemes ({schemes.length} matching).
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterByOccupationOnly(!filterByOccupationOnly)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterByOccupationOnly 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-white text-blue-900 border border-blue-200'
              }`}
            >
              {filterByOccupationOnly ? 'Filtered: Only My Occupation' : 'Show All 26 Schemes'}
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by scheme name, benefits, or keywords (e.g. Kisan, loan, hospital, housing)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-800 focus:border-transparent"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories ({schemes.length})
          </button>

          {categories.map(cat => (
            <button
              key={cat.categoryId}
              onClick={() => setSelectedCategory(cat.categoryName)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.categoryName
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {getCategoryIcon(cat.categoryName)}
              {cat.categoryName}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="inline-block animate-spin w-8 h-8 border-3 border-blue-900 border-t-transparent rounded-full mb-3" />
          <p className="text-sm text-slate-500">Querying MySQL Relational Scheme Repository...</p>
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 text-sm">No government schemes matched your filter criteria.</p>
          <button
            onClick={() => { 
              setSelectedCategory('All'); 
              setSearchTerm(''); 
              setFilterByOccupationOnly(false);
            }}
            className="mt-3 px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold"
          >
            Show All Schemes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map(scheme => (
            <div
              key={scheme.schemeId}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Category Badge & Bookmark Button */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-800">
                    {getCategoryIcon(scheme.categoryName || '')}
                    {scheme.categoryName || 'General'}
                  </span>
                  
                  <button
                    onClick={() => onToggleBookmark(scheme.schemeId)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isBookmarked(scheme.schemeId)
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                    title={isBookmarked(scheme.schemeId) ? 'Remove Bookmark' : 'Bookmark Scheme (BOOKMARK Table)'}
                  >
                    {isBookmarked(scheme.schemeId) ? (
                      <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Scheme Title */}
                <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug">
                  {scheme.schemeName}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                  {scheme.description}
                </p>

                {/* Quick Criteria Badges */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 space-y-2">
                  <div className="text-[11px] text-slate-700">
                    <span className="font-bold text-slate-900">Key Benefit: </span>
                    <span className="line-clamp-2">{scheme.benefits}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <span className="font-bold text-slate-900">Eligibility: </span>
                    <span className="line-clamp-2">{scheme.eligibility}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 py-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  View Circular & Rules
                </button>

                <a
                  href={scheme.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  Apply <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheme Detail & PDF Document Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-900 border border-blue-100 mb-2">
                  {selectedScheme.categoryName} • Scheme #{selectedScheme.schemeId}
                </span>
                <h2 className="text-xl font-bold text-slate-900">{selectedScheme.schemeName}</h2>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Detailed Description</h4>
                <p className="text-slate-700 leading-relaxed">{selectedScheme.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    Direct Benefits
                  </h4>
                  <p className="text-emerald-950 text-xs leading-relaxed">{selectedScheme.benefits}</p>
                </div>

                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-700" />
                    Eligibility Norms
                  </h4>
                  <p className="text-blue-950 text-xs leading-relaxed">{selectedScheme.eligibility}</p>
                </div>
              </div>

              {/* RAG Documents (SCHEME_DOCUMENT Entity) */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Official Gazette & Circulars (SCHEME_DOCUMENT table)
                </h4>
                <div className="space-y-2">
                  {selectedScheme.documents && selectedScheme.documents.length > 0 ? (
                    selectedScheme.documents.map(doc => (
                      <div
                        key={doc.documentId}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-rose-600" />
                          <div>
                            <div className="font-semibold text-slate-900">{doc.fileName}</div>
                            <div className="text-slate-500 text-[11px]">{doc.fileSize} • Version {doc.version}</div>
                          </div>
                        </div>
                        <a
                          href={doc.filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1 font-medium"
                        >
                          <Download className="w-3.5 h-3.5" /> View Circular
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-600" />
                        <span>Official_Policy_Guidelines_2025.pdf (Indexed in ChromaDB)</span>
                      </div>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-sm font-mono text-slate-700">384-d Vectorized</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex items-center justify-between">
              <a
                href={selectedScheme.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 hover:text-blue-900 font-medium flex items-center gap-1"
              >
                Official Ministry Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={selectedScheme.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-semibold text-xs hover:bg-blue-800 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                Open Online Application <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Citizen Feedback Modal (FEEDBACK Relational Entity) */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base">Citizen Feedback (FEEDBACK Entity)</h3>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {feedbackSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900">Feedback Recorded</h4>
                <p className="text-xs text-slate-500 mt-1">Inserted into MySQL FEEDBACK table with timestamp and foreign key relation.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Service Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-semibold text-slate-700 ml-2">{rating} of 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Your Remarks & Suggestions
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={feedbackComments}
                    onChange={e => setFeedbackComments(e.target.value)}
                    placeholder="Tell us about scheme transparency, navigation speed, or AI advisory clarity..."
                    className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  Submitting as: <strong className="text-slate-800">{activeCitizen ? activeCitizen.name : 'Guest Citizen'}</strong> ({activeCitizen ? activeCitizen.occupation : 'General Citizen'})
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-800"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
