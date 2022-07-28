const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//*  @ Description Get All Bootcamps
//*  @ Route       Get /api/v1/bootcamps
//*  @ Access      Public

exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamps = await Bootcamp.find();
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
