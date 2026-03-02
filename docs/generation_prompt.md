# Enhanced E-commerce Architecture Generation Prompt

Use this prompt to generate production-ready code for the AWS E-commerce project.

---

**PROMPT:**

Act as a Principal Cloud Architect. Generate a full-stack, cloud-native e-commerce solution for the domain `devopsatolyesi.xyz`.

### 1. Infrastructure (Terraform 1.5+)
- **Standards**: Multi-file modules (`main.tf`, `variables.tf`, `outputs.tf`).
- **Networking**: VPC across 2 AZs, 3-tier subnets (Public, App, Data).
- **Compute**: ECS Fargate Cluster. Use Task Definitions with IAM roles for least-privilege.
- **Data**: 
    - RDS PostgreSQL (Multi-AZ).
    - DynamoDB with Streams enabled.
    - ElastiCache Redis Cluster.
    - OpenSearch for full-text search.
- **Security**: Cognito User Pools, WAF with CloudFront, KMS for DB encryption.

### 2. Backend (NestJS / TypeScript)
- **Pattern**: Microservices separated by bounded contexts (Search, Product, Cart, Order, Notification).
- **Integration**: Event-driven architecture using AWS EventBridge and SQS.
- **Workflow**: Step Functions for Order fulfillment (Stock Check -> Payment -> Shipping Init).
- **Observability**: Structured JSON logging, health checks, and OpenTelemetry/X-Ray.

### 3. Frontend (Next.js 14+)
- **Design**: Premium UI using Tailwind CSS. Multi-device responsive.
- **Features**: Server-Side Rendering (SSR), Client-side caching (React Query), and Auth bridging with Cognito.

### 4. CI/CD (GitHub Actions)
- **Pipelines**: Environment-aware deployment (Dev/Prod).
- **Steps**: Lint -> Test -> Build Container -> Push to ECR -> Update ECS Service.

---
