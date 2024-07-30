const mysql = require("mysql");
const {
  INST_SHORT_INFO,
  INSTITUTES,
  REGION_MASTER,
  DISTRICT_MASTER,
  APPROVE_MASTER,
  PATTERN_MASTER,
  GROUP_MASTER,
  COURSES1,
} = require("../main_tbl_conf");

const institutesConnection = mysql.createConnection({
  host: "localhost", // MySQL server host
  user: "root", // MySQL username
  password: "", // MySQL password
  database: "institutes", // MySQL database name
});

// Connect to MySQL
institutesConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log(
    "Connected to Institutes database for Institute Advance Search Controller"
  );
});

const instituteAdvSearchController = {
  getRegions: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${REGION_MASTER} WHERE reg_code!=5005;`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
  getDistricts: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${DISTRICT_MASTER}`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
  getDistrictsList: async (req, res) => {
    const { code } = req.params;
    institutesConnection.query(
      `SELECT * FROM ${DISTRICT_MASTER} where region=${code}`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
  getInstituteTypeList: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${APPROVE_MASTER}`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
  getCoursePatternList: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${PATTERN_MASTER}`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
  getCourseGroupList: async (req, res) => {
    institutesConnection.query(
      `SELECT * FROM ${GROUP_MASTER}`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
  getCourseList: async (req, res) => {
    const { groupId } = req.params;
    institutesConnection.query(
      `SELECT course_id,course_code,course_name FROM ${COURSES1} where group_id = '${groupId}'`,
      (error, results, fields) => {
        if (error) {
          console.error("Error querying MySQL:", error);
          res.status(500).send("Error fetching data from MySQL");
          return;
        }
        res.json(results); // Return data as JSON
      }
    );
  },
};

module.exports = instituteAdvSearchController;
