# 环境变量配置说明

## API_BASE_URL 配置

本项目支持在不同环境中灵活配置后端API地址。

## 配置位置

### 1. 开发环境

创建 `.env` 文件：

```bash
VITE_API_BASE_URL=http://localhost:8080
```

### 2. Docker 部署

在 `docker-compose.yml` 中配置：

```yaml
environment:
  - VITE_API_BASE_URL=https://api.lovetest.com.cn
```

### 3. Kubernetes 部署

在 `k8s/configmap.yaml` 中配置：

```yaml
data:
  API_BASE_URL: "https://api.lovetest.com.cn"
```

在 `k8s/env-configmap.yaml` 中配置运行时环境：

```yaml
data:
  env-config.js: |
    window.ENV = {
      VITE_API_BASE_URL: 'https://api.lovetest.com.cn'
    };
```

## 配置优先级

系统按以下优先级读取API地址：

1. **运行时注入** (最高优先级)
   - Docker/K8s 运行时通过 `window.ENV` 注入
   - 文件：`/env-config.js`

2. **构建时环境变量**
   - Vite 构建时的 `VITE_API_BASE_URL`
   - 文件：`.env`

3. **默认值** (最低优先级)
   - `http://localhost:8080`

## 修改步骤

### 修改为 https://api.lovetest.com.cn

#### 方法1: 修改 K8s ConfigMap (推荐)

```bash
# 编辑 k8s/configmap.yaml
data:
  API_BASE_URL: "https://api.lovetest.com.cn"

# 编辑 k8s/env-configmap.yaml
data:
  env-config.js: |
    window.ENV = {
      VITE_API_BASE_URL: 'https://api.lovetest.com.cn'
    };

# 应用更改
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/env-configmap.yaml

# 重启 Pod 使配置生效
kubectl rollout restart deployment/mbti-personality-test -n mbti-test
```

#### 方法2: 修改 Docker Compose

```bash
# 编辑 docker-compose.yml
environment:
  - VITE_API_BASE_URL=https://api.lovetest.com.cn

# 重启容器
docker-compose down
docker-compose up -d
```

#### 方法3: 修改构建时环境变量

```bash
# 创建 .env 文件
echo "VITE_API_BASE_URL=https://api.lovetest.com.cn" > .env

# 重新构建
npm run build
```

## 验证配置

### 在浏览器控制台检查

```javascript
// 查看当前API地址
console.log(window.ENV?.VITE_API_BASE_URL);

// 或者查看实际使用的地址
// 打开 Network 标签，查看 API 请求的目标地址
```

### 测试API连接

```bash
# 测试激活码验证接口
curl -X POST https://api.lovetest.com.cn/api/activation/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"TEST-CODE-001"}'
```

## 文件说明

| 文件 | 用途 | 环境 |
|------|------|------|
| `.env` | 开发环境配置 | 本地开发 |
| `.env.example` | 环境变量示例 | 文档参考 |
| `docker-compose.yml` | Docker环境变量 | Docker部署 |
| `k8s/configmap.yaml` | K8s配置映射 | K8s部署 |
| `k8s/env-configmap.yaml` | K8s运行时配置 | K8s部署 |
| `public/env-config.js` | 运行时配置文件 | 所有环境 |
| `src/services/activationService.ts` | API地址读取逻辑 | 应用代码 |

## 常见问题

### Q: 修改配置后不生效？

A: 确保：
1. K8s: 重启 Pod (`kubectl rollout restart`)
2. Docker: 重启容器 (`docker-compose restart`)
3. 开发: 重启开发服务器 (`npm run dev`)

### Q: 如何查看当前使用的API地址？

A: 在浏览器控制台执行：
```javascript
console.log(window.ENV?.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL);
```

### Q: 为什么需要两个配置文件？

A: 
- `configmap.yaml`: 用于 Pod 环境变量
- `env-configmap.yaml`: 用于运行时 JavaScript 注入

### Q: 生产环境推荐哪种方式？

A: 推荐使用 K8s ConfigMap，因为：
- 无需重新构建镜像
- 可以动态更新配置
- 支持多环境部署

## 安全建议

1. **不要在代码中硬编码API地址**
2. **使用环境变量管理配置**
3. **生产环境使用HTTPS**
4. **定期更新API密钥和证书**

## 相关文档

- [激活码验证功能](./README-ACTIVATION.md)
- [K8s部署指南](./k8s/README.md)
- [Docker部署指南](./README-DOCKER.md)
