const { Router } = require('express');

import propertyRoutes from './property';
// import createProperty from './createProperty'

const router = Router();

router.use('/property', propertyRoutes);


export = router;