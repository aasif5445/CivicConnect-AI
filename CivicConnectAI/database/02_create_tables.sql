-- ==========================================================
-- CivicConnect AI: Table Definitions (DDL)
-- Demonstrating: PK, FK, UNIQUE, CHECK, DEFAULT, NOT NULL, INDEXES
-- ==========================================================

USE civicconnect_db;

-- 1. Generalization Entity: PERSON
CREATE TABLE PERSON (
    PersonID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    DateOfBirth DATE NOT NULL,
    CONSTRAINT chk_dob CHECK (DateOfBirth <= CURDATE())
) ENGINE=InnoDB;

-- Multivalued Attribute resolved: PERSON_PHONE
CREATE TABLE PERSON_PHONE (
    PersonID INT NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    PhoneType VARCHAR(20) DEFAULT 'Mobile',
    PRIMARY KEY (PersonID, PhoneNumber),
    CONSTRAINT fk_phone_person FOREIGN KEY (PersonID) 
        REFERENCES PERSON(PersonID) ON DELETE CASCADE,
    CONSTRAINT chk_phone_format CHECK (PhoneNumber REGEXP '^[0-9+ -]{10,15}$')
) ENGINE=InnoDB;

-- 2. Specialization Entity: USER (Citizen)
CREATE TABLE USER (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    PersonID INT NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Gender ENUM('Male', 'Female', 'Transgender', 'Prefer not to say') NOT NULL,
    Occupation VARCHAR(80) NOT NULL,
    AnnualIncome DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    State VARCHAR(60) NOT NULL,
    District VARCHAR(60) NOT NULL,
    City VARCHAR(60) NOT NULL,
    Pincode VARCHAR(10) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_person FOREIGN KEY (PersonID) 
        REFERENCES PERSON(PersonID) ON DELETE CASCADE,
    CONSTRAINT chk_income CHECK (AnnualIncome >= 0)
) ENGINE=InnoDB;

-- 3. Specialization Entity: ADMIN
CREATE TABLE ADMIN (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    PersonID INT NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('SuperAdmin', 'SchemeManager', 'DocumentAuditor') DEFAULT 'SchemeManager',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_person FOREIGN KEY (PersonID) 
        REFERENCES PERSON(PersonID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Category Entity: CATEGORY
CREATE TABLE CATEGORY (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL UNIQUE,
    Description TEXT,
    Icon VARCHAR(50) DEFAULT 'Folder'
) ENGINE=InnoDB;

-- 5. Scheme Entity: GOVERNMENT_SCHEME
CREATE TABLE GOVERNMENT_SCHEME (
    SchemeID INT AUTO_INCREMENT PRIMARY KEY,
    CategoryID INT NOT NULL,
    AdminID INT NOT NULL,
    SchemeName VARCHAR(150) NOT NULL UNIQUE,
    Description TEXT NOT NULL,
    Eligibility TEXT NOT NULL,
    Benefits TEXT NOT NULL,
    ApplicationLink VARCHAR(255),
    OfficialWebsite VARCHAR(255) NOT NULL,
    LastUpdated DATE NOT NULL DEFAULT (CURRENT_DATE),
    CONSTRAINT fk_scheme_category FOREIGN KEY (CategoryID) 
        REFERENCES CATEGORY(CategoryID) ON UPDATE CASCADE,
    CONSTRAINT fk_scheme_admin FOREIGN KEY (AdminID) 
        REFERENCES ADMIN(AdminID)
) ENGINE=InnoDB;

-- 6. Document Metadata: SCHEME_DOCUMENT
CREATE TABLE SCHEME_DOCUMENT (
    DocumentID INT AUTO_INCREMENT PRIMARY KEY,
    SchemeID INT NOT NULL,
    FileName VARCHAR(200) NOT NULL,
    FilePath VARCHAR(255) NOT NULL,
    FileType VARCHAR(50) DEFAULT 'application/pdf',
    UploadDate DATE NOT NULL DEFAULT (CURRENT_DATE),
    FileSize VARCHAR(20) NOT NULL,
    Version VARCHAR(20) DEFAULT '1.0',
    CONSTRAINT fk_doc_scheme FOREIGN KEY (SchemeID) 
        REFERENCES GOVERNMENT_SCHEME(SchemeID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Weak Entity: DOCUMENT_CHUNK (Identifying Relationship with SCHEME_DOCUMENT)
CREATE TABLE DOCUMENT_CHUNK (
    ChunkID INT AUTO_INCREMENT,
    DocumentID INT NOT NULL,
    ChunkIndex INT NOT NULL,
    ChunkText TEXT NOT NULL,
    EmbeddingID VARCHAR(100) NOT NULL UNIQUE,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ChunkID, DocumentID),
    CONSTRAINT fk_chunk_doc FOREIGN KEY (DocumentID) 
        REFERENCES SCHEME_DOCUMENT(DocumentID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Associative Entity: BOOKMARK (Resolving M:N between USER & GOVERNMENT_SCHEME)
CREATE TABLE BOOKMARK (
    BookmarkID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    SchemeID INT NOT NULL,
    BookmarkDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Notes VARCHAR(255),
    CONSTRAINT uk_user_scheme UNIQUE (UserID, SchemeID),
    CONSTRAINT fk_bmk_user FOREIGN KEY (UserID) 
        REFERENCES USER(UserID) ON DELETE CASCADE,
    CONSTRAINT fk_bmk_scheme FOREIGN KEY (SchemeID) 
        REFERENCES GOVERNMENT_SCHEME(SchemeID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. History Entity: CHAT_HISTORY
CREATE TABLE CHAT_HISTORY (
    ChatID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Question TEXT NOT NULL,
    AIResponse TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    SessionID VARCHAR(100) NOT NULL,
    CONSTRAINT fk_chat_user FOREIGN KEY (UserID) 
        REFERENCES USER(UserID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 10. Feedback Entity: FEEDBACK
CREATE TABLE FEEDBACK (
    FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Rating INT NOT NULL,
    Comments TEXT,
    SubmittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_fb_user FOREIGN KEY (UserID) 
        REFERENCES USER(UserID) ON DELETE CASCADE,
    CONSTRAINT chk_rating CHECK (Rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;

-- Performance Indexes
CREATE INDEX idx_scheme_category ON GOVERNMENT_SCHEME(CategoryID);
CREATE INDEX idx_user_state_occupation ON USER(State, Occupation);
CREATE INDEX idx_doc_scheme ON SCHEME_DOCUMENT(SchemeID);
CREATE INDEX idx_chunk_doc ON DOCUMENT_CHUNK(DocumentID);
CREATE INDEX idx_chat_user_time ON CHAT_HISTORY(UserID, Timestamp);

SELECT 'All 10 tables, constraints, and indexes created successfully.' AS Status;
