// Real per-term mock scripts -- closes the gap the spec-reviewer found:
// Processing had nowhere to get a verdict from, so Partial/Fail/Revealed
// were only reachable by hand-editing the URL, never through real play.
// Content itself is still placeholder (SPEC.md verification step 6 --
// you review these before they're final), but the mechanism is now real:
// each term has an authored sequence of Result states for its
// successive attempts, so every path in the loop is reachable by
// actually playing through it.
//
// Term 1: clean pass on the first try.
// Term 2: the full miss ladder -- partial, then two hint tiers, then
//         forced reveal if a 3rd attempt still misses.
// Term 3: one miss (hint) then a recovered pass -- exercises the
//         "hinted pass" path that should offer Say it back.
// 3 terms per session -- locked in this project's own interview
// ("session length... 3 terms (Recommended)... matches the screenshots
// you already have").
export const TOTAL_TERMS = 3;

export type ResultVerdict = 'pass' | 'partial' | 'fail1' | 'fail2' | 'revealed';

/** What actually happened on a finished term -- matches StatusRow's
 * documented vocabulary (Green=Unaided, Blue=Hinted, Coral=Revealed,
 * Neutral=Skipped). */
export type TermOutcome = 'unaided' | 'hinted' | 'revealed' | 'skipped';

export interface TermData {
  /** Short name for Summary's per-term rows -- the full `prompt`
   * sentence is too long for StatusRow/SummaryCard's row label. */
  label: string;
  prompt: string;
  correctAnswer: string;
  hint1: string;
  hint2: string;
  /** Verdict shown on each successive attempt for this term. Once
   * exhausted, further attempts force 'revealed' rather than repeating
   * the last entry forever. */
  script: ResultVerdict[];
}

export const TERMS: TermData[] = [
  {
    label: 'The Crown of Aragon',
    prompt: 'You just revised the Crown of Aragon. Explain it back in your own words?',
    correctAnswer: "That's the one. Both were staged conquests, each locked in with its own fueros.",
    hint1: "You had the timeline. You didn't say why the two conquests were connected.",
    hint2: 'Both Mallorca and Valencia became new kingdoms under the Crown, each keeping its own fueros.',
    script: ['pass'],
  },
  {
    label: 'Mallorca and Valencia',
    prompt: 'Now go one step deeper. What did the campaigns in Mallorca (1229) and Valencia (1238) have in common?',
    correctAnswer: 'Both were sea campaigns that ended in new kingdoms, each organised under its own fueros.',
    hint1: "You had the timeline. You didn't say why the two conquests were connected.",
    hint2: 'Think about how each new territory was governed afterward, not just how it was won.',
    script: ['partial', 'fail1', 'fail2'],
  },
  {
    label: 'The fueros',
    prompt: 'What made the fueros important to how the Crown of Aragon actually worked?',
    correctAnswer: 'They let each territory keep its own laws and institutions under one shared crown.',
    hint1: 'Think about what stayed different between Aragon, Valencia, and Mallorca after they joined.',
    hint2: 'Each territory kept ruling itself locally -- the Crown was a shared header, not one government.',
    script: ['fail1', 'pass'],
  },
];

export function verdictForAttempt(termIndex: number, attemptIndex: number): ResultVerdict {
  const term = TERMS[termIndex - 1];
  if (attemptIndex < term.script.length) return term.script[attemptIndex];
  return 'revealed';
}
