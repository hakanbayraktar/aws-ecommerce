# Analytics Infrastructure: Kinesis Firehose and S3 Data Lake

resource "aws_s3_bucket" "data_lake" {
  bucket = "ecommerce-data-lake-${var.environment}-${var.region}"
  force_destroy = true
}

resource "aws_iam_role" "firehose_role" {
  name = "firehose-delivery-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "firehose.amazonaws.com" }
    }]
  })
}

resource "aws_kinesis_firehose_delivery_stream" "clickstream" {
  name        = "ecommerce-clickstream-${var.environment}"
  destination = "extended_s3"

  extended_s3_configuration {
    role_arn   = aws_iam_role.firehose_role.arn
    bucket_arn = aws_s3_bucket.data_lake.arn

    processing_configuration {
      enabled = "false"
    }
  }
}

variable "environment" { type = string }
variable "region" { type = string }

output "data_lake_bucket" {
  value = aws_s3_bucket.data_lake.id
}
