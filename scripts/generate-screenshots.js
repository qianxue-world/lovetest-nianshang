#!/usr/bin/env node

/**
 * MBTI截图生成脚本
 * 
 * 功能：
 * 1. 启动开发服务器
 * 2. 为所有16种MBTI类型生成结果页截图
 * 3. 保存到screenshots文件夹
 * 
 * 使用方法：
 * npm run screenshot
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 所有16种MBTI类型
const mbtiTypes = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISTP', 'ESTJ', 'ESTP',
  'ISFJ', 'ISFP', 'ESFJ', 'ESFP'
];

// 创建screenshots文件夹
const screenshotsDir = path.join(path.dirname(__dirname), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function generateScreenshots() {
  console.log('🚀 启动截图生成器...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const type of mbtiTypes) {
      console.log(`📸 正在生成 ${type} 的截图...`);
      
      const page = await browser.newPage();
      
      // 设置视口大小
      await page.setViewport({
        width: 1200,
        height: 2400,
        deviceScaleFactor: 2 // 高清截图
      });

      // 访问结果页，添加测试模式参数
      const url = `http://localhost:5173/?test=true&type=${type}`;
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // 等待页面完全加载
      await page.waitForSelector('.result-screen', { timeout: 10000 });
      
      // 额外等待动画完成
      await page.waitForTimeout(2000);

      // 截图
      const screenshotPath = path.join(screenshotsDir, `${type}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`✅ ${type} 截图已保存: ${screenshotPath}`);
      
      await page.close();
      
      // 短暂延迟，避免过快
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 所有截图生成完成！');
    console.log(`📁 截图保存位置: ${screenshotsDir}`);
    
  } catch (error) {
    console.error('❌ 生成截图时出错:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// 检查开发服务器是否运行
async function checkServer() {
  try {
    const response = await fetch('http://localhost:5173');
    return response.ok;
  } catch {
    return false;
  }
}

// 主函数
async function main() {
  console.log('🔍 检查开发服务器...');
  
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ 开发服务器未运行！');
    console.log('💡 请先运行: npm run dev');
    console.log('💡 然后在另一个终端运行: npm run screenshot');
    process.exit(1);
  }

  console.log('✅ 开发服务器正在运行\n');
  
  await generateScreenshots();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
