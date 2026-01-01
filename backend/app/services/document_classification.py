import time
import random

def classify_document(file_path: str) -> dict:
    """Mock document classification service"""
    time.sleep(0.3)  # Simulate processing time
    
    # Real implementation would use a ViT/LayoutLM model
    document_types = ["invoice", "resume", "contract", "receipt"]
    return {
        "document_type": random.choice(document_types),
        "confidence": round(random.uniform(0.85, 0.99), 2)
    }