const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
//*  @ Description Get All Bootcamps
//*  @ Route       Get /api/v1/bootcamps
//*  @ Access      Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
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
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
        return next(
            new ErrorResponse(
                `Bootcamp doesn't found with id ${req.params.id}`,
                404
            )
        );
    bootcamp.remove();
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

//*  @ Description Upload photo for  bootcamp
//*  @ Route       PUT /api/v1/bootcamps/:id/photo
//*  @ Access      Private

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    // console.log(req);
    if (!bootcamp)
        return next(
            new ErrorResponse(
                `Bootcamp doesn't found with id ${req.params.id}`,
                404
            )
        );
    if (!req.files) {
        return next(new ErrorResponse(`Please upload file`, 400));
    }
    const file = req.files.file;
    console.log(file);
    // Make sure file is photo
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
                400
            )
        );
    }
    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }
        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({ success: true, data: file.name });
    });
});
