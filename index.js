const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;

// Middle wear
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
