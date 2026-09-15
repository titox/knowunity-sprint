# sprint-context.md

## What this is
A mocked mobile web prototype of Knowunity's voice recall loop: 390px, iOS-shaped, dark mode only.
No real speech recognition, no real judging. Transcript, verdict and latency are hard-coded.

## Committed concept
A student explains a term back in their own words, by voice or typing, and Knowie replies in text with pass, partial or fail.

## Where the recall step lives
End of a revision unit, after that section's quizzes. Not at the end of an AI chat.

## Decisions
- Voice and text are peers, because calling text a fallback labels the student as unable.
- Speak or write is chosen at the boundary, because a shared room throttles voice before the loop starts.
- Mid-loop label is "switch to typing" / "cambiar a escribir", because apologetic framing turns a choice into a concession.
- Earned pass and clean pass get different copy and visuals, because the earned moment is the point of the feature.
- Working state keeps full length and uses skeleton lines, not a spinner, because a blank few seconds reads as broken.
- "Repeat it and it becomes a pass" is locked copy, because without it say-it-back reads as pointless.
- Summary heading is "worth another look", because it names an action, not a verdict.
- Fail only appears after a real attempt, because an honest summary has to follow genuine retrieval.
- Push-to-talk with explicit send, because auto-endpointing guesses wrong.
- Cancel and re-record before send, because a fumbled sentence should not force a bad submission.
- Transcript shown next to the verdict, correcting it never required, because a mishearing must read as the app's error, not the student's.
- Colour always paired with icon, label or shape, because colour alone fails AA in dark mode.
- Term status uses Green unaided, Blue hinted, Coral revealed, Neutral skipped, because those chips were built for this meaning.
- Mic permission asked from a primer on the student's own tap, because there is one native prompt and a denial is expensive.
- Denied permission routes into typing, because that is the one dead end the loop cannot afford.
- Skip available at every term, because no required action may trap the student.
- Status stays legible with reduced motion on, because motion carries system state here.
- Sentence case everywhere, no CSS token fallbacks, because a fallback hides a broken token.
- Build from the components that already exist, and stop before making a new one, because unreviewed one-off components fragment the system this prototype is meant to prove out.

## Not building
- Knowie speaking. Voice in, text out.
- Tutoring or follow-ups. The loop does not branch into conversation.
- Auto-detection of when the student stops talking.
- Pause and resume inside one take.
- Light mode, tablet, desktop, Android, any width but 390px.
- Native haptics, permission sheets, navigation transitions.
- Real speech-to-text or a real judge.
- Mic busy on a call, language switch mid-answer. Known gaps, noted not designed.

## Undecided, blocks building
- Session length. Brief says three to five terms, screenshots only show 2/3 and 3/3.
- Whether say-it-back exists in the current build.
