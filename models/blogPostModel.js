const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createBlogPost(newPost, userId) {
  await prisma.blogPost.create({
    data: {
      title: newPost.title,
      content: newPost.content,
      createdBy: userId
    },
  });
}

async function getAllBlogPosts(filter, userId) {
  if (filter === "All") {
    return await prisma.blogPost.findMany({
      where: {
        createdBy: userId
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { user: true, comments: true },
    })
  } else if (filter === "Published") {
    return await prisma.blogPost.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { user: true, comments: true },
    })
  }
}

async function updateIsPublished(postId, status) {
  await prisma.blogPost.update({
    where: {
      id: postId
    },
    data: {
      isPublished: status
    }
  })
}

async function getPublicBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: "desc",
    },
    include: { 
      user: true, 
      comments: true 
    },
  })
  return posts;
}

async function deleteBlogPost(postId) {
  await prisma.blogPost.delete({
    where: {
      id: parseInt(postId, 10)
    }
  })
}

async function getBlogPostById(postId) {
  return await prisma.blogPost.findFirst({
    where: {
      id: parseInt(postId, 10)
    },
    include: { 
      user: true, 
      comments: true 
    },
  })
}

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  updateIsPublished,
  getPublicBlogPosts,
  deleteBlogPost,
  getBlogPostById,
}