# DA3: Vector Database (ChromaDB) & RAG Integration Report
### Course: Database Management Systems (3rd Semester) | Marks: 10

---

## 1. Vector Database Architecture (ChromaDB)
While MySQL stores structured transactional data, **ChromaDB** is employed as an embedded vector database for high-dimensional semantic search over unstructured government policy PDFs.

### 1.1 Why Relational SQL Fails for Semantic Search
- Traditional SQL `LIKE '%farmer%'` or full-text indices (`MATCH AGAINST`) require exact keyword overlap.
- If a citizen types *"I cultivate paddy in Thanjavur and earn 2 lakh rupees"*, standard SQL queries will fail to match a circular containing *"agricultural landholder direct benefit income transfer"*.
- Vector databases represent textual meaning as continuous mathematical coordinate vectors in $\mathbb{R}^{384}$.

---

## 2. Ingestion & Document Processing Pipeline
1. **Document Upload:** Admin uploads policy PDF (e.g., `PM-KISAN_Guidelines_v2.4.pdf`).
2. **Text Sanitization:** Normalizes whitespace, strips non-ASCII formatting artifacts, and preserves clause numbering.
3. **Recursive Chunking:**
   - Chunk Size: 500 words
   - Chunk Overlap: 50 words (preserves context across chunk boundaries).
4. **Dense Vector Embeddings:** Generated using `sentence-transformers/all-MiniLM-L6-v2`.
5. **ChromaDB Storage:** Stores chunk text along with collection metadata:
   - `scheme_name`: Target scheme title.
   - `source_document`: Official PDF filename.
   - `chunk_index`: Integer position in original document.

---

## 3. Retrieval-Augmented Generation (RAG) Mathematical Workflow

```text
Citizen Natural Language Query: Q
        │
        ▼
SentenceTransformer Embedding: e(Q) ∈ ℝ³⁸⁴
        │
        ▼
Cosine Distance Search in ChromaDB:
   Sim(e(Q), e(Cᵢ)) = (e(Q) · e(Cᵢ)) / (||e(Q)|| ||e(Cᵢ)||)
        │
        ▼
Top-K Chunks Retrieved (C₁, C₂, ...)
        │
        ▼
Augmented Prompt Formulation:
   "Context: {C₁ + C₂}
    User: {Q}
    Answer ONLY using the context above. Cite the source document."
        │
        ▼
LLM Generation (Gemini 3.8 Flash / OpenAI API)
        │
        ▼
Response + Grounded Citations (Explainability Panel)
```

---

## 4. Explainability Panel Specification
To avoid hallucination and uphold accountability in civic services, every AI response is strictly paired with an **Explainability Panel**:
1. **Recommended Scheme:** e.g. *Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)*.
2. **Why it matches:** Grounded explanation based on user's occupation (Farmer) and annual income (₹2,00,000 <= threshold).
3. **Official Sources:**
   - `PM-KISAN_Guidelines_v2.4.pdf` (Chunk #0)
   - `Farmer_Landholding_Eligibility_Circular.pdf` (Chunk #1)
4. **Verification:** Cosine similarity score and preview of exact matched sentences.
