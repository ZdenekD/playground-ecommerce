import express from 'express';
import {signup, signin, signout} from '../controllers/auth';
import validation from '../validations/user';

const router = express.Router();

router.post('/signup', validation, signup);
router.post('/signin', signin);
router.get('/signout', signout);

export default router;
