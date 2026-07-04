# Media assets

Drop the real club assets here. Until then the site falls back to styled
placeholders so everything still renders.

## Hero video

- `hero.mp4` - fullscreen background clip (muted, looping, ~10-20s, H.264).
- `hero-poster.jpg` - first-frame poster shown before the video loads.

Referenced in `src/components/Hero.tsx`. If `hero.mp4` is absent the hero shows
a dark cinematic gradient instead, so it never looks broken.

## Player portraits

- `players/<number>.jpg` - one portrait per player (3:4, dark background works best).

Then set the `photo` field in `src/lib/players.ts`, e.g.
`{ number: 20, name: "...", position: "Defence", photo: "/media/players/20.jpg" }`.
Cards without a `photo` render the jersey-number placeholder.
