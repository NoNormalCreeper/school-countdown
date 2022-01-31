libs=[
    "flask",
    "flask_bootstrap"
]

import os

for lib in libs:
    os.system("pip install " + lib)