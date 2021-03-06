import express from 'express';
import {requireSignin, isAuth, isAdmin} from '../controllers/auth';
import userById, {read, update, orders} from '../controllers/user';

const router = express.Router();

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({user: req.profile});
});
router.get('/user/:userId', requireSignin, isAuth, read);
router.get('/user/orders/:userId', requireSignin, isAuth, orders);
router.put('/user/:userId', requireSignin, isAuth, update);
router.param('userId', userById);

export default router;
