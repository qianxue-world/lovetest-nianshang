import React from 'react';
import { useTranslation } from 'react-i18next';
import './PaymentMethodModal.css';

interface PaymentMethodModalProps {
  plan: 'basic' | 'professional' | 'premium';
  price: string;
  onSelectMethod: (method: 'wechat' | 'alipay') => void;
  onClose: () => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  plan,
  price,
  onSelectMethod,
  onClose,
}) => {
  const { t } = useTranslation();

  const planNames = {
    basic: t('payment.basicTitle'),
    professional: t('payment.professionalTitle'),
    premium: t('payment.premiumTitle'),
  };

  return (
    <div className="method-modal-overlay" onClick={onClose}>
      <div className="method-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2 className="method-title">{t('paymentMethod.title')}</h2>
        <div className="selected-plan">
          <span className="plan-name">{planNames[plan]}</span>
          <span className="plan-price">¥{price}</span>
        </div>

        <p className="method-subtitle">{t('paymentMethod.subtitle')}</p>

        <div className="method-options">
          <button 
            className="method-btn wechat-btn"
            onClick={() => onSelectMethod('wechat')}
          >
            <div className="method-icon wechat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
            </div>
            <div className="method-info">
              <div className="method-name">{t('payment.wechat')}</div>
              <div className="method-desc">{t('paymentMethod.wechatDesc')}</div>
            </div>
          </button>

          <button 
            className="method-btn alipay-btn"
            onClick={() => onSelectMethod('alipay')}
          >
            <div className="method-icon alipay-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.86 8.71c-.193-.41-.398-.826-.602-1.244-.203-.418-.41-.838-.617-1.26-.207-.422-.414-.846-.617-1.273-.203-.427-.398-.857-.586-1.29h3.305c.188.433.383.863.586 1.29.203.427.41.85.617 1.273.207.422.414.842.617 1.26.204.418.41.834.602 1.244h3.305c-.192-.41-.398-.826-.602-1.244-.203-.418-.41-.838-.617-1.26-.207-.422-.414-.846-.617-1.273-.203-.427-.398-.857-.586-1.29h3.305c.188.433.383.863.586 1.29.203.427.41.85.617 1.273.207.422.414.842.617 1.26.204.418.41.834.602 1.244h3.305c-.192-.41-.398-.826-.602-1.244-.203-.418-.41-.838-.617-1.26-.207-.422-.414-.846-.617-1.273-.203-.427-.398-.857-.586-1.29h3.305c.188.433.383.863.586 1.29.203.427.41.85.617 1.273.207.422.414.842.617 1.26.204.418.41.834.602 1.244H24v2.344H0V8.71h6.86zm10.078 6.328c-1.688 0-3.055 1.367-3.055 3.055s1.367 3.055 3.055 3.055 3.055-1.367 3.055-3.055-1.367-3.055-3.055-3.055zm0 4.922c-1.031 0-1.867-.836-1.867-1.867s.836-1.867 1.867-1.867 1.867.836 1.867 1.867-.836 1.867-1.867 1.867z"/>
              </svg>
            </div>
            <div className="method-info">
              <div className="method-name">{t('payment.alipay')}</div>
              <div className="method-desc">{t('paymentMethod.alipayDesc')}</div>
            </div>
          </button>
        </div>

        <div className="method-note">
          <p>{t('paymentMethod.note')}</p>
        </div>
      </div>
    </div>
  );
};
