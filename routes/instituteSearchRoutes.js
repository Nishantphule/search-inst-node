const {
  getInstCode,
  getInstitutesList,
} = require("../controllers/instituteSearchController");

const instituteSearchRouter = require("express").Router();

instituteSearchRouter.get("/getInstCode/:dteCode", getInstCode);
instituteSearchRouter.get("/institutesList", getInstitutesList);

module.exports = instituteSearchRouter;
