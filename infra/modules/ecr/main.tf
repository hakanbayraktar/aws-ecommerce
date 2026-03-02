# ECR Repositories for Microservices

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "services" {
  description = "List of microservices"
  type        = list(string)
  default     = ["search", "product", "cart", "order"]
}

resource "aws_ecr_repository" "services" {
  for_each             = toset(var.services)
  name                 = "ecommerce-${each.key}-${var.environment}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

output "repository_urls" {
  value = { for k, v in aws_ecr_repository.services : k => v.repository_url }
}
