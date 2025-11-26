export interface Question {
  question: string;
  options: Option[];
}

export interface Option {
  text: string;
  score: number; // 分数：-2(极度年下), -1(年下), 0(同龄), 1(年上), 2(极度年上)
}

export interface AgePreferenceResult {
  score: number; // 0-100的分数
  level: 'extreme_younger' | 'younger' | 'same_age' | 'older' | 'extreme_older';
  description: string;
}
