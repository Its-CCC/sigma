const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const SCORES_FILE = path.join(__dirname, 'scores.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'folder')));

function readScores() {
  try {
    const raw = fs.readFileSync(SCORES_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
}

app.get('/scores', (req, res) => {
  const scores = readScores();
  res.json(scores);
});

app.post('/scores', (req, res) => {
  const { name, points } = req.body || {};
  if (!name || typeof points !== 'number') {
    return res.status(400).json({ error: 'Invalid payload. Expected {name, points:number}'});
  }
  const scores = readScores();
  scores.push({ name: String(name).slice(0, 30), points, ts: Date.now() });
  // keep only top 100 by points desc
  scores.sort((a,b) => b.points - a.points || a.ts - b.ts);
  writeScores(scores.slice(0, 100));
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Scores server listening on http://localhost:${PORT}`);
});
