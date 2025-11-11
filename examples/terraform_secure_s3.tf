# Example Terraform snippet: Secure S3 bucket
resource "aws_s3_bucket" "secure_bucket" {
  bucket = "example-secure-bucket"
  acl    = "private"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true
    id      = "prevent-delete"
    abort_incomplete_multipart_upload_days = 7
  }
}
