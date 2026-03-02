output "rds_endpoint" {
  description = "The endpoint of the RDS instance"
  value       = aws_db_instance.main.endpoint
}

output "dynamodb_table_products_name" {
  description = "The name of the products table"
  value       = aws_dynamodb_table.products.name
}

output "redis_endpoint" {
  description = "The endpoint of the Redis cluster"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "opensearch_endpoint" {
  description = "The endpoint of the OpenSearch domain"
  value       = aws_opensearch_domain.main.endpoint
}
