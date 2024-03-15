const express = require("express");
require("dotenv").config();
const dbConnect = require("./helper/dbConnect");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoute");
if (process.env.NODE_ENV == "production") {
  console.log = function () {};
}
const routes = [
  "reportRoute",
  "cartRoutes",
  "notificationRoutes",
  "memberRoute",
  "individualRouter",
  "familyTreeRoute",
  "pgGuestHouseRouter",
  "shopOfficeRouter",
  "landPlotRouter",
  "fashionRouter",
  "propertyRouter",
  "furnitureRouter",
  "electronicsRoutes",
  "applicationRouter",
  "productRouter",
  "announcementRoutes",
  "announcementCategoryRoutes",
  "magazineRouter",
  "userRoute",
  "advertisingRoute",
  "blogRoute",
  "directoryRoute",
  "newRoute",
  "profileRoute",
  "matrimonialRoute",
  "jobRoute",
  "galleryRoute",
  "eventRoute",
];

dbConnect();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

routes.forEach((route) => {
  const routeModule = require(`./routes/${route}`);
  app.use("/api", routeModule);
  app.use("/api/user", userRoutes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || "development"} mode`
  );
  console.log(`App is listening on port ${PORT}`);
});
