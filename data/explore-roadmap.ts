/**
 * LingoDeer-style roadmap — building assets under `public/img/explore/`.
 * Coordinates use a shared 0–100 viewBox (x = horizontal, y = vertical).
 */
export const ROADMAP_BUILDING_IMAGES = {
  introduction: '/map/intro.svg',
  speaking: '/map/speaking.svg',
  classroom: '/map/classroom.svg',
  subjects: '/map/subject.svg',
} as const;

/** Vertical journey (viewports below md): bottom → top. */
export const ROADMAP_PATH_MOBILE =
  'M 50 92 C 44 82 32 74 26 64 C 20 54 38 48 58 44 C 78 40 82 30 72 22 C 62 16 54 14 50 14';

/** Horizontal journey (md+): Introduction → Speaking → Classroom → Subjects. */
export const ROADMAP_PATH_DESKTOP =
  'M 14 50 C 18 38 24 33 30 28 C 40 22 46 36 52 48 C 60 56 66 42 72 34 C 76 30 76 29 76 28';

export type RoadmapDisplayStatus = 'completed' | 'current' | 'upcoming';

export type RoadmapNodeCoords = { xPct: number; yPct: number };

export type RoadmapModalIcon = 'intro' | 'speaking' | 'classroom' | 'subjects';

export interface RoadmapMissionModal {
  /** English headline in pink header */
  title: string;
  subtitleKo: string;
  description: string;
  features: string[];
  cta: string;
  ctaHint: string;
  icon: RoadmapModalIcon;
}

export interface RoadmapLesson {
  id: string;
  titleKo: string;
  titleEn: string;
  route: string;
  imageSrc: string;
  missionShort: string;
  progressCurrent: number;
  progressTotal: number;
  displayStatus: RoadmapDisplayStatus;
  center: { wide: RoadmapNodeCoords; narrow: RoadmapNodeCoords };
  modal: RoadmapMissionModal;
}

export const ROADMAP_LESSONS: RoadmapLesson[] = [
  {
    id: 'introduction',
    titleKo: '인트로덕션',
    titleEn: 'Introduction',
    route: '/explore/introduction',
    imageSrc: ROADMAP_BUILDING_IMAGES.introduction,
    missionShort: '첫 만남 자기소개로 모험을 시작해요.',
    progressCurrent: 0,
    progressTotal: 1,
    displayStatus: 'current',
    center: {
      wide: { xPct: 8, yPct: 50 },
      narrow: { xPct: 50, yPct: 90 },
    },
    modal: {
      title: 'Introduction',
      subtitleKo: '자기소개 미션',
      description: '처음 만난 사람에게 자연스럽게 나를 소개하는 연습을 해요.',
      features: [
        '이름, 전공, 장점 말하기',
        '어색하지 않은 첫인사 표현',
        '동아리/수업에서 쓰는 자기소개',
        '짧고 자연스러운 답변 연습',
      ],
      cta: 'Start Introduction 자기소개 시작',
      ctaHint: '버튼을 눌러 구역으로 이동합니다.',
      icon: 'intro',
    },
  },
  {
    id: 'speaking',
    titleKo: '스피킹',
    titleEn: 'Speaking',
    route: '/explore/speaking',
    imageSrc: ROADMAP_BUILDING_IMAGES.speaking,
    missionShort: '말하면 통과. 발음과 리듬을 다듬어요.',
    progressCurrent: 0,
    progressTotal: 5,
    displayStatus: 'upcoming',
    center: {
      wide: { xPct: 30, yPct: 30 },
      narrow: { xPct: 26, yPct: 64 },
    },
    modal: {
      title: 'Real-life Situations',
      subtitleKo: '실생활 회화',
      description:
        '짧은 영어 문장을 듣고 따라 말하며 발음과 전달력을 확인해요.',
      features: [
        '카페, 편의점, 수업, 데이트, 쇼핑 표현',
        '원어민 느낌의 문장 듣기',
        '마이크로 직접 말하기',
        '발음 점수와 피드백 확인',
      ],
      cta: 'Choose Situation 상황 선택',
      ctaHint: '버튼을 눌러 구역으로 이동합니다.',
      icon: 'speaking',
    },
  },
  {
    id: 'classroom',
    titleKo: '클래스룸',
    titleEn: 'Classroom',
    route: '/explore/classroom',
    imageSrc: ROADMAP_BUILDING_IMAGES.classroom,
    missionShort: '수업·팀플 상황 영어를 연습해요.',
    progressCurrent: 0,
    progressTotal: 4,
    displayStatus: 'upcoming',
    center: {
      wide: { xPct: 52, yPct: 48 },
      narrow: { xPct: 74, yPct: 42 },
    },
    modal: {
      title: 'Classroom Survival',
      subtitleKo: '수업 생존 영어',
      description:
        '교수님, 발표, 조별과제 상황에서 바로 쓸 수 있는 표현을 연습해요.',
      features: [
        '교수님께 정중하게 말하기',
        '과제/발표 상황 설명하기',
        '조별과제 위기 표현',
        '수업 중 질문과 답변 연습',
      ],
      cta: 'Enter Classroom 수업 입장',
      ctaHint: '버튼을 눌러 구역으로 이동합니다.',
      icon: 'classroom',
    },
  },
  {
    id: 'subjects',
    titleKo: '서브젝트',
    titleEn: 'Subjects',
    route: '/explore/subject',
    imageSrc: ROADMAP_BUILDING_IMAGES.subjects,
    missionShort: '전공·과목 어휘 미션.',
    progressCurrent: 0,
    progressTotal: 5,
    displayStatus: 'upcoming',
    center: {
      wide: { xPct: 76, yPct: 28 },
      narrow: { xPct: 50, yPct: 14 },
    },
    modal: {
      title: 'Subject Quest',
      subtitleKo: '전공·과목 영어',
      description:
        '수업과 전공에서 자주 나오는 단어와 표현을 게임처럼 익혀요.',
      features: [
        '전공 과목 기본 단어',
        '시험/과제 관련 표현',
        '짧은 퀴즈형 미션',
        '학습 진행도 확인',
      ],
      cta: 'Start Subject Quest 과목 미션 시작',
      ctaHint: '버튼을 눌러 구역으로 이동합니다.',
      icon: 'subjects',
    },
  },
];

export function roadmapPathForLayout(wide: boolean): string {
  return wide ? ROADMAP_PATH_DESKTOP : ROADMAP_PATH_MOBILE;
}
