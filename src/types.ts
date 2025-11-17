export interface Question {
  question: string;
  options: Option[];
}

export interface Option {
  text: string;
  trait: Trait;
}

export type Trait = 'E' | 'I' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P';

export type PersonalityType = 
  | 'ESTJ' | 'ESTP' | 'ESFJ' | 'ESFP'
  | 'ENTJ' | 'ENTP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISTP' | 'ISFJ' | 'ISFP'
  | 'INTJ' | 'INTP' | 'INFJ' | 'INFP';

export interface PersonalityInfo {
  name: string;
  description: string;
}

export interface Answers {
  E: number;
  I: number;
  N: number;
  S: number;
  T: number;
  F: number;
  J: number;
  P: number;
}
