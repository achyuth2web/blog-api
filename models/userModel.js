const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(newUser) {
  await prisma.user.create({
    data: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      roleId: parseInt(newUser.roleId, 10)
    },
  });
}

async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
    include: { Role: true },
  });
}

async function checkUsername(username) {
  return await prisma.user.findUnique({
    where: { email: username },
  });
}

async function getUserById(id) {
    return await prisma.user.findUnique({
      where: { id: id },
      include: { Role: true },
    });
  }

module.exports = {
  createUser,
  checkUsername,
  getUserById,
  findByEmail,
};
