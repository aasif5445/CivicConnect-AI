# DA1: System Design & Database Modeling Report
### Course: Database Management Systems (3rd Semester) | Marks: 10

---

## 1. Requirement Analysis

### 1.1 Executive Summary
CivicConnect AI is an intelligent citizen-centric governance application that combines a rigorously normalized MySQL relational database with a vector database (ChromaDB) to discover and match government welfare schemes for Indian citizens based on demographic and occupational profiles.

### 1.2 Problem Statement
India has over 400+ Central and State welfare initiatives. However, over 65% of eligible rural and urban citizens fail to claim benefits due to fragmented portals, complex bureaucratic criteria, language barriers, and lack of transparent explanation for why they qualify.

### 1.3 Proposed System
CivicConnect AI resolves this through:
1. **Relational Database Management (MySQL):** Secure, normalized storage of citizen demographics, administrative audit logs, official document versions, and bookmarks.
2. **Vector Database Retrieval (ChromaDB):** Semantic search over verified policy circulars without keyword rigidity.
3. **Retrieval-Augmented Generation (RAG):** AI responses strictly grounded in ingested policy documents with an uncompromised Explainability Panel showing official sources.

### 1.4 Functional Requirements
- **FR-1:** Citizen Registration, Authentication, and Demographic Profile Management (Income, State, Occupation).
- **FR-2:** Multi-criteria Scheme Discovery (Category, Benefits, Eligibility, Application link).
- **FR-3:** Grounded AI Chat with RAG semantic search and Explainability citations.
- **FR-4:** Citizen Bookmarking and Feedback submission.
- **FR-5:** Administrative Scheme CRUD, Document PDF Upload, and Automatic Text Chunking.

### 1.5 Non-Functional Requirements
- **NFR-1 (Integrity):** Strict foreign key referential integrity with cascading constraints.
- **NFR-2 (Performance):** Sub-second query execution using secondary B-tree indexes.
- **NFR-3 (Accuracy):** 100% grounded AI citations—no fabricated document references.

---

## 2. ER Model (Chen Notation Specification)

### Notation Legend:
- **Rectangle (`[Entity]`):** Regular Entity (`PERSON`, `USER`, `ADMIN`, `CATEGORY`, `GOVERNMENT_SCHEME`, `SCHEME_DOCUMENT`, `CHAT_HISTORY`, `FEEDBACK`).
- **Double Rectangle (`[[Weak Entity]]`):** Weak Entity (`DOCUMENT_CHUNK`).
- **Oval (`(Attribute)`):** Simple attribute.
- **Underlined Oval (`(_Key_)`):** Primary Key attribute (`PersonID`, `SchemeID`, etc.).
- **Double Oval (`((Multivalued))`):** Multivalued attribute (`PhoneNumber`).
- **Dashed Oval (`--Derived--`):** Derived attribute (`Age` calculated from `DateOfBirth`).
- **Composite Attribute Tree:** `Name` $\to$ (`FirstName`, `MiddleName`, `LastName`); `Address` $\to$ (`State`, `District`, `City`, `Pincode`).
- **Diamond (`<Relationship>`):** Association between entities (`MANAGES`, `BELONGS_TO`, `HAS_DOCUMENT`, `HAS_CHAT`, `SUBMITS_FEEDBACK`).
- **Double Diamond (`<<Identifying>>`):** Identifying relationship (`CONTAINS` between `SCHEME_DOCUMENT` and `DOCUMENT_CHUNK`).

### Cardinality Table:
| Relationship | Entity 1 | Cardinality | Entity 2 | Participation |
| :--- | :--- | :--- | :--- | :--- |
| `PERSON ISA USER` | `PERSON` | 1:1 | `USER` | Total on USER, Partial on PERSON |
| `PERSON ISA ADMIN` | `PERSON` | 1:1 | `ADMIN` | Total on ADMIN, Partial on PERSON |
| `ADMIN MANAGES SCHEME` | `ADMIN` | 1:N | `GOVERNMENT_SCHEME` | Partial on ADMIN, Total on SCHEME |
| `CATEGORY BELONGS_TO SCHEME`| `CATEGORY` | 1:N | `GOVERNMENT_SCHEME` | Partial on CATEGORY, Total on SCHEME |
| `SCHEME HAS_DOCUMENT` | `GOVERNMENT_SCHEME` | 1:N | `SCHEME_DOCUMENT` | Partial on SCHEME, Total on DOCUMENT |
| `DOCUMENT CONTAINS CHUNK` | `SCHEME_DOCUMENT` | 1:N | `DOCUMENT_CHUNK` | Identifying, Total on CHUNK |
| `USER HAS_CHAT` | `USER` | 1:N | `CHAT_HISTORY` | Partial on USER, Total on CHAT |
| `USER BOOKMARKS SCHEME` | `USER` | M:N (via BOOKMARK) | `GOVERNMENT_SCHEME` | Resolved by Associative Entity |
| `USER SUBMITS FEEDBACK` | `USER` | 1:N | `FEEDBACK` | Partial on USER, Total on FEEDBACK |

---

## 3. Enhanced ER (EER) Concepts Applied
1. **Generalization / Specialization:** `PERSON` is the generalized superclass containing common identity traits (`PersonID`, `Name`, `Email`, `DateOfBirth`, `PhoneNumber`). `USER` (Citizen) and `ADMIN` are disjoint specializations with distinct attributes and constraints.
2. **Weak Entity & Identifying Relationship:** `DOCUMENT_CHUNK` has no independent existence without `SCHEME_DOCUMENT`. Its discriminator is `ChunkIndex`, forming composite PK `(DocumentID, ChunkID)`.
3. **Composite Attributes:** Decomposed into atomic components (`FirstName`, `MiddleName`, `LastName`; `State`, `District`, `City`, `Pincode`) to satisfy 1NF.
4. **Multivalued Attribute:** `PhoneNumber` is normalized into a distinct relation `PERSON_PHONE(PersonID, PhoneNumber)`.
5. **Derived Attribute:** `Age = TIMESTAMPDIFF(YEAR, DateOfBirth, CURDATE())` computed dynamically without redundant storage.

---

## 4. Functional Dependencies (FDs) & Candidate Keys

### Relation: `PERSON`
- $FD_1$: $PersonID \to FirstName, MiddleName, LastName, Email, DateOfBirth$
- $FD_2$: $Email \to PersonID, FirstName, MiddleName, LastName, DateOfBirth$
- **Candidate Keys:** $\{PersonID\}$, $\{Email\}$.
- **Primary Key:** $PersonID$.

### Relation: `USER`
- $FD_1$: $UserID \to PersonID, PasswordHash, Gender, Occupation, AnnualIncome, State, District, City, Pincode, CreatedAt$
- $FD_2$: $PersonID \to UserID$
- **Candidate Keys:** $\{UserID\}$, $\{PersonID\}$.

### Relation: `GOVERNMENT_SCHEME`
- $FD_1$: $SchemeID \to CategoryID, AdminID, SchemeName, Description, Eligibility, Benefits, ApplicationLink, OfficialWebsite, LastUpdated$
- $FD_2$: $SchemeName \to SchemeID, \dots$
- **Candidate Keys:** $\{SchemeID\}$, $\{SchemeName\}$.

### Minimal Cover Algorithm:
1. Deconstruct all multi-attribute RHS into singleton attributes.
2. Eliminate redundant functional dependencies by computing attribute closures $X^+$.
3. Eliminate extraneous LHS attributes.
Resulting minimal cover preserves all dependencies with zero loss of semantic constraints.

---

## 5. Normalization Process (UNF to BCNF)

### Step 1: Unnormalized Form (UNF) to First Normal Form (1NF)
- **Violation:** A citizen record in UNF contained multivalued phone numbers and composite addresses.
- **Resolution:** Atomized address into `(State, District, City, Pincode)`. Moved repeating phone numbers into `PERSON_PHONE(PersonID, PhoneNumber)`.
- **Result:** Every column contains atomic (indivisible) scalar values.

### Step 2: 1NF to Second Normal Form (2NF)
- **Rule:** Relation must be in 1NF and have NO partial functional dependencies on composite candidate keys.
- **Check:** `BOOKMARK(UserID, SchemeID)` has non-prime attributes `BookmarkDate` and `Notes` which depend on the whole composite key $(UserID, SchemeID)$, not a subset.
- **Result:** Preserves 2NF across all entities.

### Step 3: 2NF to Third Normal Form (3NF)
- **Rule:** Relation must be in 2NF and have NO transitive dependencies ($X \to Y$ and $Y \to Z$ where $Y$ is not a super key).
- **Check:** In `GOVERNMENT_SCHEME`, `SchemeID \to CategoryID` and `CategoryID \to CategoryName`.
- **Resolution:** Decomposed into relation `CATEGORY(CategoryID, CategoryName, Description, Icon)` with FK `CategoryID` in `GOVERNMENT_SCHEME`.
- **Result:** 3NF satisfied.

### Step 4: 3NF to Boyce-Codd Normal Form (BCNF)
- **Rule:** For every non-trivial functional dependency $X \to Y$, $X$ MUST be a **Super Key**.
- **Proof:**
  - In `PERSON`: $PersonID$ is super key; $Email$ is super key (unique).
  - In `USER`: $UserID$ is super key.
  - In `GOVERNMENT_SCHEME`: $SchemeID$ is super key.
  - In `DOCUMENT_CHUNK`: $(DocumentID, ChunkID)$ is super key.
- **Conclusion:** The database schema is strictly normalized up to **BCNF**.
