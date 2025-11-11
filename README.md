# Cloud Security Project (Node.js Demo)

This repository is a B.Tech-level project on **Cloud Security** implemented in Node.js. It contains a report, a simple local scanner that checks a sample cloud inventory (JSON) for common misconfigurations, example Terraform snippets, and documentation.

## Quick start
Requirements: Node.js 14+

```bash
# install dependencies
cd backend
npm install

# run the scanner against the sample inventory
node scanner/cloud_scanner.js ../lab/sample_inventory.json
```

The scanner will print findings and write `backend/scanner/results.json` with details.
