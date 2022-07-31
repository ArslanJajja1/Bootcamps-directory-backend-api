const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env var
dotenv.config({ path: "./config/config.env" });
// load bootcamp model
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
// Connect to db
mongoose.connect(process.env.DATABASE_URI);

// Read json file
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
// Import into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log(`Data Imported successfully...`);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log(`Data deleted successfully...`);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
