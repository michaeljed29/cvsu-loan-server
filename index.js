const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const postRoutes = require("./routes/users");
const loanRoutes = require("./routes/loans");
const notificationRoutes = require("./routes/notifications");
const paymentRoutes = require("./routes/payments");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// initializing routes
app.use("/users", postRoutes);
app.use("/loans", loanRoutes);
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello to CVSU-LOAN API");
});

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 5000;

// then method is a function that will run once successfully connected to the database
// catch method will run and printing the message error if there is an error connecting to the database
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
