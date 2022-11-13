const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/posts"));

//db connection driver
const dbo = require("./db/conn");

app.listen(PORT, () => {
  //perform a database connection
  dbo.connectToServer(function (err) {
    if (err) {
      console.log(err);
    }
  });

  console.log("The server is running on port: " + PORT);
});
