import { GovernmentScheme, Category, SchemeDocument, Bookmark, Feedback, ChatHistory } from '../types';

export const api = {
  async getSchemes(params?: { category?: string; search?: string; occupation?: string; maxIncome?: number }): Promise<{ total: number; schemes: GovernmentScheme[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.occupation) query.append('occupation', params.occupation);
    if (params?.maxIncome) query.append('maxIncome', String(params.maxIncome));

    const res = await fetch(`/api/schemes?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch schemes');
    return res.json();
  },

  async getSchemeById(id: number): Promise<GovernmentScheme> {
    const res = await fetch(`/api/schemes/${id}`);
    if (!res.ok) throw new Error('Failed to fetch scheme');
    return res.json();
  },

  async createScheme(scheme: Partial<GovernmentScheme>): Promise<GovernmentScheme> {
    const res = await fetch('/api/schemes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheme)
    });
    if (!res.ok) throw new Error('Failed to create scheme');
    return res.json();
  },

  async updateScheme(id: number, scheme: Partial<GovernmentScheme>): Promise<GovernmentScheme> {
    const res = await fetch(`/api/schemes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheme)
    });
    if (!res.ok) throw new Error('Failed to update scheme');
    return res.json();
  },

  async deleteScheme(id: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/schemes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete scheme');
    return res.json();
  },

  async getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async createCategory(cat: { categoryName: string; description: string; icon?: string }): Promise<Category> {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cat)
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
  },

  async getDocuments(): Promise<SchemeDocument[]> {
    const res = await fetch('/api/documents');
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  async uploadDocument(data: { schemeId: number; fileName: string; fileContent?: string; fileSize?: string }): Promise<any> {
    const res = await fetch('/api/documents/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
  },

  async getBookmarks(): Promise<Bookmark[]> {
    const res = await fetch('/api/bookmarks');
    if (!res.ok) throw new Error('Failed to fetch bookmarks');
    return res.json();
  },

  async addBookmark(schemeId: number, notes?: string): Promise<Bookmark> {
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schemeId, notes })
    });
    if (!res.ok) throw new Error('Failed to add bookmark');
    return res.json();
  },

  async removeBookmark(bookmarkId: number): Promise<{ success: boolean }> {
    const res = await fetch(`/api/bookmarks/${bookmarkId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to remove bookmark');
    return res.json();
  },

  async getFeedback(): Promise<Feedback[]> {
    const res = await fetch('/api/feedback');
    if (!res.ok) throw new Error('Failed to fetch feedback');
    return res.json();
  },

  async submitFeedback(data: { rating: number; comments: string; userName?: string; userOccupation?: string }): Promise<Feedback> {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    return res.json();
  },

  async askAIChat(question: string, userProfile?: any): Promise<ChatHistory> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, userProfile })
    });
    if (!res.ok) throw new Error('Failed to get AI response');
    return res.json();
  },

  async executeSQL(queryId?: string, customSql?: string): Promise<any> {
    const res = await fetch('/api/sql/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queryId, customSql })
    });
    if (!res.ok) throw new Error('Failed to execute SQL');
    return res.json();
  },

  async runAcademicQuery(queryId?: string, customSql?: string): Promise<any> {
    const res = await fetch('/api/sql/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queryId, customSql })
    });
    if (!res.ok) throw new Error('Failed to execute query');
    return res.json();
  },

  async resetDataset(): Promise<any> {
    const res = await fetch('/api/dataset/reset', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset dataset');
    return res.json();
  }
};
