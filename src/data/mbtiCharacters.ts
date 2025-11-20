// MBTI 角色图标配置
// 每个性格类型对应一个独特的emoji角色

export const mbtiCharacters: Record<string, string> = {
  // 分析家组 (Analysts)
  'INTJ': '🧙‍♂️', // 建筑师 - 智慧的巫师
  'INTP': '🤓',   // 逻辑学家 - 思考的学者
  'ENTJ': '👔',   // 指挥官 - 商务领袖
  'ENTP': '🎭',   // 辩论家 - 戏剧面具

  // 外交家组 (Diplomats)
  'INFJ': '🦉',   // 提倡者 - 智慧的猫头鹰
  'INFP': '🦄',   // 调停者 - 梦幻独角兽
  'ENFJ': '🌟',   // 主人公 - 闪耀之星
  'ENFP': '🎨',   // 竞选者 - 创意调色板

  // 守护者组 (Sentinels)
  'ISTJ': '📋',   // 物流师 - 清单管理者
  'ISFJ': '🛡️',   // 守卫者 - 保护盾牌
  'ESTJ': '⚖️',   // 执行者 - 正义天平
  'ESFJ': '🤝',   // 执政官 - 握手合作

  // 探险家组 (Explorers)
  'ISTP': '🔧',   // 鉴赏家 - 工具大师
  'ISFP': '🎵',   // 探险家 - 音乐艺术
  'ESTP': '🏃',   // 企业家 - 行动派
  'ESFP': '🎉',   // 表演者 - 派对明星
};

// MBTI 角色颜色主题
export const mbtiColors: Record<string, { primary: string; secondary: string; gradient: string }> = {
  // 分析家组 - 紫色系
  'INTJ': { primary: '#9D5BD2', secondary: '#7B3FA8', gradient: 'linear-gradient(135deg, #9D5BD2 0%, #7B3FA8 100%)' },
  'INTP': { primary: '#B47AEA', secondary: '#9D5BD2', gradient: 'linear-gradient(135deg, #B47AEA 0%, #9D5BD2 100%)' },
  'ENTJ': { primary: '#7B3FA8', secondary: '#5A2D7A', gradient: 'linear-gradient(135deg, #7B3FA8 0%, #5A2D7A 100%)' },
  'ENTP': { primary: '#C8A2FF', secondary: '#B47AEA', gradient: 'linear-gradient(135deg, #C8A2FF 0%, #B47AEA 100%)' },

  // 外交家组 - 绿色/青色系
  'INFJ': { primary: '#4ECDC4', secondary: '#3BA89F', gradient: 'linear-gradient(135deg, #4ECDC4 0%, #3BA89F 100%)' },
  'INFP': { primary: '#6BCF7F', secondary: '#4ECDC4', gradient: 'linear-gradient(135deg, #6BCF7F 0%, #4ECDC4 100%)' },
  'ENFJ': { primary: '#44A8FF', secondary: '#3B8FDB', gradient: 'linear-gradient(135deg, #44A8FF 0%, #3B8FDB 100%)' },
  'ENFP': { primary: '#FFD93D', secondary: '#FFC107', gradient: 'linear-gradient(135deg, #FFD93D 0%, #FFC107 100%)' },

  // 守护者组 - 蓝色系
  'ISTJ': { primary: '#3B8FDB', secondary: '#2E72B0', gradient: 'linear-gradient(135deg, #3B8FDB 0%, #2E72B0 100%)' },
  'ISFJ': { primary: '#5BA3E0', secondary: '#3B8FDB', gradient: 'linear-gradient(135deg, #5BA3E0 0%, #3B8FDB 100%)' },
  'ESTJ': { primary: '#2E72B0', secondary: '#1F5080', gradient: 'linear-gradient(135deg, #2E72B0 0%, #1F5080 100%)' },
  'ESFJ': { primary: '#44A8FF', secondary: '#5BA3E0', gradient: 'linear-gradient(135deg, #44A8FF 0%, #5BA3E0 100%)' },

  // 探险家组 - 橙色/红色系
  'ISTP': { primary: '#FFA07A', secondary: '#FF8C5A', gradient: 'linear-gradient(135deg, #FFA07A 0%, #FF8C5A 100%)' },
  'ISFP': { primary: '#FF8BA7', secondary: '#FF6B9D', gradient: 'linear-gradient(135deg, #FF8BA7 0%, #FF6B9D 100%)' },
  'ESTP': { primary: '#FF4757', secondary: '#E03A48', gradient: 'linear-gradient(135deg, #FF4757 0%, #E03A48 100%)' },
  'ESFP': { primary: '#FF6B9D', secondary: '#FF4757', gradient: 'linear-gradient(135deg, #FF6B9D 0%, #FF4757 100%)' },
};

// MBTI 角色描述标签
export const mbtiTags: Record<string, string[]> = {
  'INTJ': ['战略家', '独立思考', '高效执行'],
  'INTP': ['逻辑大师', '好奇探索', '理论创新'],
  'ENTJ': ['天生领袖', '果断决策', '目标导向'],
  'ENTP': ['思维敏捷', '创新求变', '辩论高手'],
  
  'INFJ': ['理想主义', '洞察人心', '富有同情'],
  'INFP': ['真诚善良', '追求意义', '创意无限'],
  'ENFJ': ['魅力领袖', '激励他人', '和谐共处'],
  'ENFP': ['热情洋溢', '充满活力', '社交达人'],
  
  'ISTJ': ['可靠负责', '注重细节', '遵守规则'],
  'ISFJ': ['温暖体贴', '默默付出', '忠诚守护'],
  'ESTJ': ['组织能力', '实事求是', '高效管理'],
  'ESFJ': ['热心助人', '善于社交', '团队协作'],
  
  'ISTP': ['动手能力', '冷静分析', '灵活应变'],
  'ISFP': ['艺术天赋', '活在当下', '温柔敏感'],
  'ESTP': ['行动派', '冒险精神', '应变能力'],
  'ESFP': ['娱乐大师', '乐观开朗', '享受生活'],
};
