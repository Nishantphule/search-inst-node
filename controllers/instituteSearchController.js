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
  getInstitutes: (req, res) => {
    const filters = req.query;
    // const {
    //   discipline,
    //   region,
    //   district,
    //   instType,
    //   status,
    //   coursePat,
    //   courseGroup,
    //   course,
    //   courseType,
    // } = req.query;
    console.log(filters);
    let newQuery = `SELECT i.inst_id,i.inst_name,i.type,i.status,i.reg_code,SUM(ic.intake) as intake,i.new_inst_id FROM institutes i,inst_courses ic,inst_short_info isi,courses1 c WHERE `;

    let conditions = [];
    if (filters.status === "affiliated") {
      conditions.push(
        `status = 'A' and i.inst_id=ic.inst_code and i.inst_id=isi.inst_code and isi.inst_code=ic.inst_code and ic.course_id=c.course_id`
      );
    } else if (filters.status === "notaffiliated") {
      conditions.push(
        `status != 'A' and i.inst_id=ic.inst_code and i.inst_id=isi.inst_code and isi.inst_code=ic.inst_code and ic.course_id=c.course_id`
      );
    }

    if (filters.region !== 0) {
      if (filters.region === "5005") {
        conditions.push(`inst_id IN ('998','999')`);
      } else {
        conditions.push(`i.reg_code = ${filters.region}`);
      }
    }

    if (filters.instType !== 0) {
      conditions.push(`i.type = ${filters.instType}`);
    }

    if (filters.course !== 0) {
      conditions.push(`ic.course_id = ${filters.course}`);
    }

    if (filters.courseType) {
      conditions.push(`c.course_type1 = '${filters.courseType}'`);
    }

    if (filters.coursePat !== 0) {
      conditions.push(`c.pattern_code = ${filters.coursePat}`);
    }

    if (filters.district !== 0) {
      conditions.push(`isi.inst_dist = ${filters.district}`);
    }

    if (filters.courseGroup !== "0") {
      conditions.push(`ic.group_id = "${filters.courseGroup}"`);
    } else if (filters.discipline !== "") {
      const disciplineGroups = {
        PH: ["G25"],
        AH: ["G11", "G26"],
        HM: "G24",
        PM: "G6",
        EPH: [
          "G12",
          "G13",
          "G14",
          "G15",
          "G16",
          "G17",
          "G18",
          "G19",
          "G20",
          "G21",
          "G22",
          "G23",
          "G25",
        ],
        ST: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
        ET: [
          "G12",
          "G13",
          "G14",
          "G15",
          "G16",
          "G17",
          "G18",
          "G19",
          "G20",
          "G21",
          "G22",
          "G23",
        ],
      };
      const groupIds = disciplineGroups[filters.discipline];
      conditions.push(`ic.group_id IN ("${groupIds.join('", "')}")`);
    }

    newQuery += conditions.join(" AND ");
    newQuery += ` GROUP BY i.inst_id,i.inst_name,i.type,i.status,i.reg_code`;
    console.log(newQuery);
    institutesConnection.query(`${newQuery}`, (error, results, fields) => {
      if (error) {
        console.error("Error querying MySQL:", error);
        res.status(500).send("Error fetching data from MySQL");
        return;
      }
      res.json(results); // Return data as JSON
    });
  },
};

module.exports = instituteSearchController;
