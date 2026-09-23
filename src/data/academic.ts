import { Milestone, SQLQueryExample } from '../types';

export const ACADEMIC_SQL_QUERIES: SQLQueryExample[] = [
  {
    id: 'q1',
    title: '1. Basic Filter: Eligible Agriculture Schemes',
    category: 'Basic Filter',
    description: 'Find all schemes under category Agriculture with specific eligibility keywords.',
    sql: `SELECT 
    s.SchemeID, 
    s.SchemeName, 
    c.CategoryName, 
    s.LastUpdated
FROM GOVERNMENT_SCHEME s
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
WHERE c.CategoryName LIKE '%Agriculture%'
ORDER BY s.SchemeName ASC;`,
    explanation: 'Demonstrates INNER JOIN and WHERE clause pattern matching (LIKE) to filter welfare programs by domain.'
  },
  {
    id: 'q2',
    title: '2. Multi-Table Join: Citizen Bookmarks with Scheme Details',
    category: 'Multi-Table Join',
    description: 'Retrieve bookmarks with citizen name, scheme title, category, and date bookmarked.',
    sql: `SELECT 
    b.BookmarkID,
    CONCAT(p.FirstName, ' ', p.LastName) AS CitizenName,
    u.Occupation,
    u.State,
    s.SchemeName,
    c.CategoryName,
    b.BookmarkDate
FROM BOOKMARK b
INNER JOIN USER u ON b.UserID = u.UserID
INNER JOIN PERSON p ON u.PersonID = p.PersonID
INNER JOIN GOVERNMENT_SCHEME s ON b.SchemeID = s.SchemeID
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
ORDER BY b.BookmarkDate DESC;`,
    explanation: 'Demonstrates a 5-table relational join navigating through the M:N associative entity BOOKMARK and ISA specialization.'
  },
  {
    id: 'q3',
    title: '3. Group By & Having: Category Scheme Counts & Distribution',
    category: 'Aggregation & Having',
    description: 'Count schemes in each category and filter categories with at least 2 active schemes.',
    sql: `SELECT 
    c.CategoryID,
    c.CategoryName,
    COUNT(s.SchemeID) AS TotalSchemes,
    MAX(s.LastUpdated) AS MostRecentUpdate
FROM CATEGORY c
LEFT JOIN GOVERNMENT_SCHEME s ON c.CategoryID = s.CategoryID
GROUP BY c.CategoryID, c.CategoryName
HAVING TotalSchemes >= 2
ORDER BY TotalSchemes DESC;`,
    explanation: 'Demonstrates LEFT JOIN, aggregate COUNT(), GROUP BY, and HAVING clause filtering aggregated metric thresholds.'
  },
  {
    id: 'q4',
    title: '4. Subquery: Schemes with More Documents than Average',
    category: 'Nested Subquery',
    description: 'Identify government schemes that have uploaded more official PDFs than the average across all schemes.',
    sql: `SELECT 
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
);`,
    explanation: 'Demonstrates correlated nested subqueries in the HAVING clause using scalar subquery aggregation.'
  },
  {
    id: 'q5',
    title: '5. Left Outer Join: Unbookmarked Schemes (Auditing)',
    category: 'Outer Join & Anti-Join',
    description: 'Find published schemes that have never been bookmarked by any citizen.',
    sql: `SELECT 
    s.SchemeID,
    s.SchemeName,
    c.CategoryName
FROM GOVERNMENT_SCHEME s
INNER JOIN CATEGORY c ON s.CategoryID = c.CategoryID
LEFT JOIN BOOKMARK b ON s.SchemeID = b.SchemeID
WHERE b.BookmarkID IS NULL;`,
    explanation: 'Demonstrates outer join anti-pattern (IS NULL) for relational difference / set minus operations.'
  },
  {
    id: 'q6',
    title: '6. Aggregation with Case: Income Bracket Demographics',
    category: 'Conditional Aggregation',
    description: 'Group registered citizens into Economic Weaker Section (EWS), LIG, and MIG brackets.',
    sql: `SELECT 
    CASE 
        WHEN u.AnnualIncome <= 250000 THEN 'EWS (<= 2.5 Lakhs)'
        WHEN u.AnnualIncome <= 600000 THEN 'LIG (2.5L - 6L)'
        ELSE 'MIG (> 6 Lakhs)'
    END AS IncomeBracket,
    COUNT(u.UserID) AS CitizenCount,
    AVG(u.AnnualIncome) AS AverageIncome
FROM USER u
GROUP BY IncomeBracket
ORDER BY CitizenCount DESC;`,
    explanation: 'Demonstrates conditional aggregation with CASE expressions and GROUP BY for demographic reporting.'
  },
  {
    id: 'q7',
    title: '7. Relational View: Complete Citizen Profile View',
    category: 'Relational View',
    description: 'A pre-compiled relational VIEW combining the PERSON generalization table with USER details.',
    sql: `CREATE OR REPLACE VIEW vw_CitizenFullProfile AS
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
INNER JOIN PERSON p ON u.PersonID = p.PersonID;`,
    explanation: 'Demonstrates database VIEW creation encapsulating the ISA specialization and dynamic age derivation.'
  },
  {
    id: 'q8',
    title: '8. Document Chunks per Scheme (Weak Entity Navigation)',
    category: 'Weak Entity Traversal',
    description: 'Count chunks and total textual volume ingested into ChromaDB for each scheme.',
    sql: `SELECT 
    s.SchemeID,
    s.SchemeName,
    d.FileName,
    COUNT(c.ChunkID) AS TotalChunks,
    AVG(LENGTH(c.ChunkText)) AS AvgChunkLengthChars
FROM GOVERNMENT_SCHEME s
INNER JOIN SCHEME_DOCUMENT d ON s.SchemeID = d.SchemeID
INNER JOIN DOCUMENT_CHUNK c ON d.DocumentID = c.DocumentID
GROUP BY s.SchemeID, s.SchemeName, d.FileName
ORDER BY TotalChunks DESC;`,
    explanation: 'Demonstrates traversing the identifying relationship from parent SCHEME_DOCUMENT to weak entity DOCUMENT_CHUNK.'
  },
  {
    id: 'q9',
    title: '9. Citizen Eligibility Verification & Boundary Match',
    category: 'Integrity & Constraints',
    description: 'Evaluate eligible citizen profiles matching age and income limits for health and housing programs.',
    sql: `SELECT 
    s.SchemeName,
    c.CategoryName,
    e.TargetOccupation,
    e.MaxIncomeLimit,
    e.MinAge,
    e.MaxAge
FROM GOVERNMENT_SCHEME s
JOIN CATEGORY c ON s.CategoryID = c.CategoryID
JOIN ELIGIBILITY_CRITERIA e ON s.SchemeID = e.SchemeID
WHERE e.MaxIncomeLimit >= 200000 
  AND e.TargetOccupation IN ('Farmer', 'All', 'Student')
ORDER BY e.MaxIncomeLimit DESC;`,
    explanation: 'Demonstrates multi-attribute constraint satisfaction over range bounds (BETWEEN / IN / GTE).'
  },
  {
    id: 'q10',
    title: '10. Citizen Feedback & Satisfaction Rating Analytics',
    category: 'Analytical Windowing',
    description: 'Calculate average satisfaction rating and total review counts per citizen occupation category.',
    sql: `SELECT 
    f.UserOccupation,
    COUNT(f.FeedbackID) AS TotalReviews,
    ROUND(AVG(f.Rating), 2) AS AverageRating,
    MAX(f.SubmittedAt) AS LatestReviewDate
FROM FEEDBACK f
GROUP BY f.UserOccupation
ORDER BY AverageRating DESC;`,
    explanation: 'Demonstrates aggregate statistical computation (AVG, ROUND, MAX) on user experience metrics.'
  },
  {
    id: 'q11',
    title: '11. Referencing Integrity: ON DELETE CASCADE Verification',
    category: 'Transaction & Referential Integrity',
    description: 'Inspect child records linked across SCHEME_DOCUMENT, BOOKMARK, and ELIGIBILITY_CRITERIA.',
    sql: `SELECT 
    s.SchemeID,
    s.SchemeName,
    COUNT(DISTINCT d.DocumentID) AS AttachedDocs,
    COUNT(DISTINCT b.BookmarkID) AS ActiveBookmarks,
    COUNT(DISTINCT e.CriteriaID) AS CriteriaEntries
FROM GOVERNMENT_SCHEME s
LEFT JOIN SCHEME_DOCUMENT d ON s.SchemeID = d.SchemeID
LEFT JOIN BOOKMARK b ON s.SchemeID = b.SchemeID
LEFT JOIN ELIGIBILITY_CRITERIA e ON s.SchemeID = e.SchemeID
GROUP BY s.SchemeID, s.SchemeName;`,
    explanation: 'Demonstrates multiple LEFT JOINs with COUNT(DISTINCT) ensuring referential integrity across cascading foreign keys.'
  },
  {
    id: 'q12',
    title: '12. High-Value Subsidy Budget Ranking (DENSE_RANK)',
    category: 'Advanced Ranking',
    description: 'Rank national programs by allocation bracket and category distribution.',
    sql: `SELECT 
    s.SchemeID,
    s.SchemeName,
    c.CategoryName,
    s.LastUpdated,
    DENSE_RANK() OVER (PARTITION BY s.CategoryID ORDER BY s.LastUpdated DESC) as CategoryRank
FROM GOVERNMENT_SCHEME s
JOIN CATEGORY c ON s.CategoryID = c.CategoryID;`,
    explanation: 'Demonstrates window functions DENSE_RANK() OVER (PARTITION BY) for relational rank partitioning.'
  }
];
