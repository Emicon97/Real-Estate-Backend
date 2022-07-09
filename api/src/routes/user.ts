import { Router } from 'express';
import { getUsers, postUser, updateData, addFavs, banUser, getOwnerById } from '../controllers/userControllers';
import { TokenValidation } from '../libs/JsonWebToken';

const router = Router();

router.get('/:id', getOwnerById);
router.get('/', TokenValidation, getUsers);

router.post('/', postUser);

router.put('/addfavs/:id', addFavs);
router.put('/:id', TokenValidation, updateData);

router.delete('/', TokenValidation, banUser);

export default router;