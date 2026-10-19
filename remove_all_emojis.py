"""
Remove all emojis and AI decorative elements from all project files
"""
import os
import re

def remove_emojis(text):
    # Remove Unicode emojis
    emoji_pattern = re.compile(
        "["
        "\U0001F1E0-\U0001F1FF"  # flags (iOS)
        "\U0001F300-\U0001F5FF"  # symbols & pictographs
        "\U0001F600-\U0001F64F"  # emoticons
        "\U0001F680-\U0001F6FF"  # transport & map symbols
        "\U0001F700-\U0001F77F"  # alchemical symbols
        "\U0001F780-\U0001F7FF"  # Geometric Shapes Extended
        "\U0001F800-\U0001F8FF"  # Supplemental Arrows-C
        "\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
        "\U0001FA00-\U0001FA6F"  # Chess Symbols
        "\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
        "\U00002702-\U000027B0"  # Dingbats
        "\U000024C2-\U0001F251"
        "]+",
        flags=re.UNICODE
    )
    
    text = emoji_pattern.sub('', text)
    
    # Remove decorative lines
    text = re.sub(r'^[=\-_*]{3,}$', '', text, flags=re.MULTILINE)
    
    # Remove repeated decorative characters
    text = re.sub(r'([=\-_*])\1{10,}', '', text)
    
    return text

def clean_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_length = len(content)
        cleaned = remove_emojis(content)
        
        if cleaned != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            removed = original_length - len(cleaned)
            print(f" Cleaned: {filepath} (-{removed} chars)")
            return True
        return False
    except Exception as e:
        print(f" Error: {filepath} - {e}")
        return False

def main():
    extensions = ['.py', '.md', '.txt', '.js', '.jsx', '.json', '.csv', '.html']
    exclude_dirs = ['node_modules', '.git', 'dist', '__pycache__', '.vscode']
    
    cleaned_count = 0
    total_files = 0
    
    print("\nRemoving emojis and decorative elements...\n")
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                total_files += 1
                if clean_file(filepath):
                    cleaned_count += 1
    
    print(f"\nDone! Cleaned {cleaned_count} out of {total_files} files.")

if __name__ == "__main__":
    main()
