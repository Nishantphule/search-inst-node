const {
  getInstCode,
  getInstitutesList,
  checkInstCode,
  checkInstId,
  getSingleInstitute,
  getInstitutes,
} = require("../controllers/instituteSearchController");

const instituteSearchRouter = require("express").Router();

instituteSearchRouter.get("/getInstCode/:dteCode", getInstCode);

instituteSearchRouter.get("/institutesList", getInstitutesList);

instituteSearchRouter.get("/checkInstCode/:instCode", checkInstCode);

instituteSearchRouter.get("/checkInstId/:instId", checkInstId);

instituteSearchRouter.get("/institute/:id", getSingleInstitute);

instituteSearchRouter.get("/institutes", getInstitutes);
module.exports = instituteSearchRouter;
