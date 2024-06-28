const {
  getInstCode,
  getInstitutesList,
  checkInstCode,
  checkInstId,
  getSingleInstitute,
} = require("../controllers/instituteSearchController");

const instituteSearchRouter = require("express").Router();

instituteSearchRouter.get("/getInstCode/:dteCode", getInstCode);
instituteSearchRouter.get("/institutesList", getInstitutesList);
instituteSearchRouter.get("/checkInstCode/:instCode", checkInstCode);
instituteSearchRouter.get("/checkInstId/:instId", checkInstId);
instituteSearchRouter.get("/institute/:id", getSingleInstitute);
module.exports = instituteSearchRouter;
