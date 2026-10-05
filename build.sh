#!/bin/sh
# Renders the light and dark banners and the still into out/.
# Needs Node, Google Chrome, and ffmpeg built with SVT-AV1 (Homebrew's ffmpeg has it).
set -e
cd "$(dirname "$0")"
rm -rf out && mkdir -p out/light out/dark
node render.cjs out/light 192 12
node render.cjs out/dark 192 12 "theme=dark"
# 192 frames at 12 fps is the 16-second loop. AV1 in an AVIF file, full-range sRGB colour.
encode() {
  SVT_LOG=1 ffmpeg -hide_banner -loglevel error -y -framerate 12 -i "$1/f_%04d.png" \
    -vf "scale=out_color_matrix=bt709:out_range=full,format=yuv420p,setparams=color_primaries=bt709:color_trc=iec61966-2-1:colorspace=bt709:range=pc" \
    -c:v libsvtav1 -preset 4 -crf 22 -g 192 -svtav1-params "tune=0:scm=1" -loop 0 "$2"
}
encode out/light out/banner.avif
encode out/dark out/banner-dark.avif
ffmpeg -hide_banner -loglevel error -y -i out/light/f_0000.png -compression_level 9 -pred mixed out/banner.png
echo "Done. Copy out/banner.avif, out/banner-dark.avif and out/banner.png into assets/ on main."
