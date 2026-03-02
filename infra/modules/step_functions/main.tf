# Step Functions: Order Lifecycle Workflow

variable "environment" {
  description = "Environment name"
  type        = string
}

resource "aws_iam_role" "step_functions_role" {
  name = "ecommerce-order-sfn-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "states.amazonaws.com"
      }
    }]
  })
}

resource "aws_sfn_state_machine" "order_lifecycle" {
  name     = "ecommerce-order-lifecycle-${var.environment}"
  role_arn = aws_iam_role.step_functions_role.arn

  definition = <<EOF
{
  "StartAt": "ProcessPayment",
  "States": {
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:MockPayment",
      "Next": "IsPaymentSuccessful"
    },
    "IsPaymentSuccessful": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.paymentStatus",
          "StringEquals": "SUCCEEDED",
          "Next": "ShipOrder"
        }
      ],
      "Default": "CancelOrder"
    },
    "ShipOrder": {
      "Type": "Pass",
      "Result": { "status": "SHIPPED" },
      "End": true
    },
    "CancelOrder": {
      "Type": "Pass",
      "Result": { "status": "CANCELLED" },
      "End": true
    }
  }
}
EOF
}

output "state_machine_arn" {
  value = aws_sfn_state_machine.order_lifecycle.arn
}
