# Installation Guide - Rwanda Side Hustle Success Prediction System

## How to Clone and Run This Project on Another PC

### Prerequisites

Before starting, ensure you have:
- Python 3.9 or higher
- Node.js 16 or higher
- npm (comes with Node.js)
- Git installed
- Internet connection

---

## Step 1: Clone the Project from GitHub

Open Command Prompt (Windows) or Terminal (Mac/Linux) and run:

```bash
git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git
```

This will download the entire project to your computer.

---

## Step 2: Navigate to Project Directory

```bash
cd Rwanda-side-hustle-prediction-system
```

---

## Step 3: Backend Setup (Python/Flask)

### 3.1 Navigate to backend folder
```bash
cd backend
```

### 3.2 Create virtual environment (recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3.3 Install Python dependencies

```bash
pip install flask flask-cors pandas numpy scikit-learn joblib python-dotenv africastalking reportlab
```

Or if there's a requirements.txt:
```bash
pip install -r requirements.txt
```

### 3.4 Create .env file (optional - for email/SMS features)

Create a file named `.env` in the backend folder:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
AFRICASTALKING_USERNAME=your-username
AFRICASTALKING_API_KEY=your-api-key
```

Note: Email and SMS features work without .env (codes print to console for testing)

### 3.5 Start the Backend Server

```bash
python app.py
```

You should see:
```
RwandaHustle running at http://localhost:5000
```

Keep this terminal open!

---

## Step 4: Frontend Setup (React/Vite)

Open a NEW terminal/command prompt.

### 4.1 Navigate to frontend folder

```bash
cd Rwanda-side-hustle-prediction-system/frontend
```

### 4.2 Install Node.js dependencies

```bash
npm install
```

This will install all required packages (React, Vite, etc.)

### 4.3 Start the Frontend Server

```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local:   http://localhost:5173/
```

---

## Step 5: Access the Application

Open your web browser and go to:

```
http://localhost:5173
```

---

## Step 6: Login with Test Account

Use these credentials to login:

**Email:** tuyishimirer1@gmail.com  
**Password:** q3rA08Z58a

When prompted for OTP, check the backend terminal for the verification code.

---

## Complete Setup Commands (All-in-One)

### For Windows:

```bash
# Clone project
git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git
cd Rwanda-side-hustle-prediction-system

# Backend setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors pandas numpy scikit-learn joblib python-dotenv africastalking reportlab
python app.py

# In NEW terminal - Frontend setup
cd Rwanda-side-hustle-prediction-system/frontend
npm install
npm run dev
```

### For Mac/Linux:

```bash
# Clone project
git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git
cd Rwanda-side-hustle-prediction-system

# Backend setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors pandas numpy scikit-learn joblib python-dotenv africastalking reportlab
python app.py

# In NEW terminal - Frontend setup
cd Rwanda-side-hustle-prediction-system/frontend
npm install
npm run dev
```

---

## Quick Start Script

You can also create these scripts for easy setup:

### Windows: setup.bat
```batch
@echo off
echo Setting up Rwanda Hustle...

echo.
echo [1/4] Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install flask flask-cors pandas numpy scikit-learn joblib python-dotenv africastalking reportlab
echo Backend setup complete!

echo.
echo [2/4] Setting up Frontend...
cd ../frontend
call npm install
echo Frontend setup complete!

echo.
echo Setup complete! 
echo.
echo To run the project:
echo   1. Open terminal, run: cd backend ^& python app.py
echo   2. Open another terminal, run: cd frontend ^& npm run dev
echo   3. Open browser: http://localhost:5173
pause
```

### Mac/Linux: setup.sh
```bash
#!/bin/bash
echo "Setting up Rwanda Hustle..."

echo ""
echo "[1/4] Setting up Backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors pandas numpy scikit-learn joblib python-dotenv africastalking reportlab
echo "Backend setup complete!"

echo ""
echo "[2/4] Setting up Frontend..."
cd ../frontend
npm install
echo "Frontend setup complete!"

echo ""
echo "Setup complete!"
echo ""
echo "To run the project:"
echo "  1. Open terminal, run: cd backend && python app.py"
echo "  2. Open another terminal, run: cd frontend && npm run dev"
echo "  3. Open browser: http://localhost:5173"
```

Make executable (Mac/Linux):
```bash
chmod +x setup.sh
./setup.sh
```

---

## Troubleshooting

### Backend won't start

**Error:** "No module named 'flask'"
**Solution:** 
```bash
pip install flask flask-cors pandas numpy scikit-learn joblib
```

**Error:** Port 5000 already in use
**Solution:** 
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
- Mac/Linux: `lsof -ti:5000 | xargs kill -9`

### Frontend won't start

**Error:** "command not found: npm"
**Solution:** Install Node.js from https://nodejs.org/

**Error:** Port 5173 already in use
**Solution:** The system will auto-select another port (5174, 5175, etc.)

**Error:** "Cannot find module"
**Solution:** Delete node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

### Can't access http://localhost:5173

**Solution:** 
1. Check both servers are running
2. Check for errors in terminals
3. Try http://127.0.0.1:5173
4. Clear browser cache (Ctrl+Shift+Delete)

### OTP code not showing

**Solution:** Check the backend terminal - OTP codes are printed there during testing

---

## System Requirements

### Minimum Requirements:
- RAM: 4 GB
- Storage: 500 MB free space
- OS: Windows 10, macOS 10.15, or Linux (Ubuntu 20.04+)
- Internet: Required for initial download

### Recommended Requirements:
- RAM: 8 GB
- Storage: 1 GB free space
- Modern web browser (Chrome, Firefox, Edge, Safari)

---

## Project Structure After Cloning

```
Rwanda-side-hustle-prediction-system/
├── backend/                    # Flask API Server
│   ├── app.py                 # Main application
│   ├── database.py            # Database operations
│   ├── business_recommender.py # ML recommendation engine
│   ├── hustle.db              # SQLite database
│   ├── models/                # Trained ML models
│   │   ├── final_hustle_model.pkl
│   │   ├── gradient_boosting_model.pkl
│   │   ├── random_forest_model.pkl
│   │   └── svm_model.pkl
│   └── rwanda_side_hustle_10000.csv
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── USER_CREDENTIALS.md
└── DATABASE_INFO.md
```

---

## Default URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api (if implemented)

---

## Database

The SQLite database (hustle.db) is included with one test user:

**Email:** tuyishimirer1@gmail.com  
**Password:** q3rA08Z58a  
**Role:** entrepreneur

---

## Testing the Installation

After starting both servers:

1. Go to http://localhost:5173
2. Click "Login"
3. Enter email: tuyishimirer1@gmail.com
4. Enter password: q3rA08Z58a
5. Check backend terminal for OTP code
6. Enter OTP and complete login
7. Fill prediction form and submit
8. View recommendations and generate business plan

If all steps work, installation is successful!

---

## Updating the Project

To get latest updates from GitHub:

```bash
cd Rwanda-side-hustle-prediction-system
git pull origin main
```

Then restart both servers.

---

## Uninstalling

To remove the project:

1. Stop all running servers (Ctrl+C)
2. Delete the project folder:
   ```bash
   rm -rf Rwanda-side-hustle-prediction-system
   ```

---

## Support

If you encounter issues:

1. Check this installation guide
2. Check README.md for detailed documentation
3. Check USER_CREDENTIALS.md for login information
4. Contact: tuyishimirer1@gmail.com

---

## Quick Reference Card

```
CLONE:     git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git
BACKEND:   cd backend && python app.py
FRONTEND:  cd frontend && npm run dev
ACCESS:    http://localhost:5173
LOGIN:     tuyishimirer1@gmail.com / q3rA08Z58a
```

---

**Installation Guide Version:** 1.0  
**Last Updated:** September 4, 2026  
**Author:** TUYISHIMIRE Rosine
