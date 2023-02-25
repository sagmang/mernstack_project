const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

//connect to mongoose
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://sagma:sagma%402022@cluster0.7n75odp.mongodb.net/motorAdminDB", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB Connected!');
});


//require route
app.use("/", require("./routes/motorRoute"));
app.use("/brandcreate", require("./routes/motorRoute"));
app.use("/modelcreate", require("./routes/motorRoute"));
app.use("/fuelcreate", require("./routes/motorRoute"));
app.use("/variantcreate", require("./routes/motorRoute"));23.
app.use("/reglocationcreate", require("./routes/motorRoute"));
app.use("/regyearcreate", require("./routes/motorRoute"));
app.use("/cardetailcreate", require("./routes/motorRoute"));
app.use("/cardetailupdate/:id", require("./routes/motorRoute"));
app.use("/lifecreate", require("./routes/motorRoute"));
app.use("/send-otp", require("./routes/motorRoute"));
app.use("/verify-otp", require("./routes/motorRoute"));
app.use("/email", require("./routes/motorRoute"));
app.use("/health", require("./routes/motorRoute"));
app.use("/pages", require("./routes/motorRoute"));
app.use("/messages", require("./routes/motorRoute"));



app.listen(5000, function() {
    console.log("server is running on port 5000");
})