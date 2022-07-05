import { Router } from 'express';
import { getUsers, postUser, updateData, addFavs, banUser, getOwnerById } from '../controllers/userControllers';

const router = Router();

router.get('/:id', getOwnerById);
router.get('/', getUsers);

router.post('/', postUser);

router.put('/addfavs/:id', addFavs);
router.put('/:id', updateData);

router.delete('/', banUser);

export default router;