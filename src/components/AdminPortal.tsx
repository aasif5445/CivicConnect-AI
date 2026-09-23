import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit, 
  FileUp, 
  FolderPlus, 
  Layers, 
  Database, 
  CheckCircle2, 
  RefreshCw,
  X,
  FileText,
  Star
} from 'lucide-react';
import { api } from '../services/api';
import { GovernmentScheme, Category, SchemeDocument, Feedback } from '../types';

export const AdminPortal: React.FC = () => {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [documents, setDocuments] = useState<SchemeDocument[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddSchemeModal, setShowAddSchemeModal] = useState(false);
  const [showUploadDocModal, setShowUploadDocModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Form states
  const [newScheme, setNewScheme] = useState({
    schemeName: '',
    categoryId: 1,
    description: '',
    eligibility: '',
    benefits: '',
    applicationLink: '',
    officialWebsite: ''
  });

  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    description: '',
    icon: 'Folder'
  });

  const [uploadData, setUploadData] = useState({
    schemeId: 1,
    fileName: '',
    fileContent: '',
    fileSize: '1.5 MB'
  });

  const [chunkResult, setChunkResult] = useState<any>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, dRes, fRes] = await Promise.all([
        api.getSchemes(),
        api.getCategories(),
        api.getDocuments(),
        api.getFeedback()
      ]);
      setSchemes(sRes.schemes);
      setCategories(cRes);
      setDocuments(dRes);
      setFeedbacks(fRes);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateScheme = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createScheme({
        ...newScheme,
        categoryId: Number(newScheme.categoryId)
      });
      setShowAddSchemeModal(false);
      setNewScheme({
        schemeName: '',
        categoryId: 1,
        description: '',
        eligibility: '',
        benefits: '',
        applicationLink: '',
        officialWebsite: ''
      });
      loadAllData();
    } catch (err) {
      console.error('Create scheme error:', err);
    }
  };

  const handleDeleteScheme = async (id: number) => {
    if (!confirm('Are you sure? This will delete the scheme, cascading documents and chunks (ON DELETE CASCADE).')) return;
    try {
      await api.deleteScheme(id);
      loadAllData();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createCategory(newCategory);
      setShowAddCategoryModal(false);
      setNewCategory({ categoryName: '', description: '', icon: 'Folder' });
      loadAllData();
    } catch (err) {
      console.error('Create category error:', err);
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.uploadDocument({
        ...uploadData,
        schemeId: Number(uploadData.schemeId)
      });
      setChunkResult(res);
      loadAllData();
    } catch (err) {
      console.error('Upload document error:', err);
    }
  };

  const handleResetDataset = async () => {
    if (!confirm('Reset sample dataset to default 15 schemes and 5 categories?')) return;
    try {
      await api.resetDataset();
      loadAllData();
    } catch (err) {
      console.error('Reset error:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Admin Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Administration Console</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500">SuperAdmin (PersonID #1: Rajesh Sharma)</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welfare Policy Management Hub</h1>
          <p className="text-slate-600 text-sm mt-1">
            Full relational CRUD interface for Schemes, Categories, PDF Ingestion, and ChromaDB vector embeddings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDataset}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset DB to 15 Schemes and 5 Categories"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset DB
          </button>
          <button
            onClick={() => setShowAddSchemeModal(true)}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-800 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Scheme
          </button>
          <button
            onClick={() => setShowUploadDocModal(true)}
            className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileUp className="w-4 h-4" /> Upload & Chunk PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Published Schemes</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{schemes.length}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">GOVERNMENT_SCHEME Entity</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Welfare Categories</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{categories.length}</div>
          <div className="text-[11px] text-blue-600 mt-0.5">CATEGORY Entity</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Official Ingested PDFs</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{documents.length}</div>
          <div className="text-[11px] text-purple-600 mt-0.5">SCHEME_DOCUMENT Entity</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Citizen Feedbacks</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{feedbacks.length}</div>
          <div className="text-[11px] text-amber-600 mt-0.5">FEEDBACK Entity</div>
        </div>
      </div>

      {/* Schemes Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">Government Welfare Schemes (Relational Catalog)</h2>
          <span className="text-xs text-slate-500">{schemes.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Scheme Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schemes.map(s => (
                <tr key={s.schemeId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">{s.schemeId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">{s.schemeName}</td>
                  <td className="py-3 px-4 text-slate-600">{s.categoryName || `Category #${s.categoryId}`}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{s.lastUpdated}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteScheme(s.schemeId)}
                      className="p-1 text-red-600 hover:text-red-800 rounded-md hover:bg-red-50"
                      title="Delete Scheme (Cascades)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Uploaded Documents & Ingestion Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Document Metadata Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              <h3 className="font-bold text-slate-900 text-sm">Policy Documents (SCHEME_DOCUMENT Table)</h3>
            </div>
            <button
              onClick={() => setShowUploadDocModal(true)}
              className="text-xs text-blue-900 font-semibold hover:underline"
            >
              + Ingest New
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {documents.map(doc => (
              <div key={doc.documentId} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 font-mono">{doc.fileName}</div>
                  <div className="text-slate-500 text-[11px]">{doc.fileSize} • Uploaded {doc.uploadDate} • Ver {doc.version}</div>
                </div>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-sm">
                  ChromaDB Ready
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Citizen Feedbacks Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">Citizen Feedback & Audit Log</h3>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {feedbacks.map(f => (
              <div key={f.feedbackId} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{f.userName} ({f.userOccupation})</span>
                  <span className="text-amber-600 font-bold">★ {f.rating}/5</span>
                </div>
                <p className="text-slate-600 text-[11px] italic mb-1">"{f.comments}"</p>
                <div className="text-[10px] text-slate-400 font-mono">{f.submittedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Scheme Modal */}
      {showAddSchemeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Add New Government Welfare Scheme</h3>
              <button onClick={() => setShowAddSchemeModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateScheme} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Scheme Official Name</label>
                <input
                  type="text"
                  required
                  value={newScheme.schemeName}
                  onChange={e => setNewScheme({ ...newScheme, schemeName: e.target.value })}
                  placeholder="e.g., PM Vishwakarma Yojana"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Category (CATEGORY Foreign Key)</label>
                <select
                  value={newScheme.categoryId}
                  onChange={e => setNewScheme({ ...newScheme, categoryId: Number(e.target.value) })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  {categories.map(c => (
                    <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newScheme.description}
                  onChange={e => setNewScheme({ ...newScheme, description: e.target.value })}
                  placeholder="Brief description of the scheme..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Eligibility</label>
                  <textarea
                    rows={2}
                    required
                    value={newScheme.eligibility}
                    onChange={e => setNewScheme({ ...newScheme, eligibility: e.target.value })}
                    placeholder="Eligibility criteria..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Benefits</label>
                  <textarea
                    rows={2}
                    required
                    value={newScheme.benefits}
                    onChange={e => setNewScheme({ ...newScheme, benefits: e.target.value })}
                    placeholder="Financial / grant benefits..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Official Portal URL</label>
                <input
                  type="url"
                  required
                  value={newScheme.officialWebsite}
                  onChange={e => setNewScheme({ ...newScheme, officialWebsite: e.target.value })}
                  placeholder="https://myscheme.gov.in"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSchemeModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800"
                >
                  Save Scheme (INSERT DML)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Document & Chunker Modal (DA3) */}
      {showUploadDocModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-base">Ingest Official Policy Document (DA3 Pipeline)</h3>
              </div>
              <button onClick={() => { setShowUploadDocModal(false); setChunkResult(null); }} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {chunkResult ? (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Ingestion & Chunking Completed
                  </div>
                  <div className="mt-1">
                    Document <span className="font-mono font-semibold">{chunkResult.document?.fileName}</span> parsed. Generated <strong>{chunkResult.chunksCreated}</strong> text chunks stored in ChromaDB collection with 384-dimensional embeddings.
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-200 p-3 rounded-xl max-h-48 overflow-y-auto font-mono text-[11px] space-y-2">
                  {chunkResult.chunks?.map((c: any, i: number) => (
                    <div key={i} className="border-b border-slate-800 pb-1.5">
                      <span className="text-amber-400">Chunk #{c.chunkIndex} [ID: {c.embeddingId}]:</span>
                      <p className="text-slate-300 italic">"{c.chunkText}"</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setChunkResult(null); setShowUploadDocModal(false); }}
                  className="w-full py-2.5 bg-blue-900 text-white font-semibold rounded-xl"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleUploadDocument} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Welfare Scheme</label>
                  <select
                    value={uploadData.schemeId}
                    onChange={e => setUploadData({ ...uploadData, schemeId: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    {schemes.map(s => (
                      <option key={s.schemeId} value={s.schemeId}>{s.schemeName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Document File Name</label>
                  <input
                    type="text"
                    required
                    value={uploadData.fileName}
                    onChange={e => setUploadData({ ...uploadData, fileName: e.target.value })}
                    placeholder="e.g., PM-KISAN_Guidelines_v3.0.pdf"
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Policy Text / Gazette Circular Content</label>
                  <textarea
                    rows={4}
                    required
                    value={uploadData.fileContent}
                    onChange={e => setUploadData({ ...uploadData, fileContent: e.target.value })}
                    placeholder="Paste official policy clauses or gazette notification excerpt here. The pipeline will recursively chunk it (500 tokens, 50 overlap) and generate vector embeddings..."
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadDocModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 text-white rounded-lg font-semibold hover:bg-emerald-700"
                  >
                    Ingest into ChromaDB (DA3)
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
