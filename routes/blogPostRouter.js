const { Router } = require("express")
const blogPostRouter = Router();
const passport = require("../config/passport");
const blogPostController = require("../controllers/blogPostController")

blogPostRouter.get("/", passport.authenticate("jwt", { session: false }), blogPostController.getAllBlogPosts);
blogPostRouter.post("/", passport.authenticate("jwt", { session: false }), authorizeRole("Author"), blogPostController.blogCreatePost);
blogPostRouter.patch("/", passport.authenticate("jwt", { session: false }), authorizeRole("Author"), blogPostController.updatePublished);

function authorizeRole(requiredRole) {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user || !user.Role || user.Role.name !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Insufficient role." });
      }
  
      next();
    };
}
  

module.exports = blogPostRouter;