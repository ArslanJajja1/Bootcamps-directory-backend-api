const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
// Connect to DB
connectDB();
// Load env variables
// Import routes files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();
// Body Parser
app.use(express.json());
// cookie parser
app.use(cookieParser());
// File uploading
app.use(fileUpload());
// Santize data
app.use(mongoSanitize());
// set security headers
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
// prevent xss attacks
app.use(xss());
// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
app.use(limiter);
// CORS
app.use(cors());
// prevent param pollution
app.use(hpp());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

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
