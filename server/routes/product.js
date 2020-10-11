import express from 'express';
import {requireSignin, isAuth, isAdmin} from '../controllers/auth';
import userById from '../controllers/user';
import {create, read, remove, update, list, productImage, listRelated, listCategories, listBySearch, productById} from '../controllers/product';

const router = express.Router();

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.post('/products/search', listBySearch);
router.get('/product/:productId', read);
router.get('/product/image/:productId', productImage);
router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);
router.param('userId', userById);
router.param('productId', productById);

export default router;
