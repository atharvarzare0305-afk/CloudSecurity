#!/usr/bin/env node
// Simple Cloud Security Scanner (Node.js demo)
// Usage: node cloud_scanner.js path/to/sample_inventory.json

const fs = require('fs');
const path = require('path');

function loadInventory(p) {
  if (!fs.existsSync(p)) {
    console.error('Inventory file not found:', p);
    process.exit(1);
  }
  const raw = fs.readFileSync(p, 'utf8');
  return JSON.parse(raw);
}

function checkRootMfa(data, findings) {
  if (!data.root_mfa_enabled) {
    findings.push({ check: 'root_mfa_enabled', result: false, severity: 'high', msg: 'Root account MFA is NOT enabled' });
  } else {
    findings.push({ check: 'root_mfa_enabled', result: true, severity: 'info', msg: 'Root account MFA enabled' });
  }
}

function checkUsersMfa(data, findings) {
  (data.users || []).forEach(u => {
    if (!u.mfa) findings.push({ check: 'user_mfa', user: u.username, result: false, severity: 'high', msg: 'User has no MFA' });
  });
}

function checkS3Public(data, findings) {
  (data.s3_buckets || []).forEach(b => {
    if (b.public) findings.push({ check: 's3_public', bucket: b.name, result: false, severity: 'high', msg: 'S3 bucket is public' });
  });
}

function checkSecurityGroups(data, findings) {
  (data.security_groups || []).forEach(sg => {
    (sg.ingress || []).forEach(rule => {
      if (rule.cidr === '0.0.0.0/0' && [22,3389].includes(rule.port)) {
        findings.push({ check: 'sg_open_admin_port', sg: sg.id, port: rule.port, result: false, severity: 'high', msg: 'Admin port open to world' });
      }
    });
  });
}

function checkCloudtrail(data, findings) {
  if (!data.cloudtrail_enabled) findings.push({ check: 'cloudtrail', result: false, severity: 'medium', msg: 'CloudTrail / audit logging not enabled' });
}

function runChecks(data) {
  const findings = [];
  checkRootMfa(data, findings);
  checkUsersMfa(data, findings);
  checkS3Public(data, findings);
  checkSecurityGroups(data, findings);
  checkCloudtrail(data, findings);
  return findings;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log('Usage: node cloud_scanner.js path/to/inventory.json');
    process.exit(1);
  }
  const invPath = path.resolve(args[0]);
  const data = loadInventory(invPath);
  const findings = runChecks(data);
  const out = { account_id: data.account_id, findings };

  console.log('\n--- Scan Results ---');
  findings.forEach(f => {
    console.log(`[${f.severity.toUpperCase()}] ${f.msg} - ${JSON.stringify(Object.fromEntries(Object.entries(f).filter(([k])=>!['msg','severity'].includes(k))))}`);
  });

  const outDir = path.join(__dirname);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(out, null, 2));
  console.log('\nResults written to backend/scanner/results.json');
}

main();
