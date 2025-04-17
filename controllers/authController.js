const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // <-- Make sure this is required

const JWT_SECRET = process.env.JWT_SECRET;

async function userLoginPost(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findByEmail(email); // or your method to find user

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role.name
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function userLogoutGet(req, res) {
  // Since it's JWT, no actual logout happens — client should just delete the token
  res.status(200).json({ message: "Successfully logged out. Clear your token on client." });
}

async function createUserPost(req, res) {
  try {
    const { firstName, lastName, email, password, roleId } = req.body;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roleId
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  userLoginPost,
  userLogoutGet,
  createUserPost,
};
