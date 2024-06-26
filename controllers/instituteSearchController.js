const mysql = require("mysql");
const { INST_SHORT_INFO, INSTITUTES } = require("../main_tbl_conf");

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
    "Connected to Institutes database for Institute Search Controller"
  );
});

const instituteSearchController = {
  getInstCode: async (req, res) => {
    const { dteCode } = req.params;
    institutesConnection.query(
      `SELECT inst_code FROM ${INST_SHORT_INFO} where dte_inst_code=${dteCode}`,
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
  getInstitutesList: async (req, res) => {
    institutesConnection.query(
      `SELECT inst_id, inst_name, city_name FROM ${INSTITUTES} where inst_id not in (9999) order by inst_id`,
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

module.exports = instituteSearchController;
