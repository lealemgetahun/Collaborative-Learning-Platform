const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const express = require('express');
const router = express.Router();

router.get('/video/:filename', (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, '..', 'videos', filename);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send('Video not found');
  }

  const range = req.headers.range;
  const videoSize = fs.statSync(videoPath).size;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': videoSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

router.get('/custom-video', (req, res) => {

  const customVideo = ffmpeg()
    .input('image.jpg')
    .loop()
    .inputOptions('-framerate 30')
    .input('audio.mp3')
    .outputOptions('-c:v libx264', '-profile:v main', '-preset:v slow')
    .outputOptions('-c:a aac')
    .outputOptions('-pix_fmt yuv420p')
    .duration(30)
    .format('mp4')
    .pipe();

  const head = {
    'Content-Length': customVideo.headers['content-length'],
    'Content-Type': 'video/mp4',
  };

  res.writeHead(200, head);
  customVideo.pipe(res);
});

module.exports = router;
