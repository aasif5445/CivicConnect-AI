-- ==========================================================
-- CivicConnect AI: Analytical & Academic SQL Queries (DA2)
-- Demonstrating: Joins, Aggregation, Having, Subqueries, Views
-- ==========================================================

USE civicconnect_db;

-- ----------------------------------------------------------
-- 1. COMPLEX MULTI-TABLE JOIN (5 TABLES)
-- Retrieve bookmarks with citizen name, occupation, state, scheme, category
-- ----------------------------------------------------------
SELECT 
    b.BookmarkID,
    CONCAT(p.FirstName, ' ', p.LastName) AS CitizenName,
    u.Occupation,
    u.State,
    s.SchemeName,
    c.CategoryName,
    b.BookmarkDate,
    b.Notes
FROM BOOKMARK b
INNER JOIN USER u ON b.UserID = u.UserID
INNER JOIN PERSON p ON u.PersonID = p.PersonID
INNER JOIN GOVERNMENT_SCHEME s ON b.SchemeID = s.SchemeID
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
ORDER BY b.BookmarkDate DESC;

-- ----------------------------------------------------------
-- 2. GROUP BY & HAVING: Category Scheme Count & Auditing
-- ----------------------------------------------------------
SELECT 
    c.CategoryID,
    c.CategoryName,
    COUNT(s.SchemeID) AS TotalSchemes,
    MAX(s.LastUpdated) AS MostRecentSchemeUpdate
FROM CATEGORY c
LEFT JOIN GOVERNMENT_SCHEME s ON c.CategoryID = s.CategoryID
GROUP BY c.CategoryID, c.CategoryName
HAVING TotalSchemes >= 2
ORDER BY TotalSchemes DESC;

-- ----------------------------------------------------------
-- 3. NESTED SUBQUERY: Schemes with Above-Average Uploaded Documents
-- ----------------------------------------------------------
SELECT 
    s.SchemeID,
    s.SchemeName,
    COUNT(d.DocumentID) AS DocumentCount
FROM GOVERNMENT_SCHEME s
INNER JOIN SCHEME_DOCUMENT d ON s.SchemeID = d.SchemeID
GROUP BY s.SchemeID, s.SchemeName
HAVING COUNT(d.DocumentID) > (
    SELECT AVG(doc_count)
    FROM (
        SELECT COUNT(DocumentID) AS doc_count
        FROM SCHEME_DOCUMENT
        GROUP BY SchemeID
    ) AS scheme_doc_averages
);

-- ----------------------------------------------------------
-- 4. LEFT OUTER JOIN: Unbookmarked Schemes (Relational Difference)
-- ----------------------------------------------------------
SELECT 
    s.SchemeID,
    s.SchemeName,
    c.CategoryName
FROM GOVERNMENT_SCHEME s
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
LEFT JOIN BOOKMARK b ON s.SchemeID = b.SchemeID
WHERE b.BookmarkID IS NULL;

-- ----------------------------------------------------------
-- 5. CONDITIONAL AGGREGATION: Demographic Income Distribution
-- ----------------------------------------------------------
SELECT 
    CASE 
        WHEN u.AnnualIncome <= 250000 THEN 'EWS (<= 2.5 Lakhs)'
        WHEN u.AnnualIncome <= 600000 THEN 'LIG (2.5L - 6L)'
        ELSE 'MIG (> 6 Lakhs)'
    END AS IncomeBracket,
    COUNT(u.UserID) AS CitizenCount,
    AVG(u.AnnualIncome) AS AverageIncome
FROM USER u
GROUP BY IncomeBracket
ORDER BY CitizenCount DESC;

-- ----------------------------------------------------------
-- 6. WEAK ENTITY JOIN: Document Chunks in ChromaDB per Scheme
-- ----------------------------------------------------------
SELECT 
    s.SchemeID,
    s.SchemeName,
    d.FileName,
    COUNT(c.ChunkID) AS TotalChunksIngested,
    AVG(LENGTH(c.ChunkText)) AS AvgChunkLengthChars
FROM GOVERNMENT_SCHEME s
INNER JOIN SCHEME_DOCUMENT d ON s.SchemeID = d.SchemeID
INNER JOIN DOCUMENT_CHUNK c ON d.DocumentID = c.DocumentID
GROUP BY s.SchemeID, s.SchemeName, d.FileName
ORDER BY TotalChunksIngested DESC;

-- ----------------------------------------------------------
-- 7. RELATIONAL VIEWS (Encapsulation of Complex Joins)
-- ----------------------------------------------------------
CREATE OR REPLACE VIEW vw_CitizenFullProfile AS
SELECT 
    u.UserID,
    p.PersonID,
    CONCAT(p.FirstName, ' ', IFNULL(p.MiddleName, ''), ' ', p.LastName) AS FullName,
    p.Email,
    p.DateOfBirth,
    TIMESTAMPDIFF(YEAR, p.DateOfBirth, CURDATE()) AS CalculatedAge,
    u.Gender,
    u.Occupation,
    u.AnnualIncome,
    u.State,
    u.District,
    u.City,
    u.Pincode,
    u.CreatedAt
FROM USER u
INNER JOIN PERSON p ON u.PersonID = p.PersonID;

CREATE OR REPLACE VIEW vw_SchemeDocumentAnalytics AS
SELECT 
    s.SchemeID,
    s.SchemeName,
    c.CategoryName,
    COUNT(DISTINCT d.DocumentID) AS DocumentCount,
    COUNT(DISTINCT k.ChunkID) AS VectorChunkCount,
    COUNT(DISTINCT b.BookmarkID) AS CitizenBookmarkCount
FROM GOVERNMENT_SCHEME s
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
LEFT JOIN SCHEME_DOCUMENT d ON s.SchemeID = d.SchemeID
LEFT JOIN DOCUMENT_CHUNK k ON d.DocumentID = k.DocumentID
LEFT JOIN BOOKMARK b ON s.SchemeID = b.SchemeID
GROUP BY s.SchemeID, s.SchemeName, c.CategoryName;

-- Verification of Views
SELECT * FROM vw_CitizenFullProfile;
SELECT * FROM vw_SchemeDocumentAnalytics;
