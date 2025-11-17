# MBTI Personality Test - Docker Deployment Guide

## Prerequisites

- Docker installed on your VM
- Docker Compose installed
- Port 80 available (or modify the port in docker-compose.yml)

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### 2. Using the Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## Manual Docker Commands

### Build the image
```bash
docker build -t mbti-test .
```

### Run the container
```bash
docker run -d -p 80:80 --name mbti-test mbti-test
```

### Stop and remove
```bash
docker stop mbti-test
docker rm mbti-test
```

## Deployment on Cloud VM

### 1. Upload files to your VM
```bash
# From your local machine
scp -r . user@your-vm-ip:/path/to/deployment/
```

### 2. SSH into your VM
```bash
ssh user@your-vm-ip
cd /path/to/deployment/
```

### 3. Deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. Access your website
```
http://your-vm-ip
```

## Using Custom Port

If port 80 is already in use, edit `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Change 8080 to your desired port
```

Then access at: `http://your-vm-ip:8080`

## SSL/HTTPS Setup (Optional)

For production with HTTPS, you can use nginx-proxy with Let's Encrypt:

```yaml
version: '3.8'

services:
  mbti-test:
    build: .
    container_name: mbti-personality-test
    expose:
      - "80"
    environment:
      - VIRTUAL_HOST=your-domain.com
      - LETSENCRYPT_HOST=your-domain.com
      - LETSENCRYPT_EMAIL=your-email@example.com
    networks:
      - proxy-network

networks:
  proxy-network:
    external: true
```

## Troubleshooting

### Check container status
```bash
docker ps -a
```

### View logs
```bash
docker-compose logs -f
```

### Restart container
```bash
docker-compose restart
```

### Rebuild after code changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Check nginx configuration
```bash
docker exec mbti-personality-test nginx -t
```

## Environment Variables

You can add environment variables in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - API_URL=https://your-api.com
```

## Updating the Application

1. Pull latest code changes
2. Rebuild and restart:
```bash
./deploy.sh
```

Or manually:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Resource Management

### View resource usage
```bash
docker stats mbti-personality-test
```

### Set resource limits in docker-compose.yml
```yaml
services:
  mbti-test:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## Backup

### Backup container image
```bash
docker save mbti-test > mbti-test-backup.tar
```

### Restore from backup
```bash
docker load < mbti-test-backup.tar
```

## Security Notes

1. Always use HTTPS in production
2. Keep Docker and images updated
3. Use environment variables for sensitive data
4. Configure firewall rules on your VM
5. Regular security updates: `docker-compose pull && docker-compose up -d`

## Support

For issues or questions, check the logs first:
```bash
docker-compose logs -f mbti-personality-test
```
