# Terraform Configuration
# Note: After running infra/scripts/setup-remote-state.sh, uncomment the backend block below
# terraform {
#   backend "s3" {
#     bucket         = "ecommerce-aws-store-tf-state-dev"
#     key            = "state/terraform.tfstate"
#     region         = "us-east-1"
#     encrypt        = true
#     use_lockfile   = true # Enable S3 Native Locking
#   }
# }

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source      = "./modules/vpc"
  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

module "databases" {
  source             = "./modules/databases"
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnets
  db_username        = var.db_username
  db_password        = var.db_password
  rds_instance_class = var.rds_instance_class
}

module "ecr" {
  source      = "./modules/ecr"
  environment = var.environment
}

module "ecs" {
  source             = "./modules/ecs"
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  public_subnet_ids  = module.vpc.public_subnets
  private_subnet_ids = module.vpc.private_subnets
}

module "step_functions" {
  source      = "./modules/step_functions"
  environment = var.environment
}

module "auth" {
  source      = "./modules/auth"
  environment = var.environment
}

module "analytics" {
  source      = "./modules/analytics"
  environment = var.environment
  region      = var.aws_region
}

module "monitoring" {
  source           = "./modules/monitoring"
  environment      = var.environment
  ecs_cluster_name = module.ecs.cluster_name
}
