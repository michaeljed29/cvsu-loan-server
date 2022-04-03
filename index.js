const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/users");
const loanRoutes = require("./routes/loans");
const notificationRoutes = require("./routes/notifications");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", postRoutes);
app.use("/loans", loanRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Hello to CVSU-LOAN API");
});

const CONNECTION_STRING = `mongodb+srv://practiceUser:pass123@cluster0.zq1kk.mongodb.net/loan?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

// mongoose.set("useFindAndModify", false);
