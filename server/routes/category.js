import express from 'express';
import {requireSignin, isAuth, isAdmin} from '../controllers/auth';
import userById from '../controllers/user';
import {create, read, remove, update, list, categoryById} from '../controllers/category';

const router = express.Router();

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/category/:categoryId', read);
router.get('/categories', list);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.param('categoryId', categoryById);
router.param('userId', userById);

export default router;
