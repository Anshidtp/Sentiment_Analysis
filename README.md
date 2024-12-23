# Sentiment Analysis System

This project implements a **Sentiment Analysis Web Application** using a FastAPI backend and a React frontend. Users can upload CSV files containing text data to analyze their sentiments, and the application will display the sentiment distribution as bar and pie charts.

![Demo](https://github.com/Anshidtp/Sentiment_Analysis/blob/main/sample/screen-capture.webm)


## Technologies Used

### Backend:
- FastAPI
- Hugging Face Transformers
- Pandas
- JWT 

### Frontend:
- React
- Chart.js
- Axios

## Features

 - **JWT Authentication**: Secure API endpoints.
 - **Sentiment Analysis**: Uses the **"tabularisai/multilingual-sentiment-analysis"**  pre-trained   model from Hugging Face for analyzing sentiments.
 - **File Upload**: Users can upload CSV files from the web interface.
 - **Visualization**: Sentiment distribution is displayed as bar and pie charts using Chart.js.



## Installation and Setup

### Backend:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sentiment-analysis-app.git
   cd sentiment-analysis-app
   
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. The backend will be available at `http://127.0.0.1:8000`.

### Frontend:

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.
