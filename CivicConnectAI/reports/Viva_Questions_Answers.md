# Comprehensive Viva Questions & Answers
### Course: 3rd Semester Database Management Systems (30 Marks Mini Project)

---

### Q1: What is the main motivation behind CivicConnect AI?
**Answer:**
CivicConnect AI bridges the last-mile governance gap where citizens are unaware of welfare schemes they qualify for. Instead of navigating confusing government portals, citizens use natural language to find matching benefits. It couples a normalized MySQL database for user data and scheme records with a ChromaDB vector store for grounded Retrieval-Augmented Generation (RAG).

---

### Q2: Explain the ISA Hierarchy implemented in your ER model.
**Answer:**
We implemented Generalization/Specialization where `PERSON` is the generalized superclass containing common attributes: `PersonID`, `Name` (composite), `Email` (unique), `DateOfBirth`, and `PhoneNumber` (multivalued). `USER` (Citizen) and `ADMIN` are disjoint subclasses:
- `USER` adds `Occupation`, `AnnualIncome`, and composite `Address` (`State`, `District`, `City`, `Pincode`).
- `ADMIN` adds `Role` and audit fields.
This prevents NULL values and ensures every non-prime attribute is fully functionally dependent on its primary key.

---

### Q3: Why is `DOCUMENT_CHUNK` modeled as a Weak Entity?
**Answer:**
`DOCUMENT_CHUNK` has no independent existence without its identifying parent `SCHEME_DOCUMENT`. Its primary key is composite: `(DocumentID, ChunkID)` or `(DocumentID, ChunkIndex)`. If a scheme document is deleted by an administrator, all corresponding vector chunks are removed via `ON DELETE CASCADE`.

---

### Q4: How is the M:N relationship between Citizen and Government Scheme resolved?
**Answer:**
A citizen can bookmark many schemes, and a scheme can be bookmarked by many citizens. In relational design, M:N relationships cannot be represented in a single table without data redundancy. We resolved it by introducing the Associative Entity `BOOKMARK`, with composite unique constraint `(UserID, SchemeID)` and descriptive attributes `BookmarkDate` and `Notes`.

---

### Q5: Demonstrate your normalization proof up to BCNF.
**Answer:**
1. **1NF:** Composite attributes (`Name`, `Address`) atomized; multivalued `PhoneNumber` moved to `PERSON_PHONE`.
2. **2NF:** All non-key attributes are fully functionally dependent on candidate keys; no partial dependencies on composite keys.
3. **3NF:** No transitive dependencies. Category details decomposed to `CATEGORY` relation.
4. **BCNF:** In every functional dependency $X \to Y$, the left-hand side $X$ is a super key. For example, in `USER`, $UserID$ is a super key. In `GOVERNMENT_SCHEME`, $SchemeID$ is a super key.

---

### Q6: What is the difference between MySQL and ChromaDB in this project?
**Answer:**
- **MySQL:** Relational database optimized for structured, ACID-compliant transactional operations (citizens, logins, schemes, bookmarks, feedback, foreign key cascades).
- **ChromaDB:** Vector database optimized for non-relational semantic similarity search. It indexes 384-dimensional dense vectors of policy PDF text chunks and computes cosine similarity to find relevant passages even when exact keywords differ.

---

### Q7: What is RAG and why is it preferred over fine-tuning or direct LLM queries?
**Answer:**
Retrieval-Augmented Generation (RAG) retrieves verifiable context from a curated vector database before passing the prompt to the LLM. 
- Prevents hallucination by requiring the LLM to ground its response strictly in retrieved chunks.
- Enables instant updating of policies by adding new PDF chunks into ChromaDB without expensive LLM retraining or fine-tuning.
- Provides verifiable citations (e.g., `PM-KISAN_Guidelines_v2.4.pdf`) in the Explainability Panel.

---

### Q8: What SQL query would you write to find schemes that have never been bookmarked?
**Answer:**
We use a `LEFT JOIN` with an `IS NULL` check:
```sql
SELECT s.SchemeID, s.SchemeName, c.CategoryName
FROM GOVERNMENT_SCHEME s
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
LEFT JOIN BOOKMARK b ON s.SchemeID = b.SchemeID
WHERE b.BookmarkID IS NULL;
```

---

### Q9: How do you calculate Age if it is a Derived Attribute?
**Answer:**
Age is not stored statically in the database because it changes over time, which would cause an update anomaly. We store `DateOfBirth` and derive `Age` on-the-fly using the MySQL function:
$$\text{TIMESTAMPDIFF}(\text{YEAR}, DateOfBirth, \text{CURDATE}())$$
This is encapsulated in the database view `vw_CitizenFullProfile`.
