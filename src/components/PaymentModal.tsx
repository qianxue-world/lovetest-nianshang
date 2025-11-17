import React from 'react';
import { useTranslation } from 'react-i18next';
import './PaymentModal.css';

interface PaymentModalProps {
  onSelectPlan: (plan: 'basic' | 'professional' | 'premium') => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onSelectPlan }) => {
  const { t } = useTranslation();

  return (
    <div className="modal-overlay">
      <div className="payment-modal">
        <h2 className="modal-title">{t('payment.title')}</h2>
        <p className="modal-subtitle">{t('payment.subtitle')}</p>

        <div className="plans-container">
          {/* Basic Plan */}
          <div className="plan-card basic">
            <div className="plan-badge">{t('payment.mostPopular')}</div>
            <h3>{t('payment.basicTitle')}</h3>
            <div className="price-section">
              <span className="original-price">¥19.9</span>
              <span className="current-price">¥0.1</span>
            </div>
            <ul className="features-list">
              <li>✓ {t('payment.basicFeature1')}</li>
              <li>✓ {t('payment.basicFeature2')}</li>
              <li>✓ {t('payment.basicFeature3')}</li>
            </ul>
            <button 
              className="select-btn basic-btn"
              onClick={() => onSelectPlan('basic')}
            >
              {t('payment.selectButton')}
            </button>
          </div>

          {/* Professional Plan */}
          <div className="plan-card professional">
            <div className="plan-badge recommended">{t('payment.recommended')}</div>
            <h3>{t('payment.professionalTitle')}</h3>
            <div className="price-section">
              <span className="original-price">¥69</span>
              <span className="current-price">¥19.9</span>
            </div>
            <ul className="features-list">
              <li>✓ {t('payment.professionalFeature1')}</li>
              <li>✓ {t('payment.professionalFeature2')}</li>
              <li>✓ {t('payment.professionalFeature3')}</li>
              <li>✓ {t('payment.professionalFeature4')}</li>
            </ul>
            <button 
              className="select-btn professional-btn"
              onClick={() => onSelectPlan('professional')}
            >
              {t('payment.selectButton')}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="plan-card premium">
            <div className="plan-badge vip">{t('payment.vip')}</div>
            <h3>{t('payment.premiumTitle')}</h3>
            <div className="price-section">
              <span className="original-price">¥1299</span>
              <span className="current-price">¥199</span>
            </div>
            <ul className="features-list">
              <li>✓ {t('payment.premiumFeature1')}</li>
              <li>✓ {t('payment.premiumFeature2')}</li>
              <li>✓ {t('payment.premiumFeature3')}</li>
              <li>✓ {t('payment.premiumFeature4')}</li>
              <li>✓ {t('payment.premiumFeature5')}</li>
            </ul>
            <button 
              className="select-btn premium-btn"
              onClick={() => onSelectPlan('premium')}
            >
              {t('payment.selectButton')}
            </button>
          </div>
        </div>

        <div className="payment-footer">
          <div className="creator-badge">
            <span className="creator-name">@潜学天下</span>
            <span className="creator-separator">·</span>
            <span className="creator-label">{t('payment.originalCreator')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
