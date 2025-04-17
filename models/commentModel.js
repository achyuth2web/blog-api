const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createComment(newComment) {
  return await prisma.comment.create({
    data: {
      blogPostId: newComment.postId,
      userId: newComment.userId,
      message: newComment.message
    }
  }) 
}

async function deleteComment(commentId) {
  await prisma.comment.delete({
    where: {
      id: parseInt(commentId, 10)
    }
  })
}

module.exports = {
  createComment,
  deleteComment,
}