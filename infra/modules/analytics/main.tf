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

resource "aws_glue_catalog_database" "ecommerce_db" {
  name = "ecommerce_analytics_${var.environment}"
}

resource "aws_glue_crawler" "clickstream_crawler" {
  database_name = aws_glue_catalog_database.ecommerce_db.name
  name          = "ecommerce-clickstream-crawler-${var.environment}"
  role          = aws_iam_role.firehose_role.arn # Reusing role for simplicity in this demo

  s3_target {
    path = "s3://${aws_s3_bucket.data_lake.bucket}/clickstream/"
  }
}

resource "aws_athena_workgroup" "analytics" {
  name = "ecommerce-analytics-${var.environment}"

  configuration {
    result_configuration {
      output_location = "s3://${aws_s3_bucket.data_lake.bucket}/athena-results/"
    }
  }
}

variable "environment" { type = string }
variable "region" { type = string }

output "data_lake_bucket" {
  value = aws_s3_bucket.data_lake.id
}
