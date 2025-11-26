import React from 'react';
import './StartScreen.css';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>💕 年上年下偏好测试 💕</h1>
      
      <div className="intro-section">
        <h2>你是年上控还是年下控？</h2>
        <p className="intro-text">
          通过20道精心设计的生活场景题目，深入了解你在恋爱关系中的年龄偏好。
          从安全感、相处模式到生活方式，全方位分析你的真实想法！
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">💝</div>
          <h3>真实场景</h3>
          <p>基于年轻女性的真实生活场景，从安全感、相处模式等多维度分析</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💖</div>
          <h3>精准分析</h3>
          <p>0-100分精准量化，清晰展示你的年龄偏好程度</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💗</div>
          <h3>深度解读</h3>
          <p>不仅告诉你结果，更帮你理解背后的心理原因</p>
        </div>
      </div>

      <div className="original-badge">
        <div className="badge-icon">✨</div>
        <div className="badge-content">
          <strong>测试说明</strong>
          <p>请根据你的真实想法选择，没有对错之分，只有最适合你的答案～</p>
        </div>
      </div>

      <div className="btn" onClick={onStart}>
        <p>开始测试 💕</p>
      </div>
    </div>
  );
};
