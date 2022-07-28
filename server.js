const express = require("express");
const dotenv = require("dotenv");
// Import bootcamp files
const bootcamps = require("./routes/bootcamps");
const morgan = require("morgan");
// Load env variables
dotenv.config({ path: "./config/config.env" });
const app = express();
// Development logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.get("/", (req, res) => {
    res.send("Hi from express js");
});
// Routes
app.use("/api/v1/bootcamps", bootcamps);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
