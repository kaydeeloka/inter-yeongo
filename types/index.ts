export interface Avatar {
  id: string;
  name: string;
  color: string;
  accessory: string;
  desc: string;
  image: string;
}

export interface Expression {
  id: number;
  en: string;
  kr: string;
  rom: string;
  track: 'DAILY' | 'TRAVEL';
  cat: string;
}
