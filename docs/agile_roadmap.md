# Agile Roadmap: AWS E-commerce Project

Project Domain: `devopsatolyesi.xyz`

## Sprint 1: Foundation & Cloud-Native Core (Week 1-2)
**Goal**: Establish a secure, automated network backbone and CI/CD pipelines.

### [STORY-101] VPC & Network Hardening [x]
- **Task 101.1**: Define CIDR strategy for Dev and Prod environments. [x]
- **Task 101.2**: Create Multi-AZ VPC with Public, Private (App), and Data subnets. [x]
- **Task 101.3**: Provision NAT Gateways for secure outbound private traffic. [x]
- **Task 101.4**: Implement Security Groups with least-privilege access rules. [x]

### [STORY-102] Infrastructure as Code (IaC) Best Practices [x]
- **Task 102.1**: Refactor modules to separate `main.tf`, `variables.tf`, and `outputs.tf`. [x]
- **Task 102.2**: Setup S3 + DynamoDB for remote state management. [/] (Pending connection)
- **Task 102.3**: Create `dev.tfvars` and `prod.tfvars` for environment parity. [x]

### [STORY-103] CI/CD Automation
- **Task 103.1**: GitHub Actions workflow for Terraform linting and planning.
- **Task 103.2**: Setup ECR registries for all microservices.
- **Task 103.3**: Automated IAM role creation for GitHub OIDC provider.

---

## Sprint 2: Data Architecture & Persistence (Week 3-4)
**Goal**: Deploy highly available data stores and search indexing.

### [STORY-201] Transactional Storage (RDS) [x]
- **Task 201.1**: Provision Multi-AZ RDS PostgreSQL. [x]
- **Task 201.2**: Configure backup windows and maintenance cycles. [x]
- **Task 201.3**: Integrate with Secrets Manager for credential management. [/]

### [STORY-202] High-Velocity Data (DynamoDB) [x]
- **Task 202.1**: Schema design for Product Catalog. [x]
- **Task 202.2**: Provision Tables for `Cart` and `UserProfiles`. [x]
- **Task 202.3**: Enable DynamoDB Streams for search synchronization. [x]

### [STORY-203] Search & Caching [x]
- **Task 203.1**: Provision AWS OpenSearch cluster. [x]
- **Task 203.2**: Develop Lambda "syncer" to index DynamoDB changes into OpenSearch. [x]
- **Task 203.3**: Setup ElastiCache Redis for session and response caching. [x]

---

## Sprint 3: Microservices & Compute (Week 5-7)
**Goal**: Develop and deploy containerized business logic.

### [STORY-301] Service Development (NestJS) [/]
- **Task 301.1**: Create base microservice template. [x]
- **Task 301.2**: Implement `ProductService` and `SearchService` APIs. [x]
- **Task 301.3**: Implement `OrderService` and `CartService`. [/]

### [STORY-302] Container Orchestration (ECS Fargate) [x]
- **Task 302.1**: Provision ECS Cluster and Task Definitions for each service. [x]
- **Task 302.2**: Setup Service Discovery (Cloud Map) for internal communication. [x]
- **Task 302.3**: Configure Auto-scaling policies based on CPU/Memory usage. [x]

---

## Sprint 4: Premium Frontend & UX (Week 8-10)
**Goal**: Build a high-performance storefront with modern web tech.

### [STORY-401] Next.js Storefront
- **Task 401.1**: Setup Next.js 14 with App Router and Tailwind CSS.
- **Task 401.2**: Implement Responsive Homepage and Search functionality.
- **Task 401.3**: Secure User Authentication via AWS Cognito integration.

---

## Sprint 5: Analytics & Observability (Week 11-12)
**Goal**: Implement data lake and monitor system health.

### [STORY-501] Data Lake & BI
- **Task 501.1**: Setup Kinesis Firehose to S3 (Clickstream data).
- **Task 501.2**: Glue Crawler and Athena setup for ad-hoc SQL analysis.
- **Task 501.3**: Redshift Serverless for weekly BI reporting.

### [STORY-502] Observability
- **Task 502.1**: CloudWatch Dashboards for service health.
- **Task 502.2**: X-Ray distributed tracing integration.
- **Task 502.3**: SNS Alerts for critical system failures.
