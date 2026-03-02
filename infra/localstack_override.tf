# LocalStack Provider Override
# This file overrides the AWS provider to point to LocalStack for local testing.
# DO NOT commit this file to production. Add to .gitignore.
#
# Usage:
#   1. Start LocalStack: `localstack start -d`
#   2. terraform init
#   3. terraform plan -var-file="environments/dev.tfvars"
#   4. terraform apply -var-file="environments/dev.tfvars" -auto-approve

provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    acm            = "http://localhost:4566"
    athena         = "http://localhost:4566"
    cloudwatch     = "http://localhost:4566"
    cognitoidp     = "http://localhost:4566"
    dynamodb       = "http://localhost:4566"
    ec2            = "http://localhost:4566"
    ecr            = "http://localhost:4566"
    ecs            = "http://localhost:4566"
    elasticache    = "http://localhost:4566"
    es             = "http://localhost:4566"
    firehose       = "http://localhost:4566"
    glue           = "http://localhost:4566"
    iam            = "http://localhost:4566"
    kinesis        = "http://localhost:4566"
    kms            = "http://localhost:4566"
    lambda         = "http://localhost:4566"
    rds            = "http://localhost:4566"
    s3             = "http://localhost:4566"
    secretsmanager = "http://localhost:4566"
    sfn            = "http://localhost:4566"
    sns            = "http://localhost:4566"
    sqs            = "http://localhost:4566"
    ssm            = "http://localhost:4566"
    sts            = "http://localhost:4566"
  }
}
