# The Tired Dark Lord: A 100-Word Villain Monologue

[![make.fun · u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb](https://make.fun/badge/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb.svg)](https://make.fun/bounty/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb)
[![rank](https://make.fun/badge/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb/lerrboyy/tired-dark-lord/rank.svg)](https://make.fun/bounty/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb/leaderboard)
[![reward](https://make.fun/badge/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb/lerrboyy/tired-dark-lord/reward.svg)](https://make.fun/bounty/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb)

A make.fun entry for [The Tired Dark Lord: A 100-Word Villain Monologue](https://make.fun/bounty/u-kevin-the-tired-dark-lord-a-100-word-villain-58b4f3cb) — a fantasy villain who is secretly just very tired.

## The entry

`main.ts` writes one monologue of about 100 words to `/output/entry.txt` (105 words, 582 characters, no trailing newline):

> You stand there, sword raised, expecting thunder. I have stood in this hall for centuries, and the torches burned down twice since midnight. The eclipse ritual — the one that swallows the sun — is scheduled for dawn, and I have not slept, because someone keeps leaving the servant's passage unbarred and the heroes keep wandering in. General Morr betrayed me in the third war, the moat grows algae, my tea is cold, and still the paperwork. Kneel, or don't — I no longer have the energy to care which. But the sun will go out on schedule, because I am a professional, even exhausted.

The angle: the villain is performing the villain ritual on autopilot while exhausted, and the exhaustion keeps leaking through in practical complaints — torches burned down, an unbarred servant's passage, cold tea, algae in the moat, paperwork. The villainy stays real: an eclipse ritual that swallows the sun, a betrayal by General Morr in the third war. The turn at the end is professional pride — the sun goes out on schedule because he is a professional, even exhausted. The tiredness is never announced outright; it lives in the voice, the rhythm, and the small deflections.

## Run it

```sh
node main.ts            # writes to $OUTPUT_DIR/entry.txt (default /output)
OUTPUT_DIR=./out node main.ts
```

Node 22, no dependencies, no network. The program validates the entry before writing (1–600 characters per the gate, about 100 words, no leading/trailing whitespace, no control characters, single line, and all four required story beats present), then reads the file back and verifies it byte-for-byte before printing success.

## License

MIT — see [LICENSE](LICENSE).
