"""
Vector Store Standalone Script (DA3 Requirement)
Initializes ChromaDB collection and ingests official scheme documents.
"""
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from services.chromadb_service import ChromaDBService

def initialize_and_seed_vector_db():
    print("=== [DA3] Initializing ChromaDB Vector Store ===")
    service = ChromaDBService()
    
    sample_policies = [
        {
            "scheme_name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            "doc_name": "PM-KISAN_Guidelines_v2.4.pdf",
            "chunks": [
                "PM-KISAN is a Central Sector Scheme providing Rs 6,000 per annum to small and marginal farmer families with cultivable land. Disbursed in three four-monthly installments of Rs 2,000 via Direct Benefit Transfer.",
                "Eligibility includes landholding farmers across Indian states including Tamil Nadu, UP, Bihar, Maharashtra. Annual income of Rs 2 lakh with agricultural land qualification meets criteria."
            ]
        },
        {
            "scheme_name": "Ayushman Bharat PM-JAY",
            "doc_name": "Ayushman_Bharat_PMJAY_Hospital_Criteria.pdf",
            "chunks": [
                "Ayushman Bharat PM-JAY provides cashless secondary and tertiary hospitalization cover of Rs 5 Lakh per family per year across 27,000+ empaneled hospitals."
            ]
        },
        {
            "scheme_name": "Pradhan Mantri Mudra Yojana (PMMY)",
            "doc_name": "Pradhan_Mantri_Mudra_Yojana_Handbook.pdf",
            "chunks": [
                "PMMY provides collateral-free institutional credit up to Rs 10 Lakh for non-farm income generating micro and small enterprises across Shishu, Kishore, and Tarun tiers."
            ]
        }
    ]
    
    for item in sample_policies:
        ids = service.add_chunks(item["scheme_name"], item["doc_name"], item["chunks"])
        print(f"✓ Ingested {len(ids)} chunks for '{item['scheme_name']}' from '{item['doc_name']}'")
        
    print("=== ChromaDB Vector Store Successfully Ready ===")

if __name__ == '__main__':
    initialize_and_seed_vector_db()
