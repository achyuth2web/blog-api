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

    const blogPosts = await blogPostModel.getAllBlogPosts(visibilityFilter, req.user.id)
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

async function deleteBlogPost(req, res) {
  try {
    const postId = req.params.postId;
    await blogPostModel.deleteBlogPost(postId);
    res.json({
      message: "Post Deleted Successfully"
    })
  } catch(error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function getPublicBlogPosts (req, res) {
  try {
    const posts = await blogPostModel.getPublicBlogPosts('Published'); // or similar logic
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching public blog posts:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

async function getBlogPostById(req, res) {
  try {
    const postId = req.params.postId;
    const post = await blogPostModel.getBlogPostById(postId)
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}


module.exports = {
  blogCreatePost,
  getAllBlogPosts,
  updatePublished,
  deleteBlogPost,
  getPublicBlogPosts,
  getBlogPostById
}