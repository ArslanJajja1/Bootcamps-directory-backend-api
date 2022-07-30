const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
//*  @ Description Get All Bootcamps
//*  @ Route       Get /api/v1/bootcamps
//*  @ Access      Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;
    // Copy req.query
    const reqQuery = { ...req.query };
    // Fields to exclude
    const removeFields = ["select", "sort"];
    // Loop over removeFields and delete from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);
    console.log("req.query ", reqQuery);
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    // Create operators ($gt,$gte,etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );
    // Finding resource
    query = Bootcamp.find(JSON.parse(queryStr));
    // select fields
    if (req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query.select(fields);
    }
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt");
    }
    const bootcamps = await query;
    res.status(200).json({
        success: true,
        message: "Bootcamps fetched successfully",
        data: bootcamps,
        count: bootcamps.length,
    });
});

//*  @ Description Get Single Bootcamp
//*  @ Route       Get /api/v1/bootcamps/:id
//*  @ Access      Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
        return next(
            new ErrorResponse(
                `Bootcamp doesn't found with id ${req.params.id}`,
                404
            )
        );
    res.status(200).json({
        success: true,
        message: "Bootcamp fetched Successfully",
        data: bootcamp,
    });
});

//*  @ Description Create New Bootcamp
//*  @ Route       POST /api/v1/bootcamps
//*  @ Access      Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcampData = req.body;
    const bootcamp = await Bootcamp.create(bootcampData);
    res.status(201).json({
        success: true,
        message: "Bootcamp created successfully",
        data: bootcamp,
    });
});

//*  @ Description Update  Bootcamp
//*  @ Route       PUT /api/v1/bootcamps/:id
//*  @ Access      Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const updatedBootcampData = req.body;
    const bootcamp = await Bootcamp.findByIdAndUpdate(
        req.params.id,
        updatedBootcampData,
        { new: true, runValidators: true }
    );
    if (!bootcamp)
        return next(
            new ErrorResponse(
                `Bootcamp doesn't found with id ${req.params.id}`,
                404
            )
        );
    res.status(200).json({
        success: true,
        message: "Bootcamp updated Successfully",
        data: bootcamp,
    });
});

//*  @ Description Delete  Bootcamp
//*  @ Route       DELETE /api/v1/bootcamps/:id
//*  @ Access      Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp)
        return next(
            new ErrorResponse(
                `Bootcamp doesn't found with id ${req.params.id}`,
                404
            )
        );
    res.status(200).json({
        success: true,
        message: "Bootcamp deleted Successfully",
        data: {},
    });
});
//*  @ Description Get bootcamps within the radius
//*  @ Route       GET /api/v1/bootcamps/radius/:zipcode/:distance
//*  @ Access      Private

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    //   get lng/lat from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // calculate radius using radians
    // Divide distance by radius of earth
    // Earth radius is 3,963 miles / 6,378 km
    const radiusOfEarth = 3963; //in miles
    const radius = distance / radiusOfEarth;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });
    res.status(200).json({
        success: true,
        message: "Bootcamps fetched successfully",
        count: bootcamps.length,
        data: bootcamps,
    });
});
