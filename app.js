const express = require("express");
const { PrismaClient } = require('@prisma/client');
const passport = require("passport");
require("dotenv").config();
require("./config/passport");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser (moved up)

app.use(passport.initialize());

const authRouter = require("./routes/authRouter");
app.use("/api", authRouter);

const blogPostRouter = require("./routes/blogPostRouter");
app.use("/api/posts", blogPostRouter);

const commentRouter = require("./routes/commentRouter");
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening port ${PORT}`));