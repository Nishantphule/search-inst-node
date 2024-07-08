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
  INST_AFFIL,
  INST_COURSES_AUTONOMOUS,
  INST_COURSES,
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

const instituteDetailsController = {
  getDetails: async (req, res) => {
    const { id } = req.params;
    institutesConnection.query(
      `select inst_id,status,affil_by ,affil_on,type,new_inst_id from ${INSTITUTES} where inst_id=${id} OR new_inst_id=${id}`,
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
  getDteCode: async (req, res) => {
    const { code } = req.params;
    institutesConnection.query(
      `SELECT dte_inst_code FROM ${INST_SHORT_INFO} where inst_code=${code}`,
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
  getDDdetails: async (req, res) => {
    const { code } = req.params;
    console.log(code);
    institutesConnection.query(
      `select dd_no,ifsc_code,micr_num,dd_date,bank_name,bank_area, bank_city,year_affil,affil_fee,trans_id,flag from ${INST_AFFIL} where inst_id=${code}`,
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
  getInstInfo: async (req, res) => {
    const { code } = req.params;
    institutesConnection.query(
      `SELECT dte_inst_code, inst_code,exam_center,dist_center,rac,eqcenter,shift,affil_year,reg_inst,inst_name,trust_address,inst_address,city,inst_dist,nam_princpl,pri_std,pri_ph, pri_cell,pri_email,pri_altemail,pri_off_std,pri_off_ph,pri_fax_std,pri_fax_no,othr_name_per,othr_std,oth_ph,othr_email,oth_mobile,coname,codesig,costd,coph,coeid,comobile,inst_std,inst_ph,inst_fax_std,inst_fax,inst_email,trust_name,trust_std,trust_ph, trust_email, aicte_letter_no, govt_letter_no, aicte_letter_date, govt_letter_date, aictefromdate, aictetodate, modified_on, entry_on, inst_web, dte_letter_no, dte_letter_date, pci_letter_no, pci_letter_date, othr_desig FROM ${INST_SHORT_INFO} WHERE inst_code=${code}`,
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
  getDistrictName: async (req, res) => {
    const { code } = req.params;
    institutesConnection.query(
      `SELECT * FROM ${DISTRICT_MASTER} where code=${code}`,
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
  getRegionName: async (req, res) => {
    const { code } = req.params;
    institutesConnection.query(
      `SELECT * FROM ${REGION_MASTER} where reg_code=${code}`,
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
  getaicteCourses: async (req, res) => {
    const { code } = req.params;
    const { type } = req.query;
    institutesConnection.query(
      type === "5" || type === "6"
        ? `SELECT c.course_name name, c.course_code code, c.course_type1,ic.allow_affil, ic.intake, c.course_id, c.duration, c.pattern_code,ic.start_year ,ic.applied_for_closure,ic.closed_by_aicte,ic.affilation_since,ic.deaffilation_since,ic.closed_since,ic.apply_for_closure_since,ic.accridation,ic.accridiation_start_since,ic.accridiation_end_since,ic.punitive_flag, ic.punitive_start_date, ic.punitive_end_date, ic.block_by_msbte FROM ${COURSES1} c, ${INST_COURSES_AUTONOMOUS} ic WHERE c.course_type1 = 'A' and ic.course_id = c.course_id and ic.inst_code=${code} AND (IF( ic.punitive_flag = 'Y', ic.intake >=0, ic.intake >0 )) order by ic.intake ASC`
        : `SELECT c.course_name name, c.course_code code, c.course_type1,ic.allow_affil, ic.intake, c.course_id, c.duration, c.pattern_code,ic.start_year ,ic.applied_for_closure,ic.closed_by_aicte,ic.affilation_since,ic.deaffilation_since,ic.closed_since,ic.apply_for_closure_since,ic.accridation,ic.accridiation_start_since,ic.accridiation_end_since,ic.punitive_flag, ic.punitive_start_date, ic.punitive_end_date, ic.block_by_msbte FROM ${COURSES1} c, ${INST_COURSES} ic WHERE c.course_type1 = 'A' and ic.course_id = c.course_id and ic.inst_code=${code} AND (IF( ic.punitive_flag = 'Y', ic.intake >=0, ic.intake >0 )) order by ic.intake ASC`,
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
  getnonaicteCourses: async (req, res) => {
    const { code } = req.params;
    const { type } = req.query;
    institutesConnection.query(
      type === "5" || type === "6"
        ? `SELECT c.course_name name, c.course_code code, c.course_type1,ic.allow_affil, ic.intake, c.course_id, c.duration, c.pattern_code ,ic.start_year ,ic.applied_for_closure,ic.closed_by_aicte,ic.affilation_since,ic.deaffilation_since,ic.closed_since,ic.apply_for_closure_since,ic.accridation,ic.accridiation_start_since,ic.accridiation_end_since,ic.punitive_flag, ic.punitive_start_date, ic.punitive_end_date, ic.block_by_msbte FROM ${COURSES1} c, ${INST_COURSES_AUTONOMOUS} ic WHERE c.course_type1 = 'S' and ic.course_id = c.course_id and ic.inst_code=${code} and ic.intake >0 order by ic.intake ASC`
        : `SELECT c.course_name name, c.course_code code, c.course_type1,ic.allow_affil, ic.intake, c.course_id, c.duration, c.pattern_code ,ic.start_year ,ic.applied_for_closure,ic.closed_by_aicte,ic.affilation_since,ic.deaffilation_since,ic.closed_since,ic.apply_for_closure_since,ic.accridation,ic.accridiation_start_since,ic.accridiation_end_since,ic.punitive_flag, ic.punitive_start_date, ic.punitive_end_date, ic.block_by_msbte FROM ${COURSES1} c, ${INST_COURSES} ic WHERE c.course_type1 = 'S' and ic.course_id = c.course_id and ic.inst_code=${code} and ic.intake >0 order by ic.intake ASC`,
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

module.exports = instituteDetailsController;
