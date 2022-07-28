const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
// Connect to DB
connectDB();
// Load env variables
// Import bootcamp routes files
const bootcamps = require("./routes/bootcamps");
const app = express();
// Body Parser
app.use(express.json());
// Development logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.get("/", (req, res) => {
    res.send("Hi from express js");
});
// Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);
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
