export type IntroFields = {
  name: string;
  major: string;
  interest: string;
  goal: string;
};

/** True if any field has non-whitespace content. */
export function hasIntroInput(f: IntroFields): boolean {
  return [f.name, f.major, f.interest, f.goal].some((s) => s.trim().length > 0);
}

/**
 * Short, natural English self-introduction for TTS / practice.
 * Uses gentle placeholders when parts are empty (never empty output when any field filled).
 */
export function buildIntroductionEnglish(f: IntroFields): string {
  const name = f.name.trim();
  const major = f.major.trim() || 'your major';
  const interest = f.interest.trim() || 'lots of different topics';
  const goal = f.goal.trim() || 'campus life';

  if (!name) {
    return `Hi! I'm a university student studying ${major}. I'm interested in ${interest}, and I want to use English more for ${goal}.`;
  }

  return `Hi, I'm ${name}. I'm studying ${major}. I'm interested in ${interest}, and I want to improve my English for ${goal}.`;
}
