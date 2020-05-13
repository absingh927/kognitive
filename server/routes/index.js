const express = require("express");
const router = express.Router();
const api = require("../api");

router.get("/health", async (req, res) => {
  return res.status(200).send("All Okay!");
});

router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(403).json({ error: "Please provide valid credentials." });
  }

  try {
    const resData = await api.authenticateUser(req.body);
    return res.send(resData.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: err.message
        ? err.message
        : "A problem has occured, try again later",
    });
  }
});

router.get("/tasks/:id?", async (req, res) => {
  if (!req.headers.usertoken) {
    return res
      .status(403)
      .json({ error: "Please provide a valid credentials" });
  }
  const data = {
    usertoken: req.headers.usertoken,
    parentId: req.params.id,
  };

  try {
    const resData = await api.getTaskList(data);
    return res.send(resData.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: err.message
        ? err.message
        : "A problem has occured, try again later",
    });
  }
});

module.exports = router;
