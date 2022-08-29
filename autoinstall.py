libs=[
    "flask",
    "flask_bootstrap",
    "requests",
    "json"
]

import os

for lib in libs:
    os.system(f"pip install {lib}")