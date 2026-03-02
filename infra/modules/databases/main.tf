# Databases Module

resource "aws_db_subnet_group" "main" {
  name       = "ecommerce-db-subnet-group-${var.environment}"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name = "ecommerce-db-subnet-group-${var.environment}"
  }
}

resource "aws_security_group" "rds" {
  name   = "ecommerce-rds-sg-${var.environment}"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "aws_db_instance" "main" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = var.rds_instance_class
  db_name              = "ecommerce"
  username             = var.db_username
  password             = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot  = true
}

# ElastiCache Redis
resource "aws_security_group" "redis" {
  name   = "ecommerce-redis-sg-${var.environment}"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "aws_elasticache_subnet_group" "main" {
  name       = "ecommerce-redis-subnet-group-${var.environment}"
  subnet_ids = var.private_subnet_ids
}

resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "ecommerce-redis-${var.environment}"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.main.name
  security_group_ids   = [aws_security_group.redis.id]
}

# OpenSearch Service
resource "aws_security_group" "opensearch" {
  name   = "ecommerce-os-sg-${var.environment}"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

resource "aws_opensearch_domain" "main" {
  domain_name    = "ecommerce-search-${var.environment}"
  engine_version = "OpenSearch_2.11"

  cluster_config {
    instance_type = "t3.small.search"
  }

  vpc_options {
    subnet_ids         = [var.private_subnet_ids[0]]
    security_group_ids = [aws_security_group.opensearch.id]
  }

  ebs_options {
    ebs_enabled = true
    volume_size = 10
  }

  access_policies = <<POLICIES
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "es:*",
            "Principal": "*",
            "Effect": "Allow",
            "Resource": "arn:aws:es:*"
        }
    ]
}
POLICIES
}

# DynamoDB Tables
resource "aws_dynamodb_table" "products" {
  name           = "ecommerce-products-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "ProductID"

  attribute {
    name = "ProductID"
    type = "S"
  }

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
}

resource "aws_dynamodb_table" "cart" {
  name           = "ecommerce-cart-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "UserID"

  attribute {
    name = "UserID"
    type = "S"
  }
}
