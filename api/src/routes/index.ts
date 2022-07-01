const { Router } = require('express');

import loginRoutes from './login';
import propertyRoutes from './property';
import userRoutes from './user';
import calendarRoutes from './calendar';

const router = Router();

router.use('/login', loginRoutes);
router.use('/property', propertyRoutes);
router.use('/user', userRoutes);
router.use('/calendar', calendarRoutes)

export = router;