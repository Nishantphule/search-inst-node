const {
  getDetails,
  getDteCode,
  getDDdetails,
  getInstInfo,
  getDistrictName,
  getRegionName,
  getaicteCourses,
  getnonaicteCourses,
} = require("../controllers/instituteDetailsController");

const instituteDetailsRouter = require("express").Router();

instituteDetailsRouter.get("/instituteInfo/:id", getDetails);

instituteDetailsRouter.get("/getDteCode/:code", getDteCode);

instituteDetailsRouter.get("/getDDdetails/:code", getDDdetails);

instituteDetailsRouter.get("/getInstInfo/:code", getInstInfo);

instituteDetailsRouter.get("/getDistrictName/:code", getDistrictName);

instituteDetailsRouter.get("/getRegionName/:code", getRegionName);

instituteDetailsRouter.get("/getaictecourses/:code", getaicteCourses);

instituteDetailsRouter.get("/getnonaictecourses/:code", getnonaicteCourses);
module.exports = instituteDetailsRouter;
