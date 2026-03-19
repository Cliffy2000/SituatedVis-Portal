
import os

for file in os.listdir():
    if file.endswith('.csv') and file.startswith('Training'):
        new_name = 'TrainingMachine' + file.split('Training')[1]
        os.rename(file, new_name)
        print(f"{file} → {new_name}")