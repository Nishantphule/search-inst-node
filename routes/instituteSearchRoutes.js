const {
  getInstCode,
  getInstitutesList,
  checkInstCode,
  checkInstId,
  getSingleInstitute,
  getInstitutes,
  getInstituteType,
  getDistrictName,
} = require("../controllers/instituteSearchController");

const instituteSearchRouter = require("express").Router();

instituteSearchRouter.get("/getInstCode/:dteCode", getInstCode);

instituteSearchRouter.get("/institutesList", getInstitutesList);

instituteSearchRouter.get("/checkInstCode/:instCode", checkInstCode);

instituteSearchRouter.get("/checkInstId/:instId", checkInstId);

instituteSearchRouter.get("/institute/:id", getSingleInstitute);

instituteSearchRouter.get("/institutes", getInstitutes);

instituteSearchRouter.get("/getInstituteType/:code", getInstituteType);

instituteSearchRouter.get("/getDistrictName/:code", getDistrictName);

module.exports = instituteSearchRouter;
