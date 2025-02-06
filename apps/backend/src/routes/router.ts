import { Router } from 'express';
import playerRoutes from './player.routes';
import baseRoutes from './base.routes';

const router = Router();

router.use('/', baseRoutes);
router.use('/players', playerRoutes);

export { router };
