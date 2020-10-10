import express from 'express';
import {requireSignin, isAuth, isAdmin} from '../controllers/auth';
import userById from '../controllers/user';

const router = express.Router();

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({user: req.profile});
});
router.param('userId', userById);

export default router;
