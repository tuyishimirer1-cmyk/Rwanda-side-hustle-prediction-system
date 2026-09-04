import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "hustle.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email_phone TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'entrepreneur',
        degree TEXT,
        employment_status TEXT,
        language TEXT DEFAULT 'en',
        verified INTEGER DEFAULT 0,
        verification_code TEXT,
        location TEXT,
        sector TEXT,
        birthday TEXT,
        education_level TEXT,
        gender TEXT,
        profile_complete INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Predictions Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        input_data TEXT,
        result_data TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    """)
    
    # Success Stories Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Announcements Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT DEFAULT 'Announcement', -- Announcement, Opportunity, Update
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # User Requests Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        contact TEXT NOT NULL,
        message TEXT NOT NULL,
        reply TEXT,
        status TEXT DEFAULT 'Pending',
        replied_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    """)
    
    # Sessions Table (for user authentication tokens)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    """)
    
    # Add sector column if it doesn't exist (migration for existing databases)
    try:
        cursor.execute("SELECT sector FROM users LIMIT 1")
    except sqlite3.OperationalError:
        print("Adding sector column to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN sector TEXT")
        conn.commit()
        print("Sector column added successfully.")
    
    # Seed some initial data if empty
    cursor.execute("SELECT COUNT(*) FROM stories")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO stories (title, content, author) VALUES (?, ?, ?)", 
                       ("Success in Kigali", "How I started my mobile money business with 200k RWF.", "Jean de Dieu"))
        
    cursor.execute("SELECT COUNT(*) FROM announcements")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO announcements (title, content, category) VALUES (?, ?, ?)", 
                       ("New Training Opportunity", "Join the upcoming WDA training for digital skills.", "Opportunity"))

    conn.commit()
    conn.close()
    print("Database initialized successfully.")

if __name__ == "__main__":
    init_db()
