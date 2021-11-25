const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const session = require("express-session");
const globalRouter = require("./routers/globalRouter");

const path = require("path");

const PORT = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.use(morgan(`dev`));
app.use(
  session({
    secret: "eunha",
    resave: false,
    saveUninitializes: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);

app.listen(PORT, () => {
  console.log(`${PORT} server start`);
});
