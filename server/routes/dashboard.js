const router = require("express").Router();
const { json } = require("express");
const pool = require("../db");
const authorize = require("../middleware/authorization");

router.get("/", authorize, async (req, res) => {
  try {
    console.log(req.id);
    const user = await pool.query(
      "select id, uname, uemail from users where id = $1",
      [req.id]
    );
    res.json(setUser(user.rows[0]));
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

function setUser(user) {
  const userDto = {
    id: user.id,
    name: user.uname,
    email: user.uemail,
  };

  return userDto;
}

module.exports = router;
