# MBTI截图生成工具

## 功能说明

这个工具可以自动为所有16种MBTI人格类型生成结果页截图，用于：
- 展示设计效果
- 社交媒体分享
- 文档和演示
- 测试不同人格类型的显示效果

## 使用方法

### 1. 安装依赖

首次使用需要安装Puppeteer：

```bash
npm install
```

### 2. 启动开发服务器

在一个终端窗口中运行：

```bash
npm run dev
```

等待服务器启动完成（通常在 http://localhost:5173）

### 3. 生成截图

在另一个终端窗口中运行：

```bash
npm run screenshot
```

## 输出结果

截图将保存在项目根目录的 `screenshots/` 文件夹中：

```
screenshots/
├── INTJ.png
├── INTP.png
├── ENTJ.png
├── ENTP.png
├── INFJ.png
├── INFP.png
├── ENFJ.png
├── ENFP.png
├── ISTJ.png
├── ISTP.png
├── ESTJ.png
├── ESTP.png
├── ISFJ.png
├── ISFP.png
├── ESFJ.png
└── ESFP.png
```

## 测试模式

脚本使用特殊的URL参数来触发测试模式：

```
http://localhost:5173/?test=true&type=INTJ
```

参数说明：
- `test=true` - 启用测试模式
- `type=XXXX` - 指定MBTI类型（如INTJ, ENFP等）

在测试模式下：
- 跳过激活码验证
- 直接显示结果页
- 自动生成模拟答案数据
- 数据分析滑块会显示合理的位置

## 截图规格

- 宽度：1200px
- 高度：自适应（fullPage）
- 分辨率：2x（高清）
- 格式：PNG

## 注意事项

1. 确保开发服务器正在运行
2. 首次运行会下载Chromium（约170MB）
3. 生成所有16张截图大约需要1-2分钟
4. screenshots文件夹已添加到.gitignore

## 故障排除

### 服务器未运行
```
❌ 开发服务器未运行！
💡 请先运行: npm run dev
```
解决：在另一个终端运行 `npm run dev`

### 端口被占用
如果5173端口被占用，Vite会使用其他端口。
需要修改 `scripts/generate-screenshots.js` 中的URL。

### Puppeteer安装失败
```bash
# 使用国内镜像
PUPPETEER_DOWNLOAD_HOST=https://npmmirror.com/mirrors npm install puppeteer
```

## 自定义

### 修改截图尺寸

编辑 `scripts/generate-screenshots.js`：

```javascript
await page.setViewport({
  width: 1200,    // 修改宽度
  height: 2400,   // 修改高度
  deviceScaleFactor: 2  // 修改分辨率倍数
});
```

### 修改等待时间

如果页面加载较慢，可以增加等待时间：

```javascript
await page.waitForTimeout(2000);  // 增加到3000或更多
```
