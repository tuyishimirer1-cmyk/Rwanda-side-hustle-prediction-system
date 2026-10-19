#  DATABASE DOCUMENTATION

## Database Overview

**Database Type:** SQLite 3  
**File:** `backend/hustle.db`  
**Size:** 49 KB  
**Created:** July 9, 2026  
**Location:** `c:\Users\user\25RP20399\side12\side12\hustle4\backend\hustle.db`

##  YES, This Project Has a Database!

The Rwanda Hustle system uses **SQLite**, a lightweight, file-based database that requires no separate server installation. All user data, predictions, and system content are stored in `hustle.db`.

##  Database Schema

### 1⃣ **users** Table

Stores all user accounts (entrepreneurs and admins).

| Column | Type | Description |
|--------|------||
| `id` | INTEGER | Primary key, auto-increment |
| `name` | TEXT | User's full name |
| `email_phone` | TEXT | Email or phone (unique) |
| `password` | TEXT | Hashed password |
| `role` | TEXT | 'entrepreneur' or 'admin' |
| `degree` | TEXT | Educational degree |
| `employment_status` | TEXT | Employment status |
| `language` | TEXT | 'en' or 'rw' (English/Kinyarwanda) |
| `verified` | INTEGER | 1 = verified, 0 = not verified |
| `verification_code` | TEXT | OTP code for verification |
| `location` | TEXT | District in Rwanda |
| `sector` | TEXT | Sector within district |
| `birthday` | TEXT | Date of birth |
| `education_level` | TEXT | Education level |
| `gender` | TEXT | Gender |
| `profile_complete` | INTEGER | 1 = complete, 0 = incomplete |
| `created_at` | TIMESTAMP | Account creation date |

**Current Records:** 1 user

### 2⃣ **predictions** Table

Stores all business predictions made by users.

| Column | Type | Description |
|--------|------||
| `id` | INTEGER | Primary key, auto-increment |
| `user_id` | INTEGER | Foreign key → users(id) |
| `input_data` | TEXT | JSON: User's business profile |
| `result_data` | TEXT | JSON: Prediction results & recommendations |
| `timestamp` | TIMESTAMP | When prediction was made |

**Current Records:** Varies based on user activity

### 3⃣ **stories** Table

Stores entrepreneurial success stories.

| Column | Type | Description |
|--------|------||
| `id` | INTEGER | Primary key, auto-increment |
| `title` | TEXT | Story title |
| `content` | TEXT | Story content (markdown) |
| `author` | TEXT | Author name |
| `image_url` | TEXT | Image URL (optional) |
| `created_at` | TIMESTAMP | Publication date |

**Current Records:** 1 sample story

### 4⃣ **announcements** Table

Stores system-wide announcements.

| Column | Type | Description |
|--------|------||
| `id` | INTEGER | Primary key, auto-increment |
| `title` | TEXT | Announcement title |
| `content` | TEXT | Announcement content |
| `category` | TEXT | 'Announcement', 'Opportunity', 'Update' |
| `created_at` | TIMESTAMP | Publication date |

**Current Records:** 1 sample announcement

### 5⃣ **user_requests** Table

Stores support requests from users.

| Column | Type | Description |
|--------|------||
| `id` | INTEGER | Primary key, auto-increment |
| `user_id` | INTEGER | Foreign key → users(id) |
| `contact` | TEXT | User contact (email/phone) |
| `message` | TEXT | Request message |
| `reply` | TEXT | Admin reply |
| `status` | TEXT | 'Pending', 'Replied', 'Resolved' |
| `replied_at` | TIMESTAMP | Reply timestamp |
| `created_at` | TIMESTAMP | Request timestamp |

### 6⃣ **sessions** Table

Stores JWT authentication tokens.

| Column | Type | Description |
|--------|------||
| `id` | INTEGER | Primary key, auto-increment |
| `user_id` | INTEGER | Foreign key → users(id) |
| `token` | TEXT | JWT token (unique) |
| `created_at` | TIMESTAMP | Token creation time |

##  Current Database Users

### User #1 (Test Entrepreneur)
```
ID:              1
Name:            roro
Email/Phone:     tuyishimirer1@gmail.com
Password:        q3rA08Z58a
Role:            entrepreneur
Employment:      Unemployed
Language:        en (English)
Verified:         Yes
Profile Complete:  Yes
Created:         July 9, 2026 2050
```

##  Database Operations

### View All Users
```bash
cd backend
python check_users.py
```

### Access Database Directly
```bash
# Install SQLite browser or use command line
sqlite3 hustle.db

# SQL Commands
.tables                           # List all tables
.schema users                     # Show users table structure
SELECT * FROM users;              # View all users
SELECT * FROM predictions;        # View all predictions
SELECT * FROM stories;            # View success stories
```

### Backup Database
```bash
cd backend
copy hustle.db hustle_backup.db
```

### Reset Database
```bash
cd backend
del hustle.db
python database.py    # Recreates fresh database
```

##  Database Statistics

| Item | Count |
|------|-------|
| **Total Tables** | 6 |
| **Registered Users** | 1 |
| **Success Stories** | 1 |
| **Announcements** | 1 |
| **Predictions Made** | Varies |

##  Database Security

1. **Passwords:** NOT hashed (for testing). In production, use bcrypt.
2. **Tokens:** JWT-based authentication
3. **Verification:** OTP-based email/SMS verification
4. **Access:** Role-based (entrepreneur vs admin)

##  Database Initialization

The database is automatically initialized when the backend starts:

```python
# From database.py
init_db()  # Creates tables if they don't exist
```

When you run `python app.py`, it calls `init_db()` which:
1. Creates all 6 tables if missing
2. Adds sample success story
3. Adds sample announcement
4. Performs migrations (e.g., adds sector column)

##  Entity Relationship Diagram (ERD)

```

    users    
 (id, name,  
  email...)  

       
        1:N
       
       
                 
                 
  
predictions  user_requests
 (id, user    (id, user  
  _id...)      _id...)   
  
       
        1:N
       
       

 sessions 
 (id, user
  _id...) 

       
 stories         announcements 
(standalone)      (standalone) 
       
```

##  Database File Information

**Location:** `backend/hustle.db`  
**Format:** SQLite 3  
**Size:** 49 KB  
**Included in GitHub:**  Yes  
**Portable:**  Yes (works on any OS)  
**Server Required:**  No (file-based)

##  Sample Queries

### Get all users
```sql
SELECT id, name, email_phone, role, verified 
FROM users;
```

### Get user predictions
```sql
SELECT p.id, p.timestamp, u.name, p.result_data
FROM predictions p
JOIN users u ON p.user_id = u.id
WHERE u.email_phone = 'tuyishimirer1@gmail.com'
ORDER BY p.timestamp DESC;
```

### Get pending support requests
```sql
SELECT * FROM user_requests 
WHERE status = 'Pending'
ORDER BY created_at DESC;
```

### Count predictions by user
```sql
SELECT u.name, COUNT(p.id) as prediction_count
FROM users u
LEFT JOIN predictions p ON u.id = p.user_id
GROUP BY u.id;
```

##  Quick Database Facts

 **SQLite** - No installation required  
 **Lightweight** - Only 49 KB  
 **Fast** - In-memory caching  
 **Portable** - Single file  
 **ACID Compliant** - Transaction safety  
 **Cross-Platform** - Works on Windows, Linux, Mac  
 **Zero Configuration** - Just works!  

##  Additional Resources

- **SQLite Documentation:** https://www.sqlite.org/docs.html
- **Database Browser:** https://sqlitebrowser.org/
- **Python sqlite3 Module:** https://docs.python.org/3/library/sqlite3.html

**Database Version:** SQLite 3  
**Last Updated:** September 4, 2026  
**Maintained By:** TUYISHIMIRE Rosine
