const { Router } = require('express');

import propertyRoutes from './property';
import userRoutes from './user';

const router = Router();

router.use('/property', propertyRoutes);



export = router;