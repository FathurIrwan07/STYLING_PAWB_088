const router = require("express").Router();
const vespaController = require("../controllers/controller-vespa");
const verifyUser = require("../configs/verify");

// Rute untuk mengelola data Vespa
router.get("/", verifyUser.isLogin, vespaController.getVespa);
router.post("/save", verifyUser.isLogin, vespaController.saveVespa);
router.get("/edit/:id", verifyUser.isLogin, vespaController.editVespa);
router.post("/update/:id", verifyUser.isLogin, vespaController.updateVespa);
router.get("/delete/:id", verifyUser.isLogin, vespaController.deleteVespa);

module.exports = router;
