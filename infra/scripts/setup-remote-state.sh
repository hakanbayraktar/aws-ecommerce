#!/bin/bash
# Terraform Remote State Setup Script (S3 Native Locking)
# This script creates the S3 bucket required for Terraform remote state.
# Since newer Terraform versions/OpenTofu support S3 native locking, DynamoDB is no longer needed.

set -e

# --- Configuration ---
PROJECT_NAME="ecommerce-aws-store"
ENVIRONMENT=${1:-"dev"}
REGION=${2:-"us-east-1"}
BUCKET_NAME="${PROJECT_NAME}-tf-state-${ENVIRONMENT}"

echo "🚀 Starting Terraform Remote State Setup (Env: $ENVIRONMENT, Region: $REGION)..."

# 1. Create S3 Bucket
if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "✅ S3 Bucket already exists: $BUCKET_NAME"
else
    echo "📦 Creating S3 Bucket: $BUCKET_NAME..."
    if [ "$REGION" == "us-east-1" ]; then
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
    else
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" --create-bucket-configuration LocationConstraint="$REGION"
    fi
    
    # Enable Versioning (Required for locking/state safety)
    aws s3api put-bucket-versioning --bucket "$BUCKET_NAME" --versioning-configuration Status=Enabled
    
    # Enable Encryption
    aws s3api put-bucket-encryption --bucket "$BUCKET_NAME" --server-side-encryption-configuration '{
        "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
    }'
    echo "✅ S3 Bucket created and secured."
fi

echo "---"
echo "🎉 Setup Complete! (DynamoDB bypassed for S3 Native Locking)"
echo "Now, update your infra/main.tf with the following backend block:"
echo ""
cat <<EOF
terraform {
  backend "s3" {
    bucket         = "$BUCKET_NAME"
    key            = "state/terraform.tfstate"
    region         = "$REGION"
    encrypt        = true
    # use_lockfile   = true # Enable S3 Native Locking (Supported in modern TF/OpenTofu)
  }
}
EOF
echo ""
