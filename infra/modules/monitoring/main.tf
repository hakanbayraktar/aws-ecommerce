# Monitoring Infrastructure: SNS Alerts and CloudWatch Alarms

resource "aws_sns_topic" "system_alerts" {
  name = "ecommerce-system-alerts-${var.environment}"
}

resource "aws_sns_topic_subscription" "email_alert" {
  topic_arn = aws_sns_topic.system_alerts.arn
  protocol  = "email"
  endpoint  = "admin@devopsatolyesi.com" # Placeholder
}

# CloudWatch Alarm for ECS CPU Utilization
resource "aws_cloudwatch_metric_alarm" "ecs_cpu_high" {
  alarm_name          = "ecommerce-ecs-cpu-high-${var.environment}"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "60"
  statistic           = "Average"
  threshold           = "85"
  alarm_description   = "This metric monitors ecs cpu utilization"
  alarm_actions       = [aws_sns_topic.system_alerts.arn]

  dimensions = {
    ClusterName = var.ecs_cluster_name
  }
}

variable "environment" { type = string }
variable "ecs_cluster_name" { type = string }

output "sns_topic_arn" {
  value = aws_sns_topic.system_alerts.arn
}
