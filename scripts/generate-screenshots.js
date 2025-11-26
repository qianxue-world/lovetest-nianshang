#!/usr/bin/env node

/**
 * 年龄偏好测试截图生成脚本
 * 
 * 功能：
 * 1. 启动开发服务器
 * 2. 生成20个不同分数的测试报告截图
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

// 生成20个测试分数 (0-100)
const testScores = [
  0, 5, 10, 15, 20,      // 极度年下
  25, 30, 35, 40,        // 偏年下
  45, 50, 55,            // 同龄
  60, 65, 70, 75,        // 偏年上
  80, 85, 90, 95, 100    // 极度年上
];

// 分数对应的标签
const getScoreLabel = (score) => {
  if (score <= 20) return '极度年下';
  if (score <= 40) return '偏年下';
  if (score <= 60) return '同龄';
  if (score <= 80) return '偏年上';
  return '极度年上';
};

// 创建screenshots文件夹
const screenshotsDir = path.join(path.dirname(__dirname), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function generateScreenshots() {
  console.log('🚀 启动截图生成器...\n');
  console.log(`📊 将生成 ${testScores.length} 个不同分数的测试报告\n`);
  
  const browser = await puppeteer.launch({
    headless: 'false',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    let count = 0;
    for (const score of testScores) {
      count++;
      const label = getScoreLabel(score);
      console.log(`📸 [${count}/${testScores.length}] 正在生成分数 ${score} (${label}) 的截图...`);
      
      const page = await browser.newPage();
      
      // 设置视口大小
      await page.setViewport({
        width: 1200,
        height: 2400,
        deviceScaleFactor: 2 // 高清截图
      });

      // 访问结果页，添加测试模式参数
      const url = `http://localhost:5173/?test=true&score=${score}`;
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // 等待页面完全加载
      await page.waitForSelector('.result-screen', { timeout: 10000 });
      
      // 额外等待动画完成
      await page.waitForTimeout(2000);

      // 截图
      const screenshotPath = path.join(screenshotsDir, `score-${score.toString().padStart(3, '0')}-${label}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      console.log(`✅ 分数 ${score} 截图已保存`);
      
      await page.close();
      
      // 短暂延迟，避免过快
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 所有截图生成完成！');
    console.log(`📁 截图保存位置: ${screenshotsDir}`);
    console.log(`📊 共生成 ${testScores.length} 张截图`);
    
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
