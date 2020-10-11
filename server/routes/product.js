import express from 'express';
import {requireSignin, isAuth, isAdmin} from '../controllers/auth';
import userById from '../controllers/user';
import {create, read, remove, update, list, listRelated, productById} from '../controllers/product';

const router = express.Router();

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.param('userId', userById);
router.param('productId', productById);

export default router;
