const { Router } = require("express");
const commentRouter = Router()
const passport = require("../config/passport");
const commentController = require("../controllers/commentController");

commentRouter.post("/", passport.authenticate("jwt", { session: false }), authorizeRole('Member'), commentController.createComment);
commentRouter.delete("/:commentId", passport.authenticate("jwt", { session: false }), authorizeRole('Author'), commentController.deleteComment);

function authorizeRole(requiredRole) {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user || !user.Role || user.Role.name !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Insufficient role." });
      }
  
      next();
    };
}
  

module.exports = commentRouter;
