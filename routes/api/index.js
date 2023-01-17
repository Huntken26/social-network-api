const router = require("express").Router();
const apiRoutes = require('./api');
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use('/api', apiRoutes);
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;

