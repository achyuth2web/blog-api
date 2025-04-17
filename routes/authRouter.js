const { Router } = require("express")
const authRouter = Router();
const authController = require("../controllers/authController")

authRouter.post("/login", authController.userLoginPost);
authRouter.get("/logout", authController.userLogoutGet);
authRouter.post("/register", authController.createUserPost);

module.exports = authRouter;