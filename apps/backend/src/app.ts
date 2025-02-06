import express from 'express';
const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to PONG server!' });
});

export { app };
