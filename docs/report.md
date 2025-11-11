# Project Report: Cloud Security (Node.js)

## 1. Title
Cloud Security: Identification and Mitigation of Common Misconfigurations

## 2. Objective
To study cloud security risks, implement a simple scanner for common misconfigurations, and provide guidance and remediation steps.

## 3. Scope
- Focus on Infrastructure-as-a-Service (IaaS) scenarios.
- Check items: Public S3 buckets, overly permissive security groups, IAM users without MFA, root account usage, lack of logging.

## 4. Tools & Environment
- Node.js (scanner)
- Terraform examples (secure patterns)

## 5. Methodology
- Inventory input (JSON) representing typical cloud resources.
- Static checks for high-risk configurations.

## 6. Findings (example)
See `backend/scanner/results.json` after running the scanner.

## 7. Recommendations
- Enable MFA for all privileged users.
- Enforce least privilege for IAM policies.
- Block public S3 buckets or use bucket policies to restrict access.
- Use Security Group rules with narrow CIDR ranges.
- Enable CloudTrail / Audit logs and centralize them.
