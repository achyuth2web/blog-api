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

async function getAllBlogPosts(filter) {
  if (filter === "All") {
    return await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { comments: true },
    })
  } else if (filter === "Published") {
    return await prisma.blogPost.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { comments: true },
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

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  updateIsPublished
}