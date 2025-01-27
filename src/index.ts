import express from 'express';
import path from 'path';
import fs from 'fs';
import { Media } from './types/media';

const app = express();
const port = 3950;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static('public'));
app.use('/resources', express.static('resources'));

const MEDIA_ENTRIES_PATH = path.join(__dirname, '../resources/media-entries.json');

const getMediaEntries = (): { entries: Media[] } => {
  if (!fs.existsSync(MEDIA_ENTRIES_PATH)) {
    return { entries: [] };
  }
  return JSON.parse(fs.readFileSync(MEDIA_ENTRIES_PATH, 'utf-8'));
};

app.get('/', (req, res) => {
  const { entries } = getMediaEntries();
  res.render('index', { media: entries });
});

app.get('/view/:id', (req, res) => {
  const { entries } = getMediaEntries();
  const media = entries.find(entry => entry.id === req.params.id);
  
  if (!media) {
    return res.redirect('/');
  }
  
  res.render('view', { media });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
