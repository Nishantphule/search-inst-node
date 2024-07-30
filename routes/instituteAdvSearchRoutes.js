const {
  getRegions,
  getDistricts,
  getInstituteTypeList,
  getCoursePatternList,
  getCourseGroupList,
  getCourseList,
  getDistrictsList,
} = require("../controllers/instituteAdvSearchController");

const instituteAdvSearchRouter = require("express").Router();

// to get
instituteAdvSearchRouter.get("/regionsList", getRegions);
instituteAdvSearchRouter.get("/districtsList", getDistricts);
instituteAdvSearchRouter.get("/getDistrictsList/:code", getDistrictsList);
instituteAdvSearchRouter.get("/instituteTypeList", getInstituteTypeList);
instituteAdvSearchRouter.get("/coursePatternList", getCoursePatternList);
instituteAdvSearchRouter.get("/courseGroupList", getCourseGroupList);
instituteAdvSearchRouter.get("/courseList/:groupId", getCourseList);
module.exports = instituteAdvSearchRouter;
