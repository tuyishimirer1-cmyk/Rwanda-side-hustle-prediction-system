from database import get_db_connection

conn = get_db_connection()
cur = conn.cursor()
cur.execute('SELECT name, email_phone, role, verified FROM users WHERE role="support_technician"')
result = cur.fetchone()
if result:
    print(f"Name: {result[0]}")
    print(f"Email/Phone: {result[1]}")
    print(f"Role: {result[2]}")
    print(f"Verified: {result[3]}")
else:
    print("No technical support user found")
conn.close()
