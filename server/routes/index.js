const express = require('express');
const router = express.Router();

router.get('/health', async (req, res) => {
  return res.status(200).send("All Okay!")
})

module.exports = router;