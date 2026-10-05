# Banner source

The banner at the top of the profile README, drawn by code. A tree throws shadows across a sunlit wall. The scene is an ordered-dither mosaic: each 8 px tile is paper, forest or gold, and the tiles flip as the branches and leaves sway. The text stays real text, and the scene keeps a margin of light around it.

## Change the words

Edit `banner.html`. It holds the text and its layout, in the site's fonts and colours. The scene works out where the letters are on every render, so new text keeps its margin of light without any other change.

## Render

```sh
npm install
sh build.sh
```

You need Google Chrome and ffmpeg with SVT-AV1 (`brew install ffmpeg`). A full render takes about two minutes. Then copy `out/banner.avif`, `out/banner-dark.avif` and `out/banner.png` into `assets/` on main.

To try a change on one frame, run `node render.cjs out 1 12` (add `"theme=dark"` for dark mode) and open `out/f_0000.png`.

## What's what

- `scene.js` grows the tree, sways it in a 16-second loop, and turns the light into tiles. A 4×4 threshold pattern decides each tile, and gold marks the edges where the light turns.
- `banner.html` holds the text, the frame and both colour schemes (`?theme=dark`).
- `render.cjs` photographs the text alone first, so the scene knows where the letters are. Then it draws and saves every frame.
- `build.sh` renders both versions and packs each into an animated AVIF, plus a still PNG for visitors who turn off motion.
- `fonts/` holds Geist and Geist Mono (SIL Open Font License, see `OFL.txt`).
