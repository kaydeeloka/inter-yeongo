import type { Expression } from '@/types';

export const CATEGORIES: Record<string, string[]> = {
  DAILY: ['일상 대화', '오피스/학업', '날씨/시간', '감정 표현', '집/가정'],
  TRAVEL: ['공항/교통', '호텔/숙박', '식당/카페', '쇼핑/세금', '박물관/역사', '공원/산책'],
};

export const EXPRESSIONS: Expression[] = [
  { id: 1, en: "How's your semester going?", kr: '이번 학기 어때요?', rom: '하우즈 유어 세메스터 고잉?', track: 'DAILY', cat: '오피스/학업' },
  { id: 2, en: "I'm totally burnt out.", kr: '완전 번아웃 왔어요.', rom: '아임 토탈리 번트 아웃.', track: 'DAILY', cat: '감정 표현' },
  { id: 3, en: "Let's grab a beer tonight.", kr: '오늘 밤에 맥주 한잔해요.', rom: '렛츠 그랩 어 비어 투나잇.', track: 'DAILY', cat: '일상 대화' },
  { id: 4, en: 'Could you repeat that?', kr: '다시 말씀해 주실래요?', rom: '쿠쥬 리피트 댓?', track: 'DAILY', cat: '일상 대화' },
  { id: 5, en: 'I have a presentation tomorrow.', kr: '내일 발표가 있어요.', rom: '아이 해브 어 프레젠테이션 투모로우.', track: 'DAILY', cat: '오피스/학업' },
  { id: 6, en: 'Is there a student discount?', kr: '학생 할인 되나요?', rom: '이즈 데어 어 스튜던트 디스카운트?', track: 'TRAVEL', cat: '쇼핑/세금' },
  { id: 7, en: "I'm looking for a study group.", kr: '스터디 그룹을 찾고 있어요.', rom: '아임 루킹 포 어 스터디 그룹.', track: 'DAILY', cat: '오피스/학업' },
  { id: 8, en: 'Can I get a refill, please?', kr: '리필 좀 해주실래요?', rom: '캔 아이 겟 어 리필 플리즈?', track: 'TRAVEL', cat: '식당/카페' },
  { id: 9, en: 'Where is the nearest subway station?', kr: '가장 가까운 지하철역이 어디인가요?', rom: '웨어 이즈 더 니어리스트 서브웨이 스테이션?', track: 'TRAVEL', cat: '공항/교통' },
  { id: 10, en: "I'd like to check out.", kr: '체크아웃 할게요.', rom: '아이드 라이크 투 체크 아웃.', track: 'TRAVEL', cat: '호텔/숙박' },
];
