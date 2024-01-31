import { Router } from 'express';
import userController from '../controllers/user.js';


const router = new Router();

router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.store);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/login/', userController.login);
router.post('/verify', userController.get_id_by_jwt)

export default router;