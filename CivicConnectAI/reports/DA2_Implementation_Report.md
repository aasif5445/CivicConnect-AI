# DA2: MySQL Implementation & Analytical Queries Report
### Course: Database Management Systems (3rd Semester) | Marks: 10

---

## 1. DDL Schema Implementation Details
The relational schema `civicconnect_db` is implemented using the InnoDB storage engine to guarantee full ACID compliance.

### 1.1 Integrity Constraints Applied
- **Primary Keys:** Auto-incrementing surrogate keys (`PersonID`, `UserID`, `SchemeID`, `CategoryID`, etc.).
- **Foreign Keys with Referential Actions:**
  - `ON DELETE CASCADE` applied on `USER -> PERSON`, `BOOKMARK -> USER/SCHEME`, `SCHEME_DOCUMENT -> GOVERNMENT_SCHEME`, and `DOCUMENT_CHUNK -> SCHEME_DOCUMENT`.
  - `ON UPDATE CASCADE` on `CATEGORY -> GOVERNMENT_SCHEME`.
- **Domain CHECK Constraints:**
  - `DateOfBirth <= CURDATE()` prevents future birthdates.
  - `AnnualIncome >= 0` prevents negative values.
  - `Rating BETWEEN 1 AND 5` enforces standard Likert scale on feedback.
- **UNIQUE Constraints:**
  - `PERSON(Email)` prevents duplicate accounts.
  - `BOOKMARK(UserID, SchemeID)` prevents duplicate bookmarks by the same citizen.
  - `CATEGORY(CategoryName)` and `GOVERNMENT_SCHEME(SchemeName)`.

---

## 2. Sample Dataset Summary
- **Schemes Seeded:** 15 comprehensive government initiatives covering Agriculture (PM-KISAN, PMFBY, KCC), Healthcare (Ayushman Bharat, PMMVY, PMBJP), Education (NSP, PMKVY), MSME (Mudra, Startup India, PM SVANidhi), and Social Welfare (PMAY-U, Sukanya Samriddhi, APY, IGNOAPS).
- **Categories:** 5 distinct socio-economic welfare domains.
- **Documents & Vector Chunks:** Ingested policy guidelines and eligibility circulars with embedding IDs.

---

## 3. Analytical Query Catalog & Relational Algebra Equivalents

### Query 1: Multi-Table Relational Navigation (5 Tables)
```sql
SELECT 
    b.BookmarkID,
    CONCAT(p.FirstName, ' ', p.LastName) AS CitizenName,
    u.Occupation,
    s.SchemeName,
    c.CategoryName,
    b.BookmarkDate
FROM BOOKMARK b
INNER JOIN USER u ON b.UserID = u.UserID
INNER JOIN PERSON p ON u.PersonID = p.PersonID
INNER JOIN GOVERNMENT_SCHEME s ON b.SchemeID = s.SchemeID
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
ORDER BY b.BookmarkDate DESC;
```
- **Relational Algebra:** $\pi_{BookmarkID, CitizenName, Occupation, SchemeName, CategoryName} (BOOKMARK \bowtie USER \bowtie PERSON \bowtie GOVERNMENT\_SCHEME \bowtie CATEGORY)$.
- **Purpose:** Demonstrates traversing through associative entity $M:N$ resolution and ISA specialization.

### Query 2: Aggregated Scheme Density with Filter (GROUP BY + HAVING)
```sql
SELECT 
    c.CategoryName,
    COUNT(s.SchemeID) AS TotalSchemes
FROM CATEGORY c
LEFT JOIN GOVERNMENT_SCHEME s ON c.CategoryID = s.CategoryID
GROUP BY c.CategoryID, c.CategoryName
HAVING TotalSchemes >= 2;
```
- **Execution Strategy:** Employs temporary hash table aggregation with early filtering in the execution plan.

### Query 3: Correlated Subquery Comparison
```sql
SELECT s.SchemeName, COUNT(d.DocumentID) AS Docs
FROM GOVERNMENT_SCHEME s
INNER JOIN SCHEME_DOCUMENT d ON s.SchemeID = d.SchemeID
GROUP BY s.SchemeID, s.SchemeName
HAVING COUNT(d.DocumentID) > (
    SELECT AVG(doc_count) FROM (
        SELECT COUNT(DocumentID) AS doc_count FROM SCHEME_DOCUMENT GROUP BY SchemeID
    ) AS avgs
);
```
- **Purpose:** Identifies well-documented schemes requiring higher storage allocation.

---

## 4. Relational Database Views
1. **`vw_CitizenFullProfile`**: Pre-materializes the ISA relationship between `PERSON` and `USER` with dynamic age calculation:
   $$\text{Age} = \text{TIMESTAMPDIFF}(\text{YEAR}, DateOfBirth, \text{CURDATE}())$$
2. **`vw_SchemeDocumentAnalytics`**: Summarizes scheme engagement, total uploaded PDFs, and vector chunk density.
