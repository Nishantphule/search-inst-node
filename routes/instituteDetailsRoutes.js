const {
  getDetails,
  getDteCode,
  getDDdetails,
} = require("../controllers/instituteDetailsController");

const instituteDetailsRouter = require("express").Router();

instituteDetailsRouter.get("/instituteInfo/:id", getDetails);

instituteDetailsRouter.get("/getDteCode/:code", getDteCode);

instituteDetailsRouter.get("/getDDdetails/:code", getDDdetails);

module.exports = instituteDetailsRouter;
