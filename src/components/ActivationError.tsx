import React from 'react';
import { useTranslation } from 'react-i18next';
import './ActivationError.css';

interface ActivationErrorProps {
  message: string;
  code?: string;
}

export const ActivationError: React.FC<ActivationErrorProps> = ({ code }) => {
  const { t } = useTranslation();

  return (
    <div className="activation-error-overlay">
      <div className="activation-error-modal">
        <div className="promo-icon">🎁</div>
        <h2 className="promo-title">{t('activation.promoTitle')}</h2>
        <p className="promo-message">{t('activation.promoMessage')}</p>
        
        <div className="promo-highlight">
          <div className="highlight-icon">📱</div>
          <div className="highlight-content">
            <h3>{t('activation.followTitle')}</h3>
            <p className="xiaohongshu-account">
              <span className="platform-name">小红书</span>
              <span className="account-name">@潜学天下</span>
            </p>
          </div>
        </div>

        <div className="promo-features">
          <div className="feature-item">
            <span className="feature-icon">✨</span>
            <span className="feature-text">{t('activation.feature1')}</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">{t('activation.feature2')}</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎉</span>
            <span className="feature-text">{t('activation.feature3')}</span>
          </div>
        </div>

        {code && (
          <div className="error-code-info">
            <p className="code-hint">{t('activation.codeHint')}</p>
            <div className="error-code">
              <span className="error-code-label">{t('activation.codeLabel')}:</span>
              <span className="error-code-value">{code}</span>
            </div>
          </div>
        )}

        <div className="promo-footer">
          <p className="footer-text">{t('activation.footerText')}</p>
        </div>
      </div>
    </div>
  );
};
