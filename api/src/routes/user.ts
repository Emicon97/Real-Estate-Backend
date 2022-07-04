import { Router } from 'express';
import { getUsers, postUser, updateData, banUser, getOwnerById } from '../controllers/userControllers';

const router = Router();

router.get('/:id', getOwnerById);
router.get('/', getUsers);

router.post('/', postUser);

router.put('/addFavs', );
router.put('/:id', updateData);

router.delete('/', banUser);

export default router;