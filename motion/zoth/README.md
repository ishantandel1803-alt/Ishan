Zoth product motion (img/work/zoth-flow.mp4). Every frame is drawn by render(t) in zoth-motion.html.
Re-render: npm i puppeteer-core@23.11.1, then `node cap.js 0 16 30 frames` and
`ffmpeg -framerate 30 -i frames/f%04d.jpg -c:v libx264 -crf 24 -pix_fmt yuv420p -movflags +faststart ../../img/work/zoth-flow.mp4`.
Edit captions in CAPS / TAGS, the camera path in CAM, and the cursor path in cursorAt().
