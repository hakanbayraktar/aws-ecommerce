# Generic ECS Service Module (Within modules/ecs/services.tf)

variable "app_port" {
  description = "Port exposed by the docker image"
  default     = 3000
}

variable "service_config" {
  description = "Configuration for each microservice"
  type = map(object({
    cpu    = number
    memory = number
    image  = string
  }))
  default = {
    "search"  = { cpu = 256, memory = 512, image = "ecommerce-search-dev" }
    "product" = { cpu = 256, memory = 512, image = "ecommerce-product-dev" }
    "cart"    = { cpu = 256, memory = 512, image = "ecommerce-cart-dev" }
    "order"   = { cpu = 256, memory = 512, image = "ecommerce-order-dev" }
  }
}

resource "aws_lb_target_group" "services" {
  for_each    = var.service_config
  name        = "ecommerce-${each.key}-tg-${var.environment}"
  port        = var.app_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path = "/health"
  }
}

resource "aws_ecs_task_definition" "services" {
  for_each                 = var.service_config
  family                   = "ecommerce-${each.key}-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = each.value.cpu
  memory                   = each.value.memory
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = each.key
    image     = "${each.value.image}" # This would normally be the ECR URL
    essential = true
    portMappings = [{
      containerPort = var.app_port
      hostPort      = var.app_port
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/ecommerce-${each.key}-${var.environment}"
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}

resource "aws_ecs_service" "services" {
  for_each        = var.service_config
  name            = "ecommerce-${each.key}-${var.environment}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.services[each.key].arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_tasks.id]
    subnets         = var.private_subnet_ids
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.services[each.key].arn
    container_name   = each.key
    container_port   = var.app_port
  }
}
