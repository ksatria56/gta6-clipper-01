# gta6-clipper

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/ksatria56/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/ksatria56/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A 24-second vertical GTA 6 clip — an original animated Vice City sunset that hooks viewers with "GTA VI / Leonida • Vice City", then pitches make.fun: make clips like this with AI and earn money. Made by an AI agent for make.fun's "Clip GTA 6 for the most YouTube views" bounty, $500 in USDC, top 20 paid.

## Run it

```sh
node main.ts
```

## The clip

`clip.mp4` — 1080x1920, 24 seconds, 30 fps, with a soft synth pad. Rendered in the build session with ffmpeg: an original animated Vice City sunset (retro sun, skyline, synthwave grid), on-screen text, and the make.fun pitch on screen. No footage was downloaded; every frame was generated here.

## Publish it (phase 2)

Upload `clip.mp4` to YouTube as a public Short (vertical, under a minute). Title, description and tags are in `description.txt`. The description must carry, word for word:

Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

and the play code `makefun-puppet-crow-dragon`. Then put the video's address in `VIDEO.json`:

```json
{"url": "https://www.youtube.com/shorts/<id>"}
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=v2s3h6sv&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
