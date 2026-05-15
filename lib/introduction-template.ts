export type IntroFields = {
  name: string;
  major: string;
  goodAt: string;
  interest: string;
};

/** True if any field has non-whitespace content. */
export function hasIntroInput(f: IntroFields): boolean {
  return [f.name, f.major, f.goodAt, f.interest].some((s) => s.trim().length > 0);
}

/**
 * Short, natural English self-introduction for TTS / practice.
 * Uses gentle placeholders when parts are empty.
 */
export function buildIntroductionEnglish(f: IntroFields): string {
  const name     = f.name.trim();
  const major    = f.major.trim()    || 'your major';
  const goodAt   = f.goodAt.trim()   || 'many things';
  const interest = f.interest.trim() || 'lots of different topics';

  const namePart     = name ? `Hi, I'm ${name}.` : 'Hi!';
  const majorPart    = `I'm studying ${major}.`;
  const goodAtPart   = `I'm good at ${goodAt}.`;
  const interestPart = `I'm interested in ${interest}.`;

  return `${namePart} ${majorPart} ${goodAtPart} ${interestPart}`.trim();
}
