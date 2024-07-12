const mysql = require("mysql");
const {
  INST_SHORT_INFO,
  INSTITUTES,
  CANDIDATE_REGISTRATION,
  CANDIDATE_CONFIRM,
  INST_COURSES,
  APPROVE_MASTER,
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
  checkInstCode: async (req, res) => {
    const { instCode } = req.params;
    institutesConnection.query(
      `SELECT inst_id,new_inst_id FROM ${INSTITUTES} WHERE inst_id = ${instCode}`,
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
  checkInstId: async (req, res) => {
    const { instId } = req.params;
    institutesConnection.query(
      `SELECT inst_id FROM ${INSTITUTES} WHERE new_inst_id = ${instId}`,
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
  getSingleInstitute: async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;
    institutesConnection.query(
      type === "code"
        ? `WITH institute_details AS (
    SELECT * 
    FROM ${INSTITUTES} 
    WHERE inst_id = ${id}
),
candidate_count AS (
    SELECT 
        COUNT(*) AS count
    FROM ${CANDIDATE_REGISTRATION}
    WHERE reg_id IN (
        SELECT reg_id 
        FROM ${CANDIDATE_CONFIRM} 
        WHERE conf_by_rbte = 'Y'
    ) 
    AND inst_code = (SELECT inst_id FROM institute_details)
),
intake_sums AS (
    SELECT 
        SUM(intake) AS intake,
        SUM(atfws_intake) AS atfws_intake
    FROM ${INST_COURSES} 
    WHERE inst_code = (SELECT inst_id FROM institute_details)
    AND allow_affil != 'D' 
    AND closed_by_aicte != 'Y'
),
approve_master_details AS (
    SELECT * 
    FROM ${APPROVE_MASTER} 
    WHERE approv_id = (SELECT type FROM institute_details)
)
SELECT 
    candidate_count.count,
    intake_sums.intake,
    intake_sums.atfws_intake,
    institute_details.*,
    approve_master_details.*
FROM candidate_count, intake_sums, institute_details, approve_master_details; `
        : `
        WITH institute_details AS (
    SELECT * 
    FROM ${INSTITUTES} 
    WHERE new_inst_id = ${id}
),
candidate_count AS (
    SELECT 
        COUNT(*) AS count
    FROM ${CANDIDATE_REGISTRATION}
    WHERE reg_id IN (
        SELECT reg_id 
        FROM ${CANDIDATE_CONFIRM} 
        WHERE conf_by_rbte = 'Y'
    ) 
    AND inst_code = (SELECT inst_id FROM institute_details)
),
intake_sums AS (
    SELECT 
        SUM(intake) AS intake,
        SUM(atfws_intake) AS atfws_intake
    FROM ${INST_COURSES} 
    WHERE inst_code = (SELECT inst_id FROM institute_details)
    AND allow_affil != 'D' 
    AND closed_by_aicte != 'Y'
),
approve_master_details AS (
    SELECT * 
    FROM ${APPROVE_MASTER} 
    WHERE approv_id = (SELECT type FROM institute_details)
)
SELECT 
    candidate_count.count,
    intake_sums.intake,
    intake_sums.atfws_intake,
    institute_details.*,
    approve_master_details.*
FROM candidate_count, intake_sums, institute_details, approve_master_details;`,
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
  getInstituteByDiscipline: (req, res) => {
    const { discipline } = req.params;
    institutesConnection.query(
      `SELECT i.inst_id,i.inst_name,i.type,i.status,i.reg_code,SUM(ic.intake) as intake,i.new_inst_id FROM md_msbte24.institutes i,md_msbte24.inst_courses ic,md_msbte24.inst_short_info isi,md_msbte24.courses1 c WHERE i.status ='A' and i.inst_id=ic.inst_code and i.inst_id=isi.inst_code and isi.inst_code=ic.inst_code and ic.course_id=c.course_id AND isi.inst_dist in(SELECT code FROM md_msbte24.district_master_old ) AND ic.group_id IN ('G25') GROUP BY i.inst_id,i.inst_name,i.type,i.status,i.reg_code`,
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
