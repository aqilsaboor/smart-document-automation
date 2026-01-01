import os
import uuid
from pathlib import Path
from PIL import Image
import io

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

def save_upload_file(upload_file: bytes, suffix: str = ".bin") -> Path:
    """Save uploaded file and return path"""
    file_path = UPLOAD_DIR / f"{uuid.uuid4()}{suffix}"
    with open(file_path, "wb") as f:
        f.write(upload_file)
    return file_path

def convert_pdf_to_image(file_path: Path) -> Path:
    """Mock PDF to image conversion"""
    # In production: Use pdf2image or similar
    image_path = file_path.with_suffix(".jpg")
    # Create a placeholder image
    img = Image.new('RGB', (600, 800), color='lightgray')
    img.save(image_path)
    return image_path