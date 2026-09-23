export interface Person {
  personId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumbers: string[];
  dateOfBirth: string;
  age: number; // Derived attribute
}

export interface User {
  userId: number;
  personId: number;
  gender: string;
  occupation: string;
  annualIncome: number;
  state: string;
  district: string;
  city: string;
  pincode: string;
  createdAt: string;
  person?: Person;
}

export interface CitizenUser {
  occupation: string;
  name: string;
  state: string;
  income: number;
  gender?: 'All' | 'Male' | 'Female' | 'Other';
  district?: string;
}

export interface Admin {
  adminId: number;
  personId: number;
  role: string;
  createdAt: string;
  person?: Person;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  icon: string;
  schemeCount?: number;
}

export interface GovernmentScheme {
  schemeId: number;
  categoryId: number;
  adminId: number;
  schemeName: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationLink: string;
  officialWebsite: string;
  lastUpdated: string;
  categoryName?: string;
  documents?: SchemeDocument[];
}

export interface SchemeDocument {
  documentId: number;
  schemeId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  version: string;
  chunks?: DocumentChunk[];
}

export interface DocumentChunk {
  chunkId: number;
  documentId: number;
  chunkText: string;
  chunkIndex: number;
  embeddingId: string;
  createdAt: string;
  schemeName?: string;
  fileName?: string;
  similarityScore?: number;
}

export interface Bookmark {
  bookmarkId: number;
  userId: number;
  schemeId: number;
  bookmarkDate: string;
  notes?: string;
  scheme?: GovernmentScheme;
}

export interface ChatHistory {
  chatId: number;
  userId: number;
  question: string;
  aiResponse: string;
  timestamp: string;
  sessionId: string;
  recommendedScheme?: string;
  matchReason?: string;
  sources?: string[];
  chunksUsed?: DocumentChunk[];
}

export interface Feedback {
  feedbackId: number;
  userId: number;
  rating: number;
  comments: string;
  submittedAt: string;
  userName?: string;
  userOccupation?: string;
}

export interface Milestone {
  id: number;
  title: string;
  deliverable: string;
  status: 'completed' | 'in-progress' | 'pending';
  files: string[];
  summary: string;
}

export interface SQLQueryExample {
  id: string;
  title: string;
  category: 'Basic' | 'Join' | 'Aggregation' | 'Subquery' | 'View';
  sql: string;
  description: string;
  explanation: string;
}
