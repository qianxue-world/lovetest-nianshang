import React from 'react';
import { AgePreferenceResult } from '../types';
import './ResultScreen.css';

interface ResultScreenProps {
  result: AgePreferenceResult;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result }) => {
  const getGradientColor = (score: number) => {
    if (score <= 20) {
      return 'linear-gradient(135deg, #FFB6D9 0%, #FF8BA7 100%)'; // 浅粉 - 年下
    } else if (score <= 40) {
      return 'linear-gradient(135deg, #FF8BA7 0%, #FF6B9D 100%)'; // 粉色 - 偏年下
    } else if (score <= 60) {
      return 'linear-gradient(135deg, #FF6B9D 0%, #F06292 100%)'; // 玫瑰粉 - 同龄
    } else if (score <= 80) {
      return 'linear-gradient(135deg, #F06292 0%, #E91E63 100%)'; // 玫瑰红 - 偏年上
    } else {
      return 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)'; // 深玫瑰红 - 年上
    }
  };

  const getLevelText = (level: AgePreferenceResult['level']) => {
    const levelMap = {
      'extreme_younger': '极度年下控',
      'younger': '偏好年下',
      'same_age': '同龄最佳',
      'older': '偏好年上',
      'extreme_older': '极度年上控'
    };
    return levelMap[level];
  };

  const gradient = getGradientColor(result.score);

  return (
    <div className="result-screen age-preference">
      {/* 大爱心展示 */}
      <div className="heart-container">
        <svg className="heart-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: gradient.match(/#[0-9A-F]{6}/gi)?.[0] || '#FF6B9D' }} />
              <stop offset="100%" style={{ stopColor: gradient.match(/#[0-9A-F]{6}/gi)?.[1] || '#C8A2FF' }} />
            </linearGradient>
          </defs>
          <path
            d="M100,170 C100,170 30,120 30,80 C30,60 45,45 65,45 C80,45 90,55 100,70 C110,55 120,45 135,45 C155,45 170,60 170,80 C170,120 100,170 100,170 Z"
            fill="url(#heartGradient)"
            className="heart-path"
          />
        </svg>
        <div className="score-overlay">
          <div className="score-number">{result.score}</div>
          <div className="score-label">{getLevelText(result.level)}</div>
        </div>
      </div>

      {/* 分数说明 */}
      <div className="score-explanation">
        <div className="score-scale">
          <div className="scale-item">
            <div className="scale-dot" style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8BA7 100%)' }}></div>
            <span>0 - 极度年下</span>
          </div>
          <div className="scale-item">
            <div className="scale-dot" style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #F06292 100%)' }}></div>
            <span>50 - 同龄</span>
          </div>
          <div className="scale-item">
            <div className="scale-dot" style={{ background: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' }}></div>
            <span>100 - 极度年上</span>
          </div>
        </div>
      </div>

      {/* 结果描述 */}
      <div className="result-description">
        <h2 className="result-title">
          💕 你的年龄偏好 💕
        </h2>
        <p className="result-text">{result.description}</p>
        
        {/* 详细解读 */}
        <div className="detailed-analysis">
          <h3 className="analysis-title">💡 这意味着什么？</h3>
          <div className="analysis-content">
            {result.score <= 20 && (
              <>
                <p>🌟 你享受在关系中的主导地位，喜欢照顾和引导对方</p>
                <p>💫 年轻的活力和新鲜感对你来说非常重要</p>
                <p>🎯 你可能更喜欢被崇拜和依赖的感觉</p>
              </>
            )}
            {result.score > 20 && result.score <= 40 && (
              <>
                <p>🌟 你喜欢轻松自在的相处模式，不喜欢太多压力</p>
                <p>💫 和对方一起成长的过程让你感到快乐</p>
                <p>🎯 你欣赏年轻带来的活力和可塑性</p>
              </>
            )}
            {result.score > 40 && result.score <= 60 && (
              <>
                <p>🌟 你重视平等和相互理解的关系</p>
                <p>💫 共同的经历和话题让你们更容易产生共鸣</p>
                <p>🎯 你喜欢势均力敌、共同成长的感觉</p>
              </>
            )}
            {result.score > 60 && result.score <= 80 && (
              <>
                <p>🌟 你欣赏成熟带来的稳重和可靠</p>
                <p>💫 你希望对方能给你一定的指导和支持</p>
                <p>🎯 但你也重视平等，不希望被过度保护</p>
              </>
            )}
            {result.score > 80 && (
              <>
                <p>🌟 你深深被成熟稳重的魅力所吸引</p>
                <p>💫 你渴望被照顾、被宠爱的安全感</p>
                <p>🎯 人生阅历和经验对你来说是重要的吸引力</p>
              </>
            )}
          </div>
        </div>

        {/* 建议 */}
        <div className="suggestions">
          <h3 className="suggestions-title">💝 给你的小建议</h3>
          <div className="suggestions-content">
            {result.score <= 30 && (
              <p>记得在关系中也要给对方成长的空间，不要过度主导哦～ 平等的关系会让你们都更快乐！</p>
            )}
            {result.score > 30 && result.score <= 70 && (
              <p>你的偏好很健康！记得在关系中保持沟通，互相理解和尊重是最重要的～</p>
            )}
            {result.score > 70 && (
              <p>被照顾的感觉很好，但也要记得保持自己的独立性哦～ 健康的关系是相互支持而不是单方面依赖！</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
