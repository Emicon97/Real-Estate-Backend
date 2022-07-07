const { Router } = require('express');

import loginRoutes from './login';
import signUpRoutes from './signup';
import logoutRoutes from './logout';
import propertyRoutes from './property';
import userRoutes from './user';
import calendarRoutes from './calendar';
import paymentRoutes from './payment';

const router = Router();

router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/logout', logoutRoutes);
router.use('/property', propertyRoutes);
router.use('/user', userRoutes);
router.use('/calendar', calendarRoutes);
router.use('/payment', paymentRoutes);

export = router;