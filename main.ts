// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes the monologue (105 words, 582 chars) to <OUTPUT_DIR>/entry.txt,
// byte-exact, with no trailing newline. Node 22, no dependencies, no network.
// Written as plain JavaScript inside main.ts so it runs under plain `node`
// with no type-stripping flag needed.
//
// The monologue is a single fixed text from the design spec: a dark lord
// performing the villain ritual on autopilot while exhausted. The tiredness
// lives in the practical complaints (torches burned down, an unbarred
// servant's passage, cold tea, algae, paperwork) and in the shrug of
// "Kneel, or don't" — never in a plain announcement of weariness. The
// villainy stays real: an eclipse ritual that swallows the sun, a betrayal
// by General Morr in the third war, and a closing beat of professional
// pride — the sun goes out on schedule because he is a professional.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You stand there, sword raised, expecting thunder. I have stood in this hall for " +
  "centuries, and the torches burned down twice since midnight. The eclipse ritual " +
  "— the one that swallows the sun — is scheduled for dawn, and I have not slept, " +
  "because someone keeps leaving the servant's passage unbarred and the heroes keep " +
  "wandering in. General Morr betrayed me in the third war, the moat grows algae, " +
  "my tea is cold, and still the paperwork. Kneel, or don't — I no longer have the " +
  "energy to care which. But the sun will go out on schedule, because I am a " +
  "professional, even exhausted.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 600 characters,
// not only white space. "About 100 words" per the brief.
const MIN_CHARS = 1;
const MAX_CHARS = 600;
const MIN_WORDS = 90;
const MAX_WORDS = 110;

// Story beats the spec says must never be cut: the opening confrontation,
// the eclipse ritual, General Morr, and the closing professional-pride line.
const REQUIRED_BEATS = [
  "sword raised, expecting thunder",
  "eclipse ritual",
  "General Morr",
  "I am a professional",
];

function wordCount(text) {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function validate(text) {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry is ${text.length} chars, outside the gate of ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must have no leading or trailing whitespace");
  }
  const words = wordCount(text);
  if (words < MIN_WORDS || words > MAX_WORDS) {
    throw new Error(`entry is ${words} words, expected about 100 (${MIN_WORDS}-${MAX_WORDS})`);
  }
  // No control characters, no line/paragraph separators, no DEL, no
  // zero-width characters — the entry must be one clean paragraph.
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (
      (code < 0x20 && ch !== "\n" && ch !== "\t") ||
      code === 0x7f ||
      code === 0x2028 ||
      code === 0x2029 ||
      code === 0x200b ||
      code === 0xfeff
    ) {
      throw new Error(
        `entry contains forbidden character U+${code.toString(16).padStart(4, "0")}`,
      );
    }
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line with no newline characters");
  }
  for (const beat of REQUIRED_BEATS) {
    if (!text.includes(beat)) {
      throw new Error(`entry is missing a required story beat: "${beat}"`);
    }
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

validate(ENTRY);

const outPath = join(outDir, "entry.txt");
const bytes = Buffer.from(ENTRY, "utf8");
writeFileSync(outPath, bytes);

// Read back and verify byte-for-byte, including the exact byte length,
// before declaring success.
const readBack = readFileSync(outPath);
if (readBack.length !== bytes.length || !readBack.equals(bytes)) {
  throw new Error("verification failed: entry.txt on disk differs from the entry text");
}
if (readBack.toString("utf8") !== ENTRY) {
  throw new Error("verification failed: entry.txt does not round-trip as UTF-8 text");
}

console.log(
  `Wrote ${outPath}: ${ENTRY.length} chars, ${wordCount(ENTRY)} words, ${bytes.length} bytes (no trailing newline)`,
);
