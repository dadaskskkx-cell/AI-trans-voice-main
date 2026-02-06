export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface VideoSample {
  id: string;
  title: string;
  originalSrc: string;
  dubbedSrc: string;
  language: 'EN' | 'JP' | 'ES';
}

export interface FormData {
  nickname: string;
  contact: string;
  company: string;
  requirements: string;
}

export interface ProductModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: any;
}

export interface VoiceCharacter {
  id: string;
  name: string;
  archetype: string;
  tags: string[];
  avatar: string;
}

export enum ModalState {
  CLOSED,
  OPEN,
  SUBMITTING,
  SUCCESS,
  ERROR
}