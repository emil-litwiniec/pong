import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Player base route!' });
});

export default router;
