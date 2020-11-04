import express from 'express';
import compression from 'compression';
import path from 'path';

const port = process.env.PORT || 8000;
const server = express();

server.use(compression());
server.use(express.static(path.join(__dirname, 'dist')));

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(port, () => {
    console.log(`|> Ready on http://localhost:${port}`);
});
