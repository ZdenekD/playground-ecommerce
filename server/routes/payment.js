import express from 'express';
import {requireSignin, isAuth} from '../controllers/auth';
import userById from '../controllers/user';
import {generate, payment} from '../controllers/payment';

const router = express.Router();

router.get('/payment/token/:userId', requireSignin, isAuth, generate);
router.post('/payment/:userId', requireSignin, isAuth, payment);

router.param('userId', userById);

export default router;
