const blogPostModel = require("../models/blogPostModel");

async function blogCreatePost(req, res) {
  try {
    const blogData = {
      title: req.body.title,
      content: req.body.content
    }
    await blogPostModel.createBlogPost(blogData, req.user.id);

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function getAllBlogPosts(req, res) {
  try {
    const role = req.user?.Role?.name;
    let visibilityFilter = 'Published';
    if (role === "Author") {
      visibilityFilter = "All";
    } else {
      return res.status(403).json({ message: "Forbidden: Unauthorized role" });
    }

    const blogPosts = await blogPostModel.getAllBlogPosts(visibilityFilter)
    res.json({
      posts: blogPosts
    })
  } catch(error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function updatePublished(req, res) {
  try {
    const postId = req.body.postId;
    const status = req.body.isPublished;
    await blogPostModel.updateIsPublished(postId, status);
    res.json({
      message: "Post Status Updated Successfully"
    })
  } catch(error) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  blogCreatePost,
  getAllBlogPosts,
  updatePublished
}