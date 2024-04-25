const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const multer = require('multer');
const { AssemblyAI } = require('assemblyai');
const fs = require('fs');

const client = new AssemblyAI({
   apiKey: process.env.ASSEMBLY_AI_API_KEY 
 });

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/converttotext', upload.single('mp3File'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFile = req.file;
    const audioUrl = `http://localhost:${port}/${uploadedFile.filename}`;

    console.log("Transcription request for:", audioUrl);

    const params = {
      audio_url: audioUrl
    };

    const transcript = await client.transcripts.transcribe(params);
    console.log(transcript.text, "data isssss");
    res.json({ text: transcript.text });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).json({ error: 'An error occurred while processing the audio' });
  }
});

app.get('/*', (req, res) => {
  res.send("Invalid API Path");
});

app.listen(port, () => {
  console.log(`Speech to text converter listening on port ${port}`);
});
