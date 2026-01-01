from pydantic import BaseModel
from typing import Dict, Any, Optional

class DocumentClassification(BaseModel):
    document_type: str
    confidence: float

class FieldExtraction(BaseModel):
    field_name: str
    value: str
    confidence: float

class DocumentResult(BaseModel):
    document_id: str
    classification: DocumentClassification
    extracted_fields: Dict[str, FieldExtraction]
    processing_time: float
    requires_validation: bool