from transformers import pipeline
import pandas as pd
from pathlib import Path

UPLOAD_DIR = Path("./static")
UPLOAD_DIR.mkdir(exist_ok=True)

sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased")

def analyze_file(file):
    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    df = pd.read_csv(file_path)
    if 'id' not in df.columns or 'text' not in df.columns:
        raise ValueError("CSV must contain 'id' and 'text' columns.")

    results = [
        {"id": row['id'], "text": row['text'], "sentiment": sentiment_analyzer(row['text'])[0]['label']}
        for _, row in df.iterrows()
    ]
    return results