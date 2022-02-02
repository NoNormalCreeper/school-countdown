libs=[
    "flask",
    "flask_bootstrap",
    "requests",
    "json"
]

import os

for lib in libs:
    os.system("pip install " + lib)