import { Router } from 'express';
import {
   getPropertyById,
   searchProperties,
   postProperty,
   getPropertyByOwner,
   updateProperties,
   deleteProperties,
   getOwnersTelephoneByProperty
} from '../controllers/propertyControllers';
import { getOwnerById } from '../controllers/userControllers';
import { TokenValidation } from './../libs/JsonWebToken';

const router = Router();

router.get('/getownersphone/:id', getOwnersTelephoneByProperty);
router.get('/:id', getPropertyById);

router.post('/search', searchProperties);
router.post('/:id', postProperty);

router.post('/:id/search',
   searchProperties,
   getOwnerById,
   getPropertyByOwner
);
router.post('/:follower/favourites',
   TokenValidation,
   searchProperties,
   getOwnerById,
   getPropertyByOwner
);

router.put('/:id', updateProperties);

router.delete('/', deleteProperties);

export default router;