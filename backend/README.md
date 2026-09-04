# Rwanda Side Hustle Prediction System 

AI-powered platform that analyses your skills, capital and location to recommend
the top 3 most profitable side businesses across all 23 Rwanda districts.

**Dataset**: 29,000 real entrepreneur records · **Model**: GradientBoosting · **Accuracy**: ~78%

---

## Project Structure

```
rwanda-hustle/

 data/
    rwanda_hustles_complete.csv      ← dataset (29,000 rows)

 models/                              ← auto-created by train_model.py
    model.pkl
    label_encoders.pkl
    feature_columns.pkl
    hustle_stats.json
    metadata.json

 train_model.py                       ← ML training script
 app.py                               ← Flask REST API

 frontend/
     src/
        App.jsx                      ← React single-page app
     package.json
```

---

## Quick Start (3 steps)

### Step 1 — Train the model

```bash
# Install Python dependencies
pip install scikit-learn pandas numpy joblib flask flask-cors

# Place dataset in data/
mkdir -p data
cp rwanda_hustles_complete.csv data/

# Train
python train_model.py
```

Expected output:
```
 Training complete!  Test accuracy: 77.8%
```

Saved to `models/`:  `model.pkl`, `label_encoders.pkl`, `feature_columns.pkl`,
`hustle_stats.json`, `metadata.json`

---

### Step 2 — Start the API

```bash
python app.py
# Server starts on http://localhost:5000
```

Test the API:
```bash
# Health check
curl http://localhost:5000/health

# Predict
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "hustle_id": "RWH-001",
    "name": "Jean de Dieu",
    "age": 28,
    "gender": "Male",
    "education_level": "Secondary",
    "location": "Kigali",
    "primary_job": "Teacher",
    "startup_capital_rwf": 500000,
    "hours_per_week": 24,
    "has_smartphone": "Yes",
    "internet_access": "Yes",
    "business_training": "No",
    "has_business_plan": "No",
    "previous_experience": "Yes",
    "access_to_finance": "No",
    "network_size": 80,
    "months_operating": 1,
    "language_count": 2,
    "marketing_channel": "WhatsApp Business",
    "monthly_revenue_rwf": 0,
    "monthly_expenses_rwf": 0,
    "monthly_profit_rwf": 0
  }'
```

---

### Step 3 — Run the frontend

```bash
# Create React app
npm create vite@latest frontend -- --template react
cd frontend

# Replace src/App.jsx with RwandaHustle.jsx content
cp ../RwandaHustle.jsx src/App.jsx

# Install & run
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## API Reference

### `GET /health`
Returns server status and model accuracy.

```json
{
  "status": "ok",
  "model": "GradientBoostingClassifier",
  "test_accuracy": 0.7776,
  "n_hustles": 310
}
```

---

### `GET /metadata`
Returns dropdown options for the frontend.

```json
{
  "locations": ["Bugesera", "Kigali", ...],
  "jobs": ["Teacher", "Driver", ...],
  "education_levels": ["Primary", "Secondary", "Vocational", "University"],
  "marketing_channels": ["WhatsApp Business", "Word of Mouth", ...],
  "hustle_count": 310
}
```

---

### `POST /predict`
Main prediction endpoint.

**Request body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `hustle_id` | string | No | Unique reference ID |
| `name` | string | No | Full name |
| `age` | int |  | Age (14–80) |
| `gender` | string | No | Male / Female |
| `education_level` | string | No | Primary / Secondary / Vocational / University |
| `location` | string |  | Rwanda district |
| `primary_job` | string | No | Current job |
| `startup_capital_rwf` | int |  | Available budget in RWF |
| `hours_per_week` | float |  | Hours available per week |
| `has_smartphone` | string | No | Yes / No |
| `internet_access` | string | No | Yes / No |
| `business_training` | string | No | Yes / No |
| `has_business_plan` | string | No | Yes / No |
| `previous_experience` | string | No | Yes / No |
| `access_to_finance` | string | No | Yes / No |
| `network_size` | int | No | Number of contacts (default: 50) |
| `months_operating` | int | No | Months in business (default: 1) |
| `marketing_channel` | string | No | Marketing method |
| `monthly_revenue_rwf` | int | No | Current/expected revenue |
| `monthly_expenses_rwf` | int | No | Current/expected expenses |
| `monthly_profit_rwf` | int | No | Current/expected profit |

**Response**:
```json
{
  "hustle_id": "RWH-001",
  "name": "Jean de Dieu",
  "prediction": {
    "class": 2,
    "label": "High",
    "probabilities": { "Low": 8.2, "Medium": 31.5, "High": 60.3 },
    "overall_score": 78.4,
    "success_prob": 60.3
  },
  "top_3_businesses": [
    {
      "name": "Freelance Web Design",
      "category": "Creative & Digital",
      "composite_score": 142.7,
      "match_pct": 94,
      "avg_profit": 380751,
      "avg_revenue": 439753,
      "avg_capital": 102400,
      "avg_hours_per_week": 24.9,
      "avg_score": 8.26
    }
  ],
  "user_profile": {
    "age": 28,
    "location": "Kigali",
    "capital": 500000,
    "hrs_week": 24
  }
}
```

---

### `GET /hustles`
Returns all 310 hustle statistics.

Optional filter: `GET /hustles?category=Agriculture+%26+Farming`

---

## ML Model Details

### Target Classes
| Class | Label | Score Range | % of Data |
|-------|-------|-------------|-----------|
| 0 | Low | < 7.5 | 27% |
| 1 | Medium | 7.5 – 8.5 | 50% |
| 2 | High | ≥ 8.5 | 23% |

### Features Used (28 total)
- **Demographics**: age, gender, education level
- **Geography**: location (23 districts), primary job
- **Business type**: side hustle type (310 categories)
- **Resources**: startup capital, hours/week, materials
- **Digital**: smartphone, internet access
- **Readiness**: business training, business plan, finance access
- **Experience**: previous experience, months operating, network size
- **Financials**: revenue, expenses, profit, ROI, profit margin
- **Marketing**: marketing channel

### Performance
| Metric | Value |
|--------|-------|
| Train accuracy | 98.4% |
| Test accuracy | 77.8% |
| CV mean (5-fold) | 77.6% |
| Precision (High) | 0.78 |
| Recall (High) | 0.68 |

### Top Predictors
1. `monthly_profit_rwf` (0.39) — strongest signal
2. `business_training` (0.11)
3. `months_operating` (0.09)
4. `previous_experience` (0.09)
5. `network_size` (0.05)

---

## Deployment

### Backend (Render / Railway)

```bash
# Procfile
web: gunicorn app:app --workers 2 --bind 0.0.0.0:$PORT

# requirements.txt
flask==3.0.0
flask-cors==4.0.0
scikit-learn==1.4.0
pandas==2.1.0
numpy==1.26.0
joblib==1.3.2
gunicorn==21.2.0
```

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

> **Security**: Never expose your Anthropic API key in the frontend.
> Route all `/api/chat` requests through your backend.

---

## Chatbot Setup

The AI advisor uses Claude. Add this proxy route in `app.py`:

```python
import os, requests

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    resp = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": os.environ["ANTHROPIC_API_KEY"],
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json=data,
    )
    return jsonify(resp.json()), resp.status_code
```

Then in the frontend, replace the direct API call with:
```javascript
const res = await fetch("/api/chat", { method: "POST", ... });
```

---

## License
Built for Rwanda entrepreneurship. Dataset collected from real Rwandan entrepreneurs.
