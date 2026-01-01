import time
import random

def extract_fields(file_path: str, doc_type: str) -> dict:
    """Mock field extraction service"""
    time.sleep(0.5)  # Simulate processing time
    
    # Real implementation would use LayoutLMv3/Donut
    field_templates = {
        "invoice": ["vendor_name", "invoice_number", "total_amount", "date"],
        "resume": ["name", "email", "phone", "skills"],
        "contract": ["parties", "effective_date", "term_length", "governing_law"],
        "receipt": ["merchant", "total", "date", "items"]
    }
    
    fields = field_templates.get(doc_type, ["field1", "field2"])
    return {
        field: {
            "value": f"mock_{field}_value",
            "confidence": round(random.uniform(0.75, 0.98), 2)
        }
        for field in fields
    }