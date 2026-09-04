# Rwanda Side Hustle Success Prediction System

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Installation

#### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend will run on: http://localhost:5000

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173 (or next available port)

---

## 👤 USER CREDENTIALS

### Test Entrepreneur Account
**Name:** RORO  
**Email:** tuyishimirer1@gmail.com  
**Phone:** +250788888888  
**Password:** (Auto-generated and sent to email/phone during registration)

**Note:** If you don't have the password, you can:
1. Use "Forgot Password" feature
2. Register a new account
3. Check the database directly (see below)

### Admin Account
**Email:** admin@rwandahustle.rw  
**Password:** admin123456  
**Role:** Administrator  
**Access:** Full system management

---

## 🔐 How to Login

### Option 1: Use Existing Account
1. Go to http://localhost:5173
2. Click "Login"
3. Enter email or phone: `tuyishimirer1@gmail.com`
4. Enter your password
5. Enter OTP code (sent to email/phone)

### Option 2: Register New Account
1. Go to http://localhost:5173
2. Click "Sign Up Free"
3. Enter your name, email, and phone
4. System will generate password and send to your contact
5. Check your email/phone for password
6. Login with credentials

### Option 3: Check Database Directly
```bash
cd backend
sqlite3 hustle.db
```
```sql
SELECT name, email, phone, password, role FROM users;
```

---

## 📊 System Features

### For Entrepreneurs
- ✅ Account registration with OTP verification
- ✅ Profile setup (age, skills, location, capital)
- ✅ Business prediction (Success/Growing/Struggling)
- ✅ Top 3 side hustle recommendations
- ✅ Automated business plan generation (PDF/DOCX)
- ✅ Prediction history tracking
- ✅ AI chatbot for business advice
- ✅ Bilingual interface (English/Kinyarwanda)
- ✅ Success stories and learning resources

### For Administrators
- ✅ User management dashboard
- ✅ System statistics and analytics
- ✅ Content management (stories, announcements)
- ✅ Support request management
- ✅ Database backup functionality

---

## 🤖 Machine Learning Models

The system uses three trained models:

| Model | Accuracy | Status |
|-------|----------|--------|
| **Random Forest** | 75.95% | ✅ Primary (Deployed) |
| **Gradient Boosting** | 74.50% | ⚡ Backup |
| **SVM** | 72.70% | 📊 Comparison |

**Dataset:** 10,000 Rwanda business records  
**Features:** 113 distinct hustle types  
**Categories:** Agriculture, Trade, Services, Crafts, Digital, Construction, Tourism

---

## 📁 Project Structure

```
hustle4/
├── backend/               # Flask API Server
│   ├── app.py            # Main application
│   ├── database.py       # Database operations
│   ├── business_recommender.py  # ML recommendation engine
│   ├── models/           # Trained ML models
│   │   ├── final_hustle_model.pkl
│   │   ├── final_scaler.pkl
│   │   ├── final_label_encoder.pkl
│   │   ├── gradient_boosting_model.pkl
│   │   ├── random_forest_model.pkl
│   │   └── svm_model.pkl
│   ├── hustle.db         # SQLite database
│   └── rwanda_side_hustle_10000.csv  # Training dataset
│
└── frontend/              # React Application
    ├── src/
    │   ├── App.jsx       # Main component
    │   └── main.jsx      # Entry point
    ├── public/
    └── dist/             # Build output

---

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/verify-otp` - Verify OTP code
- `POST /api/forgot-password` - Request password reset

### Predictions
- `POST /api/predict` - Get business prediction and recommendations
- `GET /api/user/my-predictions` - Get user prediction history

### Business Plans
- `POST /api/business-plan` - Generate business plan (DOCX)

### Admin
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - List all users
- `POST /api/admin/stories` - Add success story
- `DELETE /api/admin/user/<id>` - Delete user

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    password TEXT,
    role TEXT DEFAULT 'entrepreneur',
    verified INTEGER DEFAULT 0,
    created_at TIMESTAMP
);
```

### Predictions Table
```sql
CREATE TABLE predictions (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    timestamp TIMESTAMP,
    input_data TEXT,
    success_prediction TEXT,
    confidence REAL,
    recommendations TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

---

## 🌍 Supported Districts

All 30 districts of Rwanda:
Bugesera, Burera, Gakenke, Gasabo, Gatsibo, Gicumbi, Gisagara, Huye, Kamonyi, Karongi, Kayonza, Kicukiro, Kirehe, Muhanga, Musanze, Ngoma, Ngororero, Nyabihu, Nyagatare, Nyamagabe, Nyamasheke, Nyanza, Nyarugenge, Nyaruguru, Rubavu, Ruhango, Rulindo, Rusizi, Rutsiro, Rwamagana

---

## 📱 Contact & Support

**Developer:** TUYISHIMIRE Rosine  
**Registration:** 25RP20399  
**Institution:** Rwanda Polytechnic - Huye College  
**Email:** tuyishimirer1@gmail.com  
**Year:** 2025-2026

---

## 📄 License

This project is developed as a capstone project for Bachelor of Technology in Information Communication Technology.

---

## 🐛 Troubleshooting

### Backend won't start
- Check Python version: `python --version` (needs 3.9+)
- Install dependencies: `pip install -r requirements.txt`
- Check port 5000 is free: `netstat -ano | findstr :5000`

### Frontend won't start
- Check Node version: `node --version` (needs 16+)
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

### Can't login
- Check if backend is running on port 5000
- Verify email/phone in database
- Check console for OTP code
- Try password reset feature

### OTP not received
- OTP codes are printed to backend console for testing
- Check spam folder for emails
- Verify EMAIL_USER and EMAIL_PASS in backend/.env
- For SMS, verify Africa's Talking credentials

---

## 🎯 For Evaluators

### To Test the System:
1. Start backend: `cd backend && python app.py`
2. Start frontend: `cd frontend && npm run dev`
3. Access: http://localhost:5173
4. Login with provided credentials
5. Test prediction with sample data
6. Generate business plan
7. View confusion matrices: `backend/confusion_matrices.png`

### Sample Test Profile:
- Age: 25
- Skills: Agriculture/Farming
- Capital: 200,000 RWF
- Hours per day: 4
- Location: Huye
- Education: University

**Expected Result:** System recommends appropriate agricultural businesses with success predictions

---

**Last Updated:** September 4, 2026
