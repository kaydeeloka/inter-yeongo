export type IntroFields = {
  name: string;
  age: string;
  country: string;
  major: string;
  goodAt: string;
};

/** True if any field has non-whitespace content. */
export function hasIntroInput(f: IntroFields): boolean {
  return [f.name, f.age, f.country, f.major, f.goodAt].some((s) => s.trim().length > 0);
}

/**
 * Short, natural English self-introduction for TTS / practice.
 * Uses gentle placeholders when parts are empty.
 */
export function buildIntroductionEnglish(f: IntroFields): string {
  const name    = f.name.trim();
  const age     = f.age.trim();
  const country = f.country.trim();
  const major   = f.major.trim() || 'your major';
  const goodAt  = f.goodAt.trim() || 'many things';

  const namePart    = name    ? `Hi, I'm ${name}.`          : `Hi!`;
  const agePart     = age     ? ` I'm ${age} years old`     : '';
  const countryPart = country ? ` and I'm from ${country}.` : (age ? '.' : '');
  const majorPart   = `I'm studying ${major}.`;
  const goodAtPart  = `I'm good at ${goodAt}.`;

  return `${namePart}${agePart}${countryPart} ${majorPart} ${goodAtPart}`.trim();
}
