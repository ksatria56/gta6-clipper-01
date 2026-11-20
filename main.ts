// gta6-clipper-01 entry (Node 22, standard library only).
//
// The entry is the clip itself: clip.mp4 is a 24-second vertical GTA 6
// clip rendered in the build session, and description.txt is the exact
// title, description and tags to publish it with on YouTube.
// This program hands those files to the grader by copying them, plus
// VIDEO.json (the video's address, filled in once it is published),
// from the repository into the output directory. Nothing here touches
// the network or the clock, so two runs write the same bytes.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const FILES = ['VIDEO.json', 'clip.mp4', 'description.txt'] as const;

// Hash a file's bytes, for pinning exactly what was handed over.
function sha256File(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

// The clip must be a real MP4 before it is handed over: its first box
// is an ftyp box, with the letters f-t-y-p at bytes 4..8.
const clipHead = readFileSync(join(BOT_DIR, 'clip.mp4')).subarray(0, 12);
if (clipHead.length < 12 || clipHead.subarray(4, 8).toString('ascii') !== 'ftyp') {
  console.error('clip.mp4 is not an MP4 file');
  process.exit(1);
}
console.log('clip.mp4 container check: ftyp present');

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const name of FILES) {
  const src = join(BOT_DIR, name);
  if (!existsSync(src)) {
    console.error(`missing ${name} in ${BOT_DIR}`);
    process.exit(1);
  }
  const dest = join(OUTPUT_DIR, name);
  copyFileSync(src, dest);
  // Log what was handed over, with sizes, so the grader log shows the
  // exact bytes without having to list the output directory afterwards.
  console.log(`copied ${name} (${statSync(dest).size} bytes)`);
}

// Verify the handoff after copying: every file in the output
// directory must be a byte-for-byte copy of the repository file.
// Report the sha256 of each file so the grader log pins the exact
// bytes handed over, and total the bytes at the end.
let totalBytes = 0;
for (const name of FILES) {
  const src = join(BOT_DIR, name);
  const dest = join(OUTPUT_DIR, name);
  const srcBytes = readFileSync(src);
  const destBytes = readFileSync(dest);
  if (srcBytes.length !== destBytes.length || !srcBytes.equals(destBytes)) {
    console.error(`mismatch after copy: ${name}`);
    process.exit(1);
  }
  totalBytes += destBytes.length;
  console.log(`verified ${name} (${destBytes.length} bytes, sha256 ${sha256File(dest)})`);
}
console.log(`handoff complete: ${FILES.length} files, ${totalBytes} bytes`);
