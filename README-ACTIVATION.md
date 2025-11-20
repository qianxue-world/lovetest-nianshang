# 激活码验证功能说明

## 功能概述

本应用实现了基于激活码的访问控制功能。用户必须通过有效的激活码才能使用MBTI性格测试。

## 使用方式

### URL格式

```
https://mbti.lovetest.com.cn/YOUR-ACTIVATION-CODE
```

例如：
```
https://mbti.lovetest.com.cn/TEST-CODE-001
```

## 工作流程

1. **用户访问** - 用户通过带激活码的URL访问网站
2. **提取激活码** - 系统从URL路径中提取激活码
3. **本地检查** - 首先检查本地存储是否有有效的激活码
4. **后端验证** - 如果本地没有，向后端API发送验证请求
5. **保存状态** - 验证成功后，将激活码和过期时间保存到本地存储
6. **允许访问** - 验证通过后，用户可以正常使用应用

## 后端API接口

### 验证激活码

**端点:** `POST /api/activation/validate`

**请求体:**
```json
{
  "code": "TEST-CODE-001"
}
```

**成功响应 (200 OK):**
```json
{
  "isValid": true,
  "message": "Activation code successfully activated",
  "expiresAt": "2025-11-27T12:00:00Z"
}
```

**失败响应 (404/400):**
```json
{
  "isValid": false,
  "message": "Activation code not found",
  "expiresAt": null
}
```

## 配置

### 环境变量

创建 `.env` 文件：

```bash
# 开发环境
VITE_API_BASE_URL=http://localhost:8080

# 生产环境
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 本地存储

激活成功后，以下信息会保存到浏览器的 localStorage：

- `activationCode` - 激活码
- `activationExpiresAt` - 过期时间

## 错误处理

### 1. 激活码不存在
- 显示错误页面
- 提示联系 @潜学天下 获取激活码

### 2. 激活码已过期
- 清除本地存储
- 显示错误页面
- 提示激活码已过期

### 3. 网络错误
- 显示连接错误信息
- 提示检查网络连接

### 4. 无激活码访问
- 显示错误页面
- 提示需要使用有效的激活码

## 安全特性

1. **本地缓存** - 验证成功后缓存到本地，减少API调用
2. **过期检查** - 自动检查本地缓存的激活码是否过期
3. **首次激活** - 后端记录首次激活时间，设置7天有效期
4. **防止绕过** - 前端验证失败时完全阻止访问

## 开发测试

### 测试激活码验证

```bash
# 测试有效激活码
curl -X POST http://localhost:8080/api/activation/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"TEST-CODE-001"}'

# 测试无效激活码
curl -X POST http://localhost:8080/api/activation/validate \
  -H "Content-Type: application/json" \
  -d '{"code":"INVALID-CODE"}'
```

### 清除本地缓存

在浏览器控制台执行：
```javascript
localStorage.removeItem('activationCode');
localStorage.removeItem('activationExpiresAt');
```

## 部署注意事项

### 1. 配置后端API地址

在生产环境的 `.env` 文件中设置：
```
VITE_API_BASE_URL=https://api.yourdomain.com
```

### 2. Nginx配置

确保Nginx正确处理带激活码的URL：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 3. Kubernetes ConfigMap

在 `k8s/configmap.yaml` 中添加环境变量：

```yaml
data:
  API_BASE_URL: "https://api.yourdomain.com"
```

### 4. Docker环境变量

在 `docker-compose.yml` 中添加：

```yaml
environment:
  - VITE_API_BASE_URL=https://api.yourdomain.com
```

## 文件说明

- `src/services/activationService.ts` - 激活码验证服务
- `src/components/ActivationError.tsx` - 错误页面组件
- `src/components/ActivationError.css` - 错误页面样式
- `src/App.tsx` - 主应用，包含验证逻辑

## 常见问题

### Q: 激活码在哪里获取？
A: 联系 @潜学天下 获取激活码

### Q: 激活码有效期多久？
A: 首次激活后7天有效

### Q: 可以在多个设备上使用同一个激活码吗？
A: 可以，激活码可以在多个设备上使用

### Q: 激活码过期后怎么办？
A: 需要联系 @潜学天下 获取新的激活码

### Q: 如何测试激活功能？
A: 访问 `http://localhost:5173/TEST-CODE-001` 进行测试

## 技术栈

- **前端验证**: React + TypeScript
- **本地存储**: localStorage
- **API通信**: Fetch API
- **状态管理**: React Hooks (useState, useEffect)
