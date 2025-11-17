import React from 'react';
import { useTranslation } from 'react-i18next';
import { PersonalityType } from '../types';
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

  return (
    <div className="result-screen">
      <h1>{t('result.title')}</h1>
      <div className="result-type">{personalityType}</div>
      <div className="result-description">
        <h3>{t(`personalities.${personalityType}.name`)}</h3>
        <p>{t(`personalities.${personalityType}.description`)}</p>
        <h3>{t('result.yourTraits')}</h3>
        {traits.map((trait, index) => (
          <p key={index}>
            <strong>{t(`traits.${trait}.name`)}</strong> - {t(`traits.${trait}.description`)}
            {index < traits.length - 1 && <><br /><br /></>}
          </p>
        ))}
      </div>
      <button className="btn" onClick={onRestart}>
        {t('result.button')}
      </button>
    </div>
  );
};
