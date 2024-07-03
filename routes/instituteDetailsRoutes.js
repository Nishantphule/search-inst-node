const {
  getDetails,
  getDteCode,
  getDDdetails,
  getInstInfo,
  getDistrictName,
} = require("../controllers/instituteDetailsController");

const instituteDetailsRouter = require("express").Router();

instituteDetailsRouter.get("/instituteInfo/:id", getDetails);

instituteDetailsRouter.get("/getDteCode/:code", getDteCode);

instituteDetailsRouter.get("/getDDdetails/:code", getDDdetails);

instituteDetailsRouter.get("/getInstInfo/:code", getInstInfo);

instituteDetailsRouter.get("/getDistrictName/:code", getDistrictName);

module.exports = instituteDetailsRouter;
