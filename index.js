const app = require("./server");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //successful database connection
  console.log("Connected to mongo database and serving on port:" + PORT);
});
