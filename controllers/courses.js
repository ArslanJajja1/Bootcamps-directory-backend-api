const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

//*  @ Description Get Courses
//*  @ Route       Get /api/v1/courses
//*  @ Route       Get /api/v1/bootcamps/:bootcampId/courses
//*  @ Access      Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Course.find().populate({
            path: "bootcamp",
            select: "name description",
        });
    }
    const courses = await query;
    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});
//*  @ Description Get Course
//*  @ Route       Get /api/v1/courses
//*  @ Access      Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description",
    });
    if (!course) {
        return next(new ErrorResponse(`No course with id of ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        data: course,
    });
});
