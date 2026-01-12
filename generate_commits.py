import subprocess
import os

print("#!/bin/bash")
print("set -e")  # Exit immediately if a command exits with a non-zero status.

# Get current git status dynamically
result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
data = result.stdout

lines = data.strip().split('\n')
for line in lines:
    line = line.strip()
    if not line: continue
    
    # Parse status and file path
    status = line[:2]
    # Handle quoted paths
    if '"' in line:
        # e.g. D "cheatsheet_topics/js/5. const.mdx"
        path = line[line.find('"'):]
    else:
        path = line[2:].strip()
    
    # Clean path for message
    clean_path = path.replace('"', '')
    filename = os.path.basename(clean_path)
    
    if status.strip() == 'D':
        print(f'git rm {path}')
        print(f'git commit -m "deleted {filename}"')
    elif status.strip() == 'M':
        print(f'git add {path}')
        print(f'git commit -m "updated {filename}"')
    elif status.strip() == '??':
        # Check if directory
        if path.endswith('/'):
            print(f'git add {path}')
            print(f'git commit -m "created {clean_path[:-1]} directory"')
        else:
            print(f'git add {path}')
            print(f'git commit -m "created {filename}"')    
