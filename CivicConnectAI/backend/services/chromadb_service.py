import chromadb
from chromadb.config import Settings
import uuid

class ChromaDBService:
    def __init__(self, persist_directory: str = "./chroma_db_store"):
        self.client = chromadb.PersistentClient(path=persist_directory)
        self.collection = self.client.get_or_create_collection(
            name="civicconnect_scheme_documents",
            metadata={"description": "Embeddings of official government scheme policy PDFs"}
        )
        
    def add_chunks(self, scheme_name: str, doc_name: str, chunks: list[str]):
        """Add text chunks into ChromaDB with metadata for RAG explainability."""
        ids = [f"emb_{uuid.uuid4().hex[:10]}" for _ in chunks]
        metadatas = [
            {
                "scheme_name": scheme_name,
                "source_document": doc_name,
                "chunk_index": idx
            }
            for idx in range(len(chunks))
        ]
        
        self.collection.add(
            documents=chunks,
            metadatas=metadatas,
            ids=ids
        )
        return ids

    def query_similar(self, query_text: str, n_results: int = 3):
        """Query ChromaDB for top-K semantically similar policy chunks."""
        results = self.collection.query(
            query_texts=[query_text],
            n_results=n_results,
            include=["documents", "metadatas", "distances"]
        )
        
        extracted_chunks = []
        if results and results["documents"] and results["documents"][0]:
            docs = results["documents"][0]
            metas = results["metadatas"][0] if results["metadatas"] else [{}] * len(docs)
            distances = results["distances"][0] if results["distances"] else [0.0] * len(docs)
            
            for doc, meta, dist in zip(docs, metas, distances):
                # Cosine similarity conversion (1 - distance / 2 for normalized space)
                similarity = max(0.0, min(1.0, 1.0 - (dist / 2.0)))
                extracted_chunks.append({
                    "chunk_text": doc,
                    "scheme_name": meta.get("scheme_name", "Government Scheme"),
                    "source_document": meta.get("source_document", "Official_Gazette.pdf"),
                    "chunk_index": meta.get("chunk_index", 0),
                    "similarity_score": round(similarity, 4)
                })
        return extracted_chunks
