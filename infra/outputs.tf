output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "rds_endpoint" {
  description = "The endpoint of the RDS instance"
  value       = module.databases.rds_endpoint
}

output "redis_endpoint" {
  description = "The endpoint of the Redis cluster"
  value       = module.databases.redis_endpoint
}

output "opensearch_endpoint" {
  description = "The endpoint of the OpenSearch domain"
  value       = module.databases.opensearch_endpoint
}

output "ecr_repository_urls" {
  description = "ECR Repository URLs for microservices"
  value       = module.ecr.repository_urls
}

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = module.ecs.alb_dns_name
}

output "cognito_user_pool_id" {
  description = "The ID of the Cognito User Pool"
  value       = module.auth.user_pool_id
}

output "cognito_client_id" {
  description = "The ID of the Cognito User Pool Client"
  value       = module.auth.user_pool_client_id
}
