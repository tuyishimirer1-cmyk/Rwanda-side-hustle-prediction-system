#  RWANDA HUSTLE - USER CREDENTIALS

## CURRENT USERS IN DATABASE

###  Test Entrepreneur Account

**Name:** roro  
**Email/Phone:** tuyishimirer1@gmail.com  
**Password:** `q3rA08Z58a`  
**Role:** entrepreneur  
**Status:**  Verified  
**Profile Complete:** Yes  
**Language:** English  
**Employment:** Unemployed  
**Created:** July 9, 2026

##  HOW TO LOGIN

### Step 1: Access the Application
Open your browser and go to: **http://localhost:5175**

### Step 2: Click "Login"

### Step 3: Enter Credentials
- **Email or Phone:** `tuyishimirer1@gmail.com`
- **Password:** `q3rA08Z58a`

### Step 4: OTP Verification
- System will send a 6-digit OTP code
- **Check backend console** for the OTP (printed for testing)
- OR check your email inbox
- Enter the OTP code to complete login

##  OTP CODES

During testing, OTP codes are printed to the backend console:

```

  VERIFICATION CODE FOR tuyishimirer1@gmail.com: 123456

```

Look for this in the terminal where you ran `python app.py`

## ‍ ADMIN ACCOUNT (For System Management)

**Note:** Admin account needs to be created or updated in database.

To create admin account, run this in backend folder:

```python
import sqlite3
import hashlib

conn = sqlite3.connect('hustle.db')
cursor = conn.cursor()

# Create admin user
cursor.execute("""
    INSERT INTO users (name, email_phone, password, role, verified, profile_complete)
    VALUES ('Admin', 'admin@rwandahustle.rw', 'admin123', 'admin', 1, 1)
""")

conn.commit()
conn.close()
print("Admin account created!")
```

**Admin Login:**
- Email: `admin@rwandahustle.rw`
- Password: `admin123`

##  CREATE NEW ACCOUNT

### Option 1: Through UI
1. Go to http://localhost:5175
2. Click "Sign Up Free"
3. Enter:
   - Full Name
   - Email or Phone (+250 format)
4. System generates password automatically
5. Password sent to your email/phone
6. Check backend console for password
7. Login with generated credentials

### Option 2: Through Database (For Testing)

Create file `create_user.py`:

```python
import sqlite3
import random
import string

def generate_password(length=10):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

conn = sqlite3.connect('hustle.db')
cursor = conn.cursor()

name = "Test User"
email = "test@example.com"
password = generate_password()

cursor.execute("""
    INSERT INTO users (name, email_phone, password, role, verified, profile_complete)
    VALUES (?, ?, ?, 'entrepreneur', 1, 0)
""", (name, email, password))

conn.commit()
conn.close()

print(f"User created!")
print(f"Email: {email}")
print(f"Password: {password}")
```

Run: `python create_user.py`

##  CHECK ALL USERS

To see all users in database, run:

```bash
cd backend
python check_users.py
```

This will display:
- All registered users
- Their credentials
- Verification status
- Profile completion status

##  RESET PASSWORD

### If you forgot the password:

1. **Through UI:**
   - Click "Forgot Password?"
   - Enter your email/phone
   - New password sent to contact
   - Check backend console

2. **Through Database:**
   ```python
   import sqlite3
   import random
   import string
   
   def generate_password(length=10):
       chars = string.ascii_letters + string.digits
       return ''.join(random.choice(chars) for _ in range(length))
   
   conn = sqlite3.connect('hustle.db')
   cursor = conn.cursor()
   
   email = "tuyishimirer1@gmail.com"
   new_password = generate_password()
   
   cursor.execute("UPDATE users SET password = ? WHERE email_phone = ?", 
                  (new_password, email))
   conn.commit()
   conn.close()
   
   print(f"Password reset for {email}")
   print(f"New password: {new_password}")
   ```

##  IMPORTANT NOTES

1. **OTP Codes:** During development, OTP codes are printed to backend console. In production, they're only sent via email/SMS.

2. **Email Setup:** To receive actual emails, configure in `backend/.env`:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. **SMS Setup:** To receive actual SMS, configure Africa's Talking credentials in `backend/.env`

4. **Database Location:** `backend/hustle.db`

5. **Backup User Data:** Before testing, backup the database:
   ```bash
   cd backend
   copy hustle.db hustle_backup.db
   ```

##  QUICK TEST SCENARIO

### Test the Complete Flow:

1. **Start Servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python app.py
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Login:**
   - Go to http://localhost:5175
   - Email: `tuyishimirer1@gmail.com`
   - Password: `q3rA08Z58a`
   - OTP: (check backend console)

3. **Make Prediction:**
   - Fill in business profile form
   - Submit prediction
   - View top 3 recommendations

4. **Generate Business Plan:**
   - Click "Generate Business Plan"
   - Download DOCX file
   - Review complete business plan

5. **View History:**
   - Navigate to "History" tab
   - See all past predictions

##  SUPPORT

**Developer:** TUYISHIMIRE Rosine  
**Email:** tuyishimirer1@gmail.com  
**Institution:** Rwanda Polytechnic - Huye College  
**Project:** Capstone 2025-2026

**Last Updated:** September 4, 2026  
**Database:** hustle.db  
**Active Users:** 1 (roro)
