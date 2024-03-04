const express = require("express");
require("dotenv").config();
const dbConnect = require("./helper/dbConnect");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
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
const magazineRouter = require("./routes/magazineRouter");
const announcementRouter = require("./routes/announcementRoutes");
const announcementCategoryRouter = require("./routes/announcementCategoryRoutes");
const productRouter = require("./routes/productRouter");
const applicationRouter = require("./routes/applicationRouter");
const electronicsRouter = require("./routes/electronicsRoutes");
const furnitureRouter = require("./routes/furnitureRouter");
const propertyRouter = require("./routes/propertyRouter");
const fashionRouter = require("./routes/fashionRouter");
const landPlotsRouter = require("./routes/landPlotRouter");
const shopOfficesRouter = require("./routes/shopOfficeRouter");
const pgGuestHouseRouter = require("./routes/pgGuestHouseRouter");
const familyTreeRouter = require("./routes/familyTreeRoute");
const individualRouter = require("./routes/individualRouter");
const memberRouter = require("./routes/memberRoute");
const notifictionRoutes = require("./routes/notificationRoutes");
const carRoutes = require("./routes/cartRoutes");

const morgan = require("morgan");
dbConnect();
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
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

app.use("/api", carRoutes);
app.use("/api", notifictionRoutes);
app.use("/api", memberRouter);
app.use("/api", individualRouter);
app.use("/api", familyTreeRouter);
app.use("/api", pgGuestHouseRouter);
app.use("/api", shopOfficesRouter);
app.use("/api", landPlotsRouter);
app.use("/api", fashionRouter);
app.use("/api", propertyRouter);
app.use("/api", furnitureRouter);
app.use("/api", electronicsRouter);
app.use("/api", applicationRouter);
app.use("/api", productRouter);
app.use("/api", announcementRouter);
app.use("/api", announcementCategoryRouter);
app.use("/api", magazineRouter);
app.use("/api/user", userRoutes);
app.use("/api", advertisingRouter);
app.use("/api", blogRouter);
app.use("/api", directoryRouter);
app.use("/api", newsRouter);
app.use("/api", profileRouter);
app.use("/api", matrimonialRouter);
app.use("/api", jobRouter);
app.use("/api", galleryRouter);
app.use("/api", eventRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`App is listening on port ${PORT}`);
});
