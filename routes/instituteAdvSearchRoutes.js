const {
  getRegions,
  getDistricts,
  getInstituteTypeList,
} = require("../controllers/instituteAdvSearchController");

const instituteAdvSearchRouter = require("express").Router();

instituteAdvSearchRouter.get("/regionsList", getRegions);
instituteAdvSearchRouter.get("/districtsList", getDistricts);
instituteAdvSearchRouter.get("/instituteTypeList", getInstituteTypeList);

module.exports = instituteAdvSearchRouter;
