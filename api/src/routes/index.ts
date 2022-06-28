const { Router } = require('express');

import loginRoutes from './login';
import propertyRoutes from './property';
import userRoutes from './user';

const router = Router();

router.use('/login', loginRoutes);
router.use('/property', propertyRoutes);
router.use('/user', userRoutes);

export = router;