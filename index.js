require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const newsRouter = require("./routes/newRoute");
const profileRouter = require("./routes/profileRoute");
const matrimonialRouter = require("./routes/matrimonialRoute");
const jobRouter = require("./routes/jobRoute");
const galleryRouter = require("./routes/galleryRoute");
const eventRouter = require("./routes/eventRoute");
const directoryRouter = require("./routes/directoryRoute");
const blogRouter = require("./routes/blogRoute");
const advertisingRouter = require("./routes/advertisingRoute");
const userRoutes = require("./routes/userRoute");

const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/api", userRoutes);
app.use("/api", advertisingRouter);
app.use("/api", blogRouter);
app.use("/api", directoryRouter);
app.use("/api", newsRouter);
app.use("/api", profileRouter);
app.use("/api", matrimonialRouter);
app.use("/api", jobRouter);
app.use("/api", galleryRouter);
app.use("/api", eventRouter);

app.listen(process.env.port, function () {
  console.log("user " + " api started on port: " + process.env.port);
});

const routes = require("./routes/route");
const adminRoutes = require("./routes/routeAdminPanel");
routes(app);
adminRoutes(app);
