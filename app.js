const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose.set("strictQuery", false);

logger.info("connecting to MONGODB/NOTES");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => logger.error("error connecting to MongoDB", err.message));

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
