import express from 'express';
import {requireSignin, isAuth, isAdmin} from '../controllers/auth';
import userById, {history} from '../controllers/user';
import orderById, {create, list, statuses, updateStatus} from '../controllers/order';
import {updateQuantity} from '../controllers/product';

const router = express.Router();

router.post('/order/create/:userId', requireSignin, isAuth, history, updateQuantity, create);
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, list);
router.get('/order/statuses/:userId', requireSignin, isAuth, isAdmin, statuses);
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateStatus);

router.param('userId', userById);
router.param('orderId', orderById);

export default router;
