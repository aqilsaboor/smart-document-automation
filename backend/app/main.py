import time
import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import DocumentResult
from .services.document_classification import classify_document
from .services.field_extraction import extract_fields
from .utils.file_utils import save_upload_file, convert_pdf_to_image

app = FastAPI(title="SDAS API", version="1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-document/", response_model=DocumentResult)
async def process_document(file: UploadFile = File(...)):
    start_time = time.time()
    
    try:
        # Validate file type
        if not file.filename.lower().endswith(('.pdf', '.jpg', '.jpeg', '.png')):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only PDF, JPG, and PNG are supported."
            )
        
        # Save uploaded file
        suffix = os.path.splitext(file.filename)[1]
        file_bytes = await file.read()
        file_path = save_upload_file(file_bytes, suffix)
        
        # Convert PDF to image if needed
        if suffix == ".pdf":
            file_path = convert_pdf_to_image(file_path)
        
        # Classify document
        classification = classify_document(str(file_path))
        
        # Extract fields
        extracted_fields = extract_fields(str(file_path), classification["document_type"])
        
        # Determine if human validation needed
        requires_validation = any(
            field["confidence"] < 0.9 for field in extracted_fields.values()
        )
        
        processing_time = time.time() - start_time
        
        return DocumentResult(
            document_id=str(file_path.name),
            classification=classification,
            extracted_fields=extracted_fields,
            processing_time=round(processing_time, 2),
            requires_validation=requires_validation
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": time.time()}