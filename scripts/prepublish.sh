rm -rf dist
babel src --out-dir dist
flow-copy-source src dist
