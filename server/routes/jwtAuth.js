const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDB = await pool.query("select * from users where uemail = $1", [
      email,
    ]);
    if (userDB.rows.length !== 0) {
      res.status(401).send("User already exist");
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    await pool.query("BEGIN");
    const newUser = await pool.query(
      "insert into users(uname, uemail, upassword) values ($1,$2,$3) returning *",
      [name, email, bcryptPassword]
    );
    await pool.query("COMMIT");
    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    await pool.query("ROLLBACK");
    res.status(500).send("Sever Error");
  } finally {
    pool.release();
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDB = await pool.query("select * from users where uemail = $1", [
      email,
    ]);
    if (userDB.rows.length === 0) {
      res.status(401).json("Email or Password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      userDB.rows[0].upassword
    );
    console.log(validPassword);
    if (!validPassword) {
      res.status(401).json("Email or Password is incorrect");
    }
    const token = jwtGenerator(userDB.rows[0].id);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/is-verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
