const router = require("express").Router();
const apiRoutes = require("./api");

router.use('/api', apiRoutes)
router.use((req, res) => res.send("Try Again! That's the wrong route!"));

module.exports = router;