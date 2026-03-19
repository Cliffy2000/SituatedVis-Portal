
import os

for file in os.listdir():
    if file.endswith('.csv') and file.startswith('Set1'):
        new_name = 'Set1Machine' + file.split('Set1')[1]
        os.rename(file, new_name)
        print(f"{file} → {new_name}")