# Serverless CRUD API

This project delivers a RESTful API using a fully serverless architecture built on AWS. It supports standard Create, Read, Update, and Delete (CRUD) operations with scalable infrastructure components.

## Architecture Overview

The application is composed of the following AWS services and development tools:

- **API Gateway** – Manages and routes incoming HTTP requests
- **AWS Lambda** – Executes backend logic without provisioning servers
- **DynamoDB** – Provides a fast and scalable NoSQL data store
- **Serverless Framework** – Facilitates deployment and infrastructure as code
- **GitHub Actions** – Automates testing and deployment workflows

## Features

- Complete CRUD operations for managing items
- Environment-based deployments (e.g., development and production)
- Automated CI/CD using GitHub Actions
- Integration with the Serverless Framework Dashboard for monitoring

## API Endpoints

| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| POST   | `/items`      | Create a new item         |
| GET    | `/items`      | Retrieve all items        |
| GET    | `/items/{id}` | Get a specific item by ID |
| PUT    | `/items/{id}` | Update an existing item   |
| DELETE | `/items/{id}` | Delete an item            |

## Prerequisites

Ensure you have the following tools installed:

- Node.js (v14 or newer)
- AWS CLI configured with credentials
- Serverless Framework installed globally:

## Deployment

### Deploy via CLI

Deploy to dev environment:

```
npm run deploy:dev
```

Deploy to production:

```
npm run deploy:prod
```

### GitHub Actions CI/CD

Pushes to the `main` branch will automatically trigger deployment to the dev environment. For production deployments, you can manually run the GitHub workflow and select prod as the stage.

## CI/CD Pipeline Overview

The CI/CD pipeline is configured in `.github/workflows/deploy.yml` and handles:

1. Installing dependencies
2. Deploying to the specified environment
3. Supporting multi-stage deployments (dev/prod)

### Secrets for GitHub

Make sure to add the following secret in your GitHub repository:

- `SERVERLESS_ACCESS_KEY`: Your personal access key for the Serverless Framework

## Using the API

Once deployed, the API endpoints can be tested using `curl, Postman, or any HTTP client`.

### Create a task

```bash
curl -X POST https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/items \
 -H "Content-Type: application/json" \
 -d '{"title": "Build API", "description": "Implement core CRUD functionality"}'
```

### Get tasks list

```bash
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/items
```

### Get a specific task

```bash
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/items/{item-id}
```

### Update a task

```bash
curl -X PUT https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/items/{item-id} \
 -H "Content-Type: application/json" \
 -d '{"status": "COMPLETED"}'
```

### Delete a task

```bash
curl -X DELETE https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/items/{item-id}
```

## Security

- IAM roles are configured with least privilege
- API Gateway endpoints can be secured with API keys or Cognito (not implemented in this demo)
- Sensitive information is stored in GitHub Secrets
