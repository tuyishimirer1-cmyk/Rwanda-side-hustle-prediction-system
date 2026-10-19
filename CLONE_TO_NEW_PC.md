# How to Clone This Project to Another PC

## Simple 5-Step Guide

### Step 1: Install Prerequisites

**On the new PC, install these first:**

1. **Python** (version 3.9 or higher)
   - Download from: https://www.python.org/downloads/
   - During installation, CHECK "Add Python to PATH"

2. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Choose LTS version

3. **Git**
   - Download from: https://git-scm.com/downloads
   - Install with default settings

---

### Step 2: Clone the Project

Open Command Prompt (Windows) or Terminal (Mac/Linux) and run:

```bash
git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git
```

Wait for download to complete (about 16 MB).

---

### Step 3: Setup Backend

```bash
cd Rwanda-side-hustle-prediction-system/backend
pip install -r requirements.txt
```

Wait for all packages to install (2-3 minutes).

---

### Step 4: Setup Frontend

Open a NEW terminal/command prompt:

```bash
cd Rwanda-side-hustle-prediction-system/frontend
npm install
```

Wait for installation (5-10 minutes).

---

### Step 5: Run the Project

**Terminal 1 (Backend):**
```bash
cd Rwanda-side-hustle-prediction-system/backend
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd Rwanda-side-hustle-prediction-system/frontend
npm run dev
```

**Open Browser:**
```
http://localhost:5173
```

---

## Complete Copy-Paste Commands

### For Windows (PowerShell or CMD):

```powershell
# Clone project
git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git

# Setup backend
cd Rwanda-side-hustle-prediction-system\backend
pip install -r requirements.txt

# Start backend (keep this terminal open)
python app.py
```

**Open NEW terminal for frontend:**

```powershell
# Setup frontend
cd Rwanda-side-hustle-prediction-system\frontend
npm install

# Start frontend
npm run dev
```

### For Mac/Linux:

```bash
# Clone project
git clone https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system.git

# Setup backend
cd Rwanda-side-hustle-prediction-system/backend
pip3 install -r requirements.txt

# Start backend (keep this terminal open)
python3 app.py
```

**Open NEW terminal for frontend:**

```bash
# Setup frontend
cd Rwanda-side-hustle-prediction-system/frontend
npm install

# Start frontend
npm run dev
```

---

## Login Credentials

Once the application opens in your browser:

**Email:** tuyishimirer1@gmail.com  
**Password:** q3rA08Z58a

**OTP Code:** Check the backend terminal - it prints the verification code.

---

## Quick Troubleshooting

### "git: command not found"
**Solution:** Install Git from https://git-scm.com/

### "python: command not found"
**Solution:** Install Python from https://www.python.org/
Make sure to check "Add to PATH" during installation.

### "pip: command not found"
**Solution:** Python not installed correctly. Reinstall Python with "Add to PATH" checked.

### "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Backend won't start
**Solution:** Make sure you're in the backend folder:
```bash
cd Rwanda-side-hustle-prediction-system/backend
```

### Frontend won't start
**Solution:** Make sure you ran `npm install` first:
```bash
cd Rwanda-side-hustle-prediction-system/frontend
npm install
npm run dev
```

### Port already in use
**Solution:** Another program is using the port. Try:
- Close other terminals
- Restart your computer
- Or the system will auto-select a different port

---

## What Gets Downloaded

When you clone, you get:
- Complete source code
- All 3 trained ML models
- Database with test user
- Dataset (10,000 business records)
- Confusion matrix images
- All documentation

**Total Size:** About 16 MB

---

## Verify Installation

After both servers start, you should see:

**Backend Terminal:**
```
RwandaHustle running at http://localhost:5000
* Running on http://127.0.0.1:5000
```

**Frontend Terminal:**
```
VITE ready in XXX ms
Local:   http://localhost:5173/
```

If you see these messages, installation is successful!

---

## Network Access (Optional)

To access from other devices on same network:

**Backend:** Already accessible on network IP
**Frontend:** Run with `--host` flag:
```bash
npm run dev -- --host
```

Then access from other devices using your PC's IP address.

---

## Updating to Latest Version

If the project gets updated on GitHub:

```bash
cd Rwanda-side-hustle-prediction-system
git pull origin main
```

Then restart both servers.

---

## Summary Checklist

- [ ] Install Python 3.9+
- [ ] Install Node.js 16+
- [ ] Install Git
- [ ] Clone repository
- [ ] Install backend dependencies (`pip install -r requirements.txt`)
- [ ] Install frontend dependencies (`npm install`)
- [ ] Start backend (`python app.py`)
- [ ] Start frontend (`npm run dev`)
- [ ] Open http://localhost:5173
- [ ] Login with provided credentials

---

## Need Help?

If you get stuck:
1. Read the error message carefully
2. Check INSTALLATION_GUIDE.md for detailed help
3. Make sure Python, Node.js, and Git are installed
4. Check you're in the correct folder
5. Contact: tuyishimirer1@gmail.com

---

**Repository:** https://github.com/tuyishimirer1-cmyk/Rwanda-side-hustle-prediction-system

**Last Updated:** September 4, 2026
