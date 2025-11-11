# Cloud Security Checklist (Short)

- [ ] Root account MFA enabled
- [ ] IAM users have MFA
- [ ] No overly permissive IAM policies (e.g., `*` actions on `*` resources)
- [ ] S3 buckets not public unless required
- [ ] Security Groups do not allow 0.0.0.0/0 for admin ports (22,3389, etc.)
- [ ] CloudTrail / Activity logs enabled and centralized
- [ ] Encryption at rest enabled where applicable
- [ ] Secrets not stored in plain text (use secret manager)
