# CivicConnect AI: AI-Powered Citizen Assistance Platform
### 3rd Semester Database Management Systems (DBMS) Mini Project (30 Marks)

> **Tagline:** Empowering Citizens through Grounded AI & Semantic Discovery of Government Welfare Schemes.

---

## 📌 Executive Summary
**CivicConnect AI** is a full-stack, AI-augmented citizen portal engineered to bridge the accessibility gap between Indian citizens and hundreds of Central and State Government welfare schemes (e.g., PM-KISAN, Ayushman Bharat, PMAY-U, Mudra Loan). 

By integrating a normalized **MySQL Relational Database (DA1 & DA2)** with a **ChromaDB Vector Database (DA3)** running Retrieval-Augmented Generation (RAG), the system allows citizens to describe their demographic situation in plain natural language (e.g., *"I'm a farmer from Tamil Nadu earning ₹2 lakh annually"*), instantly retrieving verified scheme benefits alongside exact citations from official gazette notifications and policy PDFs.

---

## 🏛️ Locked Technology Stack
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | High-contrast, accessible government UI |
| **Styling** | Tailwind CSS | Mobile-responsive design complying with WCAG AA |
| **Backend** | Flask / Express REST API | Blueprinted microservice architecture |
| **SQL Database** | MySQL 8.0 | BCNF-normalized schema for relational state |
| **Vector Database** | ChromaDB | High-performance vector embeddings storage |
| **Embedding Model**| Sentence Transformers (`all-MiniLM-L6-v2`) | 384-dimensional dense semantic vectors |
| **AI Generation** | Google Gemini API (`gemini-3.8-flash`) / OpenAI-compatible | Grounded RAG with zero hallucination |
| **Version Control**| Git + GitHub | Reproducible, academic repository structure |

---

## 📂 Project Structure
```text
CivicConnectAI/
├── backend/
│   ├── app.py                     # Flask application entry point
│   ├── config.py                  # Configuration & database credentials
│   ├── requirements.txt           # Python dependency manifest
│   ├── models/                    # Data models & schemas
│   ├── routes/                    # Flask Blueprints (auth, schemes, chat, admin)
│   ├── services/                  # Business logic (rag_service, chromadb_service, mysql_service)
│   ├── utils/                     # PDF parsing and recursive chunking utilities
│   ├── database/                  # Connection pooling & migration scripts
│   └── ai/                        # SentenceTransformer embedding generators
├── database/
│   ├── 01_create_database.sql     # Database initialization script
│   ├── 02_create_tables.sql       # DDL with PK, FK, CHECK, UNIQUE, and INDEXES
│   ├── 03_sample_dataset.sql      # 15 Schemes, 5 Categories, Users, Admin
│   ├── 04_queries.sql             # Joins, Group By Having, Subqueries, Views
│   └── 05_views.sql               # Pre-compiled database views
├── chromadb/
│   ├── chroma_init.py             # Vector database collection initialization
│   ├── ingest_documents.py        # PDF chunking and vector ingestion
│   └── vector_store.py            # Cosine distance search wrapper
├── documents/                     # Official Government Policy PDFs & Texts
│   ├── PM-KISAN_Guidelines.txt
│   ├── Ayushman_Bharat_PMJAY.txt
│   ├── PMAY_Urban_Housing.txt
│   └── Mudra_Yojana_Guidelines.txt
├── reports/                       # Academic Assessment Reports (30 Marks)
│   ├── DA1_Design_Report.md       # ER/EER Modeling, FDs, BCNF Normalization
│   ├── DA2_Implementation_Report.md # DDL, DML CRUD, and Complex SQL Analysis
│   ├── DA3_VectorDB_RAG_Report.md # Vector Storage, Chunking, and RAG Pipeline
│   └── Viva_Questions_Answers.md  # Comprehensive 30-Mark Viva Exam Prep
└── README.md
```

---

## 🚀 Quick Setup & Installation

### 1. Database Setup (MySQL)
```bash
mysql -u root -p < database/01_create_database.sql
mysql -u root -p civicconnect_db < database/02_create_tables.sql
mysql -u root -p civicconnect_db < database/03_sample_dataset.sql
```

### 2. Python Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Web Application
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
