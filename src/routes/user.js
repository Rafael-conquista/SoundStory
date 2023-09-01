import { Router } from 'express';
import userController from '../controllers/user.js';


const router = new Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.put('/', userController.update);
router.delete('/', userController.delete);

export default router;