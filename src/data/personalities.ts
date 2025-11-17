import { PersonalityType, PersonalityInfo } from '../types';

export const personalities: Record<PersonalityType, PersonalityInfo> = {
  "ESTJ": { name: "The Executive", description: "Organized, practical, and decisive. You excel at managing tasks and leading teams." },
  "ESTP": { name: "The Entrepreneur", description: "Energetic, perceptive, and spontaneous. You thrive on action and new experiences." },
  "ESFJ": { name: "The Consul", description: "Caring, social, and organized. You value harmony and helping others." },
  "ESFP": { name: "The Entertainer", description: "Outgoing, friendly, and spontaneous. You love being the center of attention." },
  "ENTJ": { name: "The Commander", description: "Bold, strategic, and strong-willed. You're a natural leader who loves challenges." },
  "ENTP": { name: "The Debater", description: "Quick-witted, innovative, and curious. You enjoy intellectual debates and new ideas." },
  "ENFJ": { name: "The Protagonist", description: "Charismatic, inspiring, and empathetic. You're passionate about helping others grow." },
  "ENFP": { name: "The Campaigner", description: "Enthusiastic, creative, and sociable. You see life as full of possibilities." },
  "ISTJ": { name: "The Logistician", description: "Practical, fact-minded, and reliable. You value tradition and order." },
  "ISTP": { name: "The Virtuoso", description: "Bold, practical, and experimental. You're a master of tools and techniques." },
  "ISFJ": { name: "The Defender", description: "Dedicated, warm, and protective. You're always ready to defend loved ones." },
  "ISFP": { name: "The Adventurer", description: "Flexible, charming, and artistic. You live in the moment and appreciate beauty." },
  "INTJ": { name: "The Architect", description: "Imaginative, strategic, and determined. You love developing innovative solutions." },
  "INTP": { name: "The Logician", description: "Innovative, curious, and analytical. You're always seeking to understand the world." },
  "INFJ": { name: "The Advocate", description: "Idealistic, organized, and insightful. You're driven by your values and vision." },
  "INFP": { name: "The Mediator", description: "Idealistic, loyal, and empathetic. You're guided by your values and seek harmony." }
};
