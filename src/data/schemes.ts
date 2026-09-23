import { Category, GovernmentScheme, SchemeDocument, DocumentChunk } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    categoryId: 1,
    categoryName: 'Agriculture & Rural Development',
    description: 'Direct income support, crop insurance, solar pumps, and modernization grants for farmers and rural workers.',
    icon: 'Sprout',
    schemeCount: 6
  },
  {
    categoryId: 2,
    categoryName: 'Healthcare & Wellness',
    description: 'Cashless tertiary hospital coverage, maternal health benefits, dialysis support, and generic medicine centers.',
    icon: 'HeartPulse',
    schemeCount: 5
  },
  {
    categoryId: 3,
    categoryName: 'Education & Skill Development',
    description: 'National scholarships, vocational training, research fellowships, and girl child educational stipends.',
    icon: 'GraduationCap',
    schemeCount: 5
  },
  {
    categoryId: 4,
    categoryName: 'Business, MSME & Entrepreneurship',
    description: 'Collateral-free credit, artisan toolkits, vendor credit, seed funding, and incubation subsidies.',
    icon: 'Briefcase',
    schemeCount: 5
  },
  {
    categoryId: 5,
    categoryName: 'Women, Housing & Social Welfare',
    description: 'Pension plans, clean cooking LPG, affordable housing subsidies, disability aids, and social security.',
    icon: 'Users',
    schemeCount: 5
  }
];

export const INITIAL_DOCUMENTS: SchemeDocument[] = [
  {
    documentId: 101,
    schemeId: 1,
    fileName: 'PM-KISAN_Guidelines_v2.4.pdf',
    filePath: '/documents/PM-KISAN_Guidelines.pdf',
    fileType: 'application/pdf',
    uploadDate: '2025-01-15',
    fileSize: '1.8 MB',
    version: '2.4'
  },
  {
    documentId: 102,
    schemeId: 1,
    fileName: 'Farmer_Landholding_Eligibility_Circular.pdf',
    filePath: '/documents/Farmer_Eligibility.pdf',
    fileType: 'application/pdf',
    uploadDate: '2025-02-10',
    fileSize: '840 KB',
    version: '1.2'
  },
  {
    documentId: 103,
    schemeId: 2,
    fileName: 'Ayushman_Bharat_PMJAY_Hospital_Criteria.pdf',
    filePath: '/documents/Ayushman_Bharat_PMJAY_Criteria.pdf',
    fileType: 'application/pdf',
    uploadDate: '2025-01-20',
    fileSize: '2.4 MB',
    version: '3.1'
  },
  {
    documentId: 104,
    schemeId: 3,
    fileName: 'PMAY_Urban_Housing_Operational_Manual.pdf',
    filePath: '/documents/PMAY_Urban_Housing_Scheme.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-11-05',
    fileSize: '3.1 MB',
    version: '2.0'
  },
  {
    documentId: 105,
    schemeId: 4,
    fileName: 'National_Scholarship_Portal_Guidelines.pdf',
    filePath: '/documents/National_Scholarship_Portal_Guidelines.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-12-01',
    fileSize: '1.2 MB',
    version: '1.8'
  },
  {
    documentId: 106,
    schemeId: 5,
    fileName: 'Pradhan_Mantri_Mudra_Yojana_Handbook.pdf',
    filePath: '/documents/Mudra_Yojana_Guidelines.pdf',
    fileType: 'application/pdf',
    uploadDate: '2025-01-08',
    fileSize: '1.5 MB',
    version: '4.0'
  },
  {
    documentId: 107,
    schemeId: 6,
    fileName: 'Skill_India_PMKVY_4_Scheme_Notification.pdf',
    filePath: '/documents/Skill_India_Mission_Handbook.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-09-18',
    fileSize: '2.1 MB',
    version: '4.1'
  },
  {
    documentId: 108,
    schemeId: 7,
    fileName: 'Startup_India_Seed_Fund_Scheme_Rules.pdf',
    filePath: '/documents/Startup_India_Rules.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-10-12',
    fileSize: '1.9 MB',
    version: '2.3'
  },
  {
    documentId: 109,
    schemeId: 8,
    fileName: 'Sukanya_Samriddhi_Account_Rules_Gazette.pdf',
    filePath: '/documents/Sukanya_Samriddhi_Gazette.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-08-30',
    fileSize: '920 KB',
    version: '2.0'
  },
  {
    documentId: 110,
    schemeId: 9,
    fileName: 'Atal_Pension_Yojana_Subscriber_Charter.pdf',
    filePath: '/documents/APY_Charter.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-07-22',
    fileSize: '1.1 MB',
    version: '1.5'
  },
  {
    documentId: 111,
    schemeId: 16,
    fileName: 'PM_Vishwakarma_Toolkit_Incentive_Manual.pdf',
    filePath: '/documents/PM_Vishwakarma_Guidelines.pdf',
    fileType: 'application/pdf',
    uploadDate: '2025-01-11',
    fileSize: '1.7 MB',
    version: '1.4'
  },
  {
    documentId: 112,
    schemeId: 17,
    fileName: 'PM_Ujjwala_Yojana_Free_Gas_Connection_Rules.pdf',
    filePath: '/documents/PMUY_Guidelines.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-11-28',
    fileSize: '1.3 MB',
    version: '2.0'
  },
  {
    documentId: 113,
    schemeId: 18,
    fileName: 'PM_KUSUM_Solar_Pumps_Subsidy_Norms.pdf',
    filePath: '/documents/PM_KUSUM_Manual.pdf',
    fileType: 'application/pdf',
    uploadDate: '2024-12-14',
    fileSize: '2.0 MB',
    version: '3.0'
  }
];

export const INITIAL_CHUNKS: DocumentChunk[] = [
  {
    chunkId: 1001,
    documentId: 101,
    schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    fileName: 'PM-KISAN_Guidelines_v2.4.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_pmkisan_001',
    createdAt: '2025-01-15 10:30:00',
    chunkText: 'PM-KISAN is a Central Sector Scheme to supplement financial needs of landholding farmers. Under the Scheme, financial benefit of Rs 6,000 per year is provided to eligible farmer families across the country in three equal installments of Rs 2,000 every four months directly into bank accounts via DBT.'
  },
  {
    chunkId: 1002,
    documentId: 102,
    schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    fileName: 'Farmer_Landholding_Eligibility_Circular.pdf',
    chunkIndex: 1,
    embeddingId: 'emb_pmkisan_002',
    createdAt: '2025-02-10 11:15:00',
    chunkText: 'Eligibility Criteria for PM-KISAN: Small and marginal farmer families having cultivable landholding in states like Tamil Nadu, Uttar Pradesh, Maharashtra, Punjab, etc. Exclusions include institutional landholders, farmer families holding constitutional posts, and serving or retired government officers.'
  },
  {
    chunkId: 1003,
    documentId: 103,
    schemeName: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    fileName: 'Ayushman_Bharat_PMJAY_Hospital_Criteria.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_pmjay_001',
    createdAt: '2025-01-20 09:45:00',
    chunkText: 'AB-PMJAY provides a health cover of Rs 5 lakh per family per year for secondary and tertiary care hospitalization across public and empaneled private hospitals. Beneficiaries are identified based on the deprivation criteria of Socio-Economic Caste Census (SECC 2011) and vulnerable occupational categories.'
  },
  {
    chunkId: 1004,
    documentId: 104,
    schemeName: 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
    fileName: 'PMAY_Urban_Housing_Operational_Manual.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_pmay_001',
    createdAt: '2024-11-05 14:00:00',
    chunkText: 'PMAY-U addresses urban housing shortage among Economically Weaker Section (EWS) with annual income up to Rs 3 Lakh and Low Income Group (LIG) with annual income between Rs 3 Lakh to Rs 6 Lakh. Beneficiary families should not own a pucca house in their name or family members across India.'
  },
  {
    chunkId: 1005,
    documentId: 105,
    schemeName: 'National Scholarship Portal (NSP Post-Matric & Merit)',
    fileName: 'National_Scholarship_Portal_Guidelines.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_nsp_001',
    createdAt: '2024-12-01 16:20:00',
    chunkText: 'National Scholarship Portal offers pre-matric, post-matric, and merit-cum-means scholarships for students from minority, SC, ST, and OBC communities. Eligible students must have secured at least 50% marks in previous final examination, with parental annual income not exceeding Rs 2.50 lakh per annum.'
  },
  {
    chunkId: 1006,
    documentId: 106,
    schemeName: 'Pradhan Mantri Mudra Yojana (PMMY)',
    fileName: 'Pradhan_Mantri_Mudra_Yojana_Handbook.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_mudra_001',
    createdAt: '2025-01-08 13:10:00',
    chunkText: 'MUDRA provides collateral-free institutional loans up to Rs 10 Lakh to non-corporate, non-farm small/micro enterprises. Three categories: Shishu (loans up to Rs 50,000), Kishore (loans from Rs 50,001 to Rs 5 Lakh), and Tarun (loans from Rs 5 Lakh to Rs 10 Lakh) with concession interest rates.'
  },
  {
    chunkId: 1007,
    documentId: 107,
    schemeName: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    fileName: 'Skill_India_PMKVY_4_Scheme_Notification.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_pmkvy_001',
    createdAt: '2024-09-18 10:00:00',
    chunkText: 'Skill India PMKVY 4.0 aims to empower Indian youth with industry-relevant skill training including AI, Robotics, Mechatronics, IoT, and Drone technology. The training and assessment fees are completely paid by the Government of India, along with monetary reward and placement assistance.'
  },
  {
    chunkId: 1008,
    documentId: 108,
    schemeName: 'Startup India Seed Fund Scheme (SISFS)',
    fileName: 'Startup_India_Seed_Fund_Scheme_Rules.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_sisfs_001',
    createdAt: '2024-10-12 11:30:00',
    chunkText: 'Startup India Seed Fund Scheme provides financial assistance to DPIIT-recognized startups for proof of concept, prototype development, product trials, market entry, and commercialization. Grants up to Rs 20 Lakhs for validation and convertible debentures/debt up to Rs 50 Lakhs.'
  },
  {
    chunkId: 1009,
    documentId: 109,
    schemeName: 'Sukanya Samriddhi Yojana (SSY)',
    fileName: 'Sukanya_Samriddhi_Account_Rules_Gazette.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_ssy_001',
    createdAt: '2024-08-30 15:40:00',
    chunkText: 'Sukanya Samriddhi Account is a government-backed savings scheme for girl children with high interest rate (currently 8.2% p.a.) and Section 80C tax exemption. Can be opened for girls below 10 years of age with a minimum deposit of Rs 250 up to Rs 1.5 Lakh per financial year.'
  },
  {
    chunkId: 1010,
    documentId: 110,
    schemeName: 'Atal Pension Yojana (APY)',
    fileName: 'Atal_Pension_Yojana_Subscriber_Charter.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_apy_001',
    createdAt: '2024-07-22 09:15:00',
    chunkText: 'Atal Pension Yojana provides a guaranteed monthly pension of Rs 1,000 to Rs 5,000 to unorganized sector workers starting at age 60. Open to Indian citizens aged 18 to 40 years holding a savings bank account. Contributions depend on age of entry and chosen pension amount.'
  },
  {
    chunkId: 1011,
    documentId: 111,
    schemeName: 'PM Vishwakarma Yojana',
    fileName: 'PM_Vishwakarma_Toolkit_Incentive_Manual.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_vishwa_001',
    createdAt: '2025-01-11 11:00:00',
    chunkText: 'PM Vishwakarma provides end-to-end holistic support to traditional artisans and craftspeople across 18 trades (carpenters, blacksmiths, potters, sculptors, weavers). Benefits include PM Vishwakarma Certificate and ID card, basic and advanced skill training with Rs 500/day stipend, modern toolkit incentive of Rs 15,000, and collateral-free enterprise development loans up to Rs 3 Lakh at subsidized 5% interest rate.'
  },
  {
    chunkId: 1012,
    documentId: 112,
    schemeName: 'Pradhan Mantri Ujjwala Yojana (PMUY)',
    fileName: 'PM_Ujjwala_Yojana_Free_Gas_Connection_Rules.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_pmuy_001',
    createdAt: '2024-11-28 14:20:00',
    chunkText: 'PM Ujjwala Yojana 2.0 provides deposit-free LPG gas connections to adult women from poor rural and BPL households. Benefits include free first LPG cylinder refill, free hotplate (gas stove), and target subsidy of Rs 300 per cylinder for up to 12 refills annually directly credited via DBT.'
  },
  {
    chunkId: 1013,
    documentId: 113,
    schemeName: 'PM-KUSUM (Kisan Urja Suraksha evam Utthaan Mahabhiyan)',
    fileName: 'PM_KUSUM_Solar_Pumps_Subsidy_Norms.pdf',
    chunkIndex: 0,
    embeddingId: 'emb_kusum_001',
    createdAt: '2024-12-14 16:45:00',
    chunkText: 'PM-KUSUM scheme provides up to 60% capital subsidy for installing standalone off-grid solar agricultural pumps and solarizing existing grid-connected agriculture pumps. Farmers can generate clean green electricity, replace expensive diesel generators, and sell surplus energy back to local DISCOM power grids.'
  }
];

export const INITIAL_SCHEMES: GovernmentScheme[] = [
  {
    schemeId: 1,
    categoryId: 1,
    adminId: 1,
    schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Central sector scheme providing income support of ₹6,000 per year in three equal installments to small and marginal farmer families across India.',
    eligibility: 'All landholding farmer families with cultivable land. Income tax payees, constitutional post holders, and high-salaried government employees are excluded.',
    benefits: '₹6,000 per year transferred directly into Aadhaar-seeded bank accounts via DBT in 3 installments of ₹2,000 every 4 months.',
    applicationLink: 'https://pmkisan.gov.in/RegistrationFormNew.aspx',
    officialWebsite: 'https://pmkisan.gov.in',
    lastUpdated: '2025-02-15',
    categoryName: 'Agriculture & Rural Development'
  },
  {
    schemeId: 2,
    categoryId: 2,
    adminId: 1,
    schemeName: 'Ayushman Bharat PM-JAY',
    description: 'The world\'s largest government-funded healthcare assurance scheme offering cashless secondary and tertiary hospitalization.',
    eligibility: 'Families belonging to bottom 40% vulnerable population identified by SECC 2011 deprivation criteria. No cap on family size or age.',
    benefits: '₹5 Lakh health cover per family per year across 27,000+ empaneled government and private hospitals nationwide.',
    applicationLink: 'https://beneficiary.nha.gov.in/',
    officialWebsite: 'https://pmjay.gov.in',
    lastUpdated: '2025-01-20',
    categoryName: 'Healthcare & Wellness'
  },
  {
    schemeId: 3,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Pradhan Mantri Awas Yojana - Urban (PMAY-U)',
    description: 'Affordable housing mission providing central assistance to Urban Local Bodies and developers to build pucca houses with amenities for poor citizens.',
    eligibility: 'EWS families (annual income up to ₹3 Lakh) and LIG families (annual income ₹3-6 Lakh) without an existing pucca house anywhere in India.',
    benefits: 'Central subsidy up to ₹2.67 Lakh on home loan interest under CLSS, or direct grant of ₹1.5 Lakh for beneficiary-led construction.',
    applicationLink: 'https://pmaymis.gov.in/',
    officialWebsite: 'https://pmay-urban.gov.in',
    lastUpdated: '2024-11-10',
    categoryName: 'Women, Housing & Social Welfare'
  },
  {
    schemeId: 4,
    categoryId: 3,
    adminId: 1,
    schemeName: 'National Scholarship Portal (Post-Matric & Merit)',
    description: 'One-stop electronic scholarship gateway delivering central and state financial assistance to underprivileged and meritorious students.',
    eligibility: 'Regular students from Class 11 to Ph.D. with family annual income below ₹2.5 Lakh and minimum 50% marks in prior exams.',
    benefits: 'Full tuition fee reimbursement, maintenance allowances up to ₹1,200/month, and disability study stipends via DBT.',
    applicationLink: 'https://scholarships.gov.in/',
    officialWebsite: 'https://scholarships.gov.in',
    lastUpdated: '2024-12-05',
    categoryName: 'Education & Skill Development'
  },
  {
    schemeId: 5,
    categoryId: 4,
    adminId: 1,
    schemeName: 'Pradhan Mantri Mudra Yojana (PMMY)',
    description: 'Refinance scheme facilitating low-interest, collateral-free business loans for manufacturing, trading, and service enterprises.',
    eligibility: 'Any Indian citizen who has a business plan for a non-farm sector income generating activity like manufacturing, processing, or trading.',
    benefits: 'Collateral-free loans across three tiers: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakh), and Tarun (₹5 Lakh to ₹10 Lakh).',
    applicationLink: 'https://www.udyamimitra.in/',
    officialWebsite: 'https://www.mudra.org.in',
    lastUpdated: '2025-01-10',
    categoryName: 'Business, MSME & Entrepreneurship'
  },
  {
    schemeId: 6,
    categoryId: 3,
    adminId: 1,
    schemeName: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    description: 'Flagship skill certification scheme of the Ministry of Skill Development and Entrepreneurship for building future-ready workforce.',
    eligibility: 'Any unemployed youth or school/college dropouts aged 15-45 years with valid Aadhaar and bank account.',
    benefits: '100% free industry-certified training courses in AI, IoT, electric vehicles, plus NSQF certification and ₹500 stipend.',
    applicationLink: 'https://www.skillindiadigital.gov.in/',
    officialWebsite: 'https://www.msde.gov.in',
    lastUpdated: '2024-09-25',
    categoryName: 'Education & Skill Development'
  },
  {
    schemeId: 7,
    categoryId: 4,
    adminId: 1,
    schemeName: 'Startup India Seed Fund Scheme (SISFS)',
    description: 'Government funding program providing capital support to early-stage innovative startups for market validation and prototyping.',
    eligibility: 'DPIIT recognized startups incorporated not more than 2 years ago, with a technology-driven prototype and commercial potential.',
    benefits: 'Grants up to ₹20 Lakh for validation of proof-of-concept and convertible debt/debentures up to ₹50 Lakh for market entry.',
    applicationLink: 'https://seedfund.startupindia.gov.in/',
    officialWebsite: 'https://www.startupindia.gov.in',
    lastUpdated: '2024-10-15',
    categoryName: 'Business, MSME & Entrepreneurship'
  },
  {
    schemeId: 8,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Sukanya Samriddhi Yojana (SSY)',
    description: 'Beti Bachao Beti Padhao initiative savings scheme providing high sovereign-guaranteed interest and tax benefits for girl child education and marriage.',
    eligibility: 'Parents or legal guardians of a girl child aged below 10 years. Maximum two accounts per family (or triplets).',
    benefits: '8.2% p.a. compound interest rate, complete tax exemption under Section 80C, partial withdrawal at age 18 for higher education.',
    applicationLink: 'https://www.indiapost.gov.in/',
    officialWebsite: 'https://www.nsiindia.gov.in',
    lastUpdated: '2024-08-30',
    categoryName: 'Women, Housing & Social Welfare'
  },
  {
    schemeId: 9,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Atal Pension Yojana (APY)',
    description: 'Universal social security pension scheme administered by PFRDA aimed at unorganized workers to secure old-age regular income.',
    eligibility: 'Indian citizens between 18 and 40 years of age with a savings bank account, who are not income tax taxpayers.',
    benefits: 'Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 from age 60 till demise, and subsequently to spouse.',
    applicationLink: 'https://enps.nsdl.com/eNPS/ApySubRegistration.html',
    officialWebsite: 'https://www.pfrda.org.in',
    lastUpdated: '2024-07-25',
    categoryName: 'Women, Housing & Social Welfare'
  },
  {
    schemeId: 10,
    categoryId: 1,
    adminId: 1,
    schemeName: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Comprehensive yield and crop loss protection insurance for farmers against non-preventable natural risks from sowing to harvest.',
    eligibility: 'All farmers growing notified crops in notified areas including sharecroppers and tenant farmers with insurable land interest.',
    benefits: 'Subsidized premium (only 2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops) with fast digital claim settlement.',
    applicationLink: 'https://pmfby.gov.in/',
    officialWebsite: 'https://pmfby.gov.in',
    lastUpdated: '2024-08-14',
    categoryName: 'Agriculture & Rural Development'
  },
  {
    schemeId: 11,
    categoryId: 2,
    adminId: 1,
    schemeName: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    description: 'Maternity Benefit Programme providing cash incentive for first and second girl child to compensate wage loss and ensure nutrition.',
    eligibility: 'Pregnant Women and Lactating Mothers (PW&LM) who are not regular employees with Central/State Govt or PSUs.',
    benefits: 'Direct cash assistance of ₹5,000 for first child in 2 installments and ₹6,000 for second girl child via Aadhaar Direct Benefit Transfer.',
    applicationLink: 'https://pmmvy.wcd.gov.in/',
    officialWebsite: 'https://wcd.gov.in',
    lastUpdated: '2024-09-02',
    categoryName: 'Healthcare & Wellness'
  },
  {
    schemeId: 12,
    categoryId: 4,
    adminId: 1,
    schemeName: 'PM Street Vendor\'s AtmaNirbhar Nidhi (PM SVANidhi)',
    description: 'Special micro-credit facility enabling urban, peri-urban, and rural street vendors to restart livelihoods post-pandemic.',
    eligibility: 'Street vendors engaged in vending before March 2020 or having vending certificate from Urban Local Body (ULB).',
    benefits: 'Initial working capital loan of ₹10,000, upgradable to ₹20,000 and ₹50,000 on timely repayment with 7% interest subsidy and cashback.',
    applicationLink: 'https://pmsvanidhi.mohua.gov.in/',
    officialWebsite: 'https://pmsvanidhi.mohua.gov.in',
    lastUpdated: '2024-11-20',
    categoryName: 'Business, MSME & Entrepreneurship'
  },
  {
    schemeId: 13,
    categoryId: 2,
    adminId: 1,
    schemeName: 'Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP)',
    description: 'Campaign ensuring quality generic medicines at 50% to 90% cheaper prices than branded equivalents through Kendra outlets.',
    eligibility: 'Open to all Indian citizens across all income groups; special incentives for registered pharmacists opening Janaushadhi centers.',
    benefits: 'Availability of over 2,000 generic medicines and 300 surgical consumables at affordable rates across 10,000+ Kendras.',
    applicationLink: 'https://janaushadhi.gov.in/',
    officialWebsite: 'https://janaushadhi.gov.in',
    lastUpdated: '2025-01-05',
    categoryName: 'Healthcare & Wellness'
  },
  {
    schemeId: 14,
    categoryId: 1,
    adminId: 1,
    schemeName: 'Kisan Credit Card (KCC) Scheme',
    description: 'Timely and adequate credit support to farmers for crop production, post-harvest expenses, animal husbandry, and fisheries.',
    eligibility: 'All farmers, individual or joint borrowers, tenant farmers, self-help groups, and joint liability groups.',
    benefits: 'Credit limit based on cropping pattern, low 4% effective interest rate with prompt repayment incentive, ATM-enabled Rupay KCC card.',
    applicationLink: 'https://www.myscheme.gov.in/schemes/kcc',
    officialWebsite: 'https://agricoop.nic.in',
    lastUpdated: '2024-12-18',
    categoryName: 'Agriculture & Rural Development'
  },
  {
    schemeId: 15,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    description: 'Component of the National Social Assistance Programme (NSAP) providing non-contributory monthly pensions to destitute seniors.',
    eligibility: 'Citizens aged 60 years or above living below the poverty line (BPL cardholders) as per government criteria.',
    benefits: 'Monthly financial assistance of ₹200 to ₹500 (with state government top-ups reaching ₹1,000-₹2,000 depending on state).',
    applicationLink: 'https://nsap.nic.in/',
    officialWebsite: 'https://nsap.nic.in',
    lastUpdated: '2024-10-01',
    categoryName: 'Women, Housing & Social Welfare'
  },
  {
    schemeId: 16,
    categoryId: 4,
    adminId: 1,
    schemeName: 'PM Vishwakarma Scheme',
    description: 'Holistic support scheme providing recognition, skill upgrades, modern toolkits, and low-interest credit for traditional artisans and craftspeople.',
    eligibility: 'Artisans and craftspeople working with hands and tools across 18 traditional trades (carpenters, blacksmiths, potters, sculptors, cobblers, tailors, etc.) aged 18+.',
    benefits: 'PM Vishwakarma Certificate & ID, ₹15,000 modern toolkit grant, stipend during training, and collateral-free enterprise loan up to ₹3 Lakh at 5% interest.',
    applicationLink: 'https://pmvishwakarma.gov.in/',
    officialWebsite: 'https://pmvishwakarma.gov.in',
    lastUpdated: '2025-01-15',
    categoryName: 'Business, MSME & Entrepreneurship'
  },
  {
    schemeId: 17,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Pradhan Mantri Ujjwala Yojana (PMUY 2.0)',
    description: 'Clean cooking fuel initiative providing deposit-free LPG gas connections to women from below poverty line households.',
    eligibility: 'Adult women belonging to BPL households, SC/ST, PMAY beneficiaries, or most backward classes without existing LPG connection.',
    benefits: 'Free LPG connection, first refill and stove provided free of cost, plus ongoing targeted subsidy of ₹300 per refill via Direct Benefit Transfer.',
    applicationLink: 'https://www.pmuy.gov.in/ujjwala2.html',
    officialWebsite: 'https://www.pmuy.gov.in',
    lastUpdated: '2024-11-28',
    categoryName: 'Women, Housing & Social Welfare'
  },
  {
    schemeId: 18,
    categoryId: 1,
    adminId: 1,
    schemeName: 'PM-KUSUM Solar Pump Scheme',
    description: 'Clean energy scheme subsidizing solar irrigation pumps for farmers and enabling solar power generation on barren farmlands.',
    eligibility: 'Individual farmers, farmer groups, cooperatives, water user associations, and farmer producer organizations (FPOs).',
    benefits: 'Up to 60% capital subsidy on standalone solar agriculture pumps, lowering diesel fuel dependency and allowing sale of surplus power to the grid.',
    applicationLink: 'https://pmkusum.mnre.gov.in/',
    officialWebsite: 'https://mnre.gov.in',
    lastUpdated: '2024-12-14',
    categoryName: 'Agriculture & Rural Development'
  },
  {
    schemeId: 19,
    categoryId: 2,
    adminId: 1,
    schemeName: 'Pradhan Mantri National Dialysis Programme (PMNDP)',
    description: 'Free life-saving haemodialysis and peritoneal dialysis services at District Hospitals across all states for kidney patients.',
    eligibility: 'All Below Poverty Line (BPL) kidney failure patients. Non-BPL patients receive treatment at subsidized CGHS package rates.',
    benefits: '100% free haemodialysis sessions, dialyzer reuse, and nephrology consultation under National Health Mission.',
    applicationLink: 'https://pmndp.mohfw.gov.in/',
    officialWebsite: 'https://nhm.gov.in',
    lastUpdated: '2024-10-22',
    categoryName: 'Healthcare & Wellness'
  },
  {
    schemeId: 20,
    categoryId: 3,
    adminId: 1,
    schemeName: 'Prime Minister Research Fellowship (PMRF)',
    description: 'Prestigious fellowship attracting the best talent to doctoral (Ph.D.) programs at top institutes like IISc, IITs, and IISERs.',
    eligibility: 'B.Tech/M.Tech/M.Sc students from recognized universities who have completed degrees with CGPA >= 8.0 or qualified GATE.',
    benefits: 'Generous fellowship of ₹70,000 to ₹80,000 per month for up to 5 years, plus an annual research grant of ₹2 Lakhs.',
    applicationLink: 'https://www.pmrf.in/',
    officialWebsite: 'https://www.pmrf.in',
    lastUpdated: '2024-11-18',
    categoryName: 'Education & Skill Development'
  },
  {
    schemeId: 21,
    categoryId: 4,
    adminId: 1,
    schemeName: 'Stand-Up India Scheme',
    description: 'Empowering SC, ST, and Women entrepreneurs to set up greenfield enterprises in manufacturing, services, agri-allied, or trading.',
    eligibility: 'SC/ST and/or woman entrepreneur aged above 18 years setting up a first-time greenfield business with at least 51% shareholding.',
    benefits: 'Composite bank loans between ₹10 Lakh and ₹1 Crore with handholding support, credit guarantee, and margin money assistance.',
    applicationLink: 'https://www.standupmitra.in/',
    officialWebsite: 'https://www.standupmitra.in',
    lastUpdated: '2024-12-08',
    categoryName: 'Business, MSME & Entrepreneurship'
  },
  {
    schemeId: 22,
    categoryId: 1,
    adminId: 1,
    schemeName: 'Agriculture Infrastructure Fund (AIF)',
    description: 'Medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets.',
    eligibility: 'Farmers, agri-entrepreneurs, startups, primary agricultural credit societies (PACS), and Farmer Producer Organizations (FPOs).',
    benefits: '3% per annum interest subvention on loans up to ₹2 Crore for up to 7 years, along with credit guarantee coverage under CGTMSE.',
    applicationLink: 'https://agriinfra.dac.gov.in/',
    officialWebsite: 'https://agricoop.nic.in',
    lastUpdated: '2025-01-08',
    categoryName: 'Agriculture & Rural Development'
  },
  {
    schemeId: 23,
    categoryId: 1,
    adminId: 1,
    schemeName: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    description: 'Flagship initiative for sustainable, technologically modernized development of fisheries and aquaculture value chains.',
    eligibility: 'Fishers, fish farmers, fish workers, fisheries cooperatives, self-help groups, and fisheries entrepreneurs.',
    benefits: 'Government capital subsidy of 40% for general category and 60% for SC/ST/Women beneficiaries for boats, cold chains, and biofloc ponds.',
    applicationLink: 'https://pmmsy.dof.gov.in/',
    officialWebsite: 'https://dof.gov.in',
    lastUpdated: '2024-10-30',
    categoryName: 'Agriculture & Rural Development'
  },
  {
    schemeId: 24,
    categoryId: 3,
    adminId: 1,
    schemeName: 'Pragathi Scholarship for Girl Students',
    description: 'AICTE technical education scholarship advancing girl empowerment in Diploma and Degree technical and engineering education.',
    eligibility: 'Girl students admitted to 1st year of technical Degree or Diploma courses in AICTE-approved institutions with family income < ₹8 Lakh.',
    benefits: '₹50,000 per annum credited directly to student accounts to cover college tuition fees, computer purchase, books, and equipment.',
    applicationLink: 'https://www.aicte-india.org/schemes/students-development-schemes/pragati',
    officialWebsite: 'https://www.aicte-india.org',
    lastUpdated: '2024-09-12',
    categoryName: 'Education & Skill Development'
  },
  {
    schemeId: 25,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    description: 'Accidental death and permanent disability insurance scheme offering ultra-affordable social protection to citizens.',
    eligibility: 'All Indian citizens aged 18 to 70 years holding a savings bank or post office account with auto-debit consent.',
    benefits: '₹2 Lakh cover for accidental death or permanent total disability, and ₹1 Lakh for permanent partial disability for an annual premium of just ₹20.',
    applicationLink: 'https://www.jansuraksha.gov.in/Forms-PMSBY.aspx',
    officialWebsite: 'https://www.jansuraksha.gov.in',
    lastUpdated: '2025-01-18',
    categoryName: 'Women, Housing & Social Welfare'
  },
  {
    schemeId: 26,
    categoryId: 5,
    adminId: 1,
    schemeName: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
    description: 'Government-backed life insurance scheme providing death coverage due to any reason for citizens in their productive working years.',
    eligibility: 'Individuals aged 18 to 50 years holding a bank or post office savings account with auto-debit capability.',
    benefits: 'Life cover risk guarantee of ₹2 Lakh payable to family/nominee on death of the insured member due to any cause at ₹436 annual premium.',
    applicationLink: 'https://www.jansuraksha.gov.in/Forms-PMJJBY.aspx',
    officialWebsite: 'https://www.jansuraksha.gov.in',
    lastUpdated: '2025-01-18',
    categoryName: 'Women, Housing & Social Welfare'
  }
];
