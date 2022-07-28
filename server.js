const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
// Load env variables
dotenv.config({ path: "./config/config.env" });
// Import bootcamp routes files
const bootcamps = require("./routes/bootcamps");
const app = express();
connectDB();
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
const server = app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`ERROR : ${err.message}`);
    // close server and exit process
    server.close(() => process.exit(1));
});
