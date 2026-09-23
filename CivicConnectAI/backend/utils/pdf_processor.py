import re
from pypdf import PdfReader

def extract_text_from_pdf(file_path: str) -> str:
    """Extract and sanitize text from a given PDF document."""
    try:
        reader = PdfReader(file_path)
        text_content = []
        for page_idx, page in enumerate(reader.pages):
            page_text = page.extract_text()
            if page_text:
                text_content.append(page_text)
        raw_text = "\n".join(text_content)
        
        # Clean text
        clean_text = re.sub(r'\s+', ' ', raw_text)
        clean_text = re.sub(r'[^\x00-\x7F]+', ' ', clean_text)
        return clean_text.strip()
    except Exception as e:
        raise RuntimeError(f"Error parsing PDF at {file_path}: {str(e)}")

def split_into_chunks(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    """Split clean text into overlapping chunks for semantic vector embedding."""
    words = text.split()
    chunks = []
    
    if not words:
        return chunks
        
    stride = chunk_size - overlap
    for i in range(0, len(words), stride):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
            
    return chunks
