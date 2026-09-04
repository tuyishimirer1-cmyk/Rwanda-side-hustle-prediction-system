import sqlite3

conn = sqlite3.connect('hustle.db')
cursor = conn.cursor()

# First check table structure
cursor.execute("PRAGMA table_info(users)")
columns = cursor.fetchall()
print('\n' + '='*80)
print('USER TABLE STRUCTURE')
print('='*80)
for col in columns:
    print(f'{col[1]} ({col[2]})')
print()

# Now get all data
cursor.execute('SELECT * FROM users')
rows = cursor.fetchall()

print('='*80)
print('USERS IN DATABASE')
print('='*80 + '\n')

if len(rows) == 0:
    print('No users found in database')
else:
    for row in rows:
        print(f'User Data: {row}')
        print('-'*80)

conn.close()
