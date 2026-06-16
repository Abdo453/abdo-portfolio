import os
import time
import subprocess

print("Starting git push loop...")
for i in range(1, 20):
    print(f"Attempt {i}...")
    result = subprocess.run(["git", "push"])
    if result.returncode == 0:
        print("SUCCESS!!!")
        break
    else:
        print("Failed. Waiting 5 seconds before retrying...")
        time.sleep(5)
