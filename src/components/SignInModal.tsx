import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  User, 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { CitizenUser } from '../types';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCitizen: CitizenUser | null;
  onSignIn: (citizen: CitizenUser) => void;
}

const OCCUPATION_OPTIONS = [
  { 
    label: 'Farmer / Agrarian Worker', 
    value: 'Farmer',
    badge: 'Agriculture & Rural Priority',
    hint: 'Tailored for PM-KISAN, Kisan Credit Card, Solar Pump subsidies & Crop Insurance.'
  },
  { 
    label: 'Student / Researcher', 
    value: 'Student',
    badge: 'Education & Fellowship Priority',
    hint: 'Tailored for National Scholarship Portal, PMRF Fellowships, Pragathi & Skill training.'
  },
  { 
    label: 'Small Entrepreneur / MSME Owner', 
    value: 'Small Entrepreneur',
    badge: 'MSME & Business Priority',
    hint: 'Tailored for MUDRA, Stand-Up India, PM Vishwakarma & Seed Fund grants.'
  },
  { 
    label: 'Senior Citizen / Pensioner', 
    value: 'Senior Citizen',
    badge: 'Social Security Priority',
    hint: 'Tailored for Old Age Pension (IGNOAPS), Atal Pension Yojana & PMSBY/PMJJBY.'
  },
  { 
    label: 'Artisan / Traditional Craftsperson', 
    value: 'Artisan',
    badge: 'Artisan Welfare Priority',
    hint: 'Tailored for PM Vishwakarma ₹15,000 toolkits & low-interest collateral-free loans.'
  },
  { 
    label: 'Street Vendor / Self-Employed', 
    value: 'Street Vendor',
    badge: 'Micro-Credit Priority',
    hint: 'Tailored for PM SVANidhi micro-credit working capital loans.'
  },
  { 
    label: 'General Citizen / Wage Earner', 
    value: 'General Citizen',
    badge: 'Universal Schemes',
    hint: 'Access universal health coverage (Ayushman Bharat), housing (PMAY), and generic medicines.'
  }
];

const STATE_OPTIONS = [
  'Tamil Nadu',
  'Karnataka',
  'Maharashtra',
  'Uttar Pradesh',
  'Delhi',
  'Gujarat',
  'Rajasthan',
  'Kerala',
  'West Bengal',
  'Telangana',
  'Andhra Pradesh',
  'Punjab',
  'Bihar',
  'Madhya Pradesh',
  'Odisha'
];

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  currentCitizen,
  onSignIn
}) => {
  const [occupation, setOccupation] = useState<string>(currentCitizen?.occupation || 'Farmer');
  const [name, setName] = useState<string>(currentCitizen?.name || '');
  const [state, setState] = useState<string>(currentCitizen?.state || 'Tamil Nadu');
  const [income, setIncome] = useState<number>(currentCitizen?.income || 200000);
  const [gender, setGender] = useState<'All' | 'Male' | 'Female' | 'Other'>(currentCitizen?.gender || 'All');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn({
      occupation,
      name: name.trim() || `${occupation} Citizen`,
      state,
      income: Number(income) || 200000,
      gender
    });
    onClose();
  };

  const selectedOccupationMeta = OCCUPATION_OPTIONS.find(o => o.value === occupation) || OCCUPATION_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs px-2.5 py-1 rounded-full border border-blue-400/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            Citizen Profile Authentication (USER Entity)
          </div>

          <h2 className="text-xl font-bold tracking-tight">
            Sign In to Personalized Portal
          </h2>
          <p className="text-blue-200 text-xs mt-1">
            Choose your occupation and demographic details to instantly filter eligible welfare programs and AI advice.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Occupation Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-800" />
              Select Your Occupation / Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={occupation}
              onChange={e => setOccupation(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm font-medium border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700 bg-white"
            >
              {OCCUPATION_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            
            {/* Context Notice for Selected Occupation */}
            <div className="mt-2 p-2.5 bg-blue-50/80 border border-blue-100 rounded-xl flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <div className="text-[11px] text-blue-900 leading-snug">
                <span className="font-semibold block text-blue-950 mb-0.5">{selectedOccupationMeta.badge}</span>
                {selectedOccupationMeta.hint}
              </div>
            </div>
          </div>

          {/* Citizen Display Name / Identifier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-800" />
              Citizen Name / Beneficiary ID (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={`e.g., ${occupation} Applicant`}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* State of Residence & Annual Income */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-800" />
                State of Residence
              </label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700 bg-white"
              >
                {STATE_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-blue-800" />
                Annual Income (₹)
              </label>
              <input
                type="number"
                step="10000"
                min="0"
                max="5000000"
                value={income}
                onChange={e => setIncome(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          {/* Quick Select Preset Buttons for Rapid Testing */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Quick Switch Category:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Farmer', 'Student', 'Small Entrepreneur', 'Senior Citizen', 'Artisan'].map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setOccupation(cat);
                    if (cat === 'Farmer') {
                      setState('Tamil Nadu');
                      setIncome(200000);
                    } else if (cat === 'Student') {
                      setState('Karnataka');
                      setIncome(120000);
                    } else if (cat === 'Small Entrepreneur') {
                      setState('Maharashtra');
                      setIncome(450000);
                    } else if (cat === 'Senior Citizen') {
                      setState('Karnataka');
                      setIncome(80000);
                    } else if (cat === 'Artisan') {
                      setState('Uttar Pradesh');
                      setIncome(180000);
                    }
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    occupation === cat
                      ? 'bg-blue-900 text-white border-blue-900 font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Sign In & View {occupation} Schemes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
