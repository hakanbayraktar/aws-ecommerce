# AWS Cloud-Native E-commerce Platform 🚀

A premium, production-grade e-commerce storefront built with a microservices architecture, featuring real-time search, automated order orchestration, and a secure serverless infrastructure.

## 🏗 High-Level Architecture
- **Frontend**: Next.js 14 (App Router, Tailwind CSS, Lucide React).
- **Backend**: NestJS (TypeScript) microservices (Search, Product, Cart, Order, Payment, Notification, Analytics).
- **Orchestration**: AWS Step Functions for order fulfillment lifecycle.
- **Infrastructure**: AWS ECS Fargate, ALB, RDS (PostgreSQL), DynamoDB, Redis, OpenSearch.
- **Observability**: CloudWatch, X-Ray, SNS, and a custom Analytics Dashboard.
- **Data Engineering**: Kinesis Firehose, S3 Data Lake, Glue, Athena.
- **Security**: AWS Cognito for Auth, Cloudflare for WAF/DNS.

---

## 🛠 Local Development (Docker-First)

This project is strictly containerized. No local `node` or `npm` installation is required.

### Prerequisites
- Docker & Docker Compose
- AWS CLI (configured for terraform/cloud runs)

### Run Entire System Locally
```bash
docker-compose up --build
```
- **Storefront**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard`
- **API Entrypoint**: `http://localhost:80` (ALB Simulation)

---

## 🌐 Infrastructure as Code (Terraform)

### Manual Infrastructure Creation
1. Navigate to the `infra` directory: `cd infra`
2. Initialize: `terraform init`
3. Check plan: `terraform plan -var-file="terraform.tfvars"`
4. Apply: `terraform apply -var-file="terraform.tfvars"`

### New VPC & Networking
The infrastructure provisions a **brand new VPC** with:
- **Public Subnets**: For ALB and NAT Gateway.
- **Private Subnets**: For ECS Fargate Tasks and internal microservices.
- **Isolated Subnets**: For RDS and ElastiCache.
- **Mult-AZ Redundancy**: Spread across two availability zones.

---

## 🏗 Continuous Integration & Deployment (GitHub Actions)

### Automated Pipeline
The `.github/workflows` directory contains high-impact workflows:
1. **Infra Deploy**: Automatically runs `terraform apply` on pushes to `main`.
2. **Service Deploy**: Builds Docker images, pushes to **Amazon ECR**, and triggers a rolling update to **ECS Fargate**.

### Required GitHub Secrets
To enable the pipelines, set the following repository secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `DB_PASSWORD` (For RDS)
- `COGNITO_USER_POOL_ID` (Generated after first infra run)

---

## 📊 Analytics & Observability
- **Auto-Scaling**: ECS services scale from 1 to 5 tasks based on CPU utilization (>70%).
- **Load Balancing**: An Application Load Balancer (ALB) uses path-based routing (`/search*`, `/order*`, etc.) to route traffic to the correct microservice.
- **Clickstream Data**: All user interactions are streamed via **Kinesis Firehose** to an **S3 Data Lake**.
- **SQL on S3**: Use **Amazon Athena** to query raw clickstream data directly from the S3 bucket using standard SQL.

---

## 📝 Roadmap & Sprint Tracking
Detailed project progress is tracked in the `docs/` folder:
- [Agile Roadmap](./docs/agile_roadmap.md)
- [Task List](./docs/task.md)
- [Meeting Notes](./docs/meetings/)

---
*Built with ❤️ by the DevOps Atolyesi Team.*
