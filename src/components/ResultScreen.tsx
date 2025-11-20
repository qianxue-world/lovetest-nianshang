import React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalityType } from '../types';
import { mbtiCharacters, mbtiColors, mbtiTags } from '../data/mbtiCharacters';
import './ResultScreen.css';

interface ResultScreenProps {
  personalityType: PersonalityType;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  personalityType,
  onRestart,
}) => {
  const { t } = useTranslation();
  
  const traits = personalityType.split('') as Array<'E' | 'I' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P'>;
  const character = mbtiCharacters[personalityType] || '🎭';
  const colors = mbtiColors[personalityType] || { primary: '#FF6B9D', secondary: '#C8A2FF', gradient: 'linear-gradient(135deg, #FF6B9D 0%, #C8A2FF 100%)' };
  const tags = mbtiTags[personalityType] || [];

  return (
    <div className="result-screen">
      <h1>{t('result.title')}</h1>
      
      {/* 角色展示区 */}
      <div className="character-showcase" style={{ background: colors.gradient }}>
        <div className="character-icon">{character}</div>
        <div className="result-type-large">{personalityType}</div>
      </div>

      {/* 性格标签 */}
      <div className="personality-tags">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="tag"
            style={{ 
              background: colors.gradient,
              boxShadow: `0 2px 10px ${colors.primary}40`
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 性格描述 */}
      <div className="result-description">
        <h3 className="personality-name" style={{ color: colors.primary }}>
          {t(`personalities.${personalityType}.name`)}
        </h3>
        <p className="personality-desc">{t(`personalities.${personalityType}.description`)}</p>
        
        {/* 特质详情 */}
        <div className="traits-section">
          <h3 className="section-title">{t('result.yourTraits')}</h3>
          <div className="traits-grid">
            {traits.map((trait, index) => (
              <div key={index} className="trait-card">
                <div className="trait-header">
                  <span className="trait-letter" style={{ color: colors.primary }}>{trait}</span>
                  <span className="trait-name">{t(`traits.${trait}.name`)}</span>
                </div>
                <p className="trait-desc">{t(`traits.${trait}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn" onClick={onRestart} style={{ background: colors.gradient }}>
        {t('result.button')}
      </button>
    </div>
  );
};
