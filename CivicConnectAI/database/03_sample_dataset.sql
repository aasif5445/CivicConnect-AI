-- ==========================================================
-- CivicConnect AI: Sample Dataset (DML)
-- Inserts 15+ Schemes, 5 Categories, Users, Admin, Chunks, Bookmarks
-- ==========================================================

USE civicconnect_db;

-- 1. Insert Persons
INSERT INTO PERSON (PersonID, FirstName, MiddleName, LastName, Email, DateOfBirth) VALUES
(1, 'Rajesh', 'Kumar', 'Sharma', 'admin.rajesh@civicconnect.gov.in', '1982-05-14'),
(2, 'Murugan', 'K', 'Subramaniam', 'murugan.farmer@gmail.com', '1988-11-23'),
(3, 'Priya', 'Devi', 'Natarajan', 'priya.student@college.edu.in', '2004-03-12'),
(4, 'Amit', 'Singh', 'Verma', 'amit.msme@techstartup.in', '1995-07-09'),
(5, 'Lakshmi', 'Bai', 'Gowda', 'lakshmi.rural@yahoo.co.in', '1961-09-18');

-- Phone Numbers (Multivalued)
INSERT INTO PERSON_PHONE (PersonID, PhoneNumber, PhoneType) VALUES
(1, '+91-9876543210', 'Official'),
(2, '+91-9842112345', 'Mobile'),
(2, '+91-9842198765', 'Alternate'),
(3, '+91-9443211223', 'Mobile'),
(4, '+91-9789054321', 'Work'),
(5, '+91-9360012345', 'Home');

-- 2. Insert Admin
INSERT INTO ADMIN (AdminID, PersonID, PasswordHash, Role) VALUES
(1, 1, 'pbkdf2:sha256:adminpass2025hash', 'SuperAdmin');

-- 3. Insert Users (Citizens)
INSERT INTO USER (UserID, PersonID, PasswordHash, Gender, Occupation, AnnualIncome, State, District, City, Pincode) VALUES
(1, 2, 'pbkdf2:sha256:userhash1', 'Male', 'Farmer', 200000.00, 'Tamil Nadu', 'Thanjavur', 'Kumbakonam', '612001'),
(2, 3, 'pbkdf2:sha256:userhash2', 'Female', 'Student', 120000.00, 'Karnataka', 'Bangalore Urban', 'Bengaluru', '560001'),
(3, 4, 'pbkdf2:sha256:userhash3', 'Male', 'Small Entrepreneur', 450000.00, 'Maharashtra', 'Pune', 'Pune', '411001'),
(4, 5, 'pbkdf2:sha256:userhash4', 'Female', 'Homemaker / Senior', 80000.00, 'Karnataka', 'Mandya', 'Mandya', '571401');

-- 4. Insert Categories (5 Categories)
INSERT INTO CATEGORY (CategoryID, CategoryName, Description, Icon) VALUES
(1, 'Agriculture & Rural Development', 'Income support, crop insurance, and modernization grants for farmers.', 'Sprout'),
(2, 'Healthcare & Wellness', 'Cashless hospitalization, maternal benefits, and subsidized medical aid.', 'HeartPulse'),
(3, 'Education & Skill Development', 'Scholarships, fee waivers, and vocational training for students and jobseekers.', 'GraduationCap'),
(4, 'Business, MSME & Entrepreneurship', 'Collateral-free credit, seed capital, and incubation subsidies.', 'Briefcase'),
(5, 'Women & Social Welfare', 'Pensions, girl child welfare, affordable housing, and senior citizen assistance.', 'Users');

-- 5. Insert 15 Government Schemes
INSERT INTO GOVERNMENT_SCHEME (SchemeID, CategoryID, AdminID, SchemeName, Description, Eligibility, Benefits, ApplicationLink, OfficialWebsite, LastUpdated) VALUES
(1, 1, 1, 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', 
 'Central sector scheme providing income support of Rs 6,000 per year in three equal installments to landholding farmer families across India.',
 'All landholding farmer families with cultivable land. Excludes institutional holders, high-salaried govt employees, and income tax payers.',
 'Rs 6,000 annually credited in 3 installments of Rs 2,000 directly to bank accounts through Aadhaar Direct Benefit Transfer.',
 'https://pmkisan.gov.in/RegistrationFormNew.aspx', 'https://pmkisan.gov.in', '2025-02-15'),

(2, 2, 1, 'Ayushman Bharat PM-JAY', 
 'World\'s largest public health insurance scheme providing secondary and tertiary care hospitalization to bottom 40% vulnerable families.',
 'Families listed under SECC 2011 deprivation criteria. No restrictions on family size, age, or gender.',
 'Cashless treatment up to Rs 5 Lakh per family per year across 27,000+ empaneled hospitals nationwide.',
 'https://beneficiary.nha.gov.in/', 'https://pmjay.gov.in', '2025-01-20'),

(3, 5, 1, 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)', 
 'Housing mission granting subsidies and assistance to urban poor to acquire or construct pucca houses.',
 'EWS (income up to Rs 3 Lakh) and LIG (income Rs 3L-6L) families who do not own a pucca house in India.',
 'Interest subsidy up to Rs 2.67 Lakh under CLSS or direct financial assistance of Rs 1.5 Lakh.',
 'https://pmaymis.gov.in/', 'https://pmay-urban.gov.in', '2024-11-10'),

(4, 3, 1, 'National Scholarship Portal (Post-Matric & Merit)', 
 'Unified electronic scholarship gateway delivering central and state financial assistance to underprivileged students.',
 'Class 11 to Ph.D. students from SC/ST/OBC/Minority with parental income below Rs 2.5 Lakh and >= 50% marks in previous examination.',
 'Full tuition fee waiver, maintenance allowances up to Rs 1,200/month, and book grants.',
 'https://scholarships.gov.in/', 'https://scholarships.gov.in', '2024-12-05'),

(5, 4, 1, 'Pradhan Mantri Mudra Yojana (PMMY)', 
 'Refinance facility facilitating low-interest, collateral-free loans for micro and small enterprises.',
 'Any Indian citizen with a business plan for non-farm income generating micro-enterprises in manufacturing or service.',
 'Collateral-free loans in 3 categories: Shishu (up to Rs 50k), Kishore (Rs 50k - 5L), and Tarun (Rs 5L - 10L).',
 'https://www.udyamimitra.in/', 'https://www.mudra.org.in', '2025-01-10'),

(6, 3, 1, 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)', 
 'Skill certification scheme of the Ministry of Skill Development for building industry-ready workforce in AI, IoT, and Mechatronics.',
 'Indian youth and dropouts aged 15-45 years with valid Aadhaar and bank account.',
 '100% free industry training, recognized NSQF certification, and placement assistance.',
 'https://www.skillindiadigital.gov.in/', 'https://www.msde.gov.in', '2024-09-25'),

(7, 4, 1, 'Startup India Seed Fund Scheme (SISFS)', 
 'Financial assistance to early-stage startups for proof of concept, prototype development, and market entry.',
 'DPIIT recognized startups incorporated <= 2 years ago with innovative technology product.',
 'Grants up to Rs 20 Lakh for prototyping; debt/debentures up to Rs 50 Lakh for market launch.',
 'https://seedfund.startupindia.gov.in/', 'https://www.startupindia.gov.in', '2024-10-15'),

(8, 5, 1, 'Sukanya Samriddhi Yojana (SSY)', 
 'Beti Bachao Beti Padhao initiative providing sovereign-guaranteed interest and tax benefits for girl child education and marriage.',
 'Parents of a girl child below 10 years of age. Max 2 accounts per family.',
 '8.2% p.a. compound interest rate with complete Section 80C tax exemption and partial withdrawal at age 18.',
 'https://www.indiapost.gov.in/', 'https://www.nsiindia.gov.in', '2024-08-30'),

(9, 5, 1, 'Atal Pension Yojana (APY)', 
 'Social security pension scheme for unorganized sector workers to secure guaranteed old-age regular income.',
 'Indian citizens between 18 and 40 years of age with savings bank account, who are not income tax taxpayers.',
 'Guaranteed monthly pension of Rs 1,000 to Rs 5,000 from age 60 till death.',
 'https://enps.nsdl.com/', 'https://www.pfrda.org.in', '2024-07-25'),

(10, 1, 1, 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', 
 'Comprehensive crop insurance protecting farmers against non-preventable natural calamities from sowing to harvest.',
 'All farmers growing notified food crops, oilseeds, and horticultural crops including tenant farmers.',
 'Low premium (2% Kharif, 1.5% Rabi) with quick digital insurance settlement directly to bank.',
 'https://pmfby.gov.in/', 'https://pmfby.gov.in', '2024-08-14'),

(11, 2, 1, 'Pradhan Mantri Matru Vandana Yojana (PMMVY)', 
 'Direct cash benefit compensation for pregnant women and lactating mothers to offset wage loss and improve nutrition.',
 'Pregnant women and lactating mothers for first and second living child.',
 'Cash incentive of Rs 5,000 for 1st child and Rs 6,000 for 2nd girl child via DBT.',
 'https://pmmvy.wcd.gov.in/', 'https://wcd.gov.in', '2024-09-02'),

(12, 4, 1, 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)', 
 'Affordable working capital credit to street vendors to restart livelihoods with interest subsidies.',
 'Urban and peri-urban street vendors engaged in vending activities prior to March 2020.',
 'First loan of Rs 10,000, followed by Rs 20,000 and Rs 50,000 on timely repayments with 7% interest rebate.',
 'https://pmsvanidhi.mohua.gov.in/', 'https://pmsvanidhi.mohua.gov.in', '2024-11-20'),

(13, 2, 1, 'Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP)', 
 'Initiative providing quality generic medicines at 50% to 90% discount compared to market prices.',
 'Open to all Indian citizens; special incentives for registered pharmacists opening PMBJP kendras.',
 'Access to 2,000+ generic medicines and 300 surgical consumables at affordable rates.',
 'https://janaushadhi.gov.in/', 'https://janaushadhi.gov.in', '2025-01-05'),

(14, 1, 1, 'Kisan Credit Card (KCC) Scheme', 
 'Adequate and timely credit for farmers\' agricultural operations, animal husbandry, and allied activities.',
 'All owner farmers, joint borrowers, tenant farmers, and sharecroppers.',
 'Revolving credit at 4% concessional interest rate on prompt repayment, with Rupay ATM debit card.',
 'https://www.myscheme.gov.in/schemes/kcc', 'https://agricoop.nic.in', '2024-12-18'),

(15, 5, 1, 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)', 
 'Non-contributory monthly pension providing social assistance to destitute senior citizens living below poverty line.',
 'Citizens aged 60 years or above belonging to a household below the poverty line (BPL).',
 'Monthly pension of Rs 200 (age 60-79) or Rs 500 (age 80+), supplemented by state government contributions.',
 'https://nsap.nic.in/', 'https://nsap.nic.in', '2024-10-01'),

(16, 4, 1, 'PM Vishwakarma Scheme',
 'Holistic support scheme providing recognition, skill upgrades, modern toolkits, and low-interest credit for traditional artisans and craftspeople.',
 'Artisans and craftspeople working with hands and tools across 18 traditional trades aged 18+.',
 'PM Vishwakarma Certificate & ID, Rs 15,000 modern toolkit grant, stipend during training, and collateral-free enterprise loan up to Rs 3 Lakh at 5% interest.',
 'https://pmvishwakarma.gov.in/', 'https://pmvishwakarma.gov.in', '2025-01-15'),

(17, 5, 1, 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
 'Clean cooking fuel initiative providing deposit-free LPG gas connections to women from below poverty line households.',
 'Adult women belonging to BPL households, SC/ST, PMAY beneficiaries, or most backward classes without existing LPG connection.',
 'Free LPG connection, first refill and stove provided free of cost, plus ongoing targeted subsidy of Rs 300 per refill via Direct Benefit Transfer.',
 'https://www.pmuy.gov.in/ujjwala2.html', 'https://www.pmuy.gov.in', '2024-11-28'),

(18, 1, 1, 'PM-KUSUM Solar Pump Scheme',
 'Clean energy scheme subsidizing solar irrigation pumps for farmers and enabling solar power generation on barren farmlands.',
 'Individual farmers, farmer groups, cooperatives, water user associations, and farmer producer organizations (FPOs).',
 'Up to 60% capital subsidy on standalone solar agriculture pumps, lowering diesel fuel dependency and allowing sale of surplus power to grid.',
 'https://pmkusum.mnre.gov.in/', 'https://mnre.gov.in', '2024-12-14'),

(19, 2, 1, 'Pradhan Mantri National Dialysis Programme (PMNDP)',
 'Free life-saving haemodialysis and peritoneal dialysis services at District Hospitals across all states for kidney patients.',
 'All Below Poverty Line (BPL) kidney failure patients. Non-BPL patients receive treatment at subsidized CGHS package rates.',
 '100% free haemodialysis sessions, dialyzer reuse, and nephrology consultation under National Health Mission.',
 'https://pmndp.mohfw.gov.in/', 'https://nhm.gov.in', '2024-10-22'),

(20, 3, 1, 'Prime Minister Research Fellowship (PMRF)',
 'Prestigious fellowship attracting the best talent to doctoral (Ph.D.) programs at top institutes like IISc, IITs, and IISERs.',
 'B.Tech/M.Tech/M.Sc students from recognized universities who have completed degrees with CGPA >= 8.0 or qualified GATE.',
 'Generous fellowship of Rs 70,000 to Rs 80,000 per month for up to 5 years, plus an annual research grant of Rs 2 Lakhs.',
 'https://www.pmrf.in/', 'https://www.pmrf.in', '2024-11-18'),

(21, 4, 1, 'Stand-Up India Scheme',
 'Empowering SC, ST, and Women entrepreneurs to set up greenfield enterprises in manufacturing, services, agri-allied, or trading.',
 'SC/ST and/or woman entrepreneur aged above 18 years setting up a first-time greenfield business with at least 51% shareholding.',
 'Composite bank loans between Rs 10 Lakh and Rs 1 Crore with handholding support, credit guarantee, and margin money assistance.',
 'https://www.standupmitra.in/', 'https://www.standupmitra.in', '2024-12-08'),

(22, 1, 1, 'Agriculture Infrastructure Fund (AIF)',
 'Medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure.',
 'Farmers, agri-entrepreneurs, startups, primary agricultural credit societies (PACS), and Farmer Producer Organizations (FPOs).',
 '3% per annum interest subvention on loans up to Rs 2 Crore for up to 7 years, along with credit guarantee coverage under CGTMSE.',
 'https://agriinfra.dac.gov.in/', 'https://agricoop.nic.in', '2025-01-08'),

(23, 1, 1, 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
 'Flagship initiative for sustainable, technologically modernized development of fisheries and aquaculture value chains.',
 'Fishers, fish farmers, fish workers, fisheries cooperatives, self-help groups, and fisheries entrepreneurs.',
 'Government capital subsidy of 40% for general category and 60% for SC/ST/Women beneficiaries for boats, cold chains, and biofloc ponds.',
 'https://pmmsy.dof.gov.in/', 'https://dof.gov.in', '2024-10-30'),

(24, 3, 1, 'Pragathi Scholarship for Girl Students',
 'AICTE technical education scholarship advancing girl empowerment in Diploma and Degree technical and engineering education.',
 'Girl students admitted to 1st year of technical Degree or Diploma courses in AICTE-approved institutions with family income < Rs 8 Lakh.',
 'Rs 50,000 per annum credited directly to student accounts to cover college tuition fees, computer purchase, books, and equipment.',
 'https://www.aicte-india.org/schemes/students-development-schemes/pragati', 'https://www.aicte-india.org', '2024-09-12'),

(25, 5, 1, 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
 'Accidental death and permanent disability insurance scheme offering ultra-affordable social protection to citizens.',
 'All Indian citizens aged 18 to 70 years holding a savings bank or post office account with auto-debit consent.',
 'Rs 2 Lakh cover for accidental death or permanent total disability, and Rs 1 Lakh for partial disability for an annual premium of just Rs 20.',
 'https://www.jansuraksha.gov.in/Forms-PMSBY.aspx', 'https://www.jansuraksha.gov.in', '2025-01-18'),

(26, 5, 1, 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
 'Government-backed life insurance scheme providing death coverage due to any reason for citizens in their productive working years.',
 'Individuals aged 18 to 50 years holding a bank or post office savings account with auto-debit capability.',
 'Life cover risk guarantee of Rs 2 Lakh payable to family/nominee on death of the insured member due to any cause at Rs 436 annual premium.',
 'https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx', 'https://www.jansuraksha.gov.in', '2025-01-18');

-- 6. Insert Documents
INSERT INTO SCHEME_DOCUMENT (DocumentID, SchemeID, FileName, FilePath, FileType, UploadDate, FileSize, Version) VALUES
(101, 1, 'PM-KISAN_Guidelines_v2.4.pdf', '/documents/PM-KISAN_Guidelines.pdf', 'application/pdf', '2025-01-15', '1.8 MB', '2.4'),
(102, 1, 'Farmer_Landholding_Eligibility_Circular.pdf', '/documents/Farmer_Eligibility.pdf', 'application/pdf', '2025-02-10', '840 KB', '1.2'),
(103, 2, 'Ayushman_Bharat_PMJAY_Hospital_Criteria.pdf', '/documents/Ayushman_Bharat_PMJAY_Criteria.pdf', 'application/pdf', '2025-01-20', '2.4 MB', '3.1'),
(104, 3, 'PMAY_Urban_Housing_Operational_Manual.pdf', '/documents/PMAY_Urban_Housing_Scheme.pdf', 'application/pdf', '2024-11-05', '3.1 MB', '2.0'),
(105, 4, 'National_Scholarship_Portal_Guidelines.pdf', '/documents/National_Scholarship_Portal_Guidelines.pdf', 'application/pdf', '2024-12-01', '1.2 MB', '1.8'),
(106, 5, 'Pradhan_Mantri_Mudra_Yojana_Handbook.pdf', '/documents/Mudra_Yojana_Guidelines.pdf', 'application/pdf', '2025-01-08', '1.5 MB', '4.0');

-- 7. Insert Chunks (Weak Entity instances)
INSERT INTO DOCUMENT_CHUNK (ChunkID, DocumentID, ChunkIndex, ChunkText, EmbeddingID) VALUES
(1001, 101, 0, 'PM-KISAN is a Central Sector Scheme to supplement financial needs of landholding farmers. Financial benefit of Rs 6,000 per year is provided in three equal installments of Rs 2,000 every four months via DBT.', 'emb_pmkisan_001'),
(1002, 102, 1, 'Eligibility Criteria for PM-KISAN: Small and marginal farmer families having cultivable landholding in states like Tamil Nadu, UP, Maharashtra. Excludes institutional holders and tax payees.', 'emb_pmkisan_002'),
(1003, 103, 0, 'AB-PMJAY provides a health cover of Rs 5 lakh per family per year for secondary and tertiary care hospitalization across public and empaneled private hospitals based on SECC 2011.', 'emb_pmjay_001'),
(1004, 104, 0, 'PMAY-U addresses urban housing shortage among EWS (income up to Rs 3 Lakh) and LIG (income Rs 3-6 Lakh). Beneficiary families must not own a pucca house in their name anywhere in India.', 'emb_pmay_001'),
(1005, 105, 0, 'National Scholarship Portal offers post-matric and merit scholarships. Family annual income must not exceed Rs 2.50 lakh per annum, and student must have scored at least 50% in prior exam.', 'emb_nsp_001'),
(1006, 106, 0, 'MUDRA provides collateral-free institutional loans up to Rs 10 Lakh to non-farm small/micro enterprises in Shishu (up to 50k), Kishore (50k-5L), and Tarun (5L-10L) categories.', 'emb_mudra_001');

-- 8. Insert Bookmarks
INSERT INTO BOOKMARK (BookmarkID, UserID, SchemeID, BookmarkDate, Notes) VALUES
(1, 1, 1, '2025-02-18 14:30:00', 'Applied through local CSC center, awaiting verification.'),
(2, 1, 10, '2025-02-20 09:10:00', 'Need crop insurance for paddy season in Thanjavur.'),
(3, 2, 4, '2025-02-22 16:45:00', 'Submitted application on NSP portal for B.Tech fees.'),
(4, 3, 5, '2025-02-24 11:20:00', 'Planning to apply for Kishore loan tier to expand workshop.');

-- 9. Insert Feedback
INSERT INTO FEEDBACK (FeedbackID, UserID, Rating, Comments, SubmittedAt) VALUES
(1, 1, 5, 'The AI recommended PM-KISAN and cited the exact landholding circular. Extremely helpful for rural farmers!', '2025-02-19 10:00:00'),
(2, 2, 5, 'Found the scholarship criteria in 10 seconds. Explainability panel showed the official PDF.', '2025-02-23 17:00:00'),
(3, 3, 4, 'Great portal. It would be helpful to also add district-level bank branch locators.', '2025-02-25 12:30:00');

SELECT 'Sample dataset with 15 schemes, 5 categories, users, documents, chunks, bookmarks seeded.' AS Status;
