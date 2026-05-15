export type SpeakingCategoryId =
  | 'cafe'
  | 'convenience'
  | 'class'
  | 'date'
  | 'shopping';

export type SpeakingDifficulty = 'easy' | 'medium' | 'hard';

export interface SpeakingChallenge {
  id: string;
  categoryId: SpeakingCategoryId;
  sentence: string;
  korean: string;
  nativeTip: string;
  passFeedback: string;
  failFeedback: string;
  difficulty: SpeakingDifficulty;
}

export interface SpeakingCategory {
  id: SpeakingCategoryId;
  label: string;
  labelKo: string;
}

export const SPEAKING_CATEGORIES: SpeakingCategory[] = [
  { id: 'cafe', label: 'Cafe Conversation', labelKo: '카페 대화' },
  { id: 'convenience', label: 'Convenience Store', labelKo: '편의점' },
  { id: 'class', label: 'Class / Professor', labelKo: '수업·교수님' },
  { id: 'date', label: 'Date', labelKo: '데이트' },
  { id: 'shopping', label: 'Shopping', labelKo: '쇼핑' },
];

export const SPEAKING_CHALLENGES: SpeakingChallenge[] = [
  {
    id: 'cafe-1',
    categoryId: 'cafe',
    sentence: 'Less ice, please.',
    korean: '얼음 적게 주세요.',
    nativeTip: '짧게 “Less ice, please.” 한 번에 끝내면 카페 톤이 살아요.',
    passFeedback: '깔끔해요. 바리스타가 바로 컵 잡을 듯.',
    failFeedback: '얼음 키워드가 흐릿했어요. “less ice”만 또렷하게!',
    difficulty: 'easy',
  },
  {
    id: 'cafe-2',
    categoryId: 'cafe',
    sentence: 'Is Wi-Fi working?',
    korean: '와이파이 되나요?',
    nativeTip: '“working?”만 붙여도 자연스러운 확인 질문이에요.',
    passFeedback: '과제 체력 회복용 질문, 전달 잘 됐어요.',
    failFeedback: 'Wi‑Fi 쪽 발음이 묻혔어요. “Wi‑Fi working”만 다시!',
    difficulty: 'easy',
  },
  {
    id: 'cafe-3',
    categoryId: 'cafe',
    sentence: 'Can I sit here?',
    korean: '여기 앉아도 돼요?',
    nativeTip: '자리 확인은 짧게 물어볼수록 부담이 적어요.',
    passFeedback: '예의 있게 짧게—좋은 캠퍼스 영어예요.',
    failFeedback: '“sit here” 리듬이 어긋났어요. 세 단어만 천천히!',
    difficulty: 'easy',
  },
  {
    id: 'cafe-4',
    categoryId: 'cafe',
    sentence: 'No whipped cream, please.',
    korean: '휘핑크림 빼주세요.',
    nativeTip: '“No whipped cream” + please면 딱이에요.',
    passFeedback: '주문 수정 멘트, 명확했어요.',
    failFeedback: '“whipped cream”이 뭉개졌어요. 그 두 단어만 집중!',
    difficulty: 'medium',
  },
  {
    id: 'cafe-5',
    categoryId: 'cafe',
    sentence: 'Is the new drink tasty?',
    korean: '새 음료 맛있어요?',
    nativeTip: '유머는 “tasty” 톤만 살리면 과하지 않아요.',
    passFeedback: '드립이 과하지 않게 박혔어요. 공감 버튼.',
    failFeedback: '“tasty”가 흐릿했어요. 재미 포인트만 한 번 더!',
    difficulty: 'medium',
  },
  {
    id: 'conv-1',
    categoryId: 'convenience',
    sentence: 'Is this one plus one?',
    korean: '이거 원플러스원인가요?',
    nativeTip: '행사 이름은 “one plus one” 그대로 말해도 통해요.',
    passFeedback: '행사 확인, 짧고 선명했어요.',
    failFeedback: '“one plus one”이 불안정했어요. 숫자 리듬만 다시!',
    difficulty: 'easy',
  },
  {
    id: 'conv-2',
    categoryId: 'convenience',
    sentence: 'Please give me a pack of cigarettes.',
    korean: '담배 한 팩 주세요.',
    nativeTip: '“give me a pack of cigarettes”가 기본적인 요청 표현이에요.',
    passFeedback: '편의점 직원이 바로 담배 향하는 타입.',
    failFeedback: '“cigarettes”가 흐릿했어요. 그 단어만 또렷하게!',
    difficulty: 'easy',
  },
  {
    id: 'conv-3',
    categoryId: 'convenience',
    sentence: 'Can I charge my phone?',
    korean: '핸드폰 충전해도 될까요?',
    nativeTip: '짧게 물으면 부담이 줄어요.',
    passFeedback: '부탁 톤 딱 좋아요.',
    failFeedback: '“charge my phone”이 흐릿했어요. 그 구간만 다시!',
    difficulty: 'easy',
  },
  {
    id: 'conv-4',
    categoryId: 'convenience',
    sentence: 'Please give me chopsticks as well.',
    korean: '젓가락도 주세요.',
    nativeTip: '“as well”가 추가 요청의 핵심이에요.',
    passFeedback: '추가 요청이 자연스러웠어요.',
    failFeedback: '“as well”가 흐릿했어요. 그 부분만 다시!',
    difficulty: 'medium',
  },
  {
    id: 'conv-5',
    categoryId: 'convenience',
    sentence: 'Do you happen to have any snacks in stock?',
    korean: '과자 재고 있나요?',
    nativeTip: '재고는 가볍게—진지하게 말하면 웃김이 줄어요.',
    passFeedback: '감정이 살아 있어요. 공감 개그 성공.',
    failFeedback: '“snacks”가 뭉개졌어요. 마지막 단어만 집중!',
    difficulty: 'medium',
  },
  {
    id: 'class-1',
    categoryId: 'class',
    sentence: 'My file got corrupted.',
    korean: '파일이 깨졌어요.',
    nativeTip: '“got corrupted”가 비상 상황에서 자주 써요.',
    passFeedback: '교수님 브리핑용으로 충분히 명확해요.',
    failFeedback: '“corrupted”가 흐릿했어요. 그 단어만 또렷하게!',
    difficulty: 'easy',
  },
  {
    id: 'class-2',
    categoryId: 'class',
    sentence: 'My teammate disappeared.',
    korean: '팀원이 사라졌어요.',
    nativeTip: '짧게 말할수록 진지함이 살아요.',
    passFeedback: '팀플 트라우마 한 줄 압축, 성공.',
    failFeedback: '“disappeared” 리듬이 어긋났어요. 다시 한 번!',
    difficulty: 'easy',
  },
  {
    id: 'class-3',
    categoryId: 'class',
    sentence: 'Oh, I failed the test.',
    korean: '시험에 떨어졌어요.',
    nativeTip: '“failed the test”가 실망을 잘 표현해요.',
    passFeedback: '실망을 자연스럽게 전달했어요.',
    failFeedback: '“failed”가 흐릿했어요. 그 단어만 또렷하게!',
    difficulty: 'medium',
  },
  {
    id: 'class-4',
    categoryId: 'class',
    sentence: ' Can I ask a question?',
    korean: '질문할 수 있을까요?',
    nativeTip: '사설은 빼고 "Can I...?"로 바로 본론을 꺼내는 게 훨씬 자연스러워요.',
    passFeedback: '군더더기 없는 깔끔한 질문이었어요. 의사전달 완벽합니다.',
    failFeedback: '말이 너무 길어지면 오히려 무거워져요. 핵심만 짧게 다시 말해볼까요?',
    difficulty: 'medium',
  },
  {
    id: 'class-5',
    categoryId: 'class',
    sentence: 'Can we move the presentation?',
    korean: '발표 미룰 수 있을까요?',
    nativeTip: '“move the presentation”이 핵심 표현이에요.',
    passFeedback: '정중한 요청 톤이 좋아요.',
    failFeedback: '“presentation”이 뭉개졌어요. 그 단어만 또렷하게!',
    difficulty: 'hard',
  },
  {
    id: 'date-1',
    categoryId: 'date',
    sentence: 'Is this a date?',
    korean: '이거 데이트예요?',
    nativeTip: '짧게 물으면 부담이 덜해요.',
    passFeedback: '당황이 정직하게 전달됐어요.',
    failFeedback: '“date” 톤이 약했어요. 질문형으로 다시!',
    difficulty: 'easy',
  },
  {
    id: 'date-2',
    categoryId: 'date',
    sentence: "I'm nervous, sorry.",
    korean: '긴장했어요, 미안해요.',
    nativeTip: '짧게 인정하면 분위기가 풀려요.',
    passFeedback: '솔직한 멘트, 좋아요.',
    failFeedback: '“nervous”가 묻혔어요. 그 단어만 집중!',
    difficulty: 'easy',
  },
  {
    id: 'date-3',
    categoryId: 'date',
    sentence: 'You look better offline.',
    korean: '실제로 더 멋져요.',
    nativeTip: '“offline”이 칭찬 포인트예요. 톤은 가볍게.',
    passFeedback: '칭찬이 세련됐어요.',
    failFeedback: '“offline”이 흐릿했어요. 그 단어만 또렷하게!',
    difficulty: 'medium',
  },
  {
    id: 'date-4',
    categoryId: 'date',
    sentence: 'I forgot how to talk.',
    korean: '말하는 법을 까먹었어요.',
    nativeTip: '자기 디스는 짧게—웃음이 나와요.',
    passFeedback: '어색함 해독제로 좋았어요.',
    failFeedback: '“forgot how to talk”가 뭉개졌어요. 그 구간만 다시!',
    difficulty: 'medium',
  },
  {
    id: 'date-5',
    categoryId: 'date',
    sentence: 'That laugh was awkward.',
    korean: '방금 웃음은 긴장이었어요.',
    nativeTip: '“awkward” 한 방이면 설명 끝이에요.',
    passFeedback: '긴장 핑계가 귀여웠어요.',
    failFeedback: '“awkward”이 흐릿했어요. 마지막 단어만 집중!',
    difficulty: 'medium',
  },
  {
    id: 'shop-1',
    categoryId: 'shopping',
    sentence: 'Do you have black?',
    korean: '검정색 있나요?',
    nativeTip: '색만 짧게 물어도 매장에서 통해요.',
    passFeedback: '쇼핑 질문, 깔끔했어요.',
    failFeedback: '“black”이 약했어요. 색 이름만 또렷하게!',
    difficulty: 'easy',
  },
  {
    id: 'shop-2',
    categoryId: 'shopping',
    sentence: 'Is this really discounted?',
    korean: '진짜 할인인가요?',
    nativeTip: '“really discounted”가 의심의 핵심이에요.',
    passFeedback: '소비자 본능이 선명해요.',
    failFeedback: '“discounted”가 뭉개졌어요. 그 단어만 다시!',
    difficulty: 'easy',
  },
  {
    id: 'shop-3',
    categoryId: 'shopping',
    sentence: 'Can I try this on?',
    korean: '입어봐도 되나요?',
    nativeTip: '“try this on”은 피팅룸 기본 표현이에요.',
    passFeedback: '피팅 요청, 자연스러웠어요.',
    failFeedback: '“try on”이 흐릿했어요. 그 두 단어만 집중!',
    difficulty: 'easy',
  },
  {
    id: 'shop-4',
    categoryId: 'shopping',
    sentence: 'Can you bring me this size?',
    korean: '이 사이즈 좀 주세요.',
    nativeTip: '사이즈 요청은 짧게—톤만 가볍게.',
    passFeedback: '유머가 과하지 않게 박혔어요.',
    failFeedback: '“size”가 흐릿했어요. 그 단어만 다시!',
    difficulty: 'medium',
  },
  {
    id: 'shop-5',
    categoryId: 'shopping',
    sentence: 'I came for socks.',
    korean: '양말 사러 왔는데요.',
    nativeTip: '“came for socks”로 목적만 말해도 충분해요.',
    passFeedback: '쇼핑 실패 서사의 시작, 좋아요.',
    failFeedback: '“socks”가 흐릿했어요. 그 단어만 또렷하게!',
    difficulty: 'medium',
  },
];

export function challengesByCategory(categoryId: SpeakingCategoryId): SpeakingChallenge[] {
  return SPEAKING_CHALLENGES.filter((c) => c.categoryId === categoryId);
}
