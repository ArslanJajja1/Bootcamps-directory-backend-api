const Bootcamp = require("../models/Bootcamp");

//*  @ Description Get All Bootcamps
//*  @ Route       Get /api/v1/bootcamps
//*  @ Access      Public

exports.getBootcamps = (req, res, next) => {
    res.json({ success: true, message: "Show all bootcamps" });
};

//*  @ Description Get Single Bootcamp
//*  @ Route       Get /api/v1/bootcamps/:id
//*  @ Access      Public

exports.getBootcamp = (req, res, next) => {
    res.json({
        success: true,
        message: `Show single bootcamp with id ${req.params.id}`,
    });
};

//*  @ Description Create New Bootcamp
//*  @ Route       POST /api/v1/bootcamps
//*  @ Access      Private

exports.createBootcamp = async (req, res, next) => {
    const bootcampData = req.body;

    try {
        const bootcamp = await Bootcamp.create(bootcampData);
        res.status(201).json({
            success: true,
            message: "Bootcamp created successfully",
            data: bootcamp,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error. Try Again" });
    }
};

//*  @ Description Update  Bootcamp
//*  @ Route       PUT /api/v1/bootcamps/:id
//*  @ Access      Private

exports.updateBootcamp = (req, res, next) => {
    res.json({
        success: true,
        message: `Update a bootcamp with id ${req.params.id}`,
    });
};

//*  @ Description Delete  Bootcamp
//*  @ Route       DELETE /api/v1/bootcamps/:id
//*  @ Access      Private

exports.deleteBootcamp = (req, res, next) => {
    res.json({
        success: true,
        message: `Bootcamp deleted with id ${req.params.id}`,
    });
};