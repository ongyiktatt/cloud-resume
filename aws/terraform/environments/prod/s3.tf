# Create a S3 bucket
resource "aws_s3_bucket" "site" {
  bucket           = var.s3_bucket_name
  bucket_namespace = "account-regional"
  region = var.aws_region
}
# S3 bucket policy for the site, to allow CloudFront access only
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = jsonencode({
    Id = "PolicyForCloudFrontPrivateContent"
    Statement = [{
      Action = "s3:GetObject"
      Condition = {
        ArnLike = {
          "AWS:SourceArn" = aws_cloudfront_distribution.site.arn
        }
      }
      Effect = "Allow"
      Principal = {
        Service = "cloudfront.amazonaws.com"
      }
      Resource = "${aws_s3_bucket.site.arn}/*"
      Sid      = "AllowCloudFrontServicePrincipal"
    }]
    Version = "2008-10-17"
  })
  region = var.aws_region
}
# To enable static website in S3
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  region = var.aws_region
  error_document {
    key = "404.html"
  }
  index_document {
    suffix = "index.html"
  }
}
# To block public access to this bucket
resource "aws_s3_bucket_public_access_block" "site" {
  block_public_acls       = true
  block_public_policy     = true
  bucket                  = aws_s3_bucket.site.id
  ignore_public_acls      = true
  region                  = var.aws_region
  restrict_public_buckets = true
}
