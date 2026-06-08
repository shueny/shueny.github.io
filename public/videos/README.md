# Videos

Drop your real footage here, then it appears automatically on `/visuals`.

| File        | Where it shows                          | Recommended                                   |
| ----------- | --------------------------------------- | --------------------------------------------- |
| `hero.mp4`  | Fullscreen looping background in the hero | 1920×1080, **muted, no audio**, 8–20s, < 8 MB |
| `reel.mp4`  | The big "Featured Film" player          | 1920×1080 (16:9), with audio, your showreel   |

Tips:
- Until a real video exists, the page shows the photo "poster" instead, so it
  always looks complete. Add the files whenever you're ready.
- Keep `hero.mp4` short and small — it autoplays on every visit. Compress with
  e.g. `ffmpeg -i in.mov -vf scale=1920:-2 -an -crf 28 hero.mp4`.
- To change which files/posters are used, edit `src/config/visuals.ts`.
