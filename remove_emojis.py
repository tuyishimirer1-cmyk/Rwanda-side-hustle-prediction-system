"""
Remove all emojis from markdown and text files
"""
import os
import re

def remove_emojis(text):
    # Remove emoji characters
    emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001F900-\U0001F9FF"  # supplemental symbols
        u"\U0001FA00-\U0001FAFF"
        "]+", flags=re.UNICODE)
    
    text = emoji_pattern.sub('', text)
    
    # Remove common emoji representations
    text = re.sub(r':\w+:', '', text)
    
    # Remove decorative lines
    text = re.sub(r'^[=\-_]{3,}$', '', text, flags=re.MULTILINE)
    
    # Remove multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    return text

def clean_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        cleaned = remove_emojis(content)
        
        if cleaned != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False
    return False

# Files to clean
files_to_clean = [
    'README.md',
    'USER_CREDENTIALS.md',
    'DATABASE_INFO.md',
    'FINAL_STRUCTURE.md',
    'backend/README.md',
    'backend/NOTEBOOK_GUIDE.md',
    'backend/CONFUSION_MATRIX_LOCATION.md',
]

cleaned_count = 0
for file in files_to_clean:
    if os.path.exists(file):
        if clean_file(file):
            print(f"Cleaned: {file}")
            cleaned_count += 1
        else:
            print(f"No changes: {file}")
    else:
        print(f"Not found: {file}")

print(f"\nTotal files cleaned: {cleaned_count}")
