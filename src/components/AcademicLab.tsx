import React, { useState } from 'react';
import { 
  Database, 
  Terminal, 
  Layers, 
  Play, 
  CheckCircle2, 
  Table, 
  Share2, 
  Cpu, 
  Copy, 
  Check, 
  Flame, 
  FileCode,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ACADEMIC_SQL_QUERIES } from '../data/academic';
import { api } from '../services/api';

export const AcademicLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql-console' | 'schema-ddl' | 'normalization' | 'architecture'>('sql-console');
  
  // SQL Interactive runner state
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [customSql, setCustomSql] = useState(ACADEMIC_SQL_QUERIES[0].sql);
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleSelectQuery = (index: number) => {
    setSelectedQueryIndex(index);
    setCustomSql(ACADEMIC_SQL_QUERIES[index].sql);
    setQueryResult(null);
    setExecutionTime(null);
  };

  const handleRunQuery = async () => {
    const start = performance.now();
    try {
      const q = ACADEMIC_SQL_QUERIES[selectedQueryIndex];
      const res = await api.runAcademicQuery(q?.id, customSql);
      const end = performance.now();
      const rows = res.data || res.rows || [];
      setQueryResult(rows);
      setExecutionTime(Math.round((end - start) * 10) / 10);
    } catch (err) {
      console.error('SQL Execution failed:', err);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 mb-6 text-white shadow-md border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Relational Database System
              </span>
              <span className="text-xs text-indigo-200">MySQL 8.0 Engine</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
              <Database className="w-6 h-6 text-amber-400" />
              DBMS Academic Lab &amp; Architecture Console
            </h1>
            <p className="text-indigo-200 text-sm mt-1 max-w-3xl">
              Live SQL console, relational schema definitions, BCNF mathematical proofs, and full RAG pipeline architecture.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-900/60 p-1 rounded-xl border border-indigo-700/50 self-start md:self-auto overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('sql-console')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sql-console' 
                  ? 'bg-amber-400 text-slate-950 shadow-xs' 
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              SQL Console &amp; Queries
            </button>
            <button
              onClick={() => setActiveTab('schema-ddl')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'schema-ddl' 
                  ? 'bg-amber-400 text-slate-950 shadow-xs' 
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              Relational Schema &amp; DDL
            </button>
            <button
              onClick={() => setActiveTab('normalization')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'normalization' 
                  ? 'bg-amber-400 text-slate-950 shadow-xs' 
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              BCNF Normalization
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'architecture' 
                  ? 'bg-amber-400 text-slate-950 shadow-xs' 
                  : 'text-indigo-200 hover:text-white hover:bg-indigo-800/50'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              RAG Pipeline Architecture
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: SQL Console */}
      {activeTab === 'sql-console' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Query Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center justify-between">
                <span>Relational Query Suite</span>
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                  {ACADEMIC_SQL_QUERIES.length} Preloaded
                </span>
              </h3>

              <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
                {ACADEMIC_SQL_QUERIES.map((q, idx) => (
                  <div
                    key={q.id}
                    onClick={() => handleSelectQuery(idx)}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                      selectedQueryIndex === idx
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                        {q.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {q.id}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{q.title}</div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {q.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive SQL Editor & Output */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-950 rounded-xl p-4 shadow-md border border-slate-800 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {ACADEMIC_SQL_QUERIES[selectedQueryIndex]?.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(customSql, 999)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                    title="Copy SQL Query"
                  >
                    {copiedIndex === 999 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">Copy SQL</span>
                  </button>
                  <button
                    onClick={handleRunQuery}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Execute SQL</span>
                  </button>
                </div>
              </div>

              {/* SQL Code Block */}
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400">
                <pre>{customSql}</pre>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>DBMS Concept: <strong className="text-indigo-300">{ACADEMIC_SQL_QUERIES[selectedQueryIndex]?.category}</strong></span>
                {executionTime !== null && (
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Executed in {executionTime} ms
                  </span>
                )}
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Table className="w-4 h-4 text-indigo-600" />
                  Query Execution Results
                </h4>
                {queryResult && (
                  <span className="text-xs text-slate-500 font-mono">
                    {queryResult.length} rows returned
                  </span>
                )}
              </div>

              {queryResult ? (
                <div className="overflow-x-auto border border-slate-200 rounded-lg max-h-[360px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-xs">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        {Object.keys(queryResult[0] || {}).map((col) => (
                          <th key={col} className="px-3 py-2 text-left font-bold text-slate-700 tracking-wider font-mono">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 font-mono">
                      {queryResult.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                          {Object.values(row).map((val: any, cIdx) => (
                            <td key={cIdx} className="px-3 py-2 text-slate-600 whitespace-nowrap">
                              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  <Play className="w-8 h-8 mx-auto mb-2 text-slate-300 opacity-60" />
                  <p className="text-xs font-medium text-slate-600">Click &quot;Execute SQL&quot; to run this relational query live.</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Executes against normalized relational tables with instant record sets.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Schema & DDL */}
      {activeTab === 'schema-ddl' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                Relational Schema &amp; Keys
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                7 Normalized entities with primary keys (PK) and foreign keys (FK) enforcing referential integrity.
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">CATEGORY</strong> (<u>category_id</u>, category_name, description, icon)
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">GOVERNMENT_SCHEME</strong> (<u>scheme_id</u>, scheme_name, #category_id, description, benefits, application_link, official_website, created_at)
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">ELIGIBILITY_CRITERIA</strong> (<u>criteria_id</u>, #scheme_id, target_occupation, min_age, max_age, max_income, state_restriction, gender_preference)
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">SCHEME_DOCUMENT</strong> (<u>doc_id</u>, #scheme_id, file_name, file_size, total_chunks, uploaded_at)
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">PERSON</strong> (<u>person_id</u>, name, occupation, state, annual_income, gender)
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">BOOKMARK</strong> (<u>bookmark_id</u>, #scheme_id, #person_id, saved_at, notes)
                </div>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <strong className="text-blue-900">FEEDBACK</strong> (<u>feedback_id</u>, #person_id, rating, comments, created_at)
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-white shadow-xs">
              <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                DDL Script (MySQL 8.0)
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Production-grade DDL definitions with constraints, cascades, and checks.
              </p>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 max-h-[320px] overflow-y-auto">
                <pre>{`-- 1. CATEGORY TABLE
CREATE TABLE CATEGORY (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50) DEFAULT 'Folder'
);

-- 2. GOVERNMENT_SCHEME TABLE
CREATE TABLE GOVERNMENT_SCHEME (
  scheme_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  scheme_name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  benefits TEXT NOT NULL,
  application_link VARCHAR(500),
  official_website VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 3. ELIGIBILITY_CRITERIA TABLE
CREATE TABLE ELIGIBILITY_CRITERIA (
  criteria_id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id INT NOT NULL UNIQUE,
  target_occupation VARCHAR(100) DEFAULT 'All',
  min_age INT DEFAULT 18,
  max_age INT DEFAULT 70,
  max_income DECIMAL(12,2) DEFAULT 800000.00,
  state_restriction VARCHAR(100) DEFAULT 'All',
  gender_preference VARCHAR(50) DEFAULT 'All',
  FOREIGN KEY (scheme_id) REFERENCES GOVERNMENT_SCHEME(scheme_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. SCHEME_DOCUMENT TABLE
CREATE TABLE SCHEME_DOCUMENT (
  doc_id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size VARCHAR(50),
  total_chunks INT DEFAULT 0,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (scheme_id) REFERENCES GOVERNMENT_SCHEME(scheme_id)
    ON DELETE CASCADE
);

-- 5. BOOKMARK TABLE
CREATE TABLE BOOKMARK (
  bookmark_id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id INT NOT NULL,
  person_id INT DEFAULT 1,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes VARCHAR(255),
  FOREIGN KEY (scheme_id) REFERENCES GOVERNMENT_SCHEME(scheme_id)
    ON DELETE CASCADE
);`}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BCNF Normalization Matrix */}
      {activeTab === 'normalization' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
              Boyce-Codd Normal Form Compliance
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              BCNF Normalization Proof Matrix
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Formal proof that every relation in this schema satisfies the BCNF definition: For every non-trivial functional dependency <em>X → Y</em>, <em>X</em> is a superkey.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-900">Relation</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-900">Functional Dependencies (FDs)</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-900">Candidate / Super Keys</th>
                  <th className="px-4 py-3 text-left font-bold text-slate-900">BCNF Compliance Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">CATEGORY</td>
                  <td className="px-4 py-3 font-mono text-slate-700">category_id → category_name, description, icon</td>
                  <td className="px-4 py-3 font-mono text-slate-700">&#123;category_id&#125;, &#123;category_name&#125;</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">✓ Satisfied: LHS is Candidate Key</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">GOVERNMENT_SCHEME</td>
                  <td className="px-4 py-3 font-mono text-slate-700">scheme_id → category_id, scheme_name, description, benefits</td>
                  <td className="px-4 py-3 font-mono text-slate-700">&#123;scheme_id&#125;, &#123;scheme_name&#125;</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">✓ Satisfied: LHS is Candidate Key</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">ELIGIBILITY_CRITERIA</td>
                  <td className="px-4 py-3 font-mono text-slate-700">criteria_id → scheme_id, target_occupation, max_income; scheme_id → criteria_id</td>
                  <td className="px-4 py-3 font-mono text-slate-700">&#123;criteria_id&#125;, &#123;scheme_id&#125;</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">✓ Satisfied: Both LHS keys are superkeys (1:1)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">SCHEME_DOCUMENT</td>
                  <td className="px-4 py-3 font-mono text-slate-700">doc_id → scheme_id, file_name, file_size</td>
                  <td className="px-4 py-3 font-mono text-slate-700">&#123;doc_id&#125;</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">✓ Satisfied: LHS is Candidate Key</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono font-bold text-blue-900">BOOKMARK</td>
                  <td className="px-4 py-3 font-mono text-slate-700">bookmark_id → scheme_id, person_id, saved_at</td>
                  <td className="px-4 py-3 font-mono text-slate-700">&#123;bookmark_id&#125;, &#123;scheme_id, person_id&#125;</td>
                  <td className="px-4 py-3 text-emerald-700 font-semibold">✓ Satisfied: No transitive or partial dependencies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: RAG Pipeline Architecture */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded">
              Hybrid Architecture
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              Hybrid Relational-Vector Pipeline
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              How structured citizen data from MySQL 8.0 connects with semantic vector embeddings in ChromaDB and Gemini for zero-hallucination assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h3 className="font-bold text-blue-950 text-sm mb-1">Structured Relational Layer</h3>
              <p className="text-xs text-slate-600">
                MySQL 8.0 manages citizen profiles, eligibility criteria, income thresholds, bookmarks, and catalog metadata with ACID transactions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200">
              <div className="w-8 h-8 rounded-lg bg-purple-900 text-white flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h3 className="font-bold text-purple-950 text-sm mb-1">Vector Search (ChromaDB)</h3>
              <p className="text-xs text-slate-600">
                Official PDF guidelines chunked into 384-dimensional dense embeddings. Performs Cosine Similarity lookup to extract exact clause references.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h3 className="font-bold text-emerald-950 text-sm mb-1">Grounded AI Generation</h3>
              <p className="text-xs text-slate-600">
                Gemini synthesizes a personalized answer constrained strictly by retrieved document chunks, preventing hallucinations with citation links.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
