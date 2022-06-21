const { Router } = require('express');

import propertyRoutes from './property';

const router = Router();

router.use('/logout', propertyRoutes);


export = router;