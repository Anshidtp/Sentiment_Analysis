from utils.sentiment_analysis import predict_sentiment
import pandas as pd
from pathlib import Path

UPLOAD_DIR = Path("./temp")
UPLOAD_DIR.mkdir(exist_ok=True)



def analyze_file(file):
    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as f:
        f.write(file.file.read())

    df = pd.read_csv(file_path)
    if 'id' not in df.columns or 'text' not in df.columns:
        raise ValueError("CSV must contain 'id' and 'text' columns.")

    results = []
    for _, row in df.iterrows():
        try:
            sentiment = predict_sentiment([row['text']])[0]
            results.append({"id": row['id'], "text": row['text'], "sentiment": sentiment})
        except Exception as e:
            results.append({"id": row['id'], "text": row['text'], "sentiment": "Error"})
    return results
